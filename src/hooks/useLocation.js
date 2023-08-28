import { useQuery } from 'react-query'
import { useAuth } from '@/contexts/authContext'
import { getListCityDistrict, getListWard } from '@/services/locationService'

export const locationKeys = {
  all: ['location'],
  district: () => [...locationKeys.all, 'list'],
  ward: filters => [...locationKeys.district(), { filters }],
}

export function useListCityDistrict(filters, options) {
  const { accessToken } = useAuth()
  return useQuery(
    locationKeys.district(filters),
    () => getListCityDistrict({ token: accessToken, ...filters }),
    options,
  )
}

export function useListWard(filters, options) {
  const { accessToken } = useAuth()
  return useQuery(
    locationKeys.ward(filters),
    () => getListWard({ token: accessToken, ...filters }),
    options,
  )
}
