export class TimedCache {
  #length: number;
  #appCache: Map<string, any>;

  constructor(length: number = 100) {
    this.#length = length;
    this.#appCache = new Map();
  }

  set(k: string, v: any, length: number = 10) {
    if (!this.#appCache.has(k)) {
      if (this.#appCache.size >= this.#length) {
        this.#appCache.delete(this.#appCache.keys().next().value);
      }
      this.#appCache.set(k, {
        timestamp: new Date().getTime(),
        value: v,
        length,
      });
      return true;
    }
    return false;
  }

  get(
    k: string,
    defaultValue: any = null,
    setIfNotExist = false,
    length: number = 10
  ) {
    if (this.#appCache.has(k)) return this.#appCache.get(k).value;
    if (setIfNotExist && defaultValue !== null)
      this.set(k, defaultValue, length);
    return defaultValue || null;
  }

  has(k: string) {
    if (this.#appCache.has(k)) {
      const resp = this.#appCache.get(k);
      if (new Date().getTime() - resp.length * 1000 > resp.timestamp) {
        this.#appCache.delete(k);
        return false;
      }
      return true;
    }
    return false;
  }

  delete(k: string) {
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

  forEach(callback: (value: any, key: string, map: Map<string, any>) => void) {
	this.#appCache.forEach(callback);
  }

  [Symbol.iterator]() {
	return this.#appCache[Symbol.iterator]();
  }

  [Symbol.toStringTag]() {
	return this.#appCache[Symbol.toStringTag];
  }

  ttl(k: string) {
	if (this.#appCache.has(k)) {
	  const resp = this.#appCache.get(k);
	  return resp.timestamp + resp.length * 1000 - new Date().getTime();
	}
	return -1;
  }
}
