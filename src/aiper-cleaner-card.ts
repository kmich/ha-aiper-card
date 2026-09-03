import { fireEvent, type HomeAssistant, type LovelaceCardEditor } from "custom-card-helpers";
import { LitElement, html, nothing, type TemplateResult } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import { classMap } from "lit/directives/class-map.js";

import {
  CARD_VERSION,
  CLEAN_PATH_ICONS,
  CLEANER_CARD,
  CLEANER_ENTITY_DOMAINS,
  CLEANER_ENTITY_ID_HINTS,
  CLEANER_ENTITY_KEYS,
  DEFAULT_STATUS_PRESENTATION,
  EDITOR_TAG,
  MODE_ICONS,
  STATUS_PRESENTATION,
} from "./const";
import { resolveEntities } from "./resolve";
import { sharedStyles } from "./styles";
import type { AiperCleanerCardConfig, ResolvedEntities } from "./types";

const CONSUMABLE_SLOTS = ["roller_brush", "micromesh_filter", "caterpillar_tread", "propeller"] as const;

@customElement(CLEANER_CARD)
export class AiperCleanerCard extends LitElement {
  static styles = sharedStyles;

  @property({ attribute: false }) public hass?: HomeAssistant;
  @state() private _config?: AiperCleanerCardConfig;
  @state() private _resolved?: ResolvedEntities;

  private _resolveKey = "";

  public static async getConfigElement(): Promise<LovelaceCardEditor> {
    await import("./editor");
    return document.createElement(EDITOR_TAG) as LovelaceCardEditor;
  }

  public static getStubConfig(): AiperCleanerCardConfig {
    return { type: `custom:${CLEANER_CARD}` };
  }

  public setConfig(config: AiperCleanerCardConfig): void {
    if (!config) throw new Error("Invalid configuration");
    if (!config.device && !config.entity && !config.entities) {
      throw new Error("Set a `device:` (or an `entity:` / `entities:` override)");
    }
    this._config = { show_footer: true, ...config };
    this._resolveKey = "";
  }

  public getCardSize(): number {
    return 4;
  }

  protected updated(): void {
    if (!this.hass || !this._config) return;
    const key = `${this._config.device ?? ""}|${this._config.entity ?? ""}|${JSON.stringify(
      this._config.entities ?? {},
    )}`;
    if (key === this._resolveKey) return;
    this._resolveKey = key;
    void this._resolve();
  }

  private async _resolve(): Promise<void> {
    if (!this.hass || !this._config) return;
    this._resolved = await resolveEntities(this.hass, {
      device: this._config.device,
      anchorEntity: this._config.entity,
      keys: CLEANER_ENTITY_KEYS,
      domains: CLEANER_ENTITY_DOMAINS,
      idHints: CLEANER_ENTITY_ID_HINTS,
      overrides: this._config.entities,
    });
  }

  private _state(slot: string) {
    const id = this._resolved?.map[slot];
    return id ? this.hass?.states[id] : undefined;
  }

  private _moreInfo(slot: string): void {
    const id = this._resolved?.map[slot];
    if (id) fireEvent(this, "hass-more-info", { entityId: id });
  }

  private _select(slot: string, option: string): void {
    const id = this._resolved?.map[slot];
    if (id && this.hass) this.hass.callService("select", "select_option", { entity_id: id, option });
  }

  private _toggleRunning(on: boolean): void {
    const id = this._resolved?.map.running_switch;
    if (id && this.hass) {
      this.hass.callService("switch", on ? "turn_on" : "turn_off", { entity_id: id });
    }
  }

  private _press(slot: string): void {
    const id = this._resolved?.map[slot];
    if (id && this.hass) this.hass.callService("button", "press", { entity_id: id });
  }

