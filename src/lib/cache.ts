/**
 * Lightweight Client-Side In-Memory Cache System with TTL (Time-to-Live).
 * Fast response cache for store dashboard products, categories, reports, and settings.
 */

interface CacheEntry<T> {
  data: T;
  expiry: number;
}

class MemoryCache {
  private cache = new Map<string, CacheEntry<any>>();

  /**
   * Set cache with TTL in milliseconds (default: 30 seconds).
   */
  set<T>(key: string, data: T, ttlMs: number = 30000): void {
    const expiry = Date.now() + ttlMs;
    this.cache.set(key, { data, expiry });
  }

  /**
   * Get cached data if valid and unexpired, otherwise returns null.
   */
  get<T>(key: string): T | null {
    const entry = this.cache.get(key);
    if (!entry) return null;

    if (Date.now() > entry.expiry) {
      this.cache.delete(key);
      return null;
    }

    return entry.data as T;
  }

  /**
   * Invalidate specific cache key or patterns.
   */
  invalidate(keyOrPattern?: string): void {
    if (!keyOrPattern) {
      this.cache.clear();
      return;
    }

    for (const key of this.cache.keys()) {
      if (key.includes(keyOrPattern)) {
        this.cache.delete(key);
      }
    }
  }
}

export const apiCache = new MemoryCache();
