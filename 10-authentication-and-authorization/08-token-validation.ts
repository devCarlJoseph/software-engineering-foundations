/*
  ==============================================================================
  W3SCHOOLS-STYLE LEARNING GUIDE: Token Validation (Expiration & Claims)
  ==============================================================================

  1. WHAT IS TOKEN VALIDATION?
     Validating a token goes beyond simply verifying its mathematical signature.
     It must also enforce temporal validity (expiration time) and claim constraints:
     - `exp` (Expiration Time): Has the token expired?
     - `nbf` (Not Before): Is the token being used before its active time?
     - `iss` (Issuer): Was the token issued by our trusted authentication server?
     - `aud` (Audience): Was the token intended for this specific API?

  2. REAL-LIFE ANALOGY:
     A Movie Theater Ticket:
     - Signature: It has the theater's official barcode.
     - Date and Time (`exp`): Even with a genuine barcode, a ticket for yesterday's
       7:00 PM movie CANNOT be used to enter today's movie!
     - Auditorium (`aud`): A ticket for Theater 1 cannot be used to sit in IMAX Theater 5.

  3. JARGON BUSTER:
     - Epoch Timestamp: Seconds elapsed since January 1, 1970 (UTC). Standard format for JWT claims.
     - Clock Skew / Leeway: Allowing a small buffer (e.g. 30 seconds) to account for slight
       time synchronization differences between servers.
*/

// =============================================================================
// COMPREHENSIVE TOKEN VALIDATION ENGINE
// =============================================================================

interface StandardJwtClaims {
  sub: string;       // Subject (User ID)
  iss: string;       // Issuer
  aud: string;       // Audience
  exp: number;       // Expiration timestamp (seconds)
  nbf?: number;      // Not Before timestamp (seconds)
  iat: number;       // Issued At timestamp (seconds)
}

interface ValidationOptions {
  expectedIssuer: string;
  expectedAudience: string;
  clockToleranceSeconds?: number;
}

class TokenClaimsValidator {
  public static validateClaims(
    claims: StandardJwtClaims,
    options: ValidationOptions
  ): { valid: boolean; error?: string } {
    const currentEpochSeconds = Math.floor(Date.now() / 1000);
    const tolerance = options.clockToleranceSeconds ?? 0;

    // 1. Validate Expiration (exp)
    if (claims.exp + tolerance < currentEpochSeconds) {
      const expiredAgoSeconds = currentEpochSeconds - claims.exp;
      return {
        valid: false,
        error: `Token has expired! Expired ${expiredAgoSeconds} seconds ago.`,
      };
    }

    // 2. Validate Not Before (nbf)
    if (claims.nbf && claims.nbf - tolerance > currentEpochSeconds) {
      return {
        valid: false,
        error: "Token is not yet active (nbf constraint failed).",
      };
    }

    // 3. Validate Issuer (iss)
    if (claims.iss !== options.expectedIssuer) {
      return {
        valid: false,
        error: `Invalid issuer! Expected '${options.expectedIssuer}', but got '${claims.iss}'.`,
      };
    }

    // 4. Validate Audience (aud)
    if (claims.aud !== options.expectedAudience) {
      return {
        valid: false,
        error: `Invalid audience! Expected '${options.expectedAudience}', but got '${claims.aud}'.`,
      };
    }

    return { valid: true };
  }
}

const currentSeconds = Math.floor(Date.now() / 1000);
const validationConfig: ValidationOptions = {
  expectedIssuer: "https://auth.taskflow.dev",
  expectedAudience: "https://api.taskflow.dev",
  clockToleranceSeconds: 5,
};

console.log("=== Test 1: Valid Active Token ===");
const validClaims: StandardJwtClaims = {
  sub: "usr_100",
  iss: "https://auth.taskflow.dev",
  aud: "https://api.taskflow.dev",
  iat: currentSeconds - 60,
  exp: currentSeconds + 900, // Valid for 15 more minutes
};
console.log(TokenClaimsValidator.validateClaims(validClaims, validationConfig));

console.log("\n=== Test 2: Expired Token ===");
const expiredClaims: StandardJwtClaims = {
  ...validClaims,
  exp: currentSeconds - 120, // Expired 2 minutes ago
};
console.log(TokenClaimsValidator.validateClaims(expiredClaims, validationConfig));

console.log("\n=== Test 3: Wrong Issuer (Untrusted Source) ===");
const maliciousIssuerClaims: StandardJwtClaims = {
  ...validClaims,
  iss: "https://hacker-server.dev",
};
console.log(TokenClaimsValidator.validateClaims(maliciousIssuerClaims, validationConfig));

/*
  ------------------------------------------------------------------------------
  [EXPECTED OUTPUT IN TERMINAL]
  ------------------------------------------------------------------------------
  === Test 1: Valid Active Token ===
  { valid: true }

  === Test 2: Expired Token ===
  {
    valid: false,
    error: 'Token has expired! Expired 120 seconds ago.'
  }

  === Test 3: Wrong Issuer (Untrusted Source) ===
  {
    valid: false,
    error: "Invalid issuer! Expected 'https://auth.taskflow.dev', but got 'https://hacker-server.dev'."
  }
*/

// =============================================================================
// BEHIND THE SCENES: STANDARD JWT CLAIMS CHEATSHEET
// =============================================================================
/*
  Registered Claims (RFC 7519):
  - sub: Subject (Who the token is about - usually User ID)
  - iss: Issuer (Who created and signed the token)
  - aud: Audience (Who the token is intended for)
  - exp: Expiration time (UNIX epoch seconds)
  - nbf: Not before time (cannot be used before this time)
  - iat: Issued at time
  - jti: JWT ID (Unique nonce to prevent replay attacks)
*/