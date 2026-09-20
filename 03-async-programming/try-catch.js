/*
  ==============================================================================
  W3SCHOOLS-STYLE LEARNING GUIDE: Handling Async Errors with try...catch
  ==============================================================================

  1. WHAT IS ASYNC TRY...CATCH?
     In modern JavaScript, since `async/await` lets you write asynchronous code
     line-by-line, you can use standard `try...catch...finally` blocks to catch
     both synchronous errors and rejected Promises!

  2. REAL-LIFE ANALOGY:
     A Bank Transaction Safe:
     - `try`: Attempting to wire \$1,000 to an international bank.
     - `catch`: The wire fails because the account number is invalid -> Roll back the money.
     - `finally`: Close and lock the bank safe door, regardless of success or failure.

  3. JARGON BUSTER:
     - Unhandled Promise Rejection: When an async function throws or rejects, but no
       catch block is there to catch it (this can terminate your Node.js process!).
     - Graceful Recovery: Catching an error and returning a safe fallback value instead
       of crashing the entire server.
*/

// =============================================================================
// STEP 1: SIMULATING A FAILING ASYNC TASK
// =============================================================================

function chargeCreditCard(amount, cardToken) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (amount <= 0) {
        reject(new Error("Payment Failure: Charge amount must be greater than $0"));
        return;
      }
      if (cardToken === "expired_token") {
        reject(new Error("Payment Failure: Credit card expired"));
        return;
      }
      resolve({ transactionId: "TX_994821", amount: amount });
    }, 500);
  });
}

// =============================================================================
// STEP 2: HANDLING REJECTIONS WITH TRY...CATCH...FINALLY
// =============================================================================

async function processOrderCheckout(cartTotal, paymentToken) {
  let isTransactionActive = true;
  console.log("Beginning checkout process. Transaction locked...");

  try {
    // If chargeCreditCard rejects, execution immediately jumps to 'catch':
    const receipt = await chargeCreditCard(cartTotal, paymentToken);
    console.log("Success! Charge receipt:", receipt.transactionId);
    return receipt;
  } catch (err) {
    // Handles the rejected Promise error gracefully:
    console.warn("[CHECKOUT ABORTED]:", err.message);
    return { success: false, reason: err.message };
  } finally {
    // The finally block is GUARANTEED to execute:
    isTransactionActive = false;
    console.log("Cleanup complete. Transaction active status:", isTransactionActive);
  }
}

// Test 1: Simulating an invalid transaction that triggers catch:
processOrderCheckout(-50, "valid_token");

/*
  ------------------------------------------------------------------------------
  [EXPECTED OUTPUT IN TERMINAL]
  ------------------------------------------------------------------------------
  Beginning checkout process. Transaction locked...
  [CHECKOUT ABORTED]: Payment Failure: Charge amount must be greater than $0
  Cleanup complete. Transaction active status: false
*/