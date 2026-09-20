/*
  ==============================================================================
  W3SCHOOLS-STYLE LEARNING GUIDE: Promise Chaining
  ==============================================================================

  1. WHAT IS PROMISE CHAINING?
     Promise chaining is executing a sequence of asynchronous steps in order.
     Each `.then()` returns a NEW Promise, allowing you to pass values down the line
     without nesting callbacks!

  2. REAL-LIFE ANALOGY:
     An Assembly Line:
     Station 1 builds the car frame -> passes it to Station 2.
     Station 2 installs the engine -> passes it to Station 3.
     Station 3 paints the car.
     If ANY station fails, the master emergency alarm (`.catch`) sounds.

  3. JARGON BUSTER:
     - Promise Chaining: Returning a promise from a `.then()` handler to feed into the next `.then()`.
     - Centralized Error Handling: A single `.catch()` at the end of the chain catches
       errors from ANY preceding `.then()` step!
*/

// =============================================================================
// STEP 1: ASYNCHRONOUS PIPELINE STEPS
// =============================================================================

function authenticateUser(userId) {
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log(`[Step 1] Authenticated User ID: ${userId}`);
      resolve({ id: userId, role: "editor" });
    }, 300);
  });
}

function fetchUserPermissions(user) {
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log(`[Step 2] Fetched permissions for role: ${user.role}`);
      resolve(["READ_POSTS", "WRITE_POSTS"]);
    }, 300);
  });
}

function generateDashboard(permissions) {
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log(`[Step 3] Rendering dashboard with ${permissions.length} actions.`);
      resolve({ status: "READY", items: permissions });
    }, 300);
  });
}

// =============================================================================
// STEP 2: EXECUTING THE FLAT PROMISE CHAIN
// =============================================================================
// Notice how clean and flat this is compared to Callback Hell:

authenticateUser(1001)
  .then((user) => {
    return fetchUserPermissions(user); // Returns a new Promise to next .then()
  })
  .then((permissions) => {
    return generateDashboard(permissions); // Returns a new Promise to next .then()
  })
  .then((dashboard) => {
    console.log("Pipeline Finished Successfully! Dashboard is:", dashboard.status);
  })
  .catch((err) => {
    // Catches an error from ANY of the steps above!
    console.error("Pipeline Failed at some step:", err.message);
  });

/*
  ------------------------------------------------------------------------------
  [EXPECTED OUTPUT IN TERMINAL]
  ------------------------------------------------------------------------------
  [Step 1] Authenticated User ID: 1001
  [Step 2] Fetched permissions for role: editor
  [Step 3] Rendering dashboard with 2 actions.
  Pipeline Finished Successfully! Dashboard is: READY
*/