import React from 'react'
import { usePermission } from '@/contexts/permissionContext'

import { Page403 } from '@/components/Page'

export default function ProtectedPage({ children, ability }) {
  const { can } = usePermission()
  if (!ability || can(ability)) {
    return <>{children}</>
  }
  return <Page403 />
}
