import { useEffect } from 'react'

export default function useResetFormModal(form, visible) {
  useEffect(() => {
    return () => {
      form.resetFields()
    }
  }, [form, visible])
}
