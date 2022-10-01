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
const timedCacheAsync = async (f, key, length) => {
  key = key || keyGenerator(f.toString());
  if (timedCacheSingleton.has(key)) {
    return timedCacheSingleton.get(key);
  } else return timedCacheSingleton.get(key, await f(), true, length);
};

const asyncFn = async () =>
  new Promise((res, rej) => {
    setTimeout(() => {
      res("test");
    }, 1500);
  });

timedCacheAsync(asyncFn, "test", 5);

setInterval(() => {
  console.log(
    "asyncFn in cache? ",
    timedCacheSingleton.has("test"),
    "for how long? ",
    timedCacheSingleton.ttl("test")
  );
  if (!timedCacheSingleton.has("test")) {
    console.log("Adding test back into cache again...");
    timedCacheAsync(asyncFn, "test", 5);
  }
  console.log("----");
}, 1000);
