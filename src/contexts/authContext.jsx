import * as React from 'react'
import useAsync from '@/hooks/useAsync'
import * as authService from '@/services/authService'

import { FullPageErrorFallback, FullPageSpinner } from '@/components/Page'

async function bootstrapAppData() {
  let user = null

  const token = await authService.getToken()
  if (token) {
    user = await authService.getUser({ token })
  }
  return { user, token }
}

const AuthContext = React.createContext()
AuthContext.displayName = 'AuthContext'

function AuthProvider(props) {
  const {
    data: authInfo,
    status,
    error,
    isLoading,
    isIdle,
    isError,
    isSuccess,
    run,
    setData,
  } = useAsync()

  React.useEffect(() => {
    const appDataPromise = bootstrapAppData()
    run(appDataPromise)
  }, [run])

  const login = React.useCallback(
    form => authService.login(form).then(user => setData(user)),
    [setData],
  )
  const register = React.useCallback(
    form => authService.register(form).then(user => setData(user)),
    [setData],
  )
  const logout = React.useCallback(() => {
    authService.logout()
    setData(null)
  }, [setData])

  const value = React.useMemo(
    () => ({
      user: authInfo?.user,
      accessToken: authInfo?.token?.accessToken,
      refreshToken: authInfo?.token?.refreshToken,
      login,
      logout,
      register,
    }),
    [login, logout, register, authInfo],
  )

  if (isLoading || isIdle) {
    return <FullPageSpinner />
  }

  if (isError) {
    return <FullPageErrorFallback error={error} />
  }

  if (isSuccess) {
    return <AuthContext.Provider value={value} {...props} />
  }

  throw new Error(`Unhandled status: ${status}`)
}

function useAuth() {
  const context = React.useContext(AuthContext)

  if (context === undefined) {
    throw new Error(`useAuth must be used within a AuthProvider`)
  }
  return context
}

export { AuthProvider, useAuth }
