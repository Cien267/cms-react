import { useMutation, useQuery, useQueryClient } from 'react-query'
import { useAuth } from '@/contexts/authContext'
import {
  createBill,
  getCountBill,
  getDetailBill,
  getListBill,
} from '@/services/billService'

export const billKeys = {
  all: ['bill'],
  lists: () => [...billKeys.all, 'list'],
  counts: () => [...billKeys.all, 'count'],
  list: filters => [...billKeys.lists(), { filters }],
  count: filters => [...billKeys.counts(), { filters }],
  details: () => [...billKeys.all, 'detail'],
  detail: id => [...billKeys.details(), id],
}

export function useListBill(filters, options) {
  const { accessToken } = useAuth()

  return useQuery(
    billKeys.list(filters),
    () => getListBill({ token: accessToken, ...filters }),
    options,
  )
}

export function useCountBill() {
  const { accessToken } = useAuth()

  return useQuery(billKeys.count(), () => getCountBill({ token: accessToken }))
}

export function useDetailBill(requestId, options) {
  const { accessToken } = useAuth()

  return useQuery(
    billKeys.detail(requestId),
    () => getDetailBill({ token: accessToken, requestId }),
    options,
  )
}

export function useMutationCreateBill() {
  const { accessToken } = useAuth()
  const queryClient = useQueryClient()

  return useMutation(data => createBill({ token: accessToken, data }), {
    onSuccess: () => {
      queryClient.invalidateQueries(billKeys.lists())
    },
  })
}
