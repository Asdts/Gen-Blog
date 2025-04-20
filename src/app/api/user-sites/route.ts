import { NextRequest, NextResponse } from 'next/server'
import connectDB from '@/connection/dbConn'
import MainModel from '@/model/main'

export async function POST(req: NextRequest) {
  await connectDB()

  const { sessionId } = await req.json()

  if (!sessionId) {
    return NextResponse.json({ error: 'Missing sessionId' }, { status: 400 })
  }

  try {
    const sites = await MainModel.find({ sessionId })
      .sort({ createdAt: -1 })
      .select('_id title slug fullPath createdAt')
      .lean()

    return NextResponse.json({ sites }, { status: 200 })
  } catch (err) {
    console.error('🔴 Failed to fetch user sites:', err)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
