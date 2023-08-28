import React from 'react'
import { useMutation, useQuery, useQueryClient } from 'react-query'
import { useAuth } from '@/contexts/authContext'
import {
  getMerchantTest,
  updateMerchantTest,
} from '@/services/merchantTestService'

const queryKey = 'test-merchants'

export function useGetMerchants() {
  const { accessToken } = useAuth()
  return useQuery(queryKey, () => getMerchantTest({ token: accessToken }))
}

export function useGetMapMerchants() {
  const { data: testMerchantsResp } = useGetMerchants()

  const mapMerchantTest = React.useMemo(() => {
    if (!testMerchantsResp?.merchants) return {}

    return testMerchantsResp?.merchants.reduce((map, merchantId) => {
      return { ...map, [merchantId]: true }
    }, {})
  }, [testMerchantsResp])

  return mapMerchantTest
}

export function useUpdateTestMerchants() {
  const { accessToken } = useAuth()
  const queryClient = useQueryClient()

  return useMutation(data => updateMerchantTest({ token: accessToken, data }), {
    onSuccess: () => {
      // TODO: optimist update
      queryClient.invalidateQueries(queryKey)
    },
  })
}
