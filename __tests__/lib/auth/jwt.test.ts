import {
  generateAccessToken,
  generateRefreshToken,
  generateTokenPair,
  verifyAccessToken,
  verifyRefreshToken,
  decodeToken,
} from '@/lib/auth/jwt'

describe('JWT Utilities', () => {
  const testPayload = { userId: 'user-123', email: 'test@example.com' }

  describe('generateAccessToken', () => {
    it('generates a valid JWT', () => {
      const token = generateAccessToken(testPayload)

      expect(token).toBeTruthy()
      expect(token.split('.')).toHaveLength(3)
    })

    it('includes payload in token', () => {
      const token = generateAccessToken(testPayload)
      const decoded = decodeToken(token)

      expect(decoded?.userId).toBe(testPayload.userId)
      expect(decoded?.email).toBe(testPayload.email)
    })
  })

  describe('generateRefreshToken', () => {
    it('generates a valid JWT', () => {
      const token = generateRefreshToken(testPayload)

      expect(token).toBeTruthy()
      expect(token.split('.')).toHaveLength(3)
    })

    it('is different from access token', () => {
      const accessToken = generateAccessToken(testPayload)
      const refreshToken = generateRefreshToken(testPayload)

      expect(accessToken).not.toBe(refreshToken)
    })
  })

  describe('generateTokenPair', () => {
    it('returns both access and refresh tokens', () => {
      const tokens = generateTokenPair(testPayload)

      expect(tokens.accessToken).toBeTruthy()
      expect(tokens.refreshToken).toBeTruthy()
      expect(tokens.accessToken).not.toBe(tokens.refreshToken)
    })
  })

  describe('verifyAccessToken', () => {
    it('verifies a valid access token', () => {
      const token = generateAccessToken(testPayload)
      const payload = verifyAccessToken(token)

      expect(payload.userId).toBe(testPayload.userId)
      expect(payload.email).toBe(testPayload.email)
    })

    it('throws for invalid token', () => {
      expect(() => verifyAccessToken('invalid-token')).toThrow('Invalid access token')
    })

    it('throws for refresh token used as access token', () => {
      const refreshToken = generateRefreshToken(testPayload)

      expect(() => verifyAccessToken(refreshToken)).toThrow('Invalid access token')
    })

    it('throws for empty token', () => {
      expect(() => verifyAccessToken('')).toThrow('Invalid access token')
    })
  })

  describe('verifyRefreshToken', () => {
    it('verifies a valid refresh token', () => {
      const token = generateRefreshToken(testPayload)
      const payload = verifyRefreshToken(token)

      expect(payload.userId).toBe(testPayload.userId)
      expect(payload.email).toBe(testPayload.email)
    })

    it('throws for invalid token', () => {
      expect(() => verifyRefreshToken('invalid-token')).toThrow('Invalid refresh token')
    })

    it('throws for access token used as refresh token', () => {
      const accessToken = generateAccessToken(testPayload)

      expect(() => verifyRefreshToken(accessToken)).toThrow('Invalid refresh token')
    })
  })

  describe('decodeToken', () => {
    it('decodes token without verification', () => {
      const token = generateAccessToken(testPayload)
      const payload = decodeToken(token)

      expect(payload?.userId).toBe(testPayload.userId)
      expect(payload?.email).toBe(testPayload.email)
    })

    it('returns null for invalid token', () => {
      const payload = decodeToken('invalid')

      expect(payload).toBeNull()
    })

    it('includes exp and iat claims', () => {
      const token = generateAccessToken(testPayload)
      const payload = decodeToken(token)

      expect(payload?.exp).toBeDefined()
      expect(payload?.iat).toBeDefined()
    })
  })
})
