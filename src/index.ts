type AppCacheEntry<Value> = {
  timestamp: number;
  value: Value;
  length: number;
};

type AppCache<Key, Value> = Map<Key, AppCacheEntry<Value>>;

export class TimedCache<Key = any, Value = unknown> {
  #length: number;
  #appCache: AppCache<Key, Value>;

  constructor(length = 100) {
    this.#length = length;
    this.#appCache = new Map();
  }

  set(k: Key, v: Value, length = 10) {
    if (!this.#appCache.has(k)) {
      if (this.#appCache.size >= this.#length) {
        this.#appCache.delete(this.#appCache.keys().next().value);
      }
      this.#appCache.set(k, {
        timestamp: new Date().getTime(),
        value: v,
        length
      });
      return true;
    }
    return false;
  }

  get(k: Key, defaultValue?: Value, setIfNotExist = false, length = 10) {
    if (this.#appCache.has(k))
      return (this.#appCache.get(k) as AppCacheEntry<Value>).value;
    if (setIfNotExist && typeof defaultValue !== 'undefined')
      this.set(k, defaultValue, length);
    return defaultValue || null;
  }

  has(k: Key) {
    if (this.#appCache.has(k)) {
      const resp = this.#appCache.get(k) as AppCacheEntry<Value>;
      if (new Date().getTime() - resp.length * 1000 > resp.timestamp) {
        this.#appCache.delete(k);
        return false;
      }
      return true;
    }
    return false;
  }

  delete(k: Key) {
    return this.#appCache.delete(k);
  }

  clear() {
    this.#appCache.clear();
  }

  get size() {
    return this.#appCache.size;
  }

  entries() {
    return this.#appCache.entries();
  }

  keys() {
    return this.#appCache.keys();
  }

  values() {
    return this.#appCache.values();
  }

  forEach(
    callback: (
      value: AppCacheEntry<Value>,
      key: Key,
      map: AppCache<Key, Value>
    ) => void
  ) {
    this.#appCache.forEach(callback);
  }

  [Symbol.iterator]() {
    return this.#appCache[Symbol.iterator]();
  }

  [Symbol.toStringTag]() {
    return this.#appCache[Symbol.toStringTag];
  }

  ttl(k: Key) {
    if (this.#appCache.has(k)) {
      const resp = this.#appCache.get(k) as AppCacheEntry<Value>;
      return resp.timestamp + resp.length * 1000 - new Date().getTime();
    }
    return -1;
  }
}
