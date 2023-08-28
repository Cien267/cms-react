import request from '@/api/request'

function getListMerchantLoan({ token, ...filters }) {
  return request(
    {
      url: '/v1.0.0/merchant-loan',
      method: 'GET',
      params: filters,
    },
    token,
  )
}

function getDetailMerchantLoan({ token, id }) {
  return request(
    {
      url: `/v1.0.0/merchant-loan/${id}`,
      method: 'GET',
    },
    token,
  )
}

export { getDetailMerchantLoan, getListMerchantLoan }
