import { UserRole, Prisma } from '@prisma/client'

export interface MockUser {
  id: string
  email: string
  password: string
  name: string | null
  displayName: string | null
  avatarUrl: string | null
  emailPreferences: Prisma.JsonValue
  role: UserRole
  createdAt: Date
  updatedAt: Date
}

export function createMockUser(overrides: Partial<MockUser> = {}): MockUser {
  return {
    id: 'user-123',
    email: 'test@example.com',
    password: 'hashedPassword',
    name: null,
    displayName: null,
    avatarUrl: null,
    emailPreferences: null,
    role: 'USER' as UserRole,
    createdAt: new Date(),
    updatedAt: new Date(),
    ...overrides
  }
}
