import request from '@/api/request'
import { CreatePackageLoanType, UpdatePartnerRuleType, UpdatePartnerExpectationType, UpdatePartnerPriorityType, UpdatePartnerTargetType } from '@/types/partner'


export function getPackageLoan({ token }: { token: string }) {
	return request(
		{
			url: '/v1.0.0/loan-package',
			method: 'GET',
		},
		token,
	)
}

export function getPackageLoanSummary({ token, month }: { token: string, month: string }) {
	return request(
		{
			url: '/v1.0.0/loan-package/summary',
			method: 'GET',
			params: { month }
		},

		token,
	)
}

export function createPackageLoan({ token, data }: { token: string, data: CreatePackageLoanType }) {
	return request(
		{
			url: '/v1.0.0/loan-package',
			method: 'POST',
			data,
		},
		token,
	)
}

export function updatePackageLoanRule({ token, data, id }: { token: string, data: UpdatePartnerRuleType, id: string }) {
	return request(
		{
			url: `/v1.0.0/loan-package/${id}/rule`,
			method: 'PUT',
			data,
		},
		token,
	)
}

export function updatePackageLoanPriority({ token, data, id }: { token: string, data: UpdatePartnerPriorityType, id: string }) {
	return request(
		{
			url: `/v1.0.0/loan-package/${id}/priority`,
			method: 'PUT',
			data
		},
		token,
	)
}


export function updatePackageLoanTarget({ token, data }: { token: string, data: UpdatePartnerTargetType }) {
	return request(
		{
			url: `/v1.0.0/loan-package/targets`,
			method: 'PUT',
			data,
		},
		token,
	)
}

export function updatePackageLoanExpectations({ token, data }: { token: string, data: UpdatePartnerExpectationType }) {
	return request(
		{
			url: `/v1.0.0/loan-package/expectations`,
			method: 'PUT',
			data,
		},
		token,
	)
}