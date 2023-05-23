import { useLayoutEffect, useRef } from 'react'

export const useLatest = (value: () => void) => {
  const valueRef = useRef(value)

  useLayoutEffect(() => {
    valueRef.current = value
  }, [value])

  return valueRef
}
