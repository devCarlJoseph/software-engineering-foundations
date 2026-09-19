// =============================================================================
// FILE: 02-typescript-fundamentals/modules.ts
// TOPIC: TypeScript Modules (Exporting Types, Interfaces, and type-only syntax)
// =============================================================================

// Any file containing a top-level 'import' or 'export' is treated as a module.

// -----------------------------------------------------------------------------
// 1. DIRECT INLINE TYPE & INTERFACE EXPORTS
// -----------------------------------------------------------------------------

export interface DatabaseConfig {
  host: string;
  port: number;
  database: string;
}

export type AuthToken = string;

export type ExecutionEnvironment = "development" | "staging" | "production";

// -----------------------------------------------------------------------------
// 2. EXPORTING STANDARD VALUES ALONGSIDE TYPES
// -----------------------------------------------------------------------------

export const DEFAULT_PORT: number = 5432;

export function buildDatabaseUrl(config: DatabaseConfig): string {
  return `postgres://${config.host}:${config.port}/${config.database}`;
}

// -----------------------------------------------------------------------------
// 3. EXPLICIT TYPE-ONLY EXPORT SYNTAX (ES2020+ / TS 3.8+)
// -----------------------------------------------------------------------------
// 'export type' tells the TypeScript compiler that this item is strictly a type.
// It will be completely removed from the compiled JavaScript bundle.

type InternalSystemMetrics = {
  cpuUsage: number;
  memoryUsageMb: number;
};

// Explicit type-only export:
export type { InternalSystemMetrics };

// -----------------------------------------------------------------------------
// 4. REFERENCE: HOW CONSUMING FILES IMPORT THESE TYPES
// -----------------------------------------------------------------------------
/*
// In another TypeScript file (e.g., app.ts):

// Method A: Type-only import (guarantees zero JavaScript runtime footprint):
import type { DatabaseConfig, AuthToken } from "./modules";

// Method B: Mixed import of types and executable functions:
import { buildDatabaseUrl, DEFAULT_PORT, type ExecutionEnvironment } from "./modules";

const myConfig: DatabaseConfig = {
  host: "localhost",
  port: DEFAULT_PORT,
  database: "users_db",
};

const connectionString: string = buildDatabaseUrl(myConfig);
*/