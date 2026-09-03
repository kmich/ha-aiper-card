# Changelog

All notable changes to this project are documented here. Versions follow the
tags published on [GitHub Releases](https://github.com/kmich/ha-aiper-card/releases).

## [0.1.1] - 2026-09-03

### Fixed
- Non-admin viewers: added `entity_id` fallback hints so `chlorine`, cleaning
  mode, `wifi`, and the HydroComm `water_*` slots still resolve when the entity
  registry is not readable (the fallback previously only matched the
  `unique_id` key, which differs from the visible entity id for those slots).

## [0.1.0] - 2026-09-03

### Added
- **Aiper Cleaner Card** (`custom:aiper-cleaner-card`): status + battery,
  online / in-water / solar / wifi pills, warning banner, cleaning-mode and
  clean-path chips, Surfer start/stop switch, consumable wear bars, force-sync
  (shadow / metadata) buttons.
- **Aiper Water Quality Card** (`custom:aiper-monitor-card`): water-quality
  score ring, pH / ORP / chlorine / TDS / EC arc gauges with healthy/warning
  bands, water temperature, sample age, alarm banner.
- Shared visual editor with an Aiper device picker.
- Device-driven entity resolution: card override → `unique_id` tail match
  (`<serial>_<key>`, rename-proof) → `entity_id` suffix match.
- Theme-aware styling (light and dark) via Home Assistant CSS tokens.
