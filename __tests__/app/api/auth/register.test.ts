import { POST } from '@/app/api/auth/register/route'
import { NextRequest } from 'next/server'
import { prismaMock } from '@/__mocks__/prisma'
import { createMockUser } from '@/__tests__/helpers/mockUser'

const createRequest = (body: object) =>
  new NextRequest('http://localhost:3000/api/auth/register', {
    method: 'POST',
    body: JSON.stringify(body),
    headers: { 'Content-Type': 'application/json' },
  })

const mockUser = createMockUser({
  id: 'new-user-id',
  email: 'new@example.com',
  password: '$2a$12$hashed'
})

describe('POST /api/auth/register', () => {
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

  it('returns 400 if password is too short', async () => {
    const request = createRequest({ email: 'test@example.com', password: 'short' })
    const response = await POST(request)

    expect(response.status).toBe(400)
    const data = await response.json()
    expect(data.error).toContain('8 characters')
  })

  it('returns 400 for invalid email format', async () => {
    const request = createRequest({ email: 'invalid-email', password: 'password123' })
    const response = await POST(request)

    expect(response.status).toBe(400)
    const data = await response.json()
    expect(data.error).toContain('Invalid email format')
  })

  it('returns 409 if user already exists', async () => {
    prismaMock.user.findUnique.mockResolvedValue(createMockUser({
      id: 'existing-user'
    }))

    const request = createRequest({ email: 'test@example.com', password: 'password123' })
    const response = await POST(request)

    expect(response.status).toBe(409)
    const data = await response.json()
    expect(data.error).toContain('already exists')
  })

  it('returns 201 and sets cookies on success', async () => {
    prismaMock.user.findUnique.mockResolvedValue(null)
    prismaMock.user.create.mockResolvedValue(mockUser)

    const request = createRequest({ email: 'new@example.com', password: 'password123' })
    const response = await POST(request)

    expect(response.status).toBe(201)

    const data = await response.json()
    expect(data.success).toBe(true)
    expect(data.user.email).toBe('new@example.com')

    const cookies = response.cookies.getAll()
    expect(cookies.find(c => c.name === 'accessToken')).toBeTruthy()
    expect(cookies.find(c => c.name === 'refreshToken')).toBeTruthy()
  })

  it('normalizes email to lowercase', async () => {
    prismaMock.user.findUnique.mockResolvedValue(null)
    prismaMock.user.create.mockResolvedValue(createMockUser({
      email: 'test@example.com'
    }))

    const request = createRequest({ email: 'TEST@EXAMPLE.COM', password: 'password123' })
    await POST(request)

    expect(prismaMock.user.create).toHaveBeenCalledWith({
      data: expect.objectContaining({
        email: 'test@example.com',
      }),
    })
  })
})
