import { useQuery } from 'react-query'
import { useAuth } from '@/contexts/authContext'
import { getPermissions, getUserPermission } from '@/services/permissionService'

export const keys = {
  all: ['permission'],
  lists: () => [...keys.all, 'list'],
  user: () => [...keys.all, 'user'],
}

export function useGetAllPermissions() {
  const { accessToken } = useAuth()
  return useQuery(keys.lists(), () => getPermissions({ token: accessToken }))
}

export function useUserPermissions() {
  const { accessToken } = useAuth()
  return useQuery(
    keys.user(),
    () => getUserPermission({ token: accessToken }),
    {
      refetchOnWindowFocus: true,
    },
  )
}
