import { prismaMock } from '@/__mocks__/prisma'
import { PrismaUserDatabase } from '@/lib/auth/prisma-database'
import { hashPassword } from '@/lib/auth/password'
import { createMockUser } from '@/__tests__/helpers/mockUser'

const mockUser = createMockUser({
  name: 'Test User',
  password: '$2a$12$hashedpassword'
})

describe('PrismaUserDatabase', () => {
  describe('findByEmail', () => {
    it('returns user when found', async () => {
      prismaMock.user.findUnique.mockResolvedValue(mockUser)

      const result = await PrismaUserDatabase.findByEmail('test@example.com')

      expect(result).toEqual(mockUser)
      expect(prismaMock.user.findUnique).toHaveBeenCalledWith({
        where: { email: 'test@example.com' },
      })
    })

    it('returns null when not found', async () => {
      prismaMock.user.findUnique.mockResolvedValue(null)

      const result = await PrismaUserDatabase.findByEmail('notfound@example.com')

      expect(result).toBeNull()
    })
  })

  describe('findById', () => {
    it('returns user when found', async () => {
      prismaMock.user.findUnique.mockResolvedValue(mockUser)

      const result = await PrismaUserDatabase.findById('user-123')

      expect(result).toEqual(mockUser)
      expect(prismaMock.user.findUnique).toHaveBeenCalledWith({
        where: { id: 'user-123' },
      })
    })

    it('returns null when not found', async () => {
      prismaMock.user.findUnique.mockResolvedValue(null)

      const result = await PrismaUserDatabase.findById('nonexistent')

      expect(result).toBeNull()
    })
  })

  describe('createUser', () => {
    it('creates user with hashed password', async () => {
      prismaMock.user.findUnique.mockResolvedValue(null)
      prismaMock.user.create.mockResolvedValue(mockUser)

      const result = await PrismaUserDatabase.createUser({
        email: 'new@example.com',
        password: 'password123',
        name: 'New User',
      })

      expect(result).toEqual(mockUser)
      expect(prismaMock.user.create).toHaveBeenCalledWith({
        data: expect.objectContaining({
          email: 'new@example.com',
          name: 'New User',
          password: expect.stringMatching(/^\$2[ayb]\$/),
        }),
      })
    })

    it('throws if user already exists', async () => {
      prismaMock.user.findUnique.mockResolvedValue(mockUser)

      await expect(
        PrismaUserDatabase.createUser({
          email: 'test@example.com',
          password: 'password123',
        })
      ).rejects.toThrow('User already exists')
    })
  })

  describe('validateUser', () => {
    it('returns user for valid credentials', async () => {
      const hashedPassword = await hashPassword('correctPassword')
      const userWithHash = createMockUser({ password: hashedPassword, name: 'Test User' })

      prismaMock.user.findUnique.mockResolvedValue(userWithHash)

      const result = await PrismaUserDatabase.validateUser('test@example.com', 'correctPassword')

      expect(result).toEqual(userWithHash)
    })

    it('returns null for invalid password', async () => {
      const hashedPassword = await hashPassword('correctPassword')
      const userWithHash = createMockUser({ password: hashedPassword, name: 'Test User' })

      prismaMock.user.findUnique.mockResolvedValue(userWithHash)

      const result = await PrismaUserDatabase.validateUser('test@example.com', 'wrongPassword')

      expect(result).toBeNull()
    })

    it('returns null for non-existent user', async () => {
      prismaMock.user.findUnique.mockResolvedValue(null)

      const result = await PrismaUserDatabase.validateUser('notfound@example.com', 'password')

      expect(result).toBeNull()
    })
  })

  describe('getUserCount', () => {
    it('returns the count of users', async () => {
      prismaMock.user.count.mockResolvedValue(5)

      const result = await PrismaUserDatabase.getUserCount()

      expect(result).toBe(5)
    })
  })

  describe('updateUser', () => {
    it('updates user data', async () => {
      const updatedUser = createMockUser({ name: 'Updated Name' })
      prismaMock.user.update.mockResolvedValue(updatedUser)

      const result = await PrismaUserDatabase.updateUser('user-123', { name: 'Updated Name' })

      expect(result).toEqual(updatedUser)
      expect(prismaMock.user.update).toHaveBeenCalledWith({
        where: { id: 'user-123' },
        data: { name: 'Updated Name' },
      })
    })
  })

  describe('deleteUser', () => {
    it('deletes user', async () => {
      prismaMock.user.delete.mockResolvedValue(mockUser)

      await PrismaUserDatabase.deleteUser('user-123')

      expect(prismaMock.user.delete).toHaveBeenCalledWith({
        where: { id: 'user-123' },
      })
    })
  })
})
