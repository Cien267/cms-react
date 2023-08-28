import React from 'react'

import {
  MutationCache,
  QueryCache,
  QueryClient,
  QueryClientProvider,
} from 'react-query'
import { message, Modal } from 'antd'
import statusCode from '@/api/statusCode'

import { useAuth } from './authContext'

export default function QueryProvider({ children }) {
  const { logout } = useAuth()

  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false,
        refetchOnReconnect: false,
        retryOnMount: false,
        retry: 0,
      },
    },
    queryCache: new QueryCache({
      onError: (error, query) => {
        if (error?.statusCode === statusCode.Unauthorized) {
          Modal.destroyAll()
          Modal.error({
            title: 'Lỗi xác thực',
            content: 'Bạn đã hết thời gian truy cập. Vui lòng đăng nhập lại',
            onOk: logout,
          })
          return
        }
        if (!query?.meta?.shouldNotHandleErrorGlobal)
          return message.error(error.message || 'Có lỗi xảy ra')
      },
    }),
    mutationCache: new MutationCache({
      onSuccess: () => {
        message.success('Thiết lập thành công')
      },
      onError: error => {
        message.error(error.message || 'Có lỗi xảy ra')
      },
    }),
  })
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  )
}
