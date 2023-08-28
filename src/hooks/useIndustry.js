import { useQuery } from 'react-query'
import { useAuth } from '@/contexts/authContext'
import { getListIndustry } from '@/services/industryService'

export const industryKeys = {
  all: ['industry'],
  lists: () => [...industryKeys.all, 'list'],
}

export function useListIndustry(options) {
  const { accessToken } = useAuth()
  return useQuery(
    industryKeys.lists(),
    () => getListIndustry({ token: accessToken }),
    options,
  )
}
