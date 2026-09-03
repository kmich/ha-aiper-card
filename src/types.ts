import type { LovelaceCardConfig } from "custom-card-helpers";

/**
 * Explicit entity overrides. Every field is optional: whatever the card cannot
 * find by auto-detection from `device` can be pinned here, and anything set here
 * wins over auto-detection.
 */
export type EntityOverrides = Record<string, string>;

export interface AiperCleanerCardConfig extends LovelaceCardConfig {
  type: string;
  /** Device id of the Aiper cleaner (from the integration). Preferred. */
  device?: string;
  /** Fallback: the status sensor entity id; the rest is derived from its device. */
  entity?: string;
  /** Optional display name; defaults to the device name. */
  name?: string;
  /** Header image URL. Defaults to the integration-provided device picture. */
  image?: string;
  /** Show the mode selector row (default true). */
  show_mode?: boolean;
  /** Show the clean-path selector row (default true when the entity exists). */
  show_clean_path?: boolean;
  /** Show the consumable wear bars (default true when any entity exists). */
  show_consumables?: boolean;
  /** Show the footer with refresh buttons + last-update text (default true). */
  show_footer?: boolean;
  /** Compact layout: hides the header image. */
  compact?: boolean;
  entities?: EntityOverrides;
}

export interface AiperMonitorCardConfig extends LovelaceCardConfig {
  type: string;
  device?: string;
  entity?: string;
  name?: string;
  /** Which chemistry gauges to render, in order. */
  gauges?: Array<"ph" | "orp" | "chlorine" | "tds" | "ec">;
  /** Show the overall water-quality score ring (default true). */
  show_score?: boolean;
  /** Show water temperature + sample time (default true). */
  show_meta?: boolean;
  entities?: EntityOverrides;
}

export interface ResolvedEntities {
  /** logical slot -> entity_id */
  map: Record<string, string>;
  /** Aiper serial number, when it could be determined from the device. */
  serial?: string;
  /** Device name from the registry, when available. */
  deviceName?: string;
}
