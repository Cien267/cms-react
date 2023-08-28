import * as React from 'react'
import { useAuth } from './contexts/authContext'
import FullPageSpinner from './components/Page/FullPageSpinner'

const AuthenticatedApp = React.lazy(() =>
  import(/* webpackPrefetch: true */ './AuthenticatedApp'),
)
const UnauthenticatedApp = React.lazy(() => import('./UnAuthenticatedApp'))

export default function App() {
  const { user } = useAuth()

  return (
    <React.Suspense fallback={<FullPageSpinner />}>
      {user ? <AuthenticatedApp /> : <UnauthenticatedApp />}
    </React.Suspense>
  )
}
