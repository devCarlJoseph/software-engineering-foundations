/*
  ==============================================================================
  W3SCHOOLS-STYLE LEARNING GUIDE: REST Architecture
  ==============================================================================

  1. WHAT IS REST?
     REST stands for REpresentational State Transfer. It is an architectural style
     for designing networked applications created by Roy Fielding in 2000.
     It relies on stateless, client-server communications over standard HTTP,
     treating everything as a "Resource" accessible via standard URLs.

  2. REAL-LIFE ANALOGY:
     A Vending Machine:
     - Client-Server: You (the client) press buttons; the machine (server) dispenses.
     - Stateless: The machine does not remember your face from yesterday.
       Each purchase requires inserting payment and selecting an item from scratch.
     - Uniform Interface: Every slot has a letter and number (e.g., B4). You don't
       need a manual to know how slot C2 works if you know B4.

  3. JARGON BUSTER:
     - The 6 Guiding Constraints of REST:
       1. Client-Server Separation: UI concerns are separated from data storage.
       2. Statelessness: Each request from client to server must contain all info needed.
       3. Cacheability: Responses must define themselves as cacheable or non-cacheable.
       4. Layered System: Client cannot tell whether it is connected directly to end server or proxy.
       5. Uniform Interface: Standard URIs, representations (JSON), and standard HTTP verbs.
       6. Code on Demand (Optional): Server can temporarily extend client functionality (e.g., JS scripts).
*/

// =============================================================================
// BAD PRACTICE: VIOLATING REST STATELESSNESS
// =============================================================================
/*
  // DANGER: Storing conversational client state in server memory!
  let currentActiveCustomerStep = "choosing_payment";

  app.post("/next-step", (req, res) => {
    // If the server restarts or scales to 2 server instances,
    // the user's session state is lost or corrupted!
  });
*/

// =============================================================================
// GOOD PRACTICE: STATELESS REST REQUEST PROCESSING
// =============================================================================

interface RestRequestPayload {
  apiKey: string;
  userId: string;
  action: "read" | "update";
}

interface RestResourceRepresentation {
  id: string;
  type: "UserAccount";
  attributes: {
    name: string;
    email: string;
    tier: "free" | "pro";
  };
  links: {
    self: string;
    tasks: string;
  };
}

// Every request passes all authentication and contextual data needed
function handleStatelessRestRequest(req: RestRequestPayload): { statusCode: number; body: unknown } {
  // Step 1: Stateless authentication check
  if (!req.apiKey || req.apiKey !== "secret_token_123") {
    return {
      statusCode: 401,
      body: { error: "Unauthorized: Valid API key required on every request." },
    };
  }

  // Step 2: Fetch and format resource representation (HATEOAS links included)
  const userResource: RestResourceRepresentation = {
    id: req.userId,
    type: "UserAccount",
    attributes: {
      name: "Carl Joseph",
      email: "carl@developer.com",
      tier: "pro",
    },
    links: {
      self: `/api/v1/users/${req.userId}`,
      tasks: `/api/v1/users/${req.userId}/tasks`,
    },
  };

  return {
    statusCode: 200,
    body: { data: userResource },
  };
}

console.log("=== Demonstration of Stateless REST Request ===");
const response = handleStatelessRestRequest({
  apiKey: "secret_token_123",
  userId: "usr_9001",
  action: "read",
});

console.log(`[Status Code]: ${response.statusCode}`);
console.log("[Response Representation]:", JSON.stringify(response.body, null, 2));

/*
  ------------------------------------------------------------------------------
  [EXPECTED OUTPUT IN TERMINAL]
  ------------------------------------------------------------------------------
  === Demonstration of Stateless REST Request ===
  [Status Code]: 200
  [Response Representation]: {
    "data": {
      "id": "usr_9001",
      "type": "UserAccount",
      "attributes": {
        "name": "Carl Joseph",
        "email": "carl@developer.com",
        "tier": "pro"
      },
      "links": {
        "self": "/api/v1/users/usr_9001",
        "tasks": "/api/v1/users/usr_9001/tasks"
      }
    }
  }
*/

// =============================================================================
// BEHIND THE SCENES
// =============================================================================
/*
  WHY STATELESSNESS ENABLES HORIZONTAL SCALING:
  When an API is 100% stateless:
  - Request 1 can hit Server A.
  - Request 2 can hit Server B.
  - Request 3 can hit Server C.
  Neither server needs shared session memory! A Load Balancer can freely distribute
  millions of requests across 50 server instances without any user noticing.
*/