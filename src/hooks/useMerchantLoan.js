import { useQuery } from 'react-query'
import { useAuth } from '@/contexts/authContext'
import {
  getDetailMerchantLoan,
  getListMerchantLoan,
} from '@/services/merchantLoanService'

export const merchantLoanKeys = {
  all: ['merchant-loan'],
  lists: () => [...merchantLoanKeys.all, 'list'],
  list: filters => [...merchantLoanKeys.lists(), { filters }],
  details: () => [...merchantLoanKeys.all, 'detail'],
  detail: id => [...merchantLoanKeys.details(), id],
}

export function useListMerchantLoan(filters, options) {
  const { accessToken } = useAuth()
  return useQuery(
    merchantLoanKeys.list(filters),
    () => getListMerchantLoan({ token: accessToken, ...filters }),
    options,
  )
}

export function useDetailMerchantLoan(id, options) {
  const { accessToken } = useAuth()
  return useQuery(
    merchantLoanKeys.detail(id),
    () => getDetailMerchantLoan({ token: accessToken, id }),
    options,
  )
}
