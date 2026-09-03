import { fireEvent, type HomeAssistant, type LovelaceCardEditor } from "custom-card-helpers";
import { LitElement, html, nothing, type TemplateResult } from "lit";
import { customElement, property, state } from "lit/decorators.js";

import { AIPER_DOMAIN, EDITOR_TAG, MONITOR_CARD } from "./const";
import type { AiperCleanerCardConfig, AiperMonitorCardConfig } from "./types";

type AnyConfig = AiperCleanerCardConfig & AiperMonitorCardConfig;

@customElement(EDITOR_TAG)
export class AiperCardEditor extends LitElement implements LovelaceCardEditor {
  @property({ attribute: false }) public hass?: HomeAssistant;
  @state() private _config?: AnyConfig;

  public setConfig(config: AnyConfig): void {
    this._config = config;
  }

  private get _isMonitor(): boolean {
    return (this._config?.type ?? "").includes(MONITOR_CARD);
  }

  private _schema() {
    const common = [
      {
        name: "device",
        selector: { device: { integration: AIPER_DOMAIN } },
      },
      { name: "name", selector: { text: {} } },
    ];
    if (this._isMonitor) {
      return [
        ...common,
        {
          name: "gauges",
          selector: {
            select: {
              multiple: true,
              mode: "list",
              options: [
                { value: "ph", label: "pH" },
                { value: "orp", label: "ORP" },
                { value: "chlorine", label: "Chlorine" },
                { value: "tds", label: "TDS" },
                { value: "ec", label: "EC" },
              ],
            },
          },
        },
        {
          type: "grid",
          schema: [
            { name: "show_score", selector: { boolean: {} } },
            { name: "show_meta", selector: { boolean: {} } },
          ],
        },
      ];
    }
    return [
      ...common,
      { name: "image", selector: { text: {} } },
      {
        type: "grid",
        schema: [
          { name: "show_mode", selector: { boolean: {} } },
          { name: "show_clean_path", selector: { boolean: {} } },
          { name: "show_consumables", selector: { boolean: {} } },
          { name: "show_footer", selector: { boolean: {} } },
          { name: "compact", selector: { boolean: {} } },
        ],
      },
    ];
  }

  private _computeLabel = (schema: { name: string }): string => {
    const labels: Record<string, string> = {
      device: "Aiper device",
      name: "Name (optional)",
      image: "Header image URL (optional)",
      gauges: "Chemistry gauges",
      show_mode: "Show mode selector",
      show_clean_path: "Show clean-path selector",
      show_consumables: "Show consumable wear",
      show_footer: "Show footer",
      show_score: "Show score ring",
      show_meta: "Show temperature / sample time",
      compact: "Compact (hide header image)",
    };
    return labels[schema.name] ?? schema.name;
  };

  private _valueChanged(ev: CustomEvent): void {
    if (!this._config) return;
    fireEvent(this, "config-changed", { config: { ...this._config, ...ev.detail.value } });
  }

  protected render(): TemplateResult | typeof nothing {
    if (!this.hass || !this._config) return nothing;
    return html`
      <ha-form
        .hass=${this.hass}
        .data=${this._config}
        .schema=${this._schema()}
        .computeLabel=${this._computeLabel}
        @value-changed=${this._valueChanged}
      ></ha-form>
      <p style="color:var(--secondary-text-color);font-size:.8rem;margin:.5em 4px 0">
        Advanced per-entity overrides can be set with an <code>entities:</code> map in YAML.
      </p>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    [EDITOR_TAG]: AiperCardEditor;
  }
}
