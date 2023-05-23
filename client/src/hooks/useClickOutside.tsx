import { RefObject, useEffect } from 'react'
import { useLatest } from './useLatest'

export const useOutsideClick = (
  elementRef: RefObject<HTMLDivElement>,
  handler: () => void,
  attached = true,
) => {
  const latestHandler = useLatest(handler)

  useEffect(() => {
    if (!attached) return

    const handleClick = (e: Event) => {
      if (!elementRef.current) return
      if (!elementRef.current.contains(e.target as HTMLDivElement)) {
        latestHandler.current()
      }
    }

    setTimeout(() => document.addEventListener('click', handleClick), 0)

    return () => {
      document.removeEventListener('click', handleClick)
    }
  }, [elementRef, latestHandler, attached])
}
