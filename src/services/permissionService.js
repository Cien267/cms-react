import request from '@/api/request'

function getPermissions({ token, ...params }) {
  return request(
    {
      url: '/v1.0.0/permission',
      method: 'GET',
      params,
    },
    token,
  )
}

function getUserPermission({ token }) {
  return request(
    {
      url: '/v1.0.0/permission/user',
      method: 'GET',
    },
    token,
  )
}

export { getPermissions, getUserPermission }
