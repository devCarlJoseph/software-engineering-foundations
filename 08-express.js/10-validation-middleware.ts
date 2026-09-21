/*
  ==============================================================================
  W3SCHOOLS-STYLE LEARNING GUIDE: Validation Middleware
  ==============================================================================

  1. WHAT IS VALIDATION MIDDLEWARE?
     Middleware that inspects incoming data (`req.body`, `req.params`, or `req.query`)
     against predefined schemas and rules BEFORE it reaches your controller.
     If data is invalid, it rejects the request early with a 400 Bad Request.

  2. REAL-LIFE ANALOGY:
     Embassy Visa Application Intake:
     - The clerk checks: "Is the passport copy signed? Is the photo 2x2? Is the fee paid?"
     - If anything is missing, the clerk returns your folder right at the window (400 Bad Request).
     - Only complete, valid folders reach the Ambassador for final approval (The Controller).

  3. JARGON BUSTER:
     - Schema Validation: Defining a contract of required fields, types, and constraints
       (using libraries like Zod, Joi, or express-validator).
     - Fail-Fast: Rejecting bad requests immediately at the border of your app
       to avoid wasting database queries and memory.
     - DTO Validation: Ensuring the shape of incoming JSON precisely matches expectations.
*/

// =============================================================================
// BAD PRACTICE: POLLUTING CONTROLLERS WITH MESSY MANUAL IF CHECKS
// =============================================================================
/*
  app.post("/tasks", (req, res) => {
    // 30 lines of messy nested if checks inside the controller:
    if (!req.body.title) return res.status(400)...;
    if (typeof req.body.title !== "string") return res.status(400)...;
    if (req.body.title.length < 3) return res.status(400)...;
    // Controller logic is lost inside validation noise!
  });
*/

// =============================================================================
// GOOD PRACTICE: SCHEMA-DRIVEN VALIDATION MIDDLEWARE (Zod-Style Pattern)
// =============================================================================

// 1. Defining a validation rule system
interface ValidationRule {
  field: string;
  validate: (val: unknown) => { valid: boolean; error?: string };
}

// 2. Schema definition for creating a Task
const CreateTaskSchema: ValidationRule[] = [
  {
    field: "title",
    validate: (val) => {
      if (typeof val !== "string" || val.trim().length === 0) {
        return { valid: false, error: "Title is required and must be a string." };
      }
      if (val.trim().length < 3) {
        return { valid: false, error: "Title must be at least 3 characters long." };
      }
      return { valid: true };
    },
  },
  {
    field: "priority",
    validate: (val) => {
      const allowed = ["low", "medium", "high"];
      if (val !== undefined && !allowed.includes(val as string)) {
        return { valid: false, error: `Priority must be one of: ${allowed.join(", ")}.` };
      }
      return { valid: true };
    },
  },
];

// 3. Generic Validation Middleware Factory
function validateBody(schema: ValidationRule[]) {
  return (
    req: { body: Record<string, unknown> },
    res: { status: (c: number) => { json: (d: unknown) => void } },
    next: () => void
  ) => {
    const errors: Record<string, string> = {};

    for (const rule of schema) {
      const value = req.body[rule.field];
      const result = rule.validate(value);
      if (!result.valid && result.error) {
        errors[rule.field] = result.error;
      }
    }

    // If any validation errors exist, fail fast!
    if (Object.keys(errors).length > 0) {
      res.status(400).json({
        success: false,
        message: "Validation Error: Request payload failed schema checks.",
        errors,
      });
      return;
    }

    // Payload is clean! Proceed to controller:
    next();
  };
}

// Helper to log responses
const mockHttpOut = {
  status: (code: number) => ({
    json: (body: unknown) => console.log(`[HTTP ${code} Response]:`, body),
  }),
};

const taskValidator = validateBody(CreateTaskSchema);

console.log("=== Scenario 1: Malformed Body (Missing Title & Invalid Priority) ===");
taskValidator(
  { body: { title: "Hi", priority: "urgent" } },
  mockHttpOut,
  () => console.log("Reached controller!")
);

console.log("\n=== Scenario 2: Valid Body ===");
taskValidator(
  { body: { title: "Implement JWT Middleware", priority: "high" } },
  mockHttpOut,
  () => console.log("[Task Controller]: Created task in database successfully!")
);

/*
  ------------------------------------------------------------------------------
  [EXPECTED OUTPUT IN TERMINAL]
  ------------------------------------------------------------------------------
  === Scenario 1: Malformed Body (Missing Title & Invalid Priority) ===
  [HTTP 400 Response]: {
    success: false,
    message: 'Validation Error: Request payload failed schema checks.',
    errors: {
      title: 'Title must be at least 3 characters long.',
      priority: 'Priority must be one of: low, medium, high.'
    }
  }

  === Scenario 2: Valid Body ===
  [Task Controller]: Created task in database successfully!
*/

// =============================================================================
// BEHIND THE SCENES: USING INDUSTRY LIBRARIES (Zod)
// =============================================================================
/*
  In production TypeScript backend apps, developers frequently use `zod`:

  import { z } from "zod";

  export const CreateTaskDto = z.object({
    title: z.string().min(3).max(100),
    priority: z.enum(["low", "medium", "high"]).default("medium"),
  });

  export const validate = (schema: z.ZodSchema) => (req, res, next) => {
    const result = schema.safeParse(req.body);
    if (!result.success) {
      return res.status(400).json({ errors: result.error.format() });
    }
    req.body = result.data; // Type-safe validated data!
    next();
  };
*/