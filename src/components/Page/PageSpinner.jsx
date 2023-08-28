import React from 'react'

import { css } from '@emotion/react'
import { Spin } from 'antd'

export default function PageSpinner() {
  return (
    <Spin spinning size="large">
      <div
        css={css`
          height: 100%;
          min-height: 400px;
          display: flex;
          flex-direction: column;
          justify-content: 'center';
          align-items: 'center';
        `}
      />
    </Spin>
  )
}
