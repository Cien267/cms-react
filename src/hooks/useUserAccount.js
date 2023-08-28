import { useMutation, useQuery, useQueryClient } from 'react-query'
import { useAuth } from '@/contexts/authContext'
import {
  createUserAccount,
  getListUserAccount,
} from '@/services/userAccountService'

export const userAccountKeys = {
  all: ['userAccount'],
  lists: () => [...userAccountKeys.all, 'list'],
  list: filters => [...userAccountKeys.lists(), { filters }],
  details: () => [...userAccountKeys.all, 'detail'],
  detail: id => [...userAccountKeys.details(), id],
}

export function useListUserAccount(filters, options) {
  const { accessToken } = useAuth()
  return useQuery(
    userAccountKeys.list(filters),
    () => getListUserAccount({ token: accessToken, ...filters }),
    options,
  )
}

export function useMutationCreateUserAccount() {
  const { accessToken } = useAuth()
  const queryClient = useQueryClient()

  return useMutation(data => createUserAccount({ token: accessToken, data }), {
    onSuccess: () => {
      queryClient.invalidateQueries(userAccountKeys.lists())
    },
  })
}
