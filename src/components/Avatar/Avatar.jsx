import React from 'react'
import { css } from '@emotion/react'
import { Avatar as AntdAvatar, Space } from 'antd'

export default function Avatar({
  name = '',
  size = 24,
  urlImage,
  fontSize = 13,
  disableName,
}) {
  const renderAvatar = () => (
    <div
      css={css`
        position: relative;
      `}
    >
      {urlImage ? (
        <AntdAvatar src={urlImage} size={size} />
      ) : (
        <AntdAvatar
          style={{ backgroundColor: '#E57373', fontSize }}
          size={size}
        >
          {(name?.[0] ?? 'A').toUpperCase()}
        </AntdAvatar>
      )}
    </div>
  )
  return (
    <Space style={{ alignItems: 'center' }}>
      {renderAvatar({ name, urlImage, size })}
      {!disableName ? <div>{name}</div> : null}
    </Space>
  )
}
