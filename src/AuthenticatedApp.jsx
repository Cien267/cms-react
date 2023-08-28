import React from 'react'
import { ErrorBoundary } from 'react-error-boundary'
import { ReactLocation, Router } from '@tanstack/react-location'
import ConfigProvider from 'antd/es/config-provider'
import viLocale from 'antd/es/locale/vi_VN'
import routes from '@/constants/routes'
import { PermissionProvider } from '@/contexts/permissionContext'
import QueryProvider from '@/contexts/queryContext'
import GlobalStyle from '@/GlobalStyle'

import MainLayout from '@/components/Layout'
import {
  FullPageErrorFallback,
  Page404,
  ProtectedPage,
} from '@/components/Page'

export default function AuthenticatedApp() {
  const location = new ReactLocation()

  return (
    <ErrorBoundary FallbackComponent={FullPageErrorFallback}>
      <GlobalStyle />
      <QueryProvider>
        <PermissionProvider>
          <ConfigProvider locale={viLocale}>
            <Router
              location={location}
              routes={[
                ...routes.map(route => {
                  return {
                    path: route.path,
                    element: (
                      <ProtectedPage ability={route.ability}>
                        <route.element />
                      </ProtectedPage>
                    ),
                  }
                }),
                { path: '*', element: <Page404 /> },
              ]}
            >
              <MainLayout />
            </Router>
          </ConfigProvider>
        </PermissionProvider>
      </QueryProvider>
    </ErrorBoundary>
  )
}