  protected render(): TemplateResult | typeof nothing {
    if (!this.hass || !this._config) return nothing;
    const status = this._state("status");
    if (!this._resolved) {
      return html`<ha-card><div class="unavailable">Loading…</div></ha-card>`;
    }
    if (!status) {
      return html`<ha-card
        ><div class="unavailable">
          No Aiper cleaner entities found. Check the <code>device</code> in the card config.
        </div></ha-card
      >`;
    }

    const name =
      this._config.name || this._resolved.deviceName || status.attributes.friendly_name || "Aiper";
    const raw = String(status.state ?? "").toLowerCase();
    const pres = STATUS_PRESENTATION[raw] ?? DEFAULT_STATUS_PRESENTATION;
    const image = this._config.image ?? status.attributes.entity_picture;

    return html`
      <ha-card>
        ${this._config.compact
          ? nothing
          : html`<div class=${classMap({ header: true, "has-image": !!image })}>
              ${image ? html`<img src=${image} alt="" />` : nothing}
              <div>
                <div class="title">${name}</div>
                <div class="subtitle">${status.state}</div>
              </div>
            </div>`}
        <div class="body">
          ${this._renderStatusLine(status, pres)} ${this._renderPills()} ${this._renderWarning()}
          ${this._renderModes()} ${this._renderCleanPath()} ${this._renderRunning()}
          ${this._renderConsumables()}
        </div>
        ${this._config.show_footer ? this._renderFooter() : nothing}
      </ha-card>
    `;
  }

  private _renderStatusLine(status: any, pres: typeof DEFAULT_STATUS_PRESENTATION): TemplateResult {
    const battery = this._state("battery");
    const charging = this._state("charging");
    const isCharging = charging?.state === "on";
    const batteryIcon = isCharging
      ? "mdi:battery-charging"
      : battery
        ? this._batteryIcon(Number(battery.state))
        : "mdi:battery-unknown";
    return html`
      <div class="statusline">
        <ha-icon
          class=${classMap({ "status-icon": true, active: !!pres.active })}
          style=${`color:${pres.color}`}
          .icon=${pres.icon}
          @click=${() => this._moreInfo("status")}
        ></ha-icon>
        <div class="status-text" @click=${() => this._moreInfo("status")}>${status.state}</div>
        <div class="spacer"></div>
        ${battery
          ? html`<div class="battery" @click=${() => this._moreInfo("battery")}>
              <ha-icon .icon=${batteryIcon}></ha-icon>${Math.round(Number(battery.state))}%
            </div>`
          : nothing}
      </div>
    `;
  }

  private _batteryIcon(level: number): string {
    if (isNaN(level)) return "mdi:battery-unknown";
    const rounded = Math.round(level / 10) * 10;
    if (rounded <= 5) return "mdi:battery-alert-variant-outline";
    if (rounded >= 100) return "mdi:battery";
    return `mdi:battery-${rounded}`;
  }

  private _renderPills(): TemplateResult | typeof nothing {
    const defs: Array<[string, string, string]> = [
      ["online", "mdi:cloud-check", "Online"],
      ["in_water", "mdi:water", "In water"],
      ["solar_charging", "mdi:solar-power", "Solar"],
      ["wifi", "mdi:wifi", "WiFi"],
    ];
    const pills = defs
      .map(([slot, icon, label]) => {
        const st = this._state(slot);
        if (!st || st.state === "unavailable" || st.state === "unknown") return null;
        const on = st.state === "on";
        return html`<span
          class=${classMap({ pill: true, on })}
          @click=${() => this._moreInfo(slot)}
        >
          <ha-icon .icon=${icon}></ha-icon>${label}
        </span>`;
      })
      .filter(Boolean);
    return pills.length ? html`<div class="pills">${pills}</div>` : nothing;
  }

  private _renderWarning(): TemplateResult | typeof nothing {
    const warn = this._state("warning");
    if (!warn) return nothing;
    const text = String(warn.state);
    const benign = ["no warning", "none", "ok", "unknown", "unavailable", ""].includes(
      text.toLowerCase(),
    );
    if (benign) return nothing;
    return html`<div class="alert" @click=${() => this._moreInfo("warning")}>
      <ha-icon icon="mdi:alert"></ha-icon>${text}
    </div>`;
  }

  private _renderModes(): TemplateResult | typeof nothing {
    if (this._config?.show_mode === false) return nothing;
    const sel = this._state("mode_select");
    if (!sel) return nothing;
    const options: string[] = sel.attributes.options ?? [];
    const current = sel.state;
    const disabled = sel.state === "unavailable";
    return html`
      <div>
        <div class="label">Cleaning mode</div>
        <div class="chips">
          ${options.map(
            (opt) => html`<button
              class=${classMap({ chip: true, selected: opt === current })}
              ?disabled=${disabled}
              @click=${() => this._select("mode_select", opt)}
            >
              <ha-icon .icon=${MODE_ICONS[opt.toLowerCase()] ?? "mdi:tune-variant"}></ha-icon>${opt}
            </button>`,
          )}
        </div>
      </div>
    `;
  }

