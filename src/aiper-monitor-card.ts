import { fireEvent, type HomeAssistant, type LovelaceCardEditor } from "custom-card-helpers";
import { LitElement, html, nothing, svg, type TemplateResult } from "lit";
import { customElement, property, state } from "lit/decorators.js";

import { EDITOR_TAG, MONITOR_CARD, MONITOR_ENTITY_KEYS, WATER_BANDS } from "./const";
import { resolveEntities } from "./resolve";
import { sharedStyles } from "./styles";
import type { AiperMonitorCardConfig, ResolvedEntities } from "./types";

const DEFAULT_GAUGES: Array<"ph" | "orp" | "chlorine" | "tds" | "ec"> = ["ph", "orp", "chlorine"];
const GAUGE_LABEL: Record<string, string> = {
  ph: "pH",
  orp: "ORP",
  chlorine: "Chlorine",
  tds: "TDS",
  ec: "EC",
};

@customElement(MONITOR_CARD)
export class AiperMonitorCard extends LitElement {
  static styles = sharedStyles;

  @property({ attribute: false }) public hass?: HomeAssistant;
  @state() private _config?: AiperMonitorCardConfig;
  @state() private _resolved?: ResolvedEntities;

  private _resolveKey = "";

  public static async getConfigElement(): Promise<LovelaceCardEditor> {
    await import("./editor");
    return document.createElement(EDITOR_TAG) as LovelaceCardEditor;
  }

  public static getStubConfig(): AiperMonitorCardConfig {
    return { type: `custom:${MONITOR_CARD}` };
  }

  public setConfig(config: AiperMonitorCardConfig): void {
    if (!config) throw new Error("Invalid configuration");
    if (!config.device && !config.entity && !config.entities) {
      throw new Error("Set a `device:` (or an `entity:` / `entities:` override)");
    }
    this._config = { show_score: true, show_meta: true, ...config };
    this._resolveKey = "";
  }

