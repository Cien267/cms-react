import { isFalsy } from '@/helpers/utility'

export const validateUsername = value => {
  if (isFalsy(value)) return Promise.resolve()
  const regexUsername = /^\w+$/
  if (!regexUsername.test(value))
    return Promise.reject(new Error('Sai định dạng tên đăng nhập'))
  return Promise.resolve()
}
