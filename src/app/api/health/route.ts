import { NextResponse } from 'next/server'

// GET /api/health - Health check endpoint
export async function GET() {
  const health = {
    status: 'healthy',
    timestamp: new Date().toISOString(),
    service: 'Knowledge Camp Global LMS',
    version: '1.0.0',
    environment: process.env.NODE_ENV || 'development',
    checks: {
      api: 'operational',
      database: 'not connected', // Would check actual DB connection in production
    }
  }

  return NextResponse.json(health, { status: 200 })
}
