import React from 'react'
import { ErrorBoundary } from 'react-error-boundary'
import { PageHeader as AntPageHeader } from '@ant-design/pro-layout'
import responseCode from '@/api/responseCode'
import { useGetAllPermissions } from '@/hooks/usePermission'
import { useRoles } from '@/hooks/useRole'

import { PageContent, PageHeader } from '@/components/Layout'
import { Page500 } from '@/components/Page'

import PermissionContent from './PermissionContent'

export default function WithErrorDetailLoanBnpl() {
  return (
    <ErrorBoundary FallbackComponent={Page500}>
      <Permission />
    </ErrorBoundary>
  )
}

function Permission() {
  const { data: roles, isLoading } = useRoles({
    useErrorBoundary: error => {
      return error?.responseCode !== responseCode.Success
    },
  })
  const { data: resource, isLoading: permissionLoading } =
    useGetAllPermissions()

  return (
    <>
      <PageHeader>
        <AntPageHeader title="Phân quyền" />
      </PageHeader>
      <PageContent loading={isLoading || permissionLoading}>
        <PermissionContent roles={roles} initResource={resource} />
      </PageContent>
    </>
  )
}
