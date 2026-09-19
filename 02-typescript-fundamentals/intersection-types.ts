// =============================================================================
// FILE: 02-typescript-fundamentals/intersection-types.ts
// TOPIC: Intersection Types (Combining multiple types using &)
// =============================================================================

// An intersection type combines multiple types into one.
// The resulting type has ALL the properties of every combined type.
// Syntax: TypeA & TypeB

// -----------------------------------------------------------------------------
// 1. COMBINING OBJECT TYPES
// -----------------------------------------------------------------------------

type Timestamped = {
  createdAt: Date;
  updatedAt: Date;
};

type Identifiable = {
  id: string;
};

// Entity combines Identifiable AND Timestamped:
type Entity = Identifiable & Timestamped;

const databaseRecord: Entity = {
  id: "rec_98213",
  createdAt: new Date(),
  updatedAt: new Date(),
};

// -----------------------------------------------------------------------------
// 2. EXTENDING APPLICATION DATA MODELS WITH INTERSECTIONS
// -----------------------------------------------------------------------------

type BasicUserProfile = {
  username: string;
  email: string;
};

type UserSecuritySettings = {
  twoFactorEnabled: boolean;
  roles: string[];
};

type AuditMetadata = {
  lastLoginIp: string;
};

// FullAdminUser requires EVERY property from all 3 types:
type FullAdminUser = BasicUserProfile & UserSecuritySettings & AuditMetadata;

const adminAccounts: FullAdminUser = {
  username: "carl_admin",
  email: "admin@enterprise.com",
  twoFactorEnabled: true,
  roles: ["superadmin", "billing"],
  lastLoginIp: "192.168.1.1",
};

// -----------------------------------------------------------------------------
// 3. PROPERTY CONFLICTS IN INTERSECTIONS (CREATES NEVER)
// -----------------------------------------------------------------------------
// If two types have the same property name with incompatible primitive types,
// the resulting property type becomes 'never' (making the type impossible to satisfy).

type TypeA = { value: string };
type TypeB = { value: number };

type Conflicting = TypeA & TypeB;

// const impossible: Conflicting = {
//   value: "text" // Error: Type 'string' is not assignable to type 'never'.
// };