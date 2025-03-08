import { NextResponse } from 'next/server'

type WeeklyProgress = {
  weekday: string
  learn: number
  games: number
}

type ProgressItem = {
  name: string
  value: number
}

type GamesOverview = {
  points: number
  favoriteGame: string
}

export type UserData = {
  learningOverview: ProgressItem[]
  dailyChallenges: ProgressItem[]
  milestones: ProgressItem[]
  gamesOverview: GamesOverview
  weeklyProgress: WeeklyProgress[]
}

const getUserData = (): UserData => ({
  learningOverview: [
    { name: 'Level progress', value: 40 },
    { name: 'Kanji proficiency', value: 60 },
  ],
  dailyChallenges: [
    { name: 'Complete 5 lessons', value: 20 },
    { name: 'Play 3 games', value: 66 },
  ],
  milestones: [
    { name: 'Earn 1000 XP', value: 60 },
    { name: 'Maintain a 7-day streak', value: 25 },
  ],
  gamesOverview: {
    points: 20000,
    favoriteGame: 'Memo',
  },
  weeklyProgress: [
    { weekday: 'Mon', learn: 186, games: 80 },
    { weekday: 'Tue', learn: 305, games: 200 },
    { weekday: 'Wed', learn: 237, games: 120 },
    { weekday: 'Thu', learn: 73, games: 190 },
    { weekday: 'Fri', learn: 209, games: 130 },
    { weekday: 'Sat', learn: 214, games: 140 },
    { weekday: 'Sun', learn: 32, games: 11 },
  ],
})

export const GET = async (): Promise<NextResponse<UserData>> => {
  const userData = getUserData()

  return NextResponse.json(userData, { status: 200 })
}
