/*
  ==============================================================================
  W3SCHOOLS-STYLE LEARNING GUIDE: Node.js File System (`fs`)
  ==============================================================================

  1. WHAT IS THE FILE SYSTEM MODULE?
     The `node:fs` module allows Node.js to interact with the physical file system
     on your computer or server: creating, reading, updating, renaming, and deleting
     files and directories.

  2. REAL-LIFE ANALOGY:
     A Physical Filing Cabinet:
     - Synchronous (`fs.readFileSync`): A worker walks to the cabinet, searches
       through 10,000 folders while everyone else in the office stands frozen in line.
     - Asynchronous Promises (`fs/promises`): You give the filing clerk a request ticket,
       continue working on other tasks, and the clerk delivers the file when ready.

  3. JARGON BUSTER:
     - Async / Promises API (`fs/promises`): The modern, non-blocking way to handle files.
     - Buffer: A raw chunk of binary memory used to store file bytes.
     - Encoding (`utf-8`): Translating raw binary bytes into human-readable text.
     - Stream: Reading a massive file piece-by-piece rather than loading 4GB into RAM all at once.
*/

// =============================================================================
// BAD PRACTICE: BLOCKING SYNCHRONOUS I/O IN SERVER CODE
// =============================================================================
/*
  import * as fs from "fs";

  // DANGER: readFileSync stops the entire Node.js server until the disk responds!
  // Never use Sync methods in API request handlers!
  const content = fs.readFileSync("./large-file.json", "utf-8");
*/

// =============================================================================
// GOOD PRACTICE: USING PROMISE-BASED ASYNCHRONOUS FILE OPERATIONS
// =============================================================================

import * as fs from "node:fs/promises";
import * as path from "node:path";

async function demonstrateFileSystem(): Promise<void> {
  const tempDir = path.join(process.cwd(), "temp_demo");
  const sampleFilePath = path.join(tempDir, "user_log.txt");

  try {
    console.log("=== Node.js File System (fs/promises) Demo ===");

    // Step 1: Create a directory safely (recursive: true prevents error if it already exists)
    await fs.mkdir(tempDir, { recursive: true });
    console.log("[1] Created directory:", tempDir);

    // Step 2: Write a file asynchronously
    const initialLog = `[${new Date().toISOString()}] Server started.\n`;
    await fs.writeFile(sampleFilePath, initialLog, { encoding: "utf-8" });
    console.log("[2] Created and wrote to file:", sampleFilePath);

    // Step 3: Append data to existing file
    const appendedLog = `[${new Date().toISOString()}] User 'Carl' logged in successfully.\n`;
    await fs.appendFile(sampleFilePath, appendedLog, { encoding: "utf-8" });
    console.log("[3] Appended new log line.");

    // Step 4: Read file content
    const fileContents = await fs.readFile(sampleFilePath, { encoding: "utf-8" });
    console.log("\n=== Read File Contents ===");
    console.log(fileContents.trim());

    // Step 5: Clean up (remove test directory and files)
    await fs.rm(tempDir, { recursive: true, force: true });
    console.log("=== Cleanup Completed ===");
    console.log("[5] Deleted temp directory and files.");
  } catch (error) {
    console.error("[FS Error]:", error);
  }
}

demonstrateFileSystem();

/*
  ------------------------------------------------------------------------------
  [EXPECTED OUTPUT IN TERMINAL]
  ------------------------------------------------------------------------------
  === Node.js File System (fs/promises) Demo ===
  [1] Created directory: <path>\temp_demo
  [2] Created and wrote to file: <path>\temp_demo\user_log.txt
  [3] Appended new log line.

  === Read File Contents ===
  [<timestamp>] Server started.
  [<timestamp>] User 'Carl' logged in successfully.
  === Cleanup Completed ===
  [5] Deleted temp directory and files.
*/

// =============================================================================
// BEHIND THE SCENES: fs BEST PRACTICES
// =============================================================================
/*
  1. ALWAYS use `path.join()` or `path.resolve()` instead of string concatenation
     like `"folder/" + "file.txt"`. Windows uses backslashes (`\`), while Linux/Mac
     use forward slashes (`/`). `path.join` handles this automatically!
  2. ALWAYS specify encoding (`"utf-8"`) when reading text; otherwise, you get a raw <Buffer>.
  3. Use Streams (`fs.createReadStream`) for files larger than 50MB to save memory.
*/