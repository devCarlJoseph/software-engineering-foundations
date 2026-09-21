/*
  ==============================================================================
  W3SCHOOLS-STYLE LEARNING GUIDE: Express Request Body (`req.body`)
  ==============================================================================

  1. WHAT IS `req.body`?
     The request body contains data submitted by the client (such as a POST or PUT
     request when submitting a form, uploading data, or creating a user).
     By default in Express, `req.body` is `undefined` unless you use a body-parsing
     middleware like `express.json()`.

  2. REAL-LIFE ANALOGY:
     A Sealed Package Delivered to Your Door:
     - The envelope labels (`headers`, `url`): Anyone can read who it's from.
     - The contents inside the box (`body`): Requires a box-cutter tool (`express.json()`)
       to open, inspect, and parse the contents. Without that tool, the box remains sealed!

  3. JARGON BUSTER:
     - `express.json()`: Built-in middleware based on `body-parser` that parses incoming
       requests with `Content-Type: application/json`.
     - `express.urlencoded({ extended: true })`: Parses incoming requests from HTML forms.
     - Payload: The actual data payload delivered inside the body.
*/

// =============================================================================
// BAD PRACTICE: FORGETTING express.json()
// =============================================================================
/*
  const express = require("express");
  const app = express();

  // FORGOT: app.use(express.json());

  app.post("/api/tasks", (req, res) => {
    console.log(req.body.title); // ERROR! TypeError: Cannot read property of undefined!
  });
*/

// =============================================================================
// GOOD PRACTICE: SAFE BODY PARSING & CREATION DTO HANDLING
// =============================================================================

// DTO (Data Transfer Object) shape
interface CreateTaskDto {
  title: string;
  description?: string;
  priority: "low" | "medium" | "high";
}

interface StoredTask extends CreateTaskDto {
  id: string;
  createdAt: Date;
}

// In-memory collection
const taskStore: StoredTask[] = [];

// Middleware simulation: validates and parses JSON payload
function handleCreateTask(rawBody: unknown): { status: number; response: unknown } {
  // 1. Guard against empty body
  if (!rawBody || typeof rawBody !== "object") {
    return { status: 400, response: { error: "Request body is required and must be a JSON object." } };
  }

  const payload = rawBody as Record<string, unknown>;

  // 2. Validate required field: title
  if (typeof payload.title !== "string" || payload.title.trim().length === 0) {
    return { status: 400, response: { error: "Field 'title' is required and cannot be blank." } };
  }

  // 3. Validate priority enum
  const validPriorities = ["low", "medium", "high"];
  const priority = (payload.priority ?? "medium") as CreateTaskDto["priority"];
  if (!validPriorities.includes(priority)) {
    return { status: 400, response: { error: `Invalid priority. Must be one of: ${validPriorities.join(", ")}` } };
  }

  // 4. Create entity
  const newTask: StoredTask = {
    id: `task_${taskStore.length + 1}`,
    title: payload.title.trim(),
    description: typeof payload.description === "string" ? payload.description.trim() : undefined,
    priority,
    createdAt: new Date(),
  };

  taskStore.push(newTask);
  return { status: 201, response: { success: true, task: newTask } };
}

console.log("=== Scenario 1: Valid POST Request Body ===");
const validRequest = handleCreateTask({
  title: "Set up PostgreSQL Database",
  description: "Configure local docker container",
  priority: "high",
});
console.log(`[Status ${validRequest.status}]:`, validRequest.response);

console.log("\n=== Scenario 2: Invalid Request Body (Missing Title) ===");
const invalidRequest = handleCreateTask({
  priority: "low",
});
console.log(`[Status ${invalidRequest.status}]:`, invalidRequest.response);

/*
  ------------------------------------------------------------------------------
  [EXPECTED OUTPUT IN TERMINAL]
  ------------------------------------------------------------------------------
  === Scenario 1: Valid POST Request Body ===
  [Status 201]: {
    success: true,
    task: {
      id: 'task_1',
      title: 'Set up PostgreSQL Database',
      description: 'Configure local docker container',
      priority: 'high',
      createdAt: <Date>
    }
  }

  === Scenario 2: Invalid Request Body (Missing Title) ===
  [Status 400]: { error: "Field 'title' is required and cannot be blank." }
*/

// =============================================================================
// BEHIND THE SCENES: SETUP IN REAL EXPRESS APPS
// =============================================================================
/*
  In your app.ts:

  import express from "express";
  const app = express();

  // REQUIRED FOR POST/PUT/PATCH JSON BODIES:
  app.use(express.json());

  // REQUIRED IF PARSING STANDARD HTML FORM SUBMISSIONS:
  app.use(express.urlencoded({ extended: true }));
*/