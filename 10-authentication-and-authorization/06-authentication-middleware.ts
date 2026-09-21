/*
  ==============================================================================
  W3SCHOOLS-STYLE LEARNING GUIDE: Production Authentication Middleware
  ==============================================================================

  1. WHAT IS AUTHENTICATION MIDDLEWARE?
     A modular Express middleware function that intercepts requests, extracts the
     token from the `Authorization: Bearer <token>` header, decodes and validates it,
     and attaches the authenticated user payload directly onto `req.user`.

  2. REAL-LIFE ANALOGY:
     A Wristband Verifier at a Concert Entrance:
     - Fans show their wristband.
     - The verifier scans the barcode.
     - If verified, the verifier stamps their hand with a marker (`req.user = decoded`),
       letting all concession stands and stage security know they are approved!

  3. JARGON BUSTER:
     - `req.user`: Express request augmentation where user details are stored.
     - Bearer Scheme: Standard format: `Authorization: Bearer <token>`.
     - 401 vs 403:
       - 401: Token missing, invalid, or expired.
       - 403: Token is valid, but the user is banned or lacks permissions.
*/

// =============================================================================
// PRODUCTION AUTHENTICATION MIDDLEWARE PATTERN
// =============================================================================

// User payload shape stored inside the JWT
interface JwtUserPayload {
  userId: string;
  email: string;
  role: "admin" | "member";
}

// Request interface simulated for Express
interface AuthenticatedExpressRequest {
  headers: Record<string, string | undefined>;
  user?: JwtUserPayload; // Added by this middleware!
}

type NextFn = (err?: Error) => void;

class AuthenticationMiddleware {
  // Simulated JWT validator
  private static decodeAndVerifyJwt(token: string): JwtUserPayload | null {
    if (token === "valid_jwt_sample_token") {
      return {
        userId: "usr_9921",
        email: "carl@developer.com",
        role: "admin",
      };
    }
    return null;
  }

  // The Express Middleware Handler
  public static authenticate(
    req: AuthenticatedExpressRequest,
    res: { status: (c: number) => { json: (body: unknown) => void } },
    next: NextFn
  ): void {
    const rawHeader = req.headers["authorization"];

    // 1. Check for Authorization header presence
    if (!rawHeader) {
      res.status(401).json({
        success: false,
        error: "Unauthorized: Missing 'Authorization' header.",
      });
      return;
    }

    // 2. Validate Bearer format
    const parts = rawHeader.split(" ");
    if (parts.length !== 2 || parts[0] !== "Bearer") {
      res.status(401).json({
        success: false,
        error: "Unauthorized: Header format must be 'Bearer <token>'.",
      });
      return;
    }

    const token = parts[1];

    // 3. Verify token authenticity
    const payload = AuthenticationMiddleware.decodeAndVerifyJwt(token);
    if (!payload) {
      res.status(401).json({
        success: false,
        error: "Unauthorized: Invalid or expired token signature.",
      });
      return;
    }

    // 4. Attach verified user to request object
    req.user = payload;
    console.log(`[AuthMiddleware]: User '${payload.email}' successfully verified!`);

    // 5. Pass control to the next handler
    next();
  }
}

// ── TEST RUNS ────────────────────────────────────────────────────────────────
const mockRes = {
  status: (code: number) => ({
    json: (body: unknown) => console.log(`[HTTP ${code} Response]:`, body),
  }),
};

console.log("=== Scenario 1: Malformed Header (No Bearer prefix) ===");
AuthenticationMiddleware.authenticate(
  { headers: { authorization: "Basic 12345" } },
  mockRes,
  () => console.log("Next called!")
);

console.log("\n=== Scenario 2: Valid Bearer Token (Passes to next) ===");
const validReq: AuthenticatedExpressRequest = {
  headers: { authorization: "Bearer valid_jwt_sample_token" },
};

AuthenticationMiddleware.authenticate(validReq, mockRes, () => {
  console.log("Reached controller! req.user =", validReq.user);
});

/*
  ------------------------------------------------------------------------------
  [EXPECTED OUTPUT IN TERMINAL]
  ------------------------------------------------------------------------------
  === Scenario 1: Malformed Header (No Bearer prefix) ===
  [HTTP 401 Response]: {
    success: false,
    error: "Unauthorized: Header format must be 'Bearer <token>'."
  }

  === Scenario 2: Valid Bearer Token (Passes to next) ===
  [AuthMiddleware]: User 'carl@developer.com' successfully verified!
  Reached controller! req.user = {
    userId: 'usr_9921',
    email: 'carl@developer.com',
    role: 'admin'
  }
*/

// =============================================================================
// BEHIND THE SCENES: TYPESCRIPT DECLARATION MERGING
// =============================================================================
/*
  In real TypeScript Express projects, declare `req.user` globally so TypeScript
  doesn't complain:

  // src/types/express.d.ts
  declare global {
    namespace Express {
      interface Request {
        user?: {
          userId: string;
          email: string;
          role: string;
        };
      }
    }
  }
*/