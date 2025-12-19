import { POST } from '@/app/api/auth/refresh/route'
import { NextRequest } from 'next/server'
import { prismaMock } from '@/__mocks__/prisma'
import { generateRefreshToken } from '@/lib/auth/jwt'
import { createMockUser } from '@/__tests__/helpers/mockUser'

const createRequest = (refreshToken?: string) => {
  const request = new NextRequest('http://localhost:3000/api/auth/refresh', {
    method: 'POST',
  })
  if (refreshToken) {
    request.cookies.set('refreshToken', refreshToken)
  }
  return request
}

const mockUser = createMockUser()

describe('POST /api/auth/refresh', () => {
  it('returns 401 if no refresh token provided', async () => {
    const request = createRequest()
    const response = await POST(request)

    expect(response.status).toBe(401)
    const data = await response.json()
    expect(data.error).toBe('No refresh token provided')
  })

  it('returns 401 for invalid refresh token', async () => {
    const request = createRequest('invalid-token')
    const response = await POST(request)

    expect(response.status).toBe(401)
    const data = await response.json()
    expect(data.error).toBe('Invalid refresh token')
  })

  it('returns 401 if user no longer exists', async () => {
    const refreshToken = generateRefreshToken({ userId: 'deleted-user', email: 'test@example.com' })
    prismaMock.user.findUnique.mockResolvedValue(null)

    const request = createRequest(refreshToken)
    const response = await POST(request)

    expect(response.status).toBe(401)
    const data = await response.json()
    expect(data.error).toBe('User not found')
  })

  it('returns 200 and sets new access token on success', async () => {
    const refreshToken = generateRefreshToken({ userId: 'user-123', email: 'test@example.com' })
    prismaMock.user.findUnique.mockResolvedValue(mockUser)

    const request = createRequest(refreshToken)
    const response = await POST(request)

    expect(response.status).toBe(200)

    const data = await response.json()
    expect(data.success).toBe(true)

    const accessTokenCookie = response.cookies.get('accessToken')
    expect(accessTokenCookie).toBeTruthy()
    expect(accessTokenCookie?.value).toBeTruthy()
  })

  it('does not set new refresh token (only access token)', async () => {
    const refreshToken = generateRefreshToken({ userId: 'user-123', email: 'test@example.com' })
    prismaMock.user.findUnique.mockResolvedValue(mockUser)

    const request = createRequest(refreshToken)
    const response = await POST(request)

    const cookies = response.cookies.getAll()
    const refreshTokenCookie = cookies.find(c => c.name === 'refreshToken')

    expect(refreshTokenCookie).toBeUndefined()
  })
})
