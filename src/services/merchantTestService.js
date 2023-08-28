import request from '@/api/request'

export function getMerchantTest({ token }) {
  return request(
    {
      url: '/v1.0.0/test-merchants',
      method: 'GET',
    },
    token,
  )
}

export function updateMerchantTest({ token, data }) {
  return request(
    {
      url: '/v1.0.0/test-merchants',
      method: 'POST',
      data: {
        merchants: data,
      },
    },
    token,
  )
}
