'use client'

export interface AuthUser {
  id: string
  email: string
}

export interface AuthResponse {
  success: boolean
  user?: AuthUser
  error?: string
}

class AuthClient {
  async register(email: string, password: string): Promise<AuthResponse> {
    try {
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
      })

      const data = await response.json()

      if (!response.ok) {
        return { success: false, error: data.error || 'Registration failed' }
      }

      return { success: true, user: data.user }
    } catch (_error) {
      return { success: false, error: 'Network error' }
    }
  }

  async login(email: string, password: string): Promise<AuthResponse> {
    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
      })

      const data = await response.json()

      if (!response.ok) {
        return { success: false, error: data.error || 'Login failed' }
      }

      return { success: true, user: data.user }
    } catch (_error) {
      return { success: false, error: 'Network error' }
    }
  }

  async logout(): Promise<{ success: boolean }> {
    try {
      const response = await fetch('/api/auth/logout', {
        method: 'POST'
      })

      return { success: response.ok }
    } catch (_error) {
      return { success: false }
    }
  }

  async getCurrentUser(): Promise<AuthUser | null> {
    try {
      const response = await fetch('/api/auth/me')

      if (!response.ok) {
        return null
      }

      const data = await response.json()
      return data.user || null
    } catch (_error) {
      return null
    }
  }

  async refreshToken(): Promise<boolean> {
    try {
      const response = await fetch('/api/auth/refresh', {
        method: 'POST'
      })

      return response.ok
    } catch (_error) {
      return false
    }
  }
}

export const authClient = new AuthClient()