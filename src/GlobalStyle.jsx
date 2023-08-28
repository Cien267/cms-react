import React from 'react'

import { css, Global } from '@emotion/react'

export default function GlobalStyle() {
  return (
    <Global
      styles={css`
        .ant-table-thead th.ant-table-cell {
          text-align: left !important;
        }
        .ant-table-column-sorter {
          margin-right: 6px;
        }
        .ant-table-filter-trigger {
          font-size: 14px;
        }
        .date-range-filter {
          .ant-picker-footer {
            display: flex;
            flex-direction: column;
          }
          .ant-picker-ranges {
            order: -1;
          }
          .ant-picker-footer-extra {
            border-bottom: 0;
          }
        }
        .ant-modal-title {
          font-weight: 600;
        }
      `}
    />
  )
}
