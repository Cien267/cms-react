import request from '@/api/request'
// import mock from '@/helpers/mock'

const localStorageTokenKey = '__kfin_auth_provider_token__'
const localStorageUserKey = '__kfin_auth_provider_user__'

async function getToken() {
  const tokenStr = window.localStorage.getItem(localStorageTokenKey)
  if (tokenStr) {
    return JSON.parse(tokenStr)
  }
  return null
}

function handleUserResponse({ user, token }) {
  token.atExpiresAt = Date.now() + token.atExpires * 1000
  window.localStorage.setItem(localStorageTokenKey, JSON.stringify(token))
  window.localStorage.setItem(localStorageUserKey, JSON.stringify(user))

  return { user, token }
}

function login({ username, password }) {
  return request({
    url: '/v1.0.0/login',
    method: 'POST',
    data: {
      username,
      password,
    },
  }).then(handleUserResponse)
}

function register() {
  //
}

function getUser({ token }) {
  if (token.atExpiresAt < Date.now()) {
    return null
  }

  const userStr = window.localStorage.getItem(localStorageUserKey)
  return userStr ? JSON.parse(userStr) : null
}

async function logout() {
  window.localStorage.removeItem(localStorageTokenKey)
  window.localStorage.removeItem(localStorageUserKey)
}

export { getToken, getUser, login, logout, register }
