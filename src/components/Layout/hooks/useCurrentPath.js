import { useLocation } from '@tanstack/react-location'

export default function useCurrentPath() {
  const location = useLocation()
  return location.current.pathname
}
