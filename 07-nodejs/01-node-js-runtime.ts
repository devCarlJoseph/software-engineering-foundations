/*
  ==============================================================================
  W3SCHOOLS-STYLE LEARNING GUIDE: Node.js Runtime
  ==============================================================================

  1. WHAT IS THE NODE.JS RUNTIME?
     Node.js is an open-source, cross-platform JavaScript runtime environment
     that executes JavaScript code outside a web browser (on the server or local machine).
     It combines Google Chrome's V8 JavaScript engine with Libuv (a C library
     for asynchronous I/O) and core Node.js built-in APIs.

  2. REAL-LIFE ANALOGY:
     A Restaurant Waiter & Kitchen:
     - JavaScript Engine (V8): The single waiter taking orders.
     - Libuv (Thread Pool): The kitchen cooks and dishwasher in the back.
     - The waiter does not stand still waiting for food to cook. He hands
       the ticket to the kitchen, moves on to take the next customer's order,
       and only brings the dish out when the kitchen signals it is ready!

  3. JARGON BUSTER:
     - Runtime Environment: The complete platform providing memory, libraries,
       and execution engine to run a program.
     - V8 Engine: Google's C++ engine that compiles JavaScript directly into native machine code.
     - Libuv: The C library that gives Node.js its event loop, non-blocking I/O,
       and thread pool for background tasks.
     - Single-Threaded: Node.js executes JavaScript on one main thread.
     - Event-Driven / Non-Blocking: Operations (like reading a file or making a network request)
       are delegated, so the main thread never freezes while waiting.
*/

// =============================================================================
// BAD PRACTICE: BLOCKING / SYNCHRONOUS TRAP
// =============================================================================
/*
  // Running a heavy CPU synchronous loop on the main thread freezes the entire server!
  // No other user or request can be served while this runs:
  function freezeServer() {
    const start = Date.now();
    while (Date.now() - start < 5000) {
      // 5-second complete lockout for all incoming connections
    }
  }
*/

// =============================================================================
// GOOD PRACTICE: UNDERSTANDING RUNTIME GLOBALS & NON-BLOCKING EXECUTION
// =============================================================================

// 1. Runtime inspection using the global `process` object
console.log("=== Node.js Runtime Info ===");
console.log("Node Version:       ", process.version);
console.log("Platform (OS):      ", process.platform);
console.log("Process ID (PID):   ", process.pid);
console.log("Current Directory:  ", process.cwd());

// 2. Memory usage inspection
const memoryUsage = process.memoryUsage();
console.log("\n=== Memory Footprint ===");
console.log("Heap Used:          ", `${(memoryUsage.heapUsed / 1024 / 1024).toFixed(2)} MB`);
console.log("Heap Total:         ", `${(memoryUsage.heapTotal / 1024 / 1024).toFixed(2)} MB`);

// 3. Demonstrating Non-Blocking Event-Driven Flow
console.log("\n=== Event-Driven Runtime Demo ===");
console.log("[1] Start synchronous script execution");

// Scheduled for next tick / macrotask queue via Libuv
setTimeout(() => {
  console.log("[3] Async timer finished! Executed by the Event Loop.");
}, 100);

console.log("[2] End of synchronous script execution");

/*
  ------------------------------------------------------------------------------
  [EXPECTED OUTPUT IN TERMINAL]
  ------------------------------------------------------------------------------
  === Node.js Runtime Info ===
  Node Version:        v20.x.x (or your installed version)
  Platform (OS):       win32
  Process ID (PID):    <number>
  Current Directory:   d:\Carl Files\software-engineer-foundations\07-nodejs

  === Memory Footprint ===
  Heap Used:           <number> MB
  Heap Total:          <number> MB

  === Event-Driven Runtime Demo ===
  [1] Start synchronous script execution
  [2] End of synchronous script execution
  [3] Async timer finished! Executed by the Event Loop.
*/

// =============================================================================
// BEHIND THE SCENES
// =============================================================================
/*
  HOW NODE.JS EXECUTES CODE:

  ┌─────────────────────────────────────────────────────────┐
  │                    JavaScript Code                      │
  └───────────────────────────┬─────────────────────────────┘
                              ▼
  ┌─────────────────────────────────────────────────────────┐
  │             V8 Engine (Compiles JS to Machine Code)     │
  └───────────────────────────┬─────────────────────────────┘
                              ▼
  ┌─────────────────────────────────────────────────────────┐
  │               Node.js Bindings & APIs                   │
  └───────────────────────────┬─────────────────────────────┘
                              ▼
  ┌─────────────────────────────────────────────────────────┐
  │         Libuv (Event Loop + Worker Thread Pool)         │
  └─────────────────────────────────────────────────────────┘

  - Notice how "[2] End of synchronous script execution" printed BEFORE "[3]".
  - The runtime registers the timer with Libuv and immediately moves on.
  - When the synchronous code finishes and call stack clears, the Event Loop picks
    up the timer callback and executes it.
*/