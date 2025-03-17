import { DateTime } from 'luxon'
import { trpc } from '#/app/_trpc/client'
import { useSearchParams } from 'next/navigation'
import { useCallback, useEffect, useMemo, useState } from 'react'
import { useNavigation } from './router'
import {
  KanjiSessionSet,
  SessionItemEvaluation,
} from '#/components/flashcards/FlashcardsSessionSummary'
import { KanjiItemJlptLevel } from '#/database/schema'
import { useAppSessionStore } from '#/store/app-session'
import { v4 as uuid } from 'uuid'
import { ROUTES } from '#/constants/router'

export const useInitiateFlashcardsSession = () => {
  const { setSession } = useAppSessionStore((state) => state)
  const { navigate } = useNavigation()

  const initiateFlashcardsSessionHandler = useCallback(
    (level: KanjiItemJlptLevel | undefined) => {
      const sessionId = uuid()
      // TODO: Save level in Zustand and read this param from store
      const levelParam = level ? `?level=${level}` : ''

      setSession({
        sessionId,
        sessionType: 'flashcards',
        sessionParentUrl: ROUTES.flashcards,
      })

      navigate(`${ROUTES.flashcards}/${sessionId}${levelParam}`)
    },
    [navigate, setSession]
  )

  return { initiateFlashcardsSession: initiateFlashcardsSessionHandler }
}

export const useFlashcardsSession = () => {
  const params = useSearchParams()
  // TODO: Read value from state instead of param
  const level = params.get('level') as KanjiItemJlptLevel | undefined

  const { resetSession } = useAppSessionStore((state) => state)
  const { initiateFlashcardsSession } = useInitiateFlashcardsSession()

  const {
    data: kanjiSet,
    isLoading,
    refetch,
  } = trpc.flashcards.getFlashcardsSessionKanji.useQuery(level ?? undefined)

  const [kanjiIndex, setKanjiIndex] = useState(0)
  const [isRevealed, setIsRevealed] = useState(false)

  const [sessionCompleted, setSessionCompleted] = useState(false)
  const [sessionSet, setSessionSet] = useState<KanjiSessionSet[]>([])
  const [sessionStartTime, setSessionStartTime] = useState<DateTime | null>(
    null
  )

  // TODO: Read initial data from user preference
  const [showRomaji, setShowRomaji] = useState(false)

  useEffect(() => {
    setSessionStartTime(DateTime.now())
  }, [])

  const { navigate } = useNavigation()

  const evaluateKanjiHandler = useCallback(
    (evaluation: SessionItemEvaluation) => {
      if (!kanjiSet) return

      if (kanjiIndex === kanjiSet.length - 1) {
        setSessionCompleted(true)
      }

      setSessionSet((prev) => [
        ...prev,
        { kanji: kanjiSet[kanjiIndex].kanji, evaluation },
      ])

      setKanjiIndex((prev) => prev + 1)
      setIsRevealed(false)
    },
    [kanjiIndex, kanjiSet]
  )

  const resetSessionState = useCallback(() => {
    setKanjiIndex(0)
    setIsRevealed(false)
    setSessionCompleted(false)
    setSessionSet([])
    setSessionStartTime(DateTime.now())
  }, [])

  const newSessionHandler = useCallback(() => {
    resetSessionState()
    initiateFlashcardsSession(level)
    refetch()
  }, [resetSessionState, refetch, initiateFlashcardsSession, level])

  const endSessionHandler = useCallback(() => {
    navigate(ROUTES.flashcards)

    resetSessionState()
    resetSession()
  }, [navigate, resetSessionState, resetSession])

  return {
    kanjiSet,
    isLoading,
    kanjiIndex,
    isRevealed,
    setIsRevealed,
    sessionStartTime,
    sessionCompleted,
    sessionSet,
    showRomaji,
    setShowRomaji,
    evaluateKanji: evaluateKanjiHandler,
    newSession: newSessionHandler,
    endSession: endSessionHandler,
  }
}

export const useFlashcardsLevelChoice = (
  isDisabled: boolean,
  level?: KanjiItemJlptLevel
) => {
  const { initiateFlashcardsSession } = useInitiateFlashcardsSession()

  const flashcardsSessionHandler = useCallback(() => {
    if (isDisabled) return

    initiateFlashcardsSession(level)
  }, [level, isDisabled, initiateFlashcardsSession])

  return { startFlashcardsSession: flashcardsSessionHandler }
}

export const useFlashcardsSessionSummary = (
  sessionStartTime: DateTime | null
) => {
  const [sessionEndTime, setSessionEndTime] = useState<DateTime | null>(null)

  useEffect(() => {
    setSessionEndTime(DateTime.now())
  }, [])

  const timeSpent = useMemo(() => {
    if (!sessionStartTime || !sessionEndTime) return '0:00'

    const duration = sessionEndTime.diff(sessionStartTime, [
      'minutes',
      'seconds',
    ])

    const minutes = duration.minutes.toFixed(0)
    const seconds = duration.seconds.toFixed(0).padStart(2, '0')

    return `${minutes}:${seconds}`
  }, [sessionStartTime, sessionEndTime])

  return { timeSpent }
}
