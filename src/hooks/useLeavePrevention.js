import * as React from 'react'
import { useLocation, useNavigate } from '@tanstack/react-location'
import { Modal } from 'antd'

function useLatestCallback(cb) {
  const stableFnRef = React.useRef()
  const cbRef = React.useRef(cb)
  cbRef.current = cb

  if (!stableFnRef.current) {
    stableFnRef.current = (...args) => cbRef.current(...args)
  }

  return stableFnRef.current
}

export const useLeavePrevention = when => {
  const location = useLocation()
  const navigate = useNavigate()
  const skipRef = React.useRef(false)

  const canNavigate = useLatestCallback(when)

  const skipPromptNavigate = React.useCallback(
    option => {
      skipRef.current = true
      navigate(option)
    },
    [navigate],
  )

  React.useEffect(() => {
    let unblock = location.history.block(transition => {
      if (!canNavigate() || skipRef.current) {
        unblock()
        transition.retry()
      } else {
        return Modal.confirm({
          content: 'Các thay đổi bạn đã thực hiện có thể không được lưu',
          cancelText: 'Hủy',
          okText: 'Đồng ý',
          onOk: () => {
            unblock()
            transition.retry()
          },
          onCancel: () => {
            location.current.pathname = window.location.pathname
          },
        })
      }
    })

    return unblock
  }, [location, canNavigate])
  return [skipPromptNavigate]
}
