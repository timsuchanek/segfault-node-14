# segfault-node-14
Reproduction of a segfault in Node 14 using `worker_threads`, `transferList` and `worker.unref`.

## Reproduction
```
node index.js
```

## Output in my terminal
```bash
c3f5abe3e11d87d645b9e9fda1bad6a8d2f9e54f7e81478138ac134ba7ac7280
fish: 'node index.js' terminated by signal SIGSEGV (Address boundary error)
```

## lldb backtrace
```
Process 40610 stopped
* thread #1, queue = 'com.apple.main-thread', stop reason = EXC_BAD_ACCESS (code=1, address=0x20)
    frame #0: 0x000000010007b095 node`node::Buffer::New(node::Environment*, char*, unsigned long, bool)::$_2::__invoke(void*, unsigned long, void*) + 21
node`node::Buffer::New(node::Environment*, char*, unsigned long, bool)::$_2::__invoke(void*, unsigned long, void*):
->  0x10007b095 <+21>: movq   0x20(%rcx), %rcx
    0x10007b099 <+25>: movq   %rax, %rdi
    0x10007b09c <+28>: popq   %rbp
    0x10007b09d <+29>: jmpq   *%rcx
Target 0: (node) stopped.
```

## Observations
1. If I don't provide the second argument to `postMessage`, the `transferList`, it doesn't crash.
2. If I don't call `unref` on the worker, it also doens't crash.
3. This works fine in Node 13 and lower.
