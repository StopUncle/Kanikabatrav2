import { PrismaClient } from '@prisma/client'
import { User, CreateUserData } from './types'
import { hashPassword, verifyPassword } from './password'

// Use global to persist Prisma client in development (Next.js hot reload)
declare global {
  // eslint-disable-next-line no-var
  var prisma: PrismaClient | undefined
}

const prisma = global.prisma || new PrismaClient()

if (process.env.NODE_ENV !== 'production') {
  global.prisma = prisma
}

export class PrismaUserDatabase {
  static async findByEmail(email: string): Promise<User | null> {
    const user = await prisma.user.findUnique({
      where: { email },
    })
    return user
  }

  static async findById(id: string): Promise<User | null> {
    const user = await prisma.user.findUnique({
      where: { id },
    })
    return user
  }

  static async createUser(userData: CreateUserData): Promise<User> {
    const existingUser = await this.findByEmail(userData.email)
    if (existingUser) {
      throw new Error('User already exists')
    }

    const hashedPassword = await hashPassword(userData.password)

    const user = await prisma.user.create({
      data: {
        email: userData.email,
        password: hashedPassword,
        name: userData.name,
      },
    })

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
    return await prisma.user.count()
  }

  static async updateUser(id: string, data: Partial<User>): Promise<User> {
    const user = await prisma.user.update({
      where: { id },
      data,
    })
    return user
  }

  static async deleteUser(id: string): Promise<void> {
    await prisma.user.delete({
      where: { id },
    })
  }
}

export default prisma