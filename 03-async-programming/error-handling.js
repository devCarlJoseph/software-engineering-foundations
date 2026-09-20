/*
  ==============================================================================
  W3SCHOOLS-STYLE LEARNING GUIDE: Production Async Error Handling & Retry Logic
  ==============================================================================

  1. WHAT IS ADVANCED ASYNC ERROR HANDLING?
     Real-world networks are unreliable. Microservices drop packets, rate limits
     are hit, and databases occasionally time out. Professional async code implements:
     - Custom Error Classes to identify error types.
     - Automatic Retry Loops with Backoff.

  2. REAL-LIFE ANALOGY:
     Calling someone whose phone is busy:
     You don't immediately throw your phone into the river. You wait 2 seconds,
     retry. If still busy, wait 4 seconds, retry. After 3 attempts, you give up.

  3. JARGON BUSTER:
     - Exponential Backoff: Increasing the wait time between retry attempts (e.g. 1s, 2s, 4s).
     - Transient Error: A temporary error (like a network blip) that will likely succeed
       if retried immediately.
*/

// =============================================================================
// STEP 1: CUSTOM DOMAIN ERROR
// =============================================================================

class NetworkTimeoutError extends Error {
  constructor(serviceName) {
    super(`Network connection to service '${serviceName}' timed out.`);
    this.name = "NetworkTimeoutError";
    this.isTransient = true; // Indicates this error can be safely retried
  }
}

// Simulating an unstable network endpoint:
let attemptCount = 0;
function fetchUnstableTelemetryData() {
  return new Promise((resolve, reject) => {
    attemptCount++;
    setTimeout(() => {
      if (attemptCount < 3) {
        reject(new NetworkTimeoutError("TelemetryCluster"));
      } else {
        resolve({ cpuLoad: "22%", memoryUsage: "1.2GB" }); // Succeeds on attempt 3!
      }
    }, 200);
  });
}

// =============================================================================
// STEP 2: ASYNC RETRY LOOP
// =============================================================================

async function fetchWithRetry(maxRetries = 3) {
  for (let i = 1; i <= maxRetries; i++) {
    try {
      console.log(`Attempt #${i}: Fetching telemetry data...`);
      const data = await fetchUnstableTelemetryData();
      console.log("Success on attempt #" + i + "! Data:", data);
      return data;
    } catch (err) {
      if (err instanceof NetworkTimeoutError && i < maxRetries) {
        console.warn(`Attempt #${i} failed (${err.message}). Retrying...`);
      } else {
        console.error("Fatal error. Max retries exhausted:", err.message);
        throw err;
      }
    }
  }
}

fetchWithRetry(3);

/*
  ------------------------------------------------------------------------------
  [EXPECTED OUTPUT IN TERMINAL]
  ------------------------------------------------------------------------------
  Attempt #1: Fetching telemetry data...
  Attempt #1 failed (Network connection to service 'TelemetryCluster' timed out.). Retrying...
  Attempt #2: Fetching telemetry data...
  Attempt #2 failed (Network connection to service 'TelemetryCluster' timed out.). Retrying...
  Attempt #3: Fetching telemetry data...
  Success on attempt #3! Data: { cpuLoad: '22%', memoryUsage: '1.2GB' }
*/