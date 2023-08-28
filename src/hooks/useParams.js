import { useMatch } from '@tanstack/react-location'

export function useParams() {
  const { params } = useMatch()
  return params
}
