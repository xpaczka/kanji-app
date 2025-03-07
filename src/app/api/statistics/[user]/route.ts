import { NextResponse } from 'next/server'

export async function GET(request: Request) {
  const weeklyProgress = [
    { weekday: 'Mon', learn: 186, games: 80 },
    { weekday: 'Tue', learn: 305, games: 200 },
    { weekday: 'Wed', learn: 237, games: 120 },
    { weekday: 'Thu', learn: 73, games: 190 },
    { weekday: 'Fri', learn: 209, games: 130 },
    { weekday: 'Sat', learn: 214, games: 140 },
    { weekday: 'Sun', learn: 32, games: 11 },
  ]

  return NextResponse.json({ data: weeklyProgress }, { status: 200 })
}
