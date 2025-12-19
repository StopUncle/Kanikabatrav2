import jwt from 'jsonwebtoken'

// SECURITY: Validate JWT secrets at startup - never use insecure defaults in production
function getJwtSecret(): string {
  const secret = process.env.JWT_SECRET
  if (!secret) {
    if (process.env.NODE_ENV === 'production') {
      throw new Error('CRITICAL: JWT_SECRET environment variable is required in production')
    }
    console.warn('WARNING: Using insecure default JWT_SECRET - set JWT_SECRET in environment')
    return 'dev-only-secret-do-not-use-in-production'
  }
  return secret
}

function getJwtRefreshSecret(): string {
  const secret = process.env.JWT_REFRESH_SECRET
  if (!secret) {
    if (process.env.NODE_ENV === 'production') {
      throw new Error('CRITICAL: JWT_REFRESH_SECRET environment variable is required in production')
    }
    console.warn('WARNING: Using insecure default JWT_REFRESH_SECRET - set JWT_REFRESH_SECRET in environment')
    return 'dev-only-refresh-secret-do-not-use-in-production'
  }
  return secret
}

const JWT_SECRET = getJwtSecret()
const JWT_REFRESH_SECRET = getJwtRefreshSecret()

export interface JWTPayload {
  userId: string
  email: string
  iat?: number
  exp?: number
}

export interface TokenPair {
  accessToken: string
  refreshToken: string
}

// Generate access token (15 minutes)
export function generateAccessToken(payload: Omit<JWTPayload, 'iat' | 'exp'>): string {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: '15m' })
}

// Generate refresh token (7 days)
export function generateRefreshToken(payload: Omit<JWTPayload, 'iat' | 'exp'>): string {
  return jwt.sign(payload, JWT_REFRESH_SECRET, { expiresIn: '7d' })
}

// Generate both tokens
export function generateTokenPair(payload: Omit<JWTPayload, 'iat' | 'exp'>): TokenPair {
  return {
    accessToken: generateAccessToken(payload),
    refreshToken: generateRefreshToken(payload)
  }
}

// Verify access token
export function verifyAccessToken(token: string): JWTPayload {
  try {
    return jwt.verify(token, JWT_SECRET) as JWTPayload
  } catch (_error) {
    throw new Error('Invalid access token')
  }
}

// Verify refresh token
export function verifyRefreshToken(token: string): JWTPayload {
  try {
    return jwt.verify(token, JWT_REFRESH_SECRET) as JWTPayload
  } catch (_error) {
    throw new Error('Invalid refresh token')
  }
}

// Decode token without verification (for expired tokens)
export function decodeToken(token: string): JWTPayload | null {
  try {
    return jwt.decode(token) as JWTPayload
  } catch {
    return null
  }
}