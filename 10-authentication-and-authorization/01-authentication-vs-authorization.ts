/*
  ==============================================================================
  W3SCHOOLS-STYLE LEARNING GUIDE: Authentication (AuthN) vs. Authorization (AuthZ)
  ==============================================================================

  1. WHAT IS THE DIFFERENCE?
     These are two distinct security stages that are frequently confused:
     - Authentication (AuthN): Verifying "WHO ARE YOU?".
       Confirms the identity of the user (via username + password, biometric, or MFA).
     - Authorization (AuthZ): Verifying "WHAT ARE YOU ALLOWED TO DO?".
       Checks permissions, roles, and access rights AFTER identity is confirmed.

  2. REAL-LIFE ANALOGY:
     Boarding an Airplane:
     - Authentication (TSA Agent): Checks your passport and face.
       "You really are Carl Joseph." -> AuthN Successful!
     - Authorization (Gate Agent): Checks your boarding pass.
       "You hold an Economy seat, so you are NOT allowed to enter the First Class lounge." -> AuthZ Denied (403)!

  3. JARGON BUSTER:
     - AuthN: Shorthand for Authentication. HTTP 401 Unauthorized (actually means Unauthenticated).
     - AuthZ: Shorthand for Authorization. HTTP 403 Forbidden.
     - Principle of Least Privilege: Giving users ONLY the minimum permissions needed
       to perform their job, and nothing more.
*/

// =============================================================================
// BAD PRACTICE: BLURRING AUTHN AND AUTHZ TOGETHER
// =============================================================================
/*
  // ANTI-PATTERN: Returning 401 when the user IS logged in, but just lacks rights:
  if (user.role !== "admin") {
    return res.status(401).send("Unauthorized"); // WRONG! User IS authenticated!
    // Correct status is 403 Forbidden!
  }
*/

// =============================================================================
// GOOD PRACTICE: CLEAR TWO-STAGE PIPELINE (AUTHN FIRST, THEN AUTHZ)
// =============================================================================

interface UserIdentity {
  id: string;
  username: string;
  role: "admin" | "member" | "guest";
}

// Stage 1: Authentication Engine (Verifies Credentials)
function authenticateUser(token: string | null): { authenticated: boolean; user?: UserIdentity; error?: string } {
  if (!token) {
    return { authenticated: false, error: "401 Unauthorized: No credentials provided." };
  }

  // Simulated identity lookup:
  if (token === "token_carl_123") {
    return { authenticated: true, user: { id: "usr_1", username: "Carl", role: "member" } };
  }
  if (token === "token_admin_999") {
    return { authenticated: true, user: { id: "usr_2", username: "SarahAdmin", role: "admin" } };
  }

  return { authenticated: false, error: "401 Unauthorized: Invalid or expired credentials." };
}

// Stage 2: Authorization Engine (Verifies Permissions)
function authorizeAction(
  user: UserIdentity,
  requiredRole: "admin" | "member"
): { authorized: boolean; error?: string } {
  if (user.role === "admin") {
    return { authorized: true }; // Admins have super-user access
  }

  if (user.role !== requiredRole) {
    return {
      authorized: false,
      error: `403 Forbidden: User '${user.username}' has role '${user.role}', but action requires '${requiredRole}'.`,
    };
  }

  return { authorized: true };
}

// ── SIMULATION TESTS ─────────────────────────────────────────────────────────
function testAccess(token: string | null, targetRole: "admin" | "member") {
  console.log(`\nTesting request with token: "${token ?? "null"}" for role: "${targetRole}"`);

  // Step 1: AuthN Check
  const authN = authenticateUser(token);
  if (!authN.authenticated || !authN.user) {
    console.log(`  --> [AuthN Failed]: ${authN.error}`);
    return;
  }
  console.log(`  --> [AuthN Passed]: Welcome, ${authN.user.username} (Role: ${authN.user.role})`);

  // Step 2: AuthZ Check
  const authZ = authorizeAction(authN.user, targetRole);
  if (!authZ.authorized) {
    console.log(`  --> [AuthZ Failed]: ${authZ.error}`);
    return;
  }
  console.log(`  --> [AuthZ Passed]: Access granted to resource!`);
}

console.log("=== AuthN vs AuthZ Pipeline Demonstration ===");
testAccess(null, "member");                 // Case 1: Fails AuthN (No token)
testAccess("token_carl_123", "admin");      // Case 2: Passes AuthN, Fails AuthZ (Not admin)
testAccess("token_admin_999", "admin");     // Case 3: Passes AuthN and Passes AuthZ

/*
  ------------------------------------------------------------------------------
  [EXPECTED OUTPUT IN TERMINAL]
  ------------------------------------------------------------------------------
  === AuthN vs AuthZ Pipeline Demonstration ===

  Testing request with token: "null" for role: "member"
    --> [AuthN Failed]: 401 Unauthorized: No credentials provided.

  Testing request with token: "token_carl_123" for role: "admin"
    --> [AuthN Passed]: Welcome, Carl (Role: member)
    --> [AuthZ Failed]: 403 Forbidden: User 'Carl' has role 'member', but action requires 'admin'.

  Testing request with token: "token_admin_999" for role: "admin"
    --> [AuthN Passed]: Welcome, SarahAdmin (Role: admin)
    --> [AuthZ Passed]: Access granted to resource!
*/

// =============================================================================
// BEHIND THE SCENES: COMPARISON TABLE
// =============================================================================
/*
  ┌──────────────────┬─────────────────────────────┬─────────────────────────┐
  │ Characteristic   │ Authentication (AuthN)      │ Authorization (AuthZ)   │
  ├──────────────────┼─────────────────────────────┼─────────────────────────┤
  │ Core Question    │ Who are you?                │ What can you do?        │
  │ Method           │ Passwords, OTP, Biometrics  │ Roles, Scopes, Policies │
  │ Execution Order  │ Always executes FIRST       │ Always executes SECOND  │
  │ Failure Code     │ HTTP 401 Unauthorized       │ HTTP 403 Forbidden      │
  │ Example          │ Logging in with email & pw  │ Only Admins can delete  │
  └──────────────────┴─────────────────────────────┴─────────────────────────┘
*/