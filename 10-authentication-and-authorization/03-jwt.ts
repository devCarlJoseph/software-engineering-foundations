/*
  ==============================================================================
  W3SCHOOLS-STYLE LEARNING GUIDE: JSON Web Tokens (JWT) Architecture
  ==============================================================================

  1. WHAT IS A JWT?
     A JSON Web Token (RFC 7519) is a compact, URL-safe means of representing
     claims to be transferred between two parties.
     It consists of 3 parts separated by dots (`.`):
     `HEADER.PAYLOAD.SIGNATURE`

  2. REAL-LIFE ANALOGY:
     A Certified Stamped Check:
     - Header: Specifies the bank branch and stamp ink type.
     - Payload: Details written on the check (Payer, Amount: $500, Expiration Date).
       Anyone can READ the check!
     - Signature: The bank manager's official holographic wax seal.
       If someone modifies "$500" to "$5000", the seal breaks and becomes VOID!

  3. JARGON BUSTER:
     - Base64Url Encoded: Text encoding that is safe for URLs and HTTP headers.
       Base64 is NOT encryption! Anyone can decode and read the payload!
     - HMAC-SHA256: The cryptographic signature algorithm that binds the header
       and payload using a secret server key.
     - Stateless Verification: The server verifies the signature purely with math
       without querying a database!
*/

// =============================================================================
// BAD PRACTICE: STORING PASSWORDS OR SENSITIVE SECRETS INSIDE JWT PAYLOAD
// =============================================================================
/*
  // DISASTER: JWT payloads are only Base64 encoded, NOT encrypted!
  const badPayload = {
    userId: 12,
    password: "myPlainPassword", // LEAKED! Anyone can decode this in 1 second on jwt.io!
    creditCard: "4111...",       // LEAKED!
  };
*/

// =============================================================================
// GOOD PRACTICE: UNDERSTANDING AND CREATING A REAL JWT FROM SCRATCH
// =============================================================================

import * as crypto from "node:crypto";

class JsonWebTokenEngine {
  private static base64UrlEncode(str: string): string {
    return Buffer.from(str)
      .toString("base64")
      .replace(/=/g, "")
      .replace(/\+/g, "-")
      .replace(/\//g, "_");
  }

  private static base64UrlDecode(str: string): string {
    let base64 = str.replace(/-/g, "+").replace(/_/g, "/");
    while (base64.length % 4) base64 += "=";
    return Buffer.from(base64, "base64").toString("utf-8");
  }

  // Step 1: Create a signed JWT: HEADER.PAYLOAD.SIGNATURE
  public static sign(payload: Record<string, unknown>, secret: string): string {
    const header = { alg: "HS256", typ: "JWT" };

    const encodedHeader = this.base64UrlEncode(JSON.stringify(header));
    const encodedPayload = this.base64UrlEncode(JSON.stringify(payload));

    const dataToSign = `${encodedHeader}.${encodedPayload}`;
    const signature = crypto
      .createHmac("sha256", secret)
      .update(dataToSign)
      .digest("base64")
      .replace(/=/g, "")
      .replace(/\+/g, "-")
      .replace(/\//g, "_");

    return `${dataToSign}.${signature}`;
  }

  // Step 2: Verify signature and decode payload
  public static verify(token: string, secret: string): Record<string, unknown> | null {
    const parts = token.split(".");
    if (parts.length !== 3) return null;

    const [encodedHeader, encodedPayload, originalSignature] = parts;
    const dataToVerify = `${encodedHeader}.${encodedPayload}`;

    // Recompute signature to compare:
    const expectedSignature = crypto
      .createHmac("sha256", secret)
      .update(dataToVerify)
      .digest("base64")
      .replace(/=/g, "")
      .replace(/\+/g, "-")
      .replace(/\//g, "_");

    if (originalSignature !== expectedSignature) {
      console.log("[JWT Error]: Signature verification failed! Tampered token.");
      return null;
    }

    return JSON.parse(this.base64UrlDecode(encodedPayload));
  }
}

const SERVER_SECRET = "super_duper_secret_key_2026";

console.log("=== 1. Issuing a Signed JWT ===");
const userClaims = {
  sub: "usr_404",
  username: "carl_joseph",
  role: "admin",
  iat: Math.floor(Date.now() / 1000),
};

const token = JsonWebTokenEngine.sign(userClaims, SERVER_SECRET);
console.log("Generated JWT Token:\n", token);

console.log("\n=== 2. Verifying a Valid Token ===");
const verifiedClaims = JsonWebTokenEngine.verify(token, SERVER_SECRET);
console.log("Verified Claims:", verifiedClaims);

console.log("\n=== 3. Attempting to Tamper with Token Payload ===");
// Attacker tries to change "admin" to something else by modifying middle segment:
const [h, p, s] = token.split(".");
const tamperedPayload = Buffer.from(JSON.stringify({ ...userClaims, role: "super_god" })).toString("base64url");
const tamperedToken = `${h}.${tamperedPayload}.${s}`;

const tamperResult = JsonWebTokenEngine.verify(tamperedToken, SERVER_SECRET);
console.log("Result of verifying tampered token:", tamperResult);

/*
  ------------------------------------------------------------------------------
  [EXPECTED OUTPUT IN TERMINAL]
  ------------------------------------------------------------------------------
  === 1. Issuing a Signed JWT ===
  Generated JWT Token:
   eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.<base64Payload>.<base64Signature>

  === 2. Verifying a Valid Token ===
  Verified Claims: {
    sub: 'usr_404',
    username: 'carl_joseph',
    role: 'admin',
    iat: <timestamp>
  }

  === 3. Attempting to Tamper with Token Payload ===
  [JWT Error]: Signature verification failed! Tampered token.
  Result of verifying tampered token: null
*/

// =============================================================================
// BEHIND THE SCENES: THE THREE PARTS OF A JWT
// =============================================================================
/*
  eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9 . eyJzdWIiOiIxMjM0NTY3ODkwIn0 . 4pjvH...
  └───────── 1. HEADER ───────────────┘   └──────── 2. PAYLOAD ────────┘   └─ 3. SIGNATURE ─┘
   Specifies the algorithm                 Contains claims/data              Guarantees integrity
   (e.g., HS256)                           (e.g., userId, role, exp)         (secret HMAC hash)
*/