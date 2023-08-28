import React from 'react'

import { css } from '@emotion/react'
import { Spin } from 'antd'

const FullPageSpinner = () => {
  return (
    <Spin spinning size="large">
      <div
        css={css`
          height: 100vh;
          display: flex;
          flex-direction: column;
          justify-content: 'center';
          align-items: 'center';
        `}
      ></div>
    </Spin>
  )
}

export default FullPageSpinner
