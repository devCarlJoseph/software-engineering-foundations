/*
  ==============================================================================
  W3SCHOOLS-STYLE LEARNING GUIDE: Code Organization
  ==============================================================================

  1. WHAT IS CODE ORGANIZATION?
     Structuring your codebase into logical folders, files, and modules so that
     every piece of code has a clear, predictable home. When your project grows,
     organized code lets any developer find what they need in seconds.

  2. REAL-LIFE ANALOGY:
     A Well-Organized Warehouse:
     - Bad Organization: All products — food, electronics, medicine — dumped in one big pile.
     - Good Organization: Aisle A = Food, Aisle B = Electronics, Aisle C = Medicine.
       Each aisle has labeled shelves. Any worker can find any product fast.

  3. JARGON BUSTER:
     - Barrel File (index.ts): A single file that re-exports everything from a folder.
       Instead of importing from 5 deep paths, you import from one place.
     - Feature-Based Structure: Organizing folders by FEATURE (e.g., /users, /orders)
       instead of by TYPE (e.g., /controllers, /services, /models).
     - Cohesion: Related code lives together. A "user" folder contains the user model,
       user service, and user controller — not scattered across separate folders.
     - Coupling: How dependent one module is on another. Low coupling = good.
       Changing the "orders" module shouldn't break the "users" module.
*/

// =============================================================================
// BAD PRACTICE: FLAT, UNSTRUCTURED FILE DUMPING
// =============================================================================
/*
  project/
  ├── userModel.ts
  ├── orderModel.ts
  ├── userController.ts
  ├── orderController.ts
  ├── userService.ts
  ├── orderService.ts
  ├── emailHelper.ts
  ├── dateHelper.ts
  └── constants.ts

  Problem: As the project grows to 100+ files, EVERYTHING is in the root.
  You can't tell which files belong to which feature.
*/

// =============================================================================
// GOOD PRACTICE: FEATURE-BASED FOLDER STRUCTURE
// =============================================================================
/*
  Recommended Folder Layout:

  src/
  ├── modules/
  │   ├── users/
  │   │   ├── user.model.ts       <- Data shape for "User"
  │   │   ├── user.service.ts     <- Business logic for users
  │   │   ├── user.controller.ts  <- HTTP handler for users
  │   │   └── index.ts            <- Barrel file: re-exports all user pieces
  │   ├── orders/
  │   │   ├── order.model.ts
  │   │   ├── order.service.ts
  │   │   ├── order.controller.ts
  │   │   └── index.ts
  ├── shared/
  │   ├── utils/
  │   │   ├── date.util.ts        <- Reusable date helpers
  │   │   └── currency.util.ts    <- Reusable currency formatters
  │   └── constants.ts            <- App-wide constants
  └── main.ts                     <- Entry point
*/

// =============================================================================
// DEMO: Simulating Feature-Based Organization in a Single File
// =============================================================================

// ── MODULE: shared/constants ─────────────────────────────────────────────────
const APP_NAME = "TaskFlow";
const MAX_TASKS_PER_USER = 50;

// ── MODULE: shared/utils/date.util ───────────────────────────────────────────
class DateUtil {
  public static toReadableDate(date: Date): string {
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  }
}

// ── MODULE: tasks/task.model ─────────────────────────────────────────────────
type Task = {
  id: string;
  title: string;
  createdAt: Date;
  isComplete: boolean;
};

// ── MODULE: tasks/task.service ───────────────────────────────────────────────
class TaskService {
  private tasks: Task[] = [];

  public addTask(title: string): Task {
    if (this.tasks.length >= MAX_TASKS_PER_USER) {
      throw new Error(`Cannot exceed ${MAX_TASKS_PER_USER} tasks per user.`);
    }

    const newTask: Task = {
      id: `task_${this.tasks.length + 1}`,
      title,
      createdAt: new Date(),
      isComplete: false,
    };

    this.tasks.push(newTask);
    return newTask;
  }

  public getTaskSummaries(): string[] {
    return this.tasks.map(
      (task) =>
        `[${task.isComplete ? "✓" : " "}] ${task.title} (Created: ${DateUtil.toReadableDate(task.createdAt)})`
    );
  }
}

// ── MODULE: tasks/task.controller ────────────────────────────────────────────
class TaskControllers {
  constructor(private service: TaskService) {}

  public handleCreateTask(title: string): void {
    const task = this.service.addTask(title);
    console.log(`[${APP_NAME}]: Created task "${task.title}" with ID ${task.id}`);
  }

  public handleListTasks(): void {
    const summaries = this.service.getTaskSummaries();
    console.log(`\n[${APP_NAME}]: Your Tasks:`);
    summaries.forEach((summary) => console.log(`  ${summary}`));
  }
}

// ── ENTRY POINT (main.ts) ────────────────────────────────────────────────────
const taskServices = new TaskService();
const taskController = new TaskController(taskServices);

taskController.handleCreateTask("Set up project repository");
taskController.handleCreateTask("Design database schema");
taskController.handleListTasks();

/*
  ------------------------------------------------------------------------------
  [EXPECTED OUTPUT IN TERMINAL]
  ------------------------------------------------------------------------------
  [TaskFlow]: Created task "Set up project repository" with ID task_1
  [TaskFlow]: Created task "Design database schema" with ID task_2

  [TaskFlow]: Your Tasks:
    [ ] Set up project repository (Created: September 20, 2026)
    [ ] Design database schema (Created: September 20, 2026)
*/

// =============================================================================
// BEHIND THE SCENES
// =============================================================================
/*
  WHY FEATURE-BASED OVER TYPE-BASED?

  Type-Based (old way):           Feature-Based (modern way):
  ├── controllers/                ├── users/
  │   ├── userController.ts       │   ├── user.model.ts
  │   └── orderController.ts      │   ├── user.service.ts
  ├── services/                   │   └── user.controller.ts
  │   ├── userService.ts          ├── orders/
  │   └── orderService.ts         │   ├── order.model.ts

  With Type-Based, adding a "payments" feature means touching 3+ folders.
  With Feature-Based, you just create ONE new "payments/" folder.

  BARREL FILE EXAMPLE (index.ts):
  ─────────────────────────────────
  // modules/users/index.ts
  export { UserModel } from "./user.model";
  export { UserService } from "./user.service";
  export { UserController } from "./user.controller";

  // Now anywhere else in the app, instead of:
  // import { UserService } from "../modules/users/user.service";
  // You just write:
  // import { UserService } from "../modules/users";
*/