/*
  ==============================================================================
  W3SCHOOLS-STYLE LEARNING GUIDE: TypeScript Utility Types
  ==============================================================================

  1. WHAT ARE UTILITY TYPES?
     TypeScript comes with built-in "tools" that take an existing type and
     transform it into a new type automatically.
     Instead of copying and pasting an interface 5 times to make different versions,
     you use a Utility Type to transform it in one line!

  2. REAL-LIFE ANALOGY:
     Photo Editing Filters. You take one original photo and apply filters:
     - Grayscale (`Readonly`): The colors are locked.
     - Crop (`Pick` / `Omit`): You keep only the parts you want.
     - Soft Blur (`Partial`): All the sharp edges become optional.

  3. JARGON BUSTER:
     - Partial<T>: Makes ALL properties optional (`?`).
     - Required<T>: Makes ALL properties mandatory (removes `?`).
     - Readonly<T>: Makes ALL properties locked from editing.
     - Pick<T, Keys>: Selects ONLY the listed properties.
     - Omit<T, Keys>: Drops the listed properties, keeping everything else.
     - Record<Keys, Type>: Builds a clean key-value dictionary map.
*/

// The Original Full User Model:
interface UserProfile {
  id: string;
  fullName: string;
  email: string;
  passwordHash: string;
  bio?: string; // Originally optional
}

// =============================================================================
// 1. PARTIAL<T> (PERFECT FOR UPDATE REQUESTS)
// =============================================================================
// When a user updates their profile, they don't submit everything again.
// They might only change their bio or email.

type UpdateProfileDto = Partial<UserProfile>;

const updateBioOnly: UpdateProfileDto = {
  bio: "Software Engineer & AI Enthusiast",
};
console.log("Updated Bio:", updateBioOnly.bio);

// =============================================================================
// 2. REQUIRED<T> (FORCING EVERYTHING TO EXIST)
// =============================================================================
// Removes all '?' optional flags:

type StrictProfile = Required<UserProfile>;

const completedProfile: StrictProfile = {
  id: "USR_101",
  fullName: "Carl Joseph",
  email: "carl@example.com",
  passwordHash: "$2a$12$secretHash",
  bio: "Must provide bio because of Required<T>!",
};
console.log("Strict Profile User:", completedProfile.fullName);

// =============================================================================
// 3. READONLY<T> (LOCKING AN OBJECT)
// =============================================================================

type FrozenProfile = Readonly<UserProfile>;
const lockedUser: FrozenProfile = completedProfile;
// lockedUser.fullName = "New Name"; // ERROR: Cannot assign to 'fullName' (read-only)

// =============================================================================
// 4. PICK<T, KEYS> (SELECT ONLY WHAT YOU NEED)
// =============================================================================
// On a public leader-board, we only need ID and Name:

type PublicLeaderboardEntry = Pick<UserProfile, "id" | "fullName">;

const leaderboardUser: PublicLeaderboardEntry = {
  id: "USR_101",
  fullName: "Carl Joseph",
};
console.log("Leaderboard Entry:", leaderboardUser.fullName);

// =============================================================================
// 5. OMIT<T, KEYS> (STRIP OUT SENSITIVE DATA)
// =============================================================================
// NEVER send passwordHash back in an API response! We OMIT it:

type SafeClientUser = Omit<UserProfile, "passwordHash">;

const safeResponse: SafeClientUser = {
  id: "USR_101",
  fullName: "Carl Joseph",
  email: "carl@example.com",
  bio: "Safe to send over network!",
};
console.log("Safe Client Email:", safeResponse.email);

// =============================================================================
// 6. RECORD<KEYS, TYPE> (STRONGLY-TYPED DICTIONARIES)
// =============================================================================
// Creates an object where keys must match specific strings:

type ServerEnvironment = "dev" | "staging" | "prod";

const serverUrls: Record<ServerEnvironment, string> = {
  dev: "http://localhost:3000",
  staging: "https://staging.api.com",
  prod: "https://api.com",
};

console.log("Production API URL:", serverUrls.prod);

/*
  ------------------------------------------------------------------------------
  [EXPECTED OUTPUT IN TERMINAL]
  ------------------------------------------------------------------------------
  Updated Bio: Software Engineer & AI Enthusiast
  Strict Profile User: Carl Joseph
  Leaderboard Entry: Carl Joseph
  Safe Client Email: carl@example.com
  Production API URL: https://api.com
*/

// =============================================================================
// TRY IT YOURSELF: DISASTER PREVENTED
// =============================================================================
// If someone tries to attach a password to SafeClientUser:
// const leakTest: SafeClientUser = {
//   id: "1",
//   fullName: "Carl",
//   email: "c@e.com",
//   passwordHash: "secret" // Not allowed!
// };
// -> TS Error: Object literal may only specify known properties, and 'passwordHash' does not exist in type 'SafeClientUser'.