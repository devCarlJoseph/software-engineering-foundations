/*
  ==============================================================================
  W3SCHOOLS-STYLE LEARNING GUIDE: Access Tokens & Refresh Tokens Pattern
  ==============================================================================

  1. WHAT IS AN ACCESS TOKEN?
     A short-lived credential (typically valid for 15 minutes) sent by the client
     with every API request in the `Authorization: Bearer <token>` header to access resources.

  2. WHY REFRESH TOKENS?
     If an access token lasted 1 year and was stolen, the hacker would have access for a year!
     Instead:
     - Access Token: Short-lived (15 min) -> used for quick API calls.
     - Refresh Token: Long-lived (7 to 30 days) -> stored securely (HttpOnly cookie),
       used ONLY to obtain a new access token when the old one expires.

  3. REAL-LIFE ANALOGY:
     Hotel Room Keycard vs. Front Desk Check-in:
     - Access Token (Plastic Keycard): Opens your room door quickly. But it expires
       at 11:00 AM every morning.
     - Refresh Token (Your Passport at Front Desk): You visit the front desk to re-activate
       your keycard without entering your full password again.
*/

// =============================================================================
// SIMULATION OF ACCESS TOKEN & REFRESH TOKEN LIFECYCLE
// =============================================================================

interface TokenPair {
  accessToken: string;
  refreshToken: string;
  expiresInSeconds: number;
}

interface StoredSession {
  userId: string;
  refreshToken: string;
  isValid: boolean;
}

// In-memory refresh token session store (in production: Redis or Database)
const sessionStore: Map<string, StoredSession> = new Map();

class AuthService {
  private static ACCESS_TOKEN_TTL_MS = 1000 * 60 * 15; // 15 minutes

  // Issue new token pair upon successful login
  public static issueTokenPair(userId: string): TokenPair {
    const accessToken = `acc_${userId}_exp_${Date.now() + this.ACCESS_TOKEN_TTL_MS}`;
    const refreshToken = `ref_${userId}_${Math.random().toString(36).substring(2)}`;

    // Store refresh token in session whitelist
    sessionStore.set(refreshToken, {
      userId,
      refreshToken,
      isValid: true,
    });

    return {
      accessToken,
      refreshToken,
      expiresInSeconds: 900, // 15 mins
    };
  }

  // Exchange valid Refresh Token for a fresh Access Token
  public static refreshAccessToken(providedRefreshToken: string): string {
    const session = sessionStore.get(providedRefreshToken);

    if (!session || !session.isValid) {
      throw new Error("401 Unauthorized: Refresh token is revoked or invalid.");
    }

    // Generate brand new access token
    const newAccessToken = `acc_${session.userId}_exp_${Date.now() + this.ACCESS_TOKEN_TTL_MS}`;
    console.log(`[AuthService]: Issued new Access Token for user '${session.userId}'.`);
    return newAccessToken;
  }

  // Revoke session (e.g. User clicks "Log Out" or "Log Out on All Devices")
  public static revokeSession(refreshToken: string): void {
    const session = sessionStore.get(refreshToken);
    if (session) {
      session.isValid = false;
      console.log(`[AuthService]: Revoked session for user '${session.userId}'.`);
    }
  }
}

console.log("=== 1. User Logs In (Receives Access & Refresh Tokens) ===");
const tokens = AuthService.issueTokenPair("usr_carl");
console.log("Tokens Received:", tokens);

console.log("\n=== 2. Access Token Expires -> Client Uses Refresh Token ===");
const freshAccessToken = AuthService.refreshAccessToken(tokens.refreshToken);
console.log("Fresh Access Token:", freshAccessToken);

console.log("\n=== 3. User Logs Out (Session Revocation) ===");
AuthService.revokeSession(tokens.refreshToken);

try {
  AuthService.refreshAccessToken(tokens.refreshToken);
} catch (err: unknown) {
  console.log("Attempted use of revoked token result:", (err as Error).message);
}

/*
  ------------------------------------------------------------------------------
  [EXPECTED OUTPUT IN TERMINAL]
  ------------------------------------------------------------------------------
  === 1. User Logs In (Receives Access & Refresh Tokens) ===
  Tokens Received: {
    accessToken: 'acc_usr_carl_exp_<timestamp>',
    refreshToken: 'ref_usr_carl_<randomId>',
    expiresInSeconds: 900
  }

  === 2. Access Token Expires -> Client Uses Refresh Token ===
  [AuthService]: Issued new Access Token for user 'usr_carl'.
  Fresh Access Token: acc_usr_carl_exp_<futureTimestamp>

  === 3. User Logs Out (Session Revocation) ===
  [AuthService]: Revoked session for user 'usr_carl'.
  Attempted use of revoked token result: 401 Unauthorized: Refresh token is revoked or invalid.
*/

// =============================================================================
// BEHIND THE SCENES: WHERE TO STORE TOKENS SAFELY?
// =============================================================================
/*
  - In Web Browsers:
    - NEVER store refresh tokens in `localStorage` (vulnerable to XSS theft!).
    - Store Refresh Tokens in an `HttpOnly`, `Secure`, `SameSite=Strict` Cookie.
      JavaScript CANNOT read HttpOnly cookies, rendering them immune to XSS attacks!
    - Store Access Tokens in memory (JavaScript variable).
*/