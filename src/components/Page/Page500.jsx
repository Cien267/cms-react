import { css } from '@emotion/react'
import { useNavigate } from '@tanstack/react-location'
import { Button, Result } from 'antd'

export default function Page500() {
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
        status="500"
        title="500"
        subTitle="Có lỗi xảy ra"
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
