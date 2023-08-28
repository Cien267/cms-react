import React from 'react'
import { SearchOutlined } from '@ant-design/icons'
import { css } from '@emotion/react'
import { Button, Radio, Space } from 'antd'

export default function RadioFilter({
  setSelectedKeys,
  selectedKeys,
  confirm,
  clearFilters,
  options,
}) {
  return (
    <div
      css={css`
        width: 208px;
        padding: 16px 12px;
      `}
    >
      <div
        css={css`
          margin-bottom: 16px;
        `}
      >
        <Radio.Group
          value={selectedKeys?.[0]}
          onChange={event => setSelectedKeys([event.target.value])}
        >
          <Space direction="vertical">
            {options.map(option => (
              <Radio value={option.value} key={option.value}>
                {option.label}
              </Radio>
            ))}
          </Space>
        </Radio.Group>
      </div>
      <Space>
        <Button
          type="primary"
          onClick={() => confirm()}
          icon={<SearchOutlined />}
          size="small"
        >
          Lọc
        </Button>
        <Button
          onClick={() => {
            clearFilters()
            confirm()
          }}
          size="small"
        >
          Xóa lọc
        </Button>
      </Space>
    </div>
  )
}
