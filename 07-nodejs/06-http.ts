/*
  ==============================================================================
  W3SCHOOLS-STYLE LEARNING GUIDE: Node.js Native HTTP Module
  ==============================================================================

  1. WHAT IS THE HTTP MODULE?
     The `node:http` module provides native low-level functionality to build
     web servers and make HTTP client requests without installing any third-party
     packages (like Express). Express itself is built directly on top of `node:http`.

  2. REAL-LIFE ANALOGY:
     A Postal Service Distribution Hub:
     - Request (`IncomingMessage`): The incoming envelope with sender address,
       stamps, headers, and package contents (body).
     - Response (`ServerResponse`): The outgoing envelope you fill with a status stamp
       (200 OK, 404 Not Found) and send back to the customer.

  3. JARGON BUSTER:
     - HTTP Method: GET (retrieve), POST (create), PUT/PATCH (update), DELETE (remove).
     - Status Code: Standard numbers (200 = Success, 201 = Created, 400 = Bad Request, 404 = Not Found, 500 = Server Error).
     - Headers: Metadata sent with requests/responses (e.g., `Content-Type: application/json`).
     - Port: The numbered channel on your machine the server listens on (e.g., 3000).
*/

// =============================================================================
// BAD PRACTICE: NOT SETTING CONTENT-TYPE OR STATUS CODES
// =============================================================================
/*
  // Bad: Sending JSON as plain text without headers confuses the client (browser/mobile app):
  res.write("{ success: true }");
  res.end();
*/

// =============================================================================
// GOOD PRACTICE: CLEAN NATIVE HTTP SERVER WITH ROUTING & JSON RESPONSES
// =============================================================================

import * as http from "node:http";

// Simple in-memory data
const tasks = [
  { id: 1, title: "Review Node.js runtime", completed: true },
  { id: 2, title: "Build HTTP server", completed: false },
];

// Helper: send standard JSON responses cleanly
function sendJsonResponse(
  res: http.ServerResponse,
  statusCode: number,
  data: Record<string, unknown> | Array<unknown>
): void {
  res.writeHead(statusCode, {
    "Content-Type": "application/json",
    "X-Powered-By": "Node.js Native HTTP",
  });
  res.end(JSON.stringify(data));
}

// Create the native server
const server = http.createServer((req: http.IncomingMessage, res: http.ServerResponse) => {
  const method = req.method ?? "GET";
  const url = req.url ?? "/";

  console.log(`[HTTP Request Received]: ${method} ${url}`);

  // Route 1: Health Check (GET /)
  if (method === "GET" && url === "/") {
    return sendJsonResponse(res, 200, {
      status: "online",
      message: "Node.js HTTP Server is running!",
    });
  }

  // Route 2: Get All Tasks (GET /api/tasks)
  if (method === "GET" && url === "/api/tasks") {
    return sendJsonResponse(res, 200, tasks);
  }

  // Route 3: Not Found fallback (404)
  return sendJsonResponse(res, 404, {
    error: "Route Not Found",
    path: url,
  });
});

// Configure listening port
const PORT = 3000;
server.listen(PORT, () => {
  console.log(`=== Server listening on http://localhost:${PORT} ===`);
  console.log("Try opening in browser or Postman:");
  console.log(`- http://localhost:${PORT}/`);
  console.log(`- http://localhost:${PORT}/api/tasks`);

  // Auto-close after 2 seconds for safe automated demonstration run
  setTimeout(() => {
    server.close(() => {
      console.log("\n[Server stopped for demo run]");
    });
  }, 2000);
});

/*
  ------------------------------------------------------------------------------
  [EXPECTED OUTPUT IN TERMINAL]
  ------------------------------------------------------------------------------
  === Server listening on http://localhost:3000 ===
  Try opening in browser or Postman:
  - http://localhost:3000/
  - http://localhost:3000/api/tasks

  [Server stopped for demo run]
*/

// =============================================================================
// BEHIND THE SCENES
// =============================================================================
/*
  HOW THE HTTP LIFECYCLE WORKS:
  1. Client sends HTTP request -> TCP socket connects.
  2. Node.js creates `req` (Readable Stream) and `res` (Writable Stream).
  3. Server calls your callback function with `(req, res)`.
  4. You write response headers (`writeHead`), write body chunks, and call `res.end()`.
  5. The TCP socket flushes the response back to the client.
*/