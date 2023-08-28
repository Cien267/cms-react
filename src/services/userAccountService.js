import request from '@/api/request'

function getListUserAccount({ token, ...filters }) {
  return request(
    {
      url: '/v1.0.0/users/all',
      method: 'GET',
      params: filters,
    },
    token,
  )
}

function createUserAccount({ token, data }) {
  return request(
    {
      url: '/v1.0.0/users',
      method: 'POST',
      data,
    },
    token,
  )
}

export { createUserAccount, getListUserAccount }
