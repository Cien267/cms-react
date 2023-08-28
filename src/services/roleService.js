import request from '@/api/request'

function getRoles({ token, ...params }) {
  return request(
    {
      url: '/v1.0.0/role',
      method: 'GET',
      params,
    },
    token,
  )
}

function createRole({ token, data }) {
  return request(
    {
      url: '/v1.0.0/role',
      method: 'POST',
      data,
    },
    token,
  )
}

function updateRole({ token, id, data }) {
  return request(
    {
      url: `/v1.0.0/role/${id}`,
      method: 'PUT',
      data,
    },
    token,
  )
}

export { createRole, getRoles, updateRole }
