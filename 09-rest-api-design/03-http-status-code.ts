/*
  ==============================================================================
  W3SCHOOLS-STYLE LEARNING GUIDE: HTTP Status Codes
  ==============================================================================

  1. WHAT ARE HTTP STATUS CODES?
     Standard 3-digit integer codes returned by the server indicating the outcome
     of an HTTP request. Divided into 5 official categories:
     - 1xx: Informational (Request received, continuing process)
     - 2xx: Success (The action was successfully received, understood, and accepted)
     - 3xx: Redirection (Further action needs to be taken to complete request)
     - 4xx: Client Error (The request contains bad syntax or cannot be fulfilled)
     - 5xx: Server Error (The server failed to fulfill an apparently valid request)

  2. REAL-LIFE ANALOGY:
     A Traffic Light & Sign System:
     - 200 Green Light: "All clear, here is your package."
     - 201 Green Star: "New building constructed!"
     - 401 Locked Gate: "Show your ID badge first."
     - 403 Security Guard: "Even with ID, you are not authorized to enter this vault."
     - 404 Road Closed: "Address does not exist."
     - 500 Collapsed Bridge: "Internal disaster on our side, not your fault."

  3. JARGON BUSTER:
     - 200 OK: Standard success for GET, PUT, PATCH.
     - 201 Created: Standard success for POST when a new resource is persisted.
     - 204 No Content: Success with an empty body (common for DELETE).
     - 400 Bad Request: Malformed JSON or validation rule failed.
     - 401 Unauthorized: Missing or invalid authentication token.
     - 403 Forbidden: Authenticated user lacks permission/role.
     - 404 Not Found: Target resource does not exist.
     - 409 Conflict: State conflict (e.g., trying to register an email that already exists).
     - 500 Internal Server Error: Unhandled bug or crashed server logic.
*/

// =============================================================================
// BAD PRACTICE: ALWAYS RETURNING 200 OK WITH AN ERROR IN THE BODY
// =============================================================================
/*
  // ANTI-PATTERN (THE "FAKE 200"):
  res.status(200).json({ success: false, error: "Password wrong" });
  // Why is this terrible? Monitoring tools, API gateways, and client libraries
  // (like Axios) treat this as a success and don't trigger error interceptors!
*/

// =============================================================================
// GOOD PRACTICE: ACCURATE STATUS CODES WITH DESCRIPTIVE PAYLOADS
// =============================================================================

enum HttpStatus {
  OK = 200,
  CREATED = 201,
  NO_CONTENT = 204,
  BAD_REQUEST = 400,
  UNAUTHORIZED = 401,
  FORBIDDEN = 403,
  NOT_FOUND = 404,
  CONFLICT = 409,
  INTERNAL_SERVER_ERROR = 500,
}

interface ApiResponse<T = unknown> {
  status: number;
  message: string;
  data?: T;
}

function simulateRestEndpoint(scenario: string): ApiResponse {
  switch (scenario) {
    case "create_task":
      return {
        status: HttpStatus.CREATED,
        message: "Resource created successfully.",
        data: { id: 101, title: "Study Status Codes" },
      };

    case "delete_task":
      return {
        status: HttpStatus.NO_CONTENT,
        message: "Resource deleted, no content returned.",
      };

    case "duplicate_email":
      return {
        status: HttpStatus.CONFLICT,
        message: "Conflict: Email address is already registered.",
      };

    case "missing_token":
      return {
        status: HttpStatus.UNAUTHORIZED,
        message: "Unauthorized: Missing Bearer Token.",
      };

    case "missing_permission":
      return {
        status: HttpStatus.FORBIDDEN,
        message: "Forbidden: Admin privileges required.",
      };

    case "not_found":
      return {
        status: HttpStatus.NOT_FOUND,
        message: "Resource with ID 999 does not exist.",
      };

    default:
      return {
        status: HttpStatus.OK,
        message: "Request succeeded.",
      };
  }
}

console.log("=== RESTful HTTP Status Code Mapping Demo ===");
const scenarios = ["create_task", "duplicate_email", "missing_permission", "not_found"];

scenarios.forEach((s) => {
  const result = simulateRestEndpoint(s);
  console.log(`[HTTP ${result.status}]: ${result.message}`);
});

/*
  ------------------------------------------------------------------------------
  [EXPECTED OUTPUT IN TERMINAL]
  ------------------------------------------------------------------------------
  === RESTful HTTP Status Code Mapping Demo ===
  [HTTP 201]: Resource created successfully.
  [HTTP 409]: Conflict: Email address is already registered.
  [HTTP 403]: Forbidden: Admin privileges required.
  [HTTP 404]: Resource with ID 999 does not exist.
*/

// =============================================================================
// BEHIND THE SCENES: QUICK STATUS CODE CHEATSHEET
// =============================================================================
/*
  GET    /tasks       -> 200 OK
  GET    /tasks/999   -> 404 Not Found
  POST   /tasks       -> 201 Created (with Location header: /tasks/123)
  PUT    /tasks/123   -> 200 OK
  DELETE /tasks/123   -> 204 No Content
  POST   (bad body)   -> 400 Bad Request
  GET    (no auth)    -> 401 Unauthorized
  GET    (wrong role) -> 403 Forbidden
*/