import { User, CreateUserData } from './types'
import { hashPassword, verifyPassword } from './password'

// Simple in-memory database for demonstration
// In production, replace with your preferred database (MongoDB, PostgreSQL, etc.)

// Use global to persist data in development (Next.js hot reload)
declare global {
  // eslint-disable-next-line no-var
  var __users: User[] | undefined
  // eslint-disable-next-line no-var
  var __userIdCounter: number | undefined
}

// Initialize global storage
if (!global.__users) {
  global.__users = []
}
if (!global.__userIdCounter) {
  global.__userIdCounter = 1
}

const users = global.__users
let userIdCounter = global.__userIdCounter

export class UserDatabase {
  static async findByEmail(email: string): Promise<User | null> {
    const user = users.find((u: User) => u.email === email)
    return user || null
  }

  static async findById(id: string): Promise<User | null> {
    const user = users.find((u: User) => u.id === id)
    return user || null
  }

  static async createUser(userData: CreateUserData): Promise<User> {
    const existingUser = await this.findByEmail(userData.email)
    if (existingUser) {
      throw new Error('User already exists')
    }

    const hashedPassword = await hashPassword(userData.password)
    const now = new Date()

    const user: User = {
      id: userIdCounter.toString(),
      email: userData.email,
      password: hashedPassword,
      createdAt: now,
      updatedAt: now
    }

    userIdCounter++
    global.__userIdCounter = userIdCounter
    users.push(user)
    global.__users = users

    return user
  }

  static async validateUser(email: string, password: string): Promise<User | null> {
    const user = await this.findByEmail(email)
    if (!user) {
      return null
    }

    const isValid = await verifyPassword(password, user.password)
    return isValid ? user : null
  }

  static async getUserCount(): Promise<number> {
    return users.length
  }

  // For testing/development only
  static clearAllUsers(): void {
    global.__users = []
    global.__userIdCounter = 1
  }
}