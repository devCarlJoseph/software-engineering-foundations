/*
  ==============================================================================
  W3SCHOOLS-STYLE LEARNING GUIDE: REST API Validation & Input Sanitization
  ==============================================================================

  1. WHAT IS API VALIDATION?
     Verifying that data submitted by a client adheres to strict structural,
     syntactical, and business logic constraints before being processed.
     The first rule of security: NEVER trust client input!

  2. REAL-LIFE ANALOGY:
     The TSA Security Screener at an Airport:
     - No luggage goes onto the airplane without passing through the X-ray scanner.
     - If a passenger tries to bring a prohibited item (invalid field type or SQL string),
       they are halted before they ever get near the plane (database).

  3. JARGON BUSTER:
     - Syntactic Validation: "Is the email string formatted like `name@domain.com`?"
     - Semantic / Business Validation: "Does the referenced `projectId` actually exist in our database?"
     - Sanitization: Stripping malicious HTML tags or script injection from strings (`<script>`).
     - HTTP 422 Unprocessable Entity: Often used for semantic validation failures where
       syntax is valid JSON, but the data fails business rules.
*/

// =============================================================================
// ROBUST SCHEMA VALIDATOR DEMONSTRATION
// =============================================================================

interface ValidationFailure {
  field: string;
  message: string;
}

interface ValidationResult<T> {
  isValid: boolean;
  errors: ValidationFailure[];
  sanitizedData?: T;
}

interface NewTaskPayload {
  title: string;
  priority: "low" | "medium" | "high";
  dueDate: string;
}

function validateNewTaskPayload(raw: unknown): ValidationResult<NewTaskPayload> {
  const errors: ValidationFailure[] = [];

  if (!raw || typeof raw !== "object") {
    return {
      isValid: false,
      errors: [{ field: "body", message: "Request body must be a valid JSON object." }],
    };
  }

  const payload = raw as Record<string, unknown>;

  // 1. Validate & Sanitize 'title'
  let sanitizedTitle = "";
  if (typeof payload.title !== "string" || payload.title.trim().length === 0) {
    errors.push({ field: "title", message: "Field 'title' is required and cannot be blank." });
  } else {
    sanitizedTitle = payload.title.trim();
    if (sanitizedTitle.length < 3 || sanitizedTitle.length > 100) {
      errors.push({ field: "title", message: "Title length must be between 3 and 100 characters." });
    }
  }

  // 2. Validate 'priority'
  const validPriorities = ["low", "medium", "high"];
  const priority = (payload.priority ?? "medium") as NewTaskPayload["priority"];
  if (!validPriorities.includes(priority)) {
    errors.push({ field: "priority", message: `Priority must be one of: ${validPriorities.join(", ")}.` });
  }

  // 3. Validate 'dueDate' (Must be a future ISO date string)
  let validDueDate = "";
  if (typeof payload.dueDate !== "string") {
    errors.push({ field: "dueDate", message: "Field 'dueDate' is required and must be an ISO date string." });
  } else {
    const parsedDate = new Date(payload.dueDate);
    if (isNaN(parsedDate.getTime())) {
      errors.push({ field: "dueDate", message: "Field 'dueDate' must be a valid ISO date." });
    } else if (parsedDate.getTime() < Date.now()) {
      errors.push({ field: "dueDate", message: "Field 'dueDate' cannot be in the past." });
    } else {
      validDueDate = parsedDate.toISOString();
    }
  }

  if (errors.length > 0) {
    return { isValid: false, errors };
  }

  return {
    isValid: true,
    errors: [],
    sanitizedData: {
      title: sanitizedTitle,
      priority,
      dueDate: validDueDate,
    },
  };
}

console.log("=== Scenario 1: Malformed Submission ===");
const badSubmission = validateNewTaskPayload({
  title: "  ",
  priority: "super-urgent",
  dueDate: "2020-01-01T00:00:00Z", // Past date!
});
console.log("Validation Result (Invalid):", badSubmission);

console.log("\n=== Scenario 2: Clean Submission ===");
const goodSubmission = validateNewTaskPayload({
  title: "  Build Task Management API  ", // Leading/trailing whitespace gets sanitized
  priority: "high",
  dueDate: new Date(Date.now() + 86400000 * 7).toISOString(), // 7 days in future
});
console.log("Validation Result (Valid):", goodSubmission);

/*
  ------------------------------------------------------------------------------
  [EXPECTED OUTPUT IN TERMINAL]
  ------------------------------------------------------------------------------
  === Scenario 1: Malformed Submission ===
  Validation Result (Invalid): {
    isValid: false,
    errors: [
      { field: 'title', message: "Field 'title' is required and cannot be blank." },
      { field: 'priority', message: 'Priority must be one of: low, medium, high.' },
      { field: 'dueDate', message: "Field 'dueDate' cannot be in the past." }
    ]
  }

  === Scenario 2: Clean Submission ===
  Validation Result (Valid): {
    isValid: true,
    errors: [],
    sanitizedData: {
      title: 'Build Task Management API',
      priority: 'high',
      dueDate: '<Future ISO Timestamp>'
    }
  }
*/

// =============================================================================
// BEHIND THE SCENES: VALIDATION HTTP STATUS RULES
// =============================================================================
/*
  When validation fails:
  - Return HTTP 400 (Bad Request) or HTTP 422 (Unprocessable Entity).
  - Include an array of all field errors so the client UI can display
    error highlights under each invalid field simultaneously in one round trip!
*/