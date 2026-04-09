import { UserRole, Gender, Prisma } from "@prisma/client";

export interface MockUser {
  id: string;
  email: string;
  password: string;
  name: string | null;
  displayName: string | null;
  avatarUrl: string | null;
  gender: Gender | null;
  emailPreferences: Prisma.JsonValue;
  role: UserRole;
  points: number;
  level: number;
  isBanned: boolean;
  banReason: string | null;
  createdAt: Date;
  updatedAt: Date;
}

export function createMockUser(overrides: Partial<MockUser> = {}): MockUser {
  return {
    id: "user-123",
    email: "test@example.com",
    password: "hashedPassword",
    name: null,
    displayName: null,
    avatarUrl: null,
    gender: null,
    emailPreferences: null,
    role: "USER" as UserRole,
    points: 0,
    level: 1,
    isBanned: false,
    banReason: null,
    createdAt: new Date(),
    updatedAt: new Date(),
    ...overrides,
  };
}
