import React from 'react'
import { SearchOutlined } from '@ant-design/icons'
import { css } from '@emotion/react'
import { Button, Checkbox, Space } from 'antd'

export default function CheckBoxFilter({
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
        <Checkbox.Group value={selectedKeys} onChange={setSelectedKeys}>
          <Space direction="vertical">
            {options.map(option => (
              <Checkbox value={option.value} key={option.value}>
                {option.label}
              </Checkbox>
            ))}
          </Space>
        </Checkbox.Group>
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
