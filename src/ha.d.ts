import "custom-card-helpers";

/**
 * `custom-card-helpers` ships a slightly stale `HomeAssistant` type that predates
 * the frontend exposing the device and entity registries on the `hass` object.
 * Both have been present for years; augment the type so the cards can use them
 * without casting.
 */
declare module "custom-card-helpers" {
  interface DeviceRegistryEntry {
    id: string;
    name: string | null;
    name_by_user?: string | null;
    model?: string | null;
    manufacturer?: string | null;
    identifiers: Array<[string, string]>;
    config_entries?: string[];
  }

  interface EntityRegistryDisplayEntry {
    entity_id: string;
    device_id?: string | null;
    platform?: string;
    translation_key?: string;
  }

  interface HomeAssistant {
    devices: Record<string, DeviceRegistryEntry>;
    entities: Record<string, EntityRegistryDisplayEntry>;
  }
}
