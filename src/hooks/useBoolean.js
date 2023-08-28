import { useCallback, useMemo, useState } from 'react'

export default function useBoolean() {
  const [boolean, setBoolean] = useState(false)

  const on = useCallback(() => {
    setBoolean(true)
  }, [])
  const off = useCallback(() => {
    setBoolean(false)
  }, [])
  const toggle = useCallback(() => {
    setBoolean(pre => !pre)
  }, [])
  const memoSetBoolean = useMemo(
    () => ({
      on,
      off,
      toggle,
    }),
    [off, on, toggle],
  )

  return [boolean, memoSetBoolean]
}
