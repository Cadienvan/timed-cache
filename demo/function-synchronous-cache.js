import { TimedCache } from "../dist/index.js";

const timedCacheSingleton = new TimedCache();

// For simplicity, I built a keyGenerator which takes the function as a string and hashes it.
const keyGenerator = (s) => {
  return s.split("").reduce(function (a, b) {
    a = (a << 5) - a + b.charCodeAt(0);
    return a & a;
  }, 0);
};

// A simple function which verifies if the cache has the key, if not, it will set the value by running the function.
const timedCache = (fn, key, length) => {
  key = key || keyGenerator(fn.toString());
  if (timedCacheSingleton.has(key)) return timedCacheSingleton.get(key);
  else return timedCacheSingleton.get(key, fn(), true, length);
};

const syncFn = () => "test";

timedCache(syncFn, "test", 5);

setInterval(() => {
  console.log(
    "syncFn in cache? ",
    timedCacheSingleton.has("test"),
    "for how long? ",
    timedCacheSingleton.ttl("test")
  );
  if (!timedCacheSingleton.has("test")) {
    console.log("Adding test back into cache again...");
    timedCache(syncFn, "test", 5);
  }
  console.log("----");
}, 1000);
