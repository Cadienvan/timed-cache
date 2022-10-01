/**
 * Just a proof of concept.
 * Can't really find a reason to time cache a primitive like a string.
 */
import { TimedCache } from "../dist/index.js";

const timedCacheSingleton = new TimedCache();

timedCacheSingleton.set("test", "test", 5);

setInterval(() => {
  console.log(
    "Test",
    timedCacheSingleton.has("test"),
    timedCacheSingleton.ttl("test")
  );
  console.log("----");
}, 1000);
