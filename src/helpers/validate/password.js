import { isFalsy } from '@/helpers/utility'

export const validatePassword = value => {
  if (isFalsy(value)) return Promise.resolve()
  const regexPhoneNumber = /(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])/

  if (!regexPhoneNumber.test(value))
    return Promise.reject(
      new Error(
        'Mật khẩu cần có chữ in hoa, chữ thường, số và kí tự đặc biệt ',
      ),
    )
  return Promise.resolve()
}
