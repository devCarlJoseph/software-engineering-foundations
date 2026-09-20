/*
  ==============================================================================
  W3SCHOOLS-STYLE LEARNING GUIDE: Async / Await
  ==============================================================================

  1. WHAT IS ASYNC / AWAIT?
     `async` and `await` is modern syntactic sugar on top of Promises (introduced in ES2017).
     It allows you to write asynchronous code that LOOKS and READS like simple,
     top-to-bottom synchronous code.

  2. REAL-LIFE ANALOGY:
     Waiting at a Drive-Thru:
     - `async`: Declares that this restaurant lane supports drive-thru orders.
     - `await`: The car pauses at the window until the bag is handed over, then drives off.
       The car behind pauses too, but the rest of the highway keeps moving!

  3. JARGON BUSTER:
     - async keyword: Placed before a function. Guarantees that the function ALWAYS returns a Promise.
     - await keyword: Can ONLY be used inside an `async` function. Pauses execution of that
       function until the Promise resolves, then unpacks the value directly!
     - Syntactic Sugar: Syntax designed to make code easier to read without changing how
       it works underneath.
*/

// =============================================================================
// STEP 1: HELPER ASYNC FUNCTION RETURNING A PROMISE
// =============================================================================

function fetchDatabaseConfig() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ host: "db.production.internal", port: 5432 });
    }, 400);
  });
}

function connectToDatabase(config) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(`Connected to PostgreSQL on ${config.host}:${config.port}`);
    }, 400);
  });
}

// =============================================================================
// STEP 2: CONSUMING WITH ASYNC / AWAIT
// =============================================================================

async function initializeBackendServer() {
  console.log("1. Booting application server...");

  // 'await' unpacks the resolved value directly into variables!
  // No .then() callbacks needed!
  const config = await fetchDatabaseConfig();
  console.log("2. Configuration loaded:", config.host);

  const connectionStatus = await connectToDatabase(config);
  console.log("3. Status:", connectionStatus);

  return "Server Initialization Complete (HTTP 200)";
}

// Calling the async function:
initializeBackendServer().then((finalMessage) => {
  console.log("4. Final Result:", finalMessage);
});

/*
  ------------------------------------------------------------------------------
  [EXPECTED OUTPUT IN TERMINAL]
  ------------------------------------------------------------------------------
  1. Booting application server...
  2. Configuration loaded: db.production.internal
  3. Status: Connected to PostgreSQL on db.production.internal:5432
  4. Final Result: Server Initialization Complete (HTTP 200)
*/