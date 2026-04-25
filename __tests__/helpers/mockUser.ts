import { UserRole, Gender, Prisma } from "@prisma/client";

export interface MockUser {
  id: string;
  email: string;
  password: string;
  name: string | null;
  displayName: string | null;
  avatarUrl: string | null;
  gender: Gender | null;
  tokenVersion: number;
  onboardingSeenAt: Date | null;
  emailPreferences: Prisma.JsonValue;
  role: UserRole;
  points: number;
  level: number;
  isBanned: boolean;
  banReason: string | null;
  messagingRestricted: boolean;
  messagingRestrictedAt: Date | null;
  messagingRestrictedReason: string | null;
  utmSource: string | null;
  utmMedium: string | null;
  utmCampaign: string | null;
  utmContent: string | null;
  utmTerm: string | null;
  gclid: string | null;
  fbclid: string | null;
  ttclid: string | null;
  referrer: string | null;
  landingPage: string | null;
  userAgent: string | null;
  ipCountry: string | null;
  language: string | null;
  timezone: string | null;
  isBot: boolean;
  botActive: boolean;
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
    tokenVersion: 0,
    onboardingSeenAt: null,
    emailPreferences: null,
    role: "USER" as UserRole,
    points: 0,
    level: 1,
    isBanned: false,
    banReason: null,
    messagingRestricted: false,
    messagingRestrictedAt: null,
    messagingRestrictedReason: null,
    utmSource: null,
    utmMedium: null,
    utmCampaign: null,
    utmContent: null,
    utmTerm: null,
    gclid: null,
    fbclid: null,
    ttclid: null,
    referrer: null,
    landingPage: null,
    userAgent: null,
    ipCountry: null,
    language: null,
    timezone: null,
    isBot: false,
    botActive: true,
    createdAt: new Date(),
    updatedAt: new Date(),
    ...overrides,
  };
}
