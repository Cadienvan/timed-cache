# What is this?
A simple in-memory time-based cache for both objects and function execution.

# How do I install it?
You can install it by using the following command:
```bash
npm install @cadienvan/timed-cache
```

# Why did you build it?
I needed a simple cache for a function that was being called repeatedly with the same arguments. I wanted to cache the results for a certain amount of time, and then re-run the function when the cache expired.

# How can I use it?
You can import and instance a new TimedCache object as follows:
  
  ```js
  import { TimedCache } from "../dist/index.js";
  const cache = new TimedCache();
  ```
Look at the `demo` folder in the GitHub Repository in order to have some proofs of concept considering both synchronous and asynchronous functions.  

# Does it support async functions?
Yes, it does. You can use it with both synchronous and asynchronous functions.  
Look at the `demo` folder in the GitHub Repository for an example.

# Which parameters are available?
You can pass a parameter to the TimedCache, which defines the amount of items the cache can contain. If you don't pass any parameter, the cache will contain 100 elements.  
As soon as a new element is added to the cache, the oldest one will be removed.

# How can I add an element to the cache?
You can add an element to the cache by using the `set` method.
    
    ```js
    cache.set("key", "value");
    ```

# How can I retrieve an element from the cache?
You can retrieve an element from the cache by using the `get` method.
    
    ```js
    cache.get("key");
    ```

# How can I remove an element from the cache?
You can remove an element from the cache by using the `delete` method.
    
    ```js
    cache.delete("key");
    ```

# How can I clear the cache?
You can clear the cache by using the `clear` method.
    
    ```js
    cache.clear();
    ```

# How can I get the size of the cache?
You can get the size of the cache by using the `size` property.
    
    ```js
    cache.size;
    ```

# How can I get the keys of the cache?
You can get the keys of the cache by using the `keys` method.
    
    ```js
    cache.keys();
    ```

# How can I get the values of the cache?
You can get the values of the cache by using the `values` method.
    
    ```js
    cache.values();
    ```

# How can I get the entries of the cache?
You can get the entries ([key, value] pairs) of the cache by using the `entries` method.
    
    ```js
    cache.entries();
    ```

# How can I iterate over the cache?
You can iterate over the cache by using the `forEach` method.
    
    ```js
    cache.forEach((value, key) => {
      console.log(key, value);
    });
    ```

# How can I check if an element is in the cache?
You can check if an element is in the cache by using the `has` method.
    
    ```js
    cache.has("key");
    ```

# How can I get the time to live of an element?
You can get the time to live of an element by using the `ttl` method.
    
    ```js
    cache.ttl("key");
    ```

# How does it work under the hood?
The cache is a simple object that stores the results of a function call in memory leveraging the `Map` constructor.  
The cache is time-based, so the results are only valid for a certain amount of time. If the cache expires, the wrapped object / functions is re-run and the results are cached again.