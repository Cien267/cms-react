import React from 'react'
import { css } from '@emotion/react'
import { Switch } from 'antd'
import { actionTypes, useMetaTable } from '@/contexts/tableProvider'

function IncludeTestSwitch({ label = 'Hiển thị gian hàng dùng thử' }) {
  const { state, dispatch } = useMetaTable()

  const includeTest = Boolean(state.includeTest)

  function onChangeSwitch(checked) {
    dispatch({
      type: actionTypes.changeFilter,
      payload: {
        key: 'includeTest',
        value: checked,
      },
    })
  }

  return (
    <div>
      <span
        css={css`
          font-weight: 600;
          margin-right: 4px;
        `}
      >
        {label}:
      </span>
      <Switch checked={includeTest} onChange={onChangeSwitch} />
    </div>
  )
}

export default IncludeTestSwitch
