import React from 'react'
import { css } from '@emotion/react'
import { Skeleton } from 'antd'

export default function PageContent({ loading, children }) {
  return (
    <div
      css={css`
        min-height: calc(100vh - 120px);
        padding: 26px 16px 14px 24px;
      `}
    >
      {loading ? <Skeleton /> : children}
    </div>
  )
}
