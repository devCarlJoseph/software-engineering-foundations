/*
  ==============================================================================
  W3SCHOOLS-STYLE LEARNING GUIDE: Role-Based Access Control (RBAC)
  ==============================================================================

  1. WHAT IS RBAC?
     Role-Based Access Control is a method of restricting system access to
     authorized users based on their assigned roles (e.g. Admin, Manager, Member, Guest).
     Roles bundle permissions together, making security manageable at scale.

  2. REAL-LIFE ANALOGY:
     Company Office Keycards:
     - Janitor Keycard: Opens supply closets and all doors after hours.
     - Regular Employee Keycard: Opens main office and cafeteria.
     - Executive Keycard: Opens boardrooms and finance archives.
     Employees are assigned a role, and the role defines which doors unlock.

  3. JARGON BUSTER:
     - RBAC: Role-Based Access Control.
     - ABAC: Attribute-Based Access Control (even more granular, based on department, time of day).
     - Principle of Least Privilege: Users are given only the minimum permissions necessary.
     - 403 Forbidden: The canonical HTTP status code for RBAC authorization failures.
*/

// =============================================================================
// ROLE-BASED ACCESS CONTROL (RBAC) ENGINE IMPLEMENTATION
// =============================================================================

type UserRole = "admin" | "manager" | "member" | "guest";

type Permission =
  | "tasks:read"
  | "tasks:create"
  | "tasks:update"
  | "tasks:delete"
  | "users:manage";

// Mapping of Roles to their Permitted Actions
const ROLE_PERMISSIONS: Record<UserRole, Permission[]> = {
  admin: ["tasks:read", "tasks:create", "tasks:update", "tasks:delete", "users:manage"],
  manager: ["tasks:read", "tasks:create", "tasks:update"],
  member: ["tasks:read", "tasks:create"],
  guest: ["tasks:read"],
};

interface AuthenticatedUserContext {
  id: string;
  username: string;
  role: UserRole;
}

class RbacGuard {
  // Checks if a role has the required permission
  public static hasPermission(role: UserRole, permission: Permission): boolean {
    const permissions = ROLE_PERMISSIONS[role] ?? [];
    return permissions.includes(permission);
  }

  // Middleware factory requiring specific permission
  public static requirePermission(requiredPermission: Permission) {
    return (
      user: AuthenticatedUserContext,
      onDenied: (reason: string) => void,
      onGranted: () => void
    ) => {
      const isAllowed = this.hasPermission(user.role, requiredPermission);

      if (!isAllowed) {
        onDenied(
          `403 Forbidden: User '${user.username}' with role '${user.role}' lacks permission '${requiredPermission}'.`
        );
        return;
      }

      onGranted();
    };
  }
}

// ── TEST RUNS ────────────────────────────────────────────────────────────────
const adminUser: AuthenticatedUserContext = { id: "u1", username: "AdminCarl", role: "admin" };
const memberUser: AuthenticatedUserContext = { id: "u2", username: "MemberAna", role: "member" };

const deleteGuard = RbacGuard.requirePermission("tasks:delete");

console.log("=== Scenario 1: Member Attempts to DELETE Task ===");
deleteGuard(
  memberUser,
  (reason) => console.log("Result:", reason),
  () => console.log("Task successfully deleted!")
);

console.log("\n=== Scenario 2: Admin Attempts to DELETE Task ===");
deleteGuard(
  adminUser,
  (reason) => console.log("Result:", reason),
  () => console.log("Task successfully deleted by Admin!")
);

/*
  ------------------------------------------------------------------------------
  [EXPECTED OUTPUT IN TERMINAL]
  ------------------------------------------------------------------------------
  === Scenario 1: Member Attempts to DELETE Task ===
  Result: 403 Forbidden: User 'MemberAna' with role 'member' lacks permission 'tasks:delete'.

  === Scenario 2: Admin Attempts to DELETE Task ===
  Task successfully deleted by Admin!
*/

// =============================================================================
// BEHIND THE SCENES: RBAC ROUTE MOUNTING
// =============================================================================
/*
  In Express router:

  // GET is open to any authenticated member:
  taskRouter.get("/", requirePermission("tasks:read"), listTasks);

  // DELETE requires high-privilege permission:
  taskRouter.delete("/:id", requirePermission("tasks:delete"), deleteTask);
*/