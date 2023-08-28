import { useMutation, useQuery, useQueryClient } from 'react-query'
import { useAuth } from '@/contexts/authContext'
import { createRole, getRoles, updateRole } from '@/services/roleService'

export const keys = {
  all: ['role'],
  lists: () => [...keys.all, 'list'],
}

export function useRoles(options) {
  const { accessToken } = useAuth()
  return useQuery(keys.lists(), () => getRoles({ token: accessToken }), options)
}

export function useMutationCreateRole() {
  const { accessToken } = useAuth()
  const queryClient = useQueryClient()

  return useMutation(data => createRole({ token: accessToken, data }), {
    onSuccess: () => {
      queryClient.invalidateQueries(keys.lists())
    },
  })
}

export function useMutationUpdateRole() {
  const { accessToken } = useAuth()
  const queryClient = useQueryClient()

  return useMutation(
    data => updateRole({ token: accessToken, id: data.id, data }),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(keys.lists())
      },
    },
  )
}
