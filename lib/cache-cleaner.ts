/**
 * Stale Build Cache and Service Worker Cleanup Utility
 */

export interface CacheCleanupResult {
  cachesDeleted: number;
  storageCleaned: boolean;
  serviceWorkersUnregistered: number;
  timestamp: string;
}

const BUILD_ID_KEY = "devhub_build_id";
export const CURRENT_BUILD_VERSION = "2026.09.v2";

export async function clearStaleBuildCache(force: boolean = false): Promise<CacheCleanupResult> {
  let cachesDeleted = 0;
  let serviceWorkersUnregistered = 0;

  try {
    // 1. Clear CacheStorage
    if (typeof window !== "undefined" && "caches" in window) {
      const keys = await window.caches.keys();
      for (const key of keys) {
        await window.caches.delete(key);
        cachesDeleted++;
      }
    }

    // 2. Unregister Service Workers if present
    if (typeof window !== "undefined" && "serviceWorker" in navigator) {
      const registrations = await navigator.serviceWorker.getRegistrations();
      for (const reg of registrations) {
        await reg.unregister();
        serviceWorkersUnregistered++;
      }
    }

    // 3. Clean sessionStorage and stale items in localStorage
    if (typeof window !== "undefined") {
      try {
        sessionStorage.clear();
        
        // Preserve theme preference
        const currentTheme = localStorage.getItem("devhub-theme");
        
        if (force) {
          localStorage.clear();
          if (currentTheme) {
            localStorage.setItem("devhub-theme", currentTheme);
          }
        } else {
          // Remove keys other than user theme preference
          for (let i = localStorage.length - 1; i >= 0; i--) {
            const key = localStorage.key(i);
            if (key && key !== "devhub-theme" && key !== BUILD_ID_KEY) {
              localStorage.removeItem(key);
            }
          }
        }

        localStorage.setItem(BUILD_ID_KEY, CURRENT_BUILD_VERSION);
      } catch (err) {
        console.warn("Storage cleanup notice:", err);
      }
    }
  } catch (error) {
    console.error("Cache purge exception:", error);
  }

  return {
    cachesDeleted,
    storageCleaned: true,
    serviceWorkersUnregistered,
    timestamp: new Date().toISOString(),
  };
}

export function verifyBuildFreshness(): boolean {
  if (typeof window === "undefined") return true;
  try {
    const saved = localStorage.getItem(BUILD_ID_KEY);
    if (!saved || saved !== CURRENT_BUILD_VERSION) {
      clearStaleBuildCache(false);
      return false;
    }
  } catch {
    // Ignore storage restrictions
  }
  return true;
}
