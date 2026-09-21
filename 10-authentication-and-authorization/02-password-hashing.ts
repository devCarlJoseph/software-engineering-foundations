/*
  ==============================================================================
  W3SCHOOLS-STYLE LEARNING GUIDE: Password Hashing (Salt & Slow Hashes)
  ==============================================================================

  1. WHAT IS PASSWORD HASHING?
     A one-way cryptographic algorithm that transforms a plain-text password into
     a fixed-length string of characters (a hash).
     Crucially, it CANNOT be decrypted back into the original password!
     NEVER EVER store plain-text passwords in a database!

  2. REAL-LIFE ANALOGY:
     Baking a Chocolate Cake:
     - You mix flour, eggs, sugar, and cocoa, then bake it into a cake.
     - You CANNOT un-bake the cake to get the raw eggs and sugar back!
     - However, if you bake the exact same ingredients using the same recipe,
       you get the exact same cake. That is how password verification works!

  3. JARGON BUSTER:
     - Salt: A unique cryptographically random string generated per user and added
       to the password before hashing. Defeats Rainbow Table attacks!
     - Rainbow Table: A pre-computed dictionary table of millions of hashed passwords
       used by hackers to crack unsalted hashes instantly.
     - Work Factor / Cost / Rounds: How deliberately slow the algorithm runs.
       Making a hash take 100 milliseconds stops brute-force guessing dead in its tracks!
     - Industry Algorithms: bcrypt, Argon2 (recommended modern winner), scrypt.
*/

// =============================================================================
// BAD PRACTICE: PLAIN-TEXT OR FAST UNSALTED HASHES (MD5 / SHA-256)
// =============================================================================
/*
  // DANGER 1: Storing plain text:
  db.saveUser({ username: "carl", password: "Password123" }); // Fireable offense!

  // DANGER 2: Using MD5 or fast SHA-256:
  // Modern GPUs can calculate 50,000,000,000 SHA-256 hashes per second!
  // Hackers can crack standard passwords in seconds using lookup tables!
*/

// =============================================================================
// GOOD PRACTICE: SALTED, KEY-DERIVED PASSWORD HASHING (scrypt / bcrypt pattern)
// =============================================================================

import * as crypto from "node:crypto";

class PasswordHasher {
  // Generates a cryptographically secure 16-byte random salt
  public static generateSalt(): string {
    return crypto.randomBytes(16).toString("hex");
  }

  // Hashes password with salt using slow key derivation (crypto.scrypt)
  public static hashPassword(password: string, salt: string): Promise<string> {
    return new Promise((resolve, reject) => {
      // 64-byte key length with work cost parameters
      crypto.scrypt(password, salt, 64, (err, derivedKey) => {
        if (err) return reject(err);
        resolve(derivedKey.toString("hex"));
      });
    });
  }

  // Verifies an entered password against stored salt and hash using timing-safe comparison
  public static async verifyPassword(
    enteredPassword: string,
    storedSalt: string,
    storedHash: string
  ): Promise<boolean> {
    const enteredHash = await this.hashPassword(enteredPassword, storedSalt);

    // crypto.timingSafeEqual protects against Timing Attacks!
    const bufferA = Buffer.from(enteredHash, "hex");
    const bufferB = Buffer.from(storedHash, "hex");

    if (bufferA.length !== bufferB.length) return false;
    return crypto.timingSafeEqual(bufferA, bufferB);
  }
}

// ── DEMONSTRATION ────────────────────────────────────────────────────────────
async function runPasswordDemo() {
  console.log("=== 1. User Registration Flow ===");
  const plainPassword = "SuperSecretDevPassword2026!";
  const salt = PasswordHasher.generateSalt();
  const passwordHash = await PasswordHasher.hashPassword(plainPassword, salt);

  console.log("Plain Password:  ", plainPassword);
  console.log("Generated Salt:  ", salt);
  console.log("Stored DB Hash:  ", passwordHash.slice(0, 32) + "... (truncated)");

  console.log("\n=== 2. User Login Verification Flow ===");
  // Test A: Correct password
  const isCorrect = await PasswordHasher.verifyPassword("SuperSecretDevPassword2026!", salt, passwordHash);
  console.log("Login with CORRECT password?:", isCorrect ? "SUCCESS (Access Granted)" : "FAILED");

  // Test B: Incorrect password
  const isWrong = await PasswordHasher.verifyPassword("WrongPassword123", salt, passwordHash);
  console.log("Login with WRONG password?:  ", isWrong ? "SUCCESS" : "REJECTED (Access Denied)");
}

runPasswordDemo();

/*
  ------------------------------------------------------------------------------
  [EXPECTED OUTPUT IN TERMINAL]
  ------------------------------------------------------------------------------
  === 1. User Registration Flow ===
  Plain Password:   SuperSecretDevPassword2026!
  Generated Salt:   <32-character hex random string>
  Stored DB Hash:   <64-byte hex derived key>... (truncated)

  === 2. User Login Verification Flow ===
  Login with CORRECT password?: SUCCESS (Access Granted)
  Login with WRONG password?:   REJECTED (Access Denied)
*/

// =============================================================================
// BEHIND THE SCENES: TIMING ATTACKS EXPLAINED
// =============================================================================
/*
  Why use `crypto.timingSafeEqual()` instead of `hashA === hashB`?
  Standard string equality (`===`) exits early on the FIRST mismatched character:
  - If character 1 doesn't match: returns in 1 millisecond.
  - If 30 characters match and the 31st fails: returns in 3 milliseconds.
  Hackers can measure response times down to nanoseconds to guess hashes character
  by character! `timingSafeEqual` ALWAYS takes the exact same duration regardless!
*/