import { useMutation, useQuery, useQueryClient } from 'react-query'
import { useAuth } from '@/contexts/authContext'
import { createPackageLoan, getPackageLoan, getPackageLoanSummary, updatePackageLoanExpectations, updatePackageLoanPriority, updatePackageLoanRule, updatePackageLoanTarget } from '@/services/partnerService'
import { CreatePackageLoanType, UpdatePartnerExpectationType, UpdatePartnerPriorityType, UpdatePartnerRuleType, UpdatePartnerTargetType } from '@/types/partner'

export const keys = {
	all: ['partner'],
	packageLoans: () => [...keys.all, 'packageLoan'],
	packageLoan: (id) => [...keys.all, 'packageLoan', id],
	packageLoanSummary: (month) => [...keys.all, 'summary', month]
}


export function useGetPackageLoan() {
	const { accessToken } = useAuth()
	return useQuery(keys.packageLoans(), () => getPackageLoan({ token: accessToken }))
}

export function useGetPackageLoanSummary({ month }) {
	const { accessToken } = useAuth()
	return useQuery(keys.packageLoanSummary(month), () => getPackageLoanSummary({ token: accessToken, month }))
}

export function useCreatePackageLoan() {
	const { accessToken } = useAuth()
	const queryClient = useQueryClient()

	return useMutation(
		(data: CreatePackageLoanType) => createPackageLoan({ token: accessToken, data }),
		{
			onSuccess: () => {
				queryClient.invalidateQueries(keys.packageLoans())
			},
		},
	)
}

export function useUpdatePackageLoanRule({ id }) {
	const { accessToken } = useAuth()
	const queryClient = useQueryClient()

	return useMutation(
		(data: UpdatePartnerRuleType) => updatePackageLoanRule({ token: accessToken, data, id }),
		{
			onSuccess: () => {
				queryClient.invalidateQueries(keys.packageLoan(id))
			},
		},
	)
}

export function useUpdatePackageLoanPriority() {
	const { accessToken } = useAuth()
	const queryClient = useQueryClient()

	return useMutation(
		(data: ({ priority: boolean, id: string })) => {
			const { id, ...restData } = data
			return updatePackageLoanPriority({ token: accessToken, data: restData, id })
		},
		{
			onSuccess: () => {
				queryClient.invalidateQueries(keys.packageLoans())
			},
		},
	)
}

export function useUpdatePackageLoanTarget({ month }) {
	const { accessToken } = useAuth()
	const queryClient = useQueryClient()

	return useMutation(
		(data: UpdatePartnerTargetType) => updatePackageLoanTarget({ token: accessToken, data }),
		{
			onSuccess: () => {
				queryClient.invalidateQueries(keys.packageLoanSummary(month))
			},
		},
	)
}

export function useUpdatePackageLoanExpectations() {
	const { accessToken } = useAuth()
	const queryClient = useQueryClient()

	return useMutation(
		(data: UpdatePartnerExpectationType) => updatePackageLoanExpectations({ token: accessToken, data }),
		{
			onSuccess: () => {
				queryClient.invalidateQueries(keys.packageLoans())
			},
		},
	)
}