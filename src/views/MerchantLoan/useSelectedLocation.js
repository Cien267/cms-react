import { useListCityDistrict, useListWard } from '@/hooks/useLocation'

import { formatCity, formatDistrict, formatWard } from './helper'

export default function useSelectedLocation({ cityId, districtId, wardId }) {
  const { data: listCityDistrict } = useListCityDistrict()
  const { data: listWard } = useListWard(
    { districtId },
    {
      enabled: !!districtId,
    },
  )

  return {
    city: formatCity(cityId, listCityDistrict?.cities),
    district: formatDistrict(districtId, listCityDistrict?.districts),
    ward: formatWard(wardId, listWard),
  }
}