  private _renderCleanPath(): TemplateResult | typeof nothing {
    if (this._config?.show_clean_path === false) return nothing;
    const sel = this._state("clean_path_select");
    if (!sel) return nothing;
    const options: string[] = sel.attributes.options ?? [];
    const current = sel.state;
    const disabled = sel.state === "unavailable";
    return html`
      <div>
        <div class="label">Clean path</div>
        <div class="chips">
          ${options.map(
            (opt) => html`<button
              class=${classMap({ chip: true, selected: opt === current })}
              ?disabled=${disabled}
              @click=${() => this._select("clean_path_select", opt)}
            >
              <ha-icon .icon=${CLEAN_PATH_ICONS[opt.toLowerCase()] ?? "mdi:map-marker-path"}></ha-icon
              >${opt}
            </button>`,
          )}
        </div>
      </div>
    `;
  }

  private _renderRunning(): TemplateResult | typeof nothing {
    const sw = this._state("running_switch");
    // The integration only exposes a start/stop switch for models that support
    // it (e.g. Surfer). When absent, we simply don't show the control.
    if (!sw) return nothing;
    const on = sw.state === "on";
    const disabled = sw.state === "unavailable";
    return html`
      <div class="row">
        <ha-icon icon="mdi:pool"></ha-icon>
        <span>Cleaning</span>
        <div class="spacer"></div>
        <ha-switch
          .checked=${on}
          .disabled=${disabled}
          @change=${(e: Event) => this._toggleRunning((e.target as HTMLInputElement).checked)}
        ></ha-switch>
      </div>
    `;
  }

  private _renderConsumables(): TemplateResult | typeof nothing {
    if (this._config?.show_consumables === false) return nothing;
    const prefix = this._resolved?.deviceName;
    const bars = CONSUMABLE_SLOTS.map((slot) => {
      const st = this._state(slot);
      if (!st || isNaN(Number(st.state))) return null;
      const pct = Math.max(0, Math.min(100, Number(st.state)));
      let label: string = st.attributes.friendly_name ?? slot.replace(/_/g, " ");
      if (prefix && label.startsWith(`${prefix} `)) label = label.slice(prefix.length + 1);
      return html`<div class="wear" @click=${() => this._moreInfo(slot)}>
        <div class="row" style="justify-content:space-between">
          <span>${label}</span><span>${Math.round(pct)}%</span>
        </div>
        <div class=${classMap({ bar: true, low: pct < 10 })}>
          <span style=${`width:${pct}%`}></span>
        </div>
      </div>`;
    }).filter(Boolean);
    return bars.length ? html`<div class="row wrap">${bars}</div>` : nothing;
  }

  private _renderFooter(): TemplateResult | typeof nothing {
    const shadow = this._resolved?.map.refresh_shadow;
    const meta = this._resolved?.map.refresh_metadata;
    if (!shadow && !meta) return nothing;
    return html`
      <div class="footer">
        <span>Force sync</span>
        <div class="spacer"></div>
        ${shadow
          ? html`<ha-icon-button
              .path=${"M17.65 6.35A7.958 7.958 0 0 0 12 4a8 8 0 1 0 7.73 10h-2.08A6 6 0 1 1 12 6c1.66 0 3.14.69 4.22 1.78L13 11h7V4l-2.35 2.35Z"}
              title="Refresh shadow (MQTT)"
              @click=${() => this._press("refresh_shadow")}
            ></ha-icon-button>`
          : nothing}
        ${meta
          ? html`<ha-icon-button
              .path=${"M12 4V1L8 5l4 4V6a6 6 0 1 1-6 6H4a8 8 0 1 0 8-8Z"}
              title="Refresh metadata (REST)"
              @click=${() => this._press("refresh_metadata")}
            ></ha-icon-button>`
          : nothing}
      </div>
    `;
  }
}

// Card picker registration.
(window as any).customCards = (window as any).customCards || [];
(window as any).customCards.push({
  type: CLEANER_CARD,
  name: "Aiper Cleaner Card",
  description: "Status, battery, mode and clean-path controls for an Aiper pool cleaner.",
  preview: true,
  documentationURL: "https://github.com/kmich/ha-aiper-card",
});

// eslint-disable-next-line no-console
console.info(`%c AIPER-CARD %c ${CARD_VERSION} `, "background:#039be5;color:#fff", "color:#039be5");

declare global {
  interface HTMLElementTagNameMap {
    [CLEANER_CARD]: AiperCleanerCard;
  }
}
