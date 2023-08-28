import { useListIndustry } from '@/hooks/useIndustry'

import { formatIndustry } from './helper'

export default function useSelectedIndustry(id) {
  const { data: listIndustry } = useListIndustry()
  return { industry: formatIndustry(id, listIndustry) }
}