  public getCardSize(): number {
    return 3;
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
      keys: MONITOR_ENTITY_KEYS,
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

  protected render(): TemplateResult | typeof nothing {
    if (!this.hass || !this._config) return nothing;
    if (!this._resolved) return html`<ha-card><div class="unavailable">Loading…</div></ha-card>`;

    const anyChem = ["ph", "orp", "ec", "tds", "chlorine", "score"].some((s) => this._state(s));
    if (!anyChem) {
      return html`<ha-card
        ><div class="unavailable">
          No Aiper water-quality entities found. Check the <code>device</code> in the card config.
        </div></ha-card
      >`;
    }

    const name =
      this._config.name ||
      this._resolved.deviceName ||
      this._state("ph")?.attributes.friendly_name ||
      "Aiper Water Quality";
    const gauges = this._config.gauges?.length ? this._config.gauges : DEFAULT_GAUGES;

    return html`
      <ha-card>
        <div class="header" style="min-height:0">
          <div><div class="title">${name}</div>${this._renderResult()}</div>
        </div>
        ${this._renderWarning()}
        <div class="body">
          ${this._config.show_score !== false ? this._renderScore() : nothing}
          <div class="grid">${gauges.map((g) => this._renderGauge(g))}</div>
          ${this._config.show_meta !== false ? this._renderMeta() : nothing}
        </div>
      </ha-card>
    `;
  }

  private _renderResult(): TemplateResult | typeof nothing {
    const r = this._state("result");
    if (!r || ["unknown", "unavailable"].includes(r.state)) return nothing;
    return html`<div class="subtitle">${r.state}</div>`;
  }

  private _renderWarning(): TemplateResult | typeof nothing {
    const warn = this._state("warning");
    if (!warn) return nothing;
    const text = String(warn.state);
    if (["no warning", "none", "ok", "unknown", "unavailable", ""].includes(text.toLowerCase())) {
      return nothing;
    }
    return html`<div class="alert warning-banner" @click=${() => this._moreInfo("warning")}>
      <ha-icon icon="mdi:alert"></ha-icon>${text}
    </div>`;
  }

  private _renderScore(): TemplateResult | typeof nothing {
    const st = this._state("score");
    if (!st || isNaN(Number(st.state))) return nothing;
    const score = Number(st.state);
    const pct = Math.max(0, Math.min(100, score));
    const color =
      pct >= 80
        ? "var(--success-color, #43a047)"
        : pct >= 50
          ? "var(--warning-color, #ffa600)"
          : "var(--error-color, #db4437)";
    const R = 26;
    const C = 2 * Math.PI * R;
    return html`
      <div class="row" @click=${() => this._moreInfo("score")} style="cursor:pointer">
        <svg width="72" height="72" viewBox="0 0 72 72">
          ${svg`
            <circle cx="36" cy="36" r="${R}" fill="none" stroke="var(--divider-color)" stroke-width="7" />
            <circle cx="36" cy="36" r="${R}" fill="none" stroke="${color}" stroke-width="7"
              stroke-linecap="round" stroke-dasharray="${C}"
              stroke-dashoffset="${C * (1 - pct / 100)}" transform="rotate(-90 36 36)" />
            <text x="36" y="41" text-anchor="middle" font-size="16" fill="var(--primary-text-color)">${Math.round(
              score,
            )}</text>`}
        </svg>
        <div>
          <div class="label">Water quality score</div>
          <div>${st.attributes.friendly_name ?? "Score"}</div>
        </div>
      </div>
    `;
  }

  private _renderGauge(key: "ph" | "orp" | "chlorine" | "tds" | "ec"): TemplateResult | typeof nothing {
    const st = this._state(key);
    if (!st || isNaN(Number(st.state))) return nothing;
    const value = Number(st.state);
    const band = WATER_BANDS[key];
    const unit = st.attributes.unit_of_measurement ?? band?.unit ?? "";
    const min = band?.min ?? 0;
    const max = band?.max ?? 100;
    const frac = Math.max(0, Math.min(1, (value - min) / (max - min || 1)));

    let color = "var(--success-color, #43a047)";
    if (band) {
      if (value < band.warn[0] || value > band.warn[1]) color = "var(--error-color, #db4437)";
      else if (value < band.good[0] || value > band.good[1]) color = "var(--warning-color, #ffa600)";
    }

    // Simple 180° arc gauge.
    const cx = 38;
    const cy = 40;
    const r = 30;
    const a = Math.PI * (1 - frac);
    const x = cx + r * Math.cos(a);
    const y = cy - r * Math.sin(a);

    return html`
      <div class="gauge" @click=${() => this._moreInfo(key)} style="cursor:pointer">
        <svg viewBox="0 0 76 46">
          ${svg`
            <path d="M8 40 A30 30 0 0 1 68 40" fill="none" stroke="var(--divider-color)" stroke-width="6" stroke-linecap="round"/>
            <path d="M8 40 A30 30 0 0 1 ${x} ${y}" fill="none" stroke="${color}" stroke-width="6" stroke-linecap="round"/>`}
        </svg>
        <div class="val">${value}</div>
        <div class="unit">${GAUGE_LABEL[key]}${unit ? ` · ${unit}` : ""}</div>
      </div>
    `;
  }

  private _renderMeta(): TemplateResult | typeof nothing {
    const temp = this._state("temperature");
    const sample = this._state("sample_time");
    if (!temp && !sample) return nothing;
    const tempText = temp ? `${temp.state}${temp.attributes.unit_of_measurement ?? ""}` : "";
    const sampleText = sample ? this._rel(String(sample.state)) : "";
    return html`
      <div class="row wrap" style="color: var(--secondary-text-color); font-size: 0.8rem">
        ${temp
          ? html`<span class="meta" @click=${() => this._moreInfo("temperature")}>
              <ha-icon icon="mdi:thermometer"></ha-icon><span>${tempText}</span>
            </span>`
          : nothing}
        ${sample
          ? html`<span class="meta" @click=${() => this._moreInfo("sample_time")}>
              <ha-icon icon="mdi:clock-outline"></ha-icon><span>${sampleText}</span>
            </span>`
          : nothing}
      </div>
    `;
  }

  private _rel(iso: string): string {
    const t = Date.parse(iso);
    if (isNaN(t)) return iso;
    const secs = Math.round((Date.now() - t) / 1000);
    if (secs < 90) return "just now";
    if (secs < 5400) return `${Math.round(secs / 60)} min ago`;
    if (secs < 172800) return `${Math.round(secs / 3600)} h ago`;
    return `${Math.round(secs / 86400)} d ago`;
  }
}

(window as any).customCards = (window as any).customCards || [];
(window as any).customCards.push({
  type: MONITOR_CARD,
  name: "Aiper Water Quality Card",
  description: "pH, ORP, chlorine and score gauges for an Aiper HydroComm monitor.",
  preview: true,
  documentationURL: "https://github.com/kmich/ha-aiper-card",
});

declare global {
  interface HTMLElementTagNameMap {
    [MONITOR_CARD]: AiperMonitorCard;
  }
}
