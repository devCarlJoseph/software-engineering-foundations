/*
  ==============================================================================
  W3SCHOOLS-STYLE LEARNING GUIDE: Meaningful Naming
  ==============================================================================

  1. WHAT IS MEANINGFUL NAMING?
     Writing variable, function, and class names that instantly communicate
     their exact intent and purpose without requiring comments to decipher them.

  2. REAL-LIFE ANALOGY:
     Labeling spice containers in a bakery:
     - Bad Name: "powder_1", "temp_jar", "stuff" (You might bake garlic powder into cookies!).
     - Meaningful Name: "cinnamonPowder", "bakingSoda", "powderedSugar".

  3. JARGON BUSTER:
     - Magic Numbers: Raw, unexplained numbers (like `86400` or `1.12`) hardcoded in logic.
     - Mental Mapping: Forcing the reader to mentally translate cryptic letters
       (e.g., remembering that `d` means "days", `u` means "user").
     - Self-Documenting Code: Code that explains itself purely through expressive names.
*/

// =============================================================================
// BAD PRACTICE: CRYPTIC, LAZY NAMING
// =============================================================================
/*
  function chk(u: any, d: number) {
    const t = 86400; // What is 86400? Magic number!
    const diff = (Date.now() - u.la) / 1000;
    return diff > d * t && u.s === 1; // What is u.la? What is u.s === 1?
  }
*/

// =============================================================================
// GOOD PRACTICE: INTENT-REVEALING NAMES
// =============================================================================

// 1. Replace Magic Numbers with named constants:
const SECONDS_PER_MINUTE = 60;
const MINUTES_PER_HOUR = 60;
const HOURS_PER_DAY = 24;
const SECONDS_IN_A_DAY = SECONDS_PER_MINUTE * MINUTES_PER_HOUR * HOURS_PER_DAY; // 86400

// 2. Use domain names and boolean prefixes (is, has, can, should):
type UserAccount = {
  id: string;
  lastLoginTimestampMs: number;
  isAccountActive: boolean;
};

function hasUserBeenInactiveForDays(user: UserAccount, daysThreshold: number): boolean {
  const currentTimestampMs = Date.now();
  const elapsedSeconds = (currentTimestampMs - user.lastLoginTimestampMs) / 1000;
  const thresholdInSeconds = daysThreshold * SECONDS_IN_A_DAY;

  const isInactive = elapsedSeconds > thresholdInSeconds;

  return user.isAccountActive && isInactive;
}

const customerAccount: UserAccount = {
  id: "usr_4001",
  lastLoginTimestampMs: Date.now() - 5 * SECONDS_IN_A_DAY * 1000, // 5 days ago
  isAccountActive: true,
};

const shouldSendReminder = hasUserBeenInactiveForDays(customerAccount, 3);
console.log("Send inactive account reminder?:", shouldSendReminder);

/*
  ------------------------------------------------------------------------------
  [EXPECTED OUTPUT IN TERMINAL]
  ------------------------------------------------------------------------------
  Send inactive account reminder?: true
*/