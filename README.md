# segfault-node-14
Reproduction of a segfault in Node 14 using worker_threads, `transferList` and `unref`.

## Reproduction
```
node index.js
```

## Observations
1. If I don't provide the second argument to `postMessage`, the `transferList`, it doesn't crash.
2. If I don't call `unref` on the worker, it also doens't crash.
