import React from 'react'

import { css } from '@emotion/react'
import { Button, Result } from 'antd'

export default function FullPageErrorFallback() {
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
        subTitle="Có lỗi xảy ra. Vui lòng thử lại"
        extra={
          <Button
            type="primary"
            onClick={() => {
              window.localStorage.clear()
              window.location.reload()
            }}
          >
            Thử lại
          </Button>
        }
      />
    </div>
  )
}
