import { useInfiniteQuery } from 'react-query'
import { useAuth } from '@/contexts/authContext'
import { getListBorrower } from '@/services/borrowerService'

export const borrowerKeys = {
  all: ['borrower'],
  lists: () => [...borrowerKeys.all, 'list'],
  list: filters => [...borrowerKeys.lists(), { filters }],
  details: () => [...borrowerKeys.all, 'detail'],
  detail: id => [...borrowerKeys.details(), id],
}

export function useListBorrower(filters) {
  const { accessToken } = useAuth()
  return useInfiniteQuery(
    borrowerKeys.list(filters),
    async ({ pageParam = 1 }) => ({
      ...(await getListBorrower({ token: accessToken, pageParam, ...filters })),
      currentPage: pageParam,
    }),
    {
      getNextPageParam: lastPage => {
        const hasNextPage =
          lastPage?.meta?.total > lastPage?.meta?.limit * lastPage?.currentPage
        if (hasNextPage) return lastPage?.currentPage + 1
        return undefined
      },
    },
  )
}
