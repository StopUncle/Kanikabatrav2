import { NextRequest, NextResponse } from 'next/server'
import fs from 'fs/promises'
import path from 'path'

// Simple file-based storage for presale emails
// In production, use a proper database
const PRESALE_FILE = path.join(process.cwd(), 'data', 'presale-list.json')

interface PresaleEntry {
  email: string
  option: 'kdp' | 'premium' | 'both'
  timestamp: string
  ip?: string
}

async function ensureDataDir() {
  const dataDir = path.join(process.cwd(), 'data')
  try {
    await fs.access(dataDir)
  } catch {
    await fs.mkdir(dataDir, { recursive: true })
  }
}

async function readPresaleList(): Promise<PresaleEntry[]> {
  try {
    const data = await fs.readFile(PRESALE_FILE, 'utf-8')
    return JSON.parse(data)
  } catch {
    return []
  }
}

async function writePresaleList(entries: PresaleEntry[]) {
  await ensureDataDir()
  await fs.writeFile(PRESALE_FILE, JSON.stringify(entries, null, 2))
}

export async function POST(req: NextRequest) {
  try {
    const { email, option } = await req.json()

    if (!email || !option) {
      return NextResponse.json(
        { error: 'Email and option are required' },
        { status: 400 }
      )
    }

    if (!['kdp', 'premium', 'both'].includes(option)) {
      return NextResponse.json(
        { error: 'Invalid option' },
        { status: 400 }
      )
    }

    // Get existing entries
    const entries = await readPresaleList()

    // Check if email already exists
    const existingIndex = entries.findIndex(e => e.email === email)

    const newEntry: PresaleEntry = {
      email,
      option,
      timestamp: new Date().toISOString(),
      ip: req.headers.get('x-forwarded-for') || req.headers.get('x-real-ip') || undefined
    }

    if (existingIndex >= 0) {
      // Update existing entry
      entries[existingIndex] = newEntry
    } else {
      // Add new entry
      entries.push(newEntry)
    }

    // Save updated list
    await writePresaleList(entries)

    // In production, also send a confirmation email here
    // await sendConfirmationEmail(email, option)

    return NextResponse.json({
      success: true,
      message: 'Successfully joined presale list',
      totalSubscribers: entries.length
    })

  } catch (error) {
    console.error('Presale signup error:', error)
    return NextResponse.json(
      { error: 'Failed to process signup' },
      { status: 500 }
    )
  }
}

export async function GET(req: NextRequest) {
  // Protected endpoint to view presale list (add auth in production)
  const authHeader = req.headers.get('authorization')

  // Simple auth check - in production use proper auth
  if (authHeader !== `Bearer ${process.env.ADMIN_SECRET}`) {
    return NextResponse.json(
      { error: 'Unauthorized' },
      { status: 401 }
    )
  }

  try {
    const entries = await readPresaleList()

    const stats = {
      total: entries.length,
      kdp: entries.filter(e => e.option === 'kdp').length,
      premium: entries.filter(e => e.option === 'premium').length,
      both: entries.filter(e => e.option === 'both').length,
      entries: process.env.NODE_ENV === 'development' ? entries : undefined
    }

    return NextResponse.json(stats)
  } catch (error) {
    console.error('Failed to read presale list:', error)
    return NextResponse.json(
      { error: 'Failed to fetch stats' },
      { status: 500 }
    )
  }
}