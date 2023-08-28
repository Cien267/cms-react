import React from 'react'
import { css } from '@emotion/react'

export default function Overview() {
  return (
    <div
      css={css`
        position: relative;
        height: calc(100vh - 45px);
      `}
    >
      <div
        css={css`
          display: flex;
          flex-direction: column;
          align-items: center;
          height: inherit;
        `}
      >
        <img
          src="lending-banner.jpeg"
          alt="overview"
          css={css`
            width: 100vh;
          `}
        />
        <div
          css={css`
            font-size: 24px;
            font-weight: 600;
            font-style: italic;
          `}
        >
          Ver {import.meta.env.REACT_APP_KFIN_VERSION || '1.0.0'}
        </div>
      </div>
    </div>
  )
}
