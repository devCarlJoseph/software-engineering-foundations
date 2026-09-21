/*
  ==============================================================================
  W3SCHOOLS-STYLE LEARNING GUIDE: Request & Response JSON Envelopes
  ==============================================================================

  1. WHAT IS REQUEST & RESPONSE STRUCTURE?
     Standardizing the JSON structure of every API payload so clients can write
     predictable parsing logic across all endpoints.
     Popular specifications include JSend, JSON:API, and Google JSON Style Guide.

  2. REAL-LIFE ANALOGY:
     Standard Shipping Crates:
     - If Amazon shipped packages in round spheres one day, triangles the next,
       and plastic bags without labels the day after, sorting facilities would fail.
     - Standardized rectangular boxes with a clear top label ensure smooth handling.

  3. JARGON BUSTER:
     - Envelope Pattern: Wrapping data in a top-level JSON object with metadata
       (`{ success, data, meta, error }`).
     - Metadata (`meta`): Supplementary information like pagination totals,
       server execution times, or API version.
     - JSend Specification: A simple, widely-used JSON envelope standard:
       `{ status: "success" | "fail" | "error", data: ... }`.
*/

// =============================================================================
// BAD PRACTICE: INCONSISTENT RAW RESPONSES
// =============================================================================
/*
  // Inconsistent responses confuse frontend clients:
  // Endpoint A returns: [ { id: 1 } ]
  // Endpoint B returns: { tasks: [ { id: 1 } ] }
  // Endpoint C returns: { result: { items: [ { id: 1 } ] } }
*/

// =============================================================================
// GOOD PRACTICE: STANDARDIZED JSEND-INSPIRED API RESPONSE ENVELOPE
// =============================================================================

// Standard Envelope for Successful Responses
interface ApiSuccessResponse<T> {
  success: true;
  data: T;
  meta?: {
    totalRecords?: number;
    page?: number;
    limit?: number;
    timestamp: string;
  };
}

// Standard Envelope for Error Responses
interface ApiErrorResponse {
  success: false;
  error: {
    code: string;
    message: string;
    details?: Array<{ field: string; message: string }>;
  };
  meta: {
    timestamp: string;
  };
}

// Factory helper to build uniform success payloads
function createSuccessResponse<T>(data: T, metaInfo?: { totalRecords?: number; page?: number; limit?: number }): ApiSuccessResponse<T> {
  return {
    success: true,
    data,
    meta: {
      ...metaInfo,
      timestamp: new Date().toISOString(),
    },
  };
}

// Factory helper to build uniform error payloads
function createErrorResponse(code: string, message: string, details?: Array<{ field: string; message: string }>): ApiErrorResponse {
  return {
    success: false,
    error: {
      code,
      message,
      details,
    },
    meta: {
      timestamp: new Date().toISOString(),
    },
  };
}

console.log("=== 1. Standard Success Response Envelope ===");
const sampleTask = { id: "tsk_1", title: "Complete REST Chapter", status: "in_progress" };
const successPayload = createSuccessResponse([sampleTask], { totalRecords: 1, page: 1, limit: 10 });
console.log(JSON.stringify(successPayload, null, 2));

console.log("\n=== 2. Standard Error Response Envelope ===");
const errorPayload = createErrorResponse("VALIDATION_ERROR", "The submitted request was invalid.", [
  { field: "title", message: "Title must not be blank." },
]);
console.log(JSON.stringify(errorPayload, null, 2));

/*
  ------------------------------------------------------------------------------
  [EXPECTED OUTPUT IN TERMINAL]
  ------------------------------------------------------------------------------
  === 1. Standard Success Response Envelope ===
  {
    "success": true,
    "data": [
      {
        "id": "tsk_1",
        "title": "Complete REST Chapter",
        "status": "in_progress"
      }
    ],
    "meta": {
      "totalRecords": 1,
      "page": 1,
      "limit": 10,
      "timestamp": "<ISO Timestamp>"
    }
  }

  === 2. Standard Error Response Envelope ===
  {
    "success": false,
    "error": {
      "code": "VALIDATION_ERROR",
      "message": "The submitted request was invalid.",
      "details": [
        {
          "field": "title",
          "message": "Title must not be blank."
        }
      ]
    },
    "meta": {
      "timestamp": "<ISO Timestamp>"
    }
  }
*/

// =============================================================================
// BEHIND THE SCENES: BENEFITS OF THE ENVELOPE PATTERN
// =============================================================================
/*
  1. Frontend Simplicity: Every API response can be destructured identically:
     `const { success, data, error } = response.data;`
  2. Future-Proof: Adding pagination or timing metadata never breaks the
     shape of `data`.
  3. Clean Error Handling: Frontend UI forms can loop over `error.details`
     to highlight specific invalid form inputs directly.
*/