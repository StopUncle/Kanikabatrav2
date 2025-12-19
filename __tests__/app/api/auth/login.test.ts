import { POST } from '@/app/api/auth/login/route'
import { NextRequest } from 'next/server'
import { prismaMock } from '@/__mocks__/prisma'
import { hashPassword } from '@/lib/auth/password'
import { createMockUser } from '@/__tests__/helpers/mockUser'

const createRequest = (body: object) =>
  new NextRequest('http://localhost:3000/api/auth/login', {
    method: 'POST',
    body: JSON.stringify(body),
    headers: { 'Content-Type': 'application/json' },
  })

describe('POST /api/auth/login', () => {
  it('returns 400 if email is missing', async () => {
    const request = createRequest({ password: 'password123' })
    const response = await POST(request)

    expect(response.status).toBe(400)
    const data = await response.json()
    expect(data.error).toContain('Email and password are required')
  })

  it('returns 400 if password is missing', async () => {
    const request = createRequest({ email: 'test@example.com' })
    const response = await POST(request)

    expect(response.status).toBe(400)
    const data = await response.json()
    expect(data.error).toContain('Email and password are required')
  })

  it('returns 401 for non-existent user', async () => {
    prismaMock.user.findUnique.mockResolvedValue(null)

    const request = createRequest({ email: 'nonexistent@example.com', password: 'password123' })
    const response = await POST(request)

    expect(response.status).toBe(401)
    const data = await response.json()
    expect(data.error).toBe('Invalid credentials')
  })

  it('returns 401 for wrong password', async () => {
    const hashedPassword = await hashPassword('correctPassword')
    prismaMock.user.findUnique.mockResolvedValue(createMockUser({
      password: hashedPassword
    }))

    const request = createRequest({ email: 'test@example.com', password: 'wrongPassword' })
    const response = await POST(request)

    expect(response.status).toBe(401)
    const data = await response.json()
    expect(data.error).toBe('Invalid credentials')
  })

  it('returns 200 and sets cookies on success', async () => {
    const hashedPassword = await hashPassword('correctPassword')
    prismaMock.user.findUnique.mockResolvedValue(createMockUser({
      password: hashedPassword
    }))

    const request = createRequest({ email: 'test@example.com', password: 'correctPassword' })
    const response = await POST(request)

    expect(response.status).toBe(200)

    const data = await response.json()
    expect(data.success).toBe(true)
    expect(data.user.id).toBe('user-123')
    expect(data.user.email).toBe('test@example.com')

    const cookies = response.cookies.getAll()
    expect(cookies.find(c => c.name === 'accessToken')).toBeTruthy()
    expect(cookies.find(c => c.name === 'refreshToken')).toBeTruthy()
  })

  it('does not expose password in response', async () => {
    const hashedPassword = await hashPassword('correctPassword')
    prismaMock.user.findUnique.mockResolvedValue(createMockUser({
      password: hashedPassword
    }))

    const request = createRequest({ email: 'test@example.com', password: 'correctPassword' })
    const response = await POST(request)
    const data = await response.json()

    expect(data.user.password).toBeUndefined()
  })
})
