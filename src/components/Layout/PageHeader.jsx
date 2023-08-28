import React from 'react'
import { css } from '@emotion/react'
import { Skeleton } from 'antd'
import { PageHeader as AntPageHeader } from '@ant-design/pro-layout'

export default function PageHeader({ loading, children }) {
  return (
    <div
      css={css`
        box-shadow: 0px 2px 8px rgba(9, 30, 66, 0.08);
      `}
    >
      {loading ? (
        <AntPageHeader title={<Skeleton.Input active size="small" />} />
      ) : (
        children
      )}
    </div>
  )
}
