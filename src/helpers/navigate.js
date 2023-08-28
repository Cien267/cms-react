import { useLocation } from '@tanstack/react-location'

export const useNavigateBack = () => {
  const location = useLocation()
  const onBack = () => location.history.back()

  return onBack
}
