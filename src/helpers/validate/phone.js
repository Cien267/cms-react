import { isFalsy } from '@/helpers/utility'

export const validatePhoneNumber = value => {
  if (isFalsy(value)) return Promise.resolve()
  const regexPhoneNumber = /^[0-9\b]+$/
  if (!regexPhoneNumber.test(value) || value.length !== 10)
    return Promise.reject(new Error('Sai định dạng số điện thoại'))
  return Promise.resolve()
}
