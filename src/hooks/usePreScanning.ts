import { useMutation, useQuery, useQueryClient } from 'react-query'
import { useAuth } from '@/contexts/authContext'
import { configPreScanning, getPreScanningRule } from '@/services/preScanning'
import { PreScanningConfigProps } from '@/types/preScanning'

export const keys = {
  all: ['pre-scanning'],
  config: () => [...keys.all, 'config'],
}

export function useGetPreScanningRule() {
  const { accessToken } = useAuth()
  return useQuery(keys.config(), () => getPreScanningRule({ token: accessToken }))
}


export function useUpdatePreScanningRule() {
  const { accessToken } = useAuth()
  const queryClient = useQueryClient()

  return useMutation(
    (data: PreScanningConfigProps) => configPreScanning({ token: accessToken, data }),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(keys.config())
      },
    },
  )
}


