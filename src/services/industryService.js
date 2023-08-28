import request from '@/api/request'

export function getListIndustry({ token }) {
  return request(
    {
      url: '/v1.0.0/industries',
      method: 'GET',
    },
    token,
  )
}
