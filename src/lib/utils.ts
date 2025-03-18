import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export const cn = (...inputs: ClassValue[]) => twMerge(clsx(inputs))

export const shuffle = <T>(items: T[]): T[] => {
  const newItems = [...items]

  for (let i = newItems.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[newItems[i], newItems[j]] = [newItems[j], newItems[i]]
  }

  return newItems
}
