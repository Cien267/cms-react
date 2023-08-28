import { useNavigate } from '@tanstack/react-location'
import { Button, Result } from 'antd'

export default function ComingSoon() {
  const navigate = useNavigate()
  return (
    <Result
      title="Tính năng này đang phát triển"
      extra={
        <Button
          type="primary"
          key="console"
          onClick={() => navigate({ to: '/' })}
        >
          Về trang chủ
        </Button>
      }
    />
  )
}
