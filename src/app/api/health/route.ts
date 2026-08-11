import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json({
    status: 'ok',
    platform: 'St. George Church - Sandbis Backend',
    timestamp: new Date().toISOString(),
  });
}
