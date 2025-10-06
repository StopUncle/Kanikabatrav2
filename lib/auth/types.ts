export interface User {
  id: string
  email: string
  password: string
  name?: string | null
  createdAt: Date
  updatedAt: Date
}

export interface CreateUserData {
  email: string
  password: string
  name?: string
}

export interface LoginCredentials {
  email: string
  password: string
}

export interface UserSession {
  id: string
  email: string
}