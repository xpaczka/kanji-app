'use client'

import { useAppSessionStore } from '#/store/app-session'
import { useMemo } from 'react'

export default function SessionPageHeader() {
  const { sessionType } = useAppSessionStore((state) => state)

  const pageHeader = useMemo(
    () =>
      sessionType
        ? `${sessionType[0].toUpperCase()}${sessionType.slice(1)}`
        : null,
    [sessionType]
  )

  return <h1 className='text-lg'>{pageHeader ?? ''}</h1>
}
