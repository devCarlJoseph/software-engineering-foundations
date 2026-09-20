/*
  ==============================================================================
  W3SCHOOLS-STYLE LEARNING GUIDE: Concurrent Operations (Running Tasks in Parallel)
  ==============================================================================

  1. WHAT ARE CONCURRENT ASYNC OPERATIONS?
     Instead of awaiting tasks one-by-one in serial (which is slow), you can run
     multiple independent promises SIMULTANEOUSLY in parallel to boost performance!

  2. REAL-LIFE ANALOGY:
     Preparing breakfast:
     - Serial: Boil water (5 min), THEN toast bread (3 min), THEN fry eggs (4 min) = 12 mins.
     - Concurrent: Boil water, toast bread, and fry eggs ALL AT THE SAME TIME = 5 mins!

  3. JARGON BUSTER:
     - Promise.all: Runs all promises in parallel. If ANY single promise rejects,
       the entire operation rejects immediately (Fail-Fast).
     - Promise.allSettled: Waits for ALL promises to finish, returning an array of
       individual results (never rejects).
     - Promise.race: Returns the result of whichever promise finishes FIRST (fastest).
*/

// Helper: Async mock tasks with different delays:
const fetchUserProfile = () =>
  new Promise((res) => setTimeout(() => res({ user: "Carl" }), 300));

const fetchRecentOrders = () =>
  new Promise((res) => setTimeout(() => res(["Order #101", "Order #102"]), 200));

const fetchUserNotifications = () =>
  new Promise((res) => setTimeout(() => res(["3 new messages"]), 100));

// =============================================================================
// STEP 1: PROMISE.ALL (FAIL-FAST PARALLEL EXECUTION)
// =============================================================================

async function loadDashboardParallel() {
  console.log("Loading all dashboard widgets in parallel...");
  const startTime = Date.now();

  // Runs all 3 requests at the exact same time!
  const [profile, orders, notifications] = await Promise.all([
    fetchUserProfile(),
    fetchRecentOrders(),
    fetchUserNotifications(),
  ]);

  const duration = Date.now() - startTime;
  console.log(`Dashboard loaded in parallel in ~${duration}ms!`);
  console.log("User:", profile.user, "| Orders:", orders.length, "| Notifications:", notifications[0]);
}

loadDashboardParallel();

// =============================================================================
// STEP 2: PROMISE.RACE (THE FASTEST WINS)
// =============================================================================
// Used for timeout checks or querying backup servers:

const primaryMirror = new Promise((res) => setTimeout(() => res("Fast CDN Mirror"), 150));
const backupMirror = new Promise((res) => setTimeout(() => res("Slow Backup Mirror"), 600));

Promise.race([primaryMirror, backupMirror]).then((fastest) => {
  console.log("\n[Promise.race Winner]:", fastest); // "Fast CDN Mirror"
});

/*
  ------------------------------------------------------------------------------
  [EXPECTED OUTPUT IN TERMINAL]
  ------------------------------------------------------------------------------
  Loading all dashboard widgets in parallel...
  [Promise.race Winner]: Fast CDN Mirror
  Dashboard loaded in parallel in ~300ms!
  User: Carl | Orders: 2 | Notifications: 3 new messages
*/