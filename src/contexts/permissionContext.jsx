import { FullPageSpinner } from '@/components/Page'
import * as React from 'react'
import { useUserPermissions } from '@/hooks/usePermission'

const PermissionContext = React.createContext()
PermissionContext.displayName = 'PermissionContext'

function PermissionProvider(props) {
  const { data: abilities, isLoading } = useUserPermissions()
  const mapAbilities = React.useMemo(
    () => !!abilities && abilities.reduce((a, v) => ({ ...a, [v]: true }), {}),
    [abilities],
  )

  const can = React.useCallback(
    ability => ability === true || mapAbilities[ability],
    [mapAbilities],
  )

  const value = React.useMemo(
    () => ({
      can,
    }),
    [can],
  )

  if (isLoading) {
    return <FullPageSpinner />
  }

  return <PermissionContext.Provider value={value} {...props} />
}

function usePermission() {
  const context = React.useContext(PermissionContext)
  if (context === undefined) {
    throw new Error(`usePermission must be used within a PermissionProvider`)
  }
  return context
}

function Can({ ability, children }) {
  const { can } = usePermission()
  const allowed = can(ability)

  if (typeof children === 'function') {
    return children(allowed)
  }

  return allowed ? children : null
}

export { Can, PermissionProvider, usePermission }
