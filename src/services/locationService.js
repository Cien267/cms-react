import request from '@/api/request'

export function getListCityDistrict({ token }) {
  return request(
    {
      url: '/v1.0.0/location/cities-districts',
      method: 'GET',
    },
    token,
  )
}

export function getListWard({ token, ...params }) {
  return request(
    {
      url: `/v1.0.0/location/wards`,
      method: 'GET',
      params,
    },
    token,
  )
}
