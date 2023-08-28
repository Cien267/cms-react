import React from 'react'
import { SearchOutlined } from '@ant-design/icons'
import { css } from '@emotion/react'
import { Button, Input, Space } from 'antd'

export default function TextFilter({
  placeholder = 'Nhập từ khóa',
  setSelectedKeys,
  selectedKeys,
  confirm,
  clearFilters,
  visible,
}) {
  const searchRef = React.useRef(null)

  React.useEffect(() => {
    if (visible) {
      setTimeout(() => searchRef.current?.select(), 100)
    }
  }, [visible])

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
        <Input
          ref={searchRef}
          placeholder={placeholder}
          value={selectedKeys[0]}
          onChange={e =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={e => {
            // Fix bug trigger sort when press enter in filter dropdown
            e.stopPropagation()
            confirm()
          }}
        />
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
