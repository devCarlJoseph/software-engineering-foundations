/*
  ==============================================================================
  W3SCHOOLS-STYLE LEARNING GUIDE: Express Request (`req`) & Response (`res`)
  ==============================================================================

  1. WHAT ARE `req` AND `res`?
     - `req` (Request): Represents the incoming HTTP request. Contains URL, headers,
       query string, route params, body, IP address, and cookies.
     - `res` (Response): Represents the outgoing HTTP response. Contains helper
       methods to set status codes, headers, send JSON, cookies, or redirect.

  2. REAL-LIFE ANALOGY:
     A Bank Deposit Slip and Receipt:
     - `req`: The slip filled out by the customer listing account number, cash bills,
       and instructions.
     - `res`: The stamped receipt handed back by the teller indicating status
       ("Deposit Approved") and balance.

  3. JARGON BUSTER:
     - `res.status(code)`: Sets the HTTP status code (e.g., 200, 201, 400, 404).
     - `res.json(data)`: Serializes data to JSON and sets `Content-Type: application/json`.
     - `res.send(data)`: Flexible sender for strings, buffers, or HTML.
     - `res.set(header, value)`: Sets a custom HTTP response header.
     - `req.ip`: The client's IP address.
*/

// =============================================================================
// BAD PRACTICE: SENDING MULTIPLE RESPONSES FOR ONE REQUEST
// =============================================================================
/*
  // CLASSIC NODE ERROR: "Cannot set headers after they are sent to the client"
  app.get("/user", (req, res) => {
    if (!req.query.id) {
      res.status(400).send("ID required");
      // FORGOT TO RETURN! Function keeps executing below:
    }
    res.json({ id: 1 }); // CRASH! Tried to send response twice!
  });
  // FIX: Always write `return res.status(400)...`!
*/

// =============================================================================
// GOOD PRACTICE: COMMON `req` INSPECTION & `res` METHODS
// =============================================================================

// Mocking Express Request & Response behaviors:
interface SimulatedReq {
  method: string;
  path: string;
  headers: Record<string, string>;
  ip: string;
}

class SimulatedRes {
  public statusCode = 200;
  public responseHeaders: Record<string, string> = {};
  public body: unknown = null;

  // Fluent method chaining: res.status(...).json(...)
  public status(code: number): this {
    this.statusCode = code;
    return this;
  }

  public set(field: string, val: string): this {
    this.responseHeaders[field.toLowerCase()] = val;
    return this;
  }

  public json(data: unknown): void {
    this.set("content-type", "application/json");
    this.body = JSON.stringify(data);
  }

  public send(data: string): void {
    this.set("content-type", "text/plain");
    this.body = data;
  }
}

// Controller demonstrating clean handling of req and res
function getUserProfileHandler(req: SimulatedReq, res: SimulatedRes): void {
  // 1. Inspecting the request
  const userAgent = req.headers["user-agent"] ?? "Unknown Device";
  console.log(`[Request From IP]: ${req.ip}`);
  console.log(`[Client Browser]:   ${userAgent}`);

  // 2. Building fluent response
  res
    .status(200)
    .set("X-API-Version", "2.1")
    .json({
      user: "Carl Joseph",
      role: "Software Engineer",
      requestedAt: new Date().toISOString(),
    });
}

const fakeReq: SimulatedReq = {
  method: "GET",
  path: "/api/profile",
  ip: "127.0.0.1",
  headers: { "user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64)" },
};

const fakeRes = new SimulatedRes();
getUserProfileHandler(fakeReq, fakeRes);

console.log("\n=== Resulting HTTP Response ===");
console.log("Status Code: ", fakeRes.statusCode);
console.log("Headers:     ", fakeRes.responseHeaders);
console.log("Body:        ", fakeRes.body);

/*
  ------------------------------------------------------------------------------
  [EXPECTED OUTPUT IN TERMINAL]
  ------------------------------------------------------------------------------
  [Request From IP]: 127.0.0.1
  [Client Browser]:   Mozilla/5.0 (Windows NT 10.0; Win64; x64)

  === Resulting HTTP Response ===
  Status Code:  200
  Headers:      { 'content-type': 'application/json', 'x-api-version': '2.1' }
  Body:         {"user":"Carl Joseph","role":"Software Engineer","requestedAt":"<ISO Timestamp>"}
*/

// =============================================================================
// BEHIND THE SCENES: MOST USEFUL res METHODS
// =============================================================================
/*
  ┌───────────────────────────┬────────────────────────────────────────────────┐
  │ Method                    │ Description                                    │
  ├───────────────────────────┼────────────────────────────────────────────────┤
  │ res.status(200)           │ Sets HTTP status code without sending body     │
  │ res.json({ ... })         │ Automatically stringifies JSON + sets headers  │
  │ res.sendStatus(404)       │ Sends status + default status text (Not Found) │
  │ res.redirect("/login")    │ Redirects client to another URL (302)          │
  │ res.download("./file.pdf")│ Prompts browser to download a file attachment   │
  └───────────────────────────┴────────────────────────────────────────────────┘
*/