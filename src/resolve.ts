import type { HomeAssistant } from "custom-card-helpers";

import { AIPER_DOMAIN } from "./const";
import type { EntityOverrides, ResolvedEntities } from "./types";

interface RegistryEntry {
  entity_id: string;
  device_id: string | null;
  platform: string;
  unique_id?: string;
}

let registryCache: { ts: number; entries: RegistryEntry[] } | undefined;
const REGISTRY_TTL = 60_000;

async function getRegistry(hass: HomeAssistant): Promise<RegistryEntry[]> {
  const now = Date.now();
  if (registryCache && now - registryCache.ts < REGISTRY_TTL) {
    return registryCache.entries;
  }
  const entries = await hass.callWS<RegistryEntry[]>({ type: "config/entity_registry/list" });
  registryCache = { ts: now, entries };
  return entries;
}

/** Serial number for an Aiper device from its registry identifiers. */
export function serialForDevice(hass: HomeAssistant, deviceId?: string): string | undefined {
  if (!deviceId) return undefined;
  const device = hass.devices?.[deviceId];
  if (!device) return undefined;
  for (const ident of device.identifiers ?? []) {
    if (Array.isArray(ident) && ident[0] === AIPER_DOMAIN && ident[1]) {
      return String(ident[1]);
    }
  }
  return undefined;
}

/** Device id that owns a given entity id. */
export function deviceForEntity(hass: HomeAssistant, entityId?: string): string | undefined {
  if (!entityId) return undefined;
  return hass.entities?.[entityId]?.device_id ?? undefined;
}

/**
 * Resolve the card's logical slots (see *_ENTITY_KEYS) to concrete entity ids.
 *
 * Strategy, in order of preference:
 *  1. explicit `overrides` from card config
 *  2. `unique_id` tail match against `<serial>_<key>` (exact, rename-proof)
 *  3. `entity_id` suffix match `_<key>` scoped to the device
 */
export async function resolveEntities(
  hass: HomeAssistant,
  opts: {
    device?: string;
    anchorEntity?: string;
    keys: Record<string, string>;
    domains?: Record<string, string>;
    overrides?: EntityOverrides;
  },
): Promise<ResolvedEntities> {
  const deviceId = opts.device ?? deviceForEntity(hass, opts.anchorEntity);
  const serial = serialForDevice(hass, deviceId);
  const dev = deviceId ? hass.devices?.[deviceId] : undefined;
  const deviceName = dev?.name_by_user || dev?.name || undefined;

  const map: Record<string, string> = {};

  // 1. explicit overrides always win.
  for (const [slot, entityId] of Object.entries(opts.overrides ?? {})) {
    if (entityId && hass.states[entityId]) map[slot] = entityId;
  }

  const missing = Object.keys(opts.keys).filter((slot) => !map[slot]);
  if (missing.length === 0 || (!deviceId && !opts.anchorEntity)) {
    return { map, serial, deviceName };
  }

  let registry: RegistryEntry[] = [];
  try {
    registry = await getRegistry(hass);
  } catch {
    // Non-admin users cannot read the registry; fall back to entity_id matching
    // over hass.states below.
  }

  const deviceEntries = registry.filter((e) => deviceId && e.device_id === deviceId);

  for (const slot of missing) {
    const key = opts.keys[slot];
    const domain = opts.domains?.[slot];
    const domainOk = (id: string) => !domain || id.startsWith(`${domain}.`);

    // 2. unique_id tail match (respecting the domain hint).
    if (serial) {
      const wanted = `${serial}_${key}`;
      const hit = deviceEntries.find(
        (e) =>
          (e.unique_id === wanted || e.unique_id?.endsWith(`_${wanted}`)) && domainOk(e.entity_id),
      );
      if (hit && hass.states[hit.entity_id]) {
        map[slot] = hit.entity_id;
        continue;
      }
    }

    // 3. entity_id suffix match, scoped to the device when we know it.
    const pool =
      deviceEntries.length > 0 ? deviceEntries.map((e) => e.entity_id) : Object.keys(hass.states);
    const suffixHit = pool.find(
      (id) => id.endsWith(`_${key}`) && domainOk(id) && hass.states[id],
    );
    if (suffixHit) map[slot] = suffixHit;
  }

  return { map, serial, deviceName };
}
