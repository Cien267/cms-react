import { css } from '@emotion/react'
import { useNavigate } from '@tanstack/react-location'
import { Button, Result } from 'antd'

export default function Page403() {
  const navigate = useNavigate()
  return (
    <div
      css={css`
        height: 100vh;
        display: flex;
        flex-direction: column;
        justify-content: 'center';
        align-items: 'center';
      `}
    >
      <Result
        status="403"
        title="403"
        subTitle="Xin lỗi. Bạn không có quyền truy cập vào trang này"
        extra={
          <Button
            type="primary"
            onClick={() => {
              navigate({ to: '/' })
            }}
          >
            Quay lại trang chủ
          </Button>
        }
      />
    </div>
  )
}
