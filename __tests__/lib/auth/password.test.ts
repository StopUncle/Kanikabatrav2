import { hashPassword, verifyPassword } from '@/lib/auth/password'

describe('Password Utilities', () => {
  describe('hashPassword', () => {
    it('hashes a password', async () => {
      const password = 'testPassword123'
      const hashed = await hashPassword(password)

      expect(hashed).not.toBe(password)
      expect(hashed).toMatch(/^\$2[ayb]\$.{56}$/)
    })

    it('produces different hashes for same password', async () => {
      const password = 'testPassword123'
      const hash1 = await hashPassword(password)
      const hash2 = await hashPassword(password)

      expect(hash1).not.toBe(hash2)
    })
  })

  describe('verifyPassword', () => {
    it('returns true for matching password', async () => {
      const password = 'testPassword123'
      const hashed = await hashPassword(password)
      const result = await verifyPassword(password, hashed)

      expect(result).toBe(true)
    })

    it('returns false for non-matching password', async () => {
      const password = 'testPassword123'
      const hashed = await hashPassword(password)
      const result = await verifyPassword('wrongPassword', hashed)

      expect(result).toBe(false)
    })

    it('returns false for empty password', async () => {
      const password = 'testPassword123'
      const hashed = await hashPassword(password)
      const result = await verifyPassword('', hashed)

      expect(result).toBe(false)
    })
  })
})
