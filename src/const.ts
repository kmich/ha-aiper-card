/** Shared constants and lookup tables for the Aiper Lovelace cards. */

// Bumped by the release workflow; keep in sync with package.json.
export const CARD_VERSION = "0.1.0";

export const CLEANER_CARD = "aiper-cleaner-card";
export const MONITOR_CARD = "aiper-monitor-card";
export const EDITOR_TAG = "aiper-card-editor";

/** The domain the companion integration registers devices under. */
export const AIPER_DOMAIN = "aiper";

/**
 * Entity-key -> icon/colour hints for the cleaner status sensor. The integration
 * reports a free-text status ("Cleaning", "Returning", "Charging", ...); these
 * map the known labels to a presentation. Unknown labels fall back to a neutral
 * look, so a new firmware string still renders sensibly.
 */
export interface StatusPresentation {
  icon: string;
  color: string;
  /** True when the robot is doing work; drives the pulsing animation. */
  active?: boolean;
}

export const STATUS_PRESENTATION: Record<string, StatusPresentation> = {
  idle: { icon: "mdi:robot-vacuum", color: "var(--disabled-text-color)" },
  cleaning: { icon: "mdi:robot-vacuum", color: "var(--info-color, #039be5)", active: true },
  returning: { icon: "mdi:home-import-outline", color: "var(--info-color, #039be5)", active: true },
  charging: { icon: "mdi:battery-charging", color: "var(--success-color, #43a047)" },
  charged: { icon: "mdi:battery", color: "var(--success-color, #43a047)" },
  error: { icon: "mdi:robot-vacuum-alert", color: "var(--error-color, #db4437)" },
  sleeping: { icon: "mdi:sleep", color: "var(--disabled-text-color)" },
};

export const DEFAULT_STATUS_PRESENTATION: StatusPresentation = {
  icon: "mdi:robot-vacuum",
  color: "var(--primary-text-color)",
};

export const MODE_ICONS: Record<string, string> = {
  smart: "mdi:auto-fix",
  auto: "mdi:auto-fix",
  floor: "mdi:screen-rotation",
  wall: "mdi:wall",
  waterline: "mdi:waves",
  scheduled: "mdi:calendar-clock",
};

export const CLEAN_PATH_ICONS: Record<string, string> = {
  "s-shaped": "mdi:sine-wave",
  adaptive: "mdi:map-marker-path",
};

/**
 * Entity-key suffixes used by the integration, keyed by the logical slot the
 * cards care about. Values are matched against the tail of a device's
 * `unique_id` (`<serial>_<key>`), falling back to an `entity_id` suffix match.
 */
export const CLEANER_ENTITY_KEYS = {
  status: "status",
  battery: "battery",
  mode: "mode",
  warning: "warning",
  online: "online",
  charging: "charging",
  solar_charging: "solar_charging",
  in_water: "in_water",
  running_switch: "running",
  wifi: "wifi",
  runtime: "runtime",
  mode_select: "mode_selection",
  clean_path_select: "clean_path",
  refresh_shadow: "refresh_shadow",
  refresh_metadata: "refresh_metadata",
  roller_brush: "roller_brush",
  micromesh_filter: "micromesh_filter",
  caterpillar_tread: "caterpillar_tread",
  propeller: "propeller",
} as const;

/** Extra `entity_id` suffixes for the non-admin fallback path, where the visible
 * entity id differs from the `unique_id` key (the integration derives it from the
 * entity's display name). */
export const CLEANER_ENTITY_ID_HINTS: Record<string, string[]> = {
  mode_select: ["cleaning_mode"],
  wifi: ["wifi_connected"],
};

export const MONITOR_ENTITY_ID_HINTS: Record<string, string[]> = {
  chlorine: ["free_chlorine"],
  score: ["water_quality_score"],
  result: ["water_quality_result"],
  temperature: ["water_temperature"],
  sample_time: ["water_sample_time"],
};

/** Domain hint per slot, used to disambiguate slots whose `unique_id` tail is
 * shared across platforms (e.g. `binary_sensor` + `switch` both `<sn>_running`). */
export const CLEANER_ENTITY_DOMAINS: Record<string, string> = {
  running_switch: "switch",
  mode_select: "select",
  clean_path_select: "select",
  refresh_shadow: "button",
  refresh_metadata: "button",
  status: "sensor",
  battery: "sensor",
  mode: "sensor",
  warning: "sensor",
  online: "binary_sensor",
  charging: "binary_sensor",
  solar_charging: "binary_sensor",
  in_water: "binary_sensor",
  wifi: "binary_sensor",
};

export const MONITOR_ENTITY_KEYS = {
  ph: "ph",
  orp: "orp",
  ec: "ec",
  tds: "tds",
  chlorine: "rcl",
  score: "water_quality_score",
  result: "water_quality_result",
  temperature: "temperature",
  warning: "warning",
  online: "online",
  sample_time: "wqs_sample_time",
} as const;

/** Nominal "healthy" bands for the water-chemistry gauges. */
export interface GaugeBand {
  min: number;
  max: number;
  unit: string;
  good: [number, number];
  warn: [number, number];
}

export const WATER_BANDS: Record<string, GaugeBand> = {
  ph: { min: 6.2, max: 8.4, unit: "", good: [7.2, 7.6], warn: [7.0, 7.8] },
  orp: { min: 400, max: 900, unit: "mV", good: [650, 750], warn: [600, 800] },
  chlorine: { min: 0, max: 5, unit: "mg/L", good: [1, 3], warn: [0.5, 4] },
  tds: { min: 0, max: 2000, unit: "ppm", good: [0, 1000], warn: [0, 1500] },
  ec: { min: 0, max: 3000, unit: "µS/cm", good: [0, 1500], warn: [0, 2200] },
};
