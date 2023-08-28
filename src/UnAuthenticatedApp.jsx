import { useAuth } from '@/contexts/authContext'
import Login from '@/views/Login'

export default function UnauthenticatedApp() {
  const { login } = useAuth()

  return <Login onSubmit={login} />
}
