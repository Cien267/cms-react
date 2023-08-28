import React from 'react'
import { SearchOutlined } from '@ant-design/icons'
import { css } from '@emotion/react'
import { Button, InputNumber, Space } from 'antd'
import { MAX_RANGE_NUMBER } from '@/constants/common'
import { isNotNil } from '@/helpers/utility'

export default function RangeNumberFilter({
  placeholderFrom = 'Giá trị bắt đầu',
  placeholderTo = 'Giá trị kết thúc',
  setSelectedKeys,
  selectedKeys,
  confirm,
  clearFilters,
  visible,
  minRange,
  formatter,
  parser,
  maxRange = MAX_RANGE_NUMBER,
}) {
  const fromRef = React.useRef(null)
  const toRef = React.useRef(null)

  React.useEffect(() => {
    if (visible) {
      setTimeout(() => fromRef.current?.select(), 100)
    }
  }, [visible])

  const minRangeProps = typeof minRange !== 'undefined' ? { min: minRange } : {}
  const maxRangeProps = typeof maxRange !== 'undefined' ? { max: maxRange } : {}

  const handleChangeInput = (value, idx) => {
    const cloneSelectedKeys = [...selectedKeys]
    cloneSelectedKeys[idx] = value

    const cleanSelectedKeys = cloneSelectedKeys.filter(val => isNotNil(val))
    if (cleanSelectedKeys.length) {
      setSelectedKeys(cloneSelectedKeys)
    } else {
      setSelectedKeys([])
    }
  }

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
        <Space direction="vertical">
          <InputNumber
            ref={fromRef}
            style={{ width: '100%' }}
            placeholder={placeholderFrom}
            value={selectedKeys[0]}
            {...minRangeProps}
            {...maxRangeProps}
            formatter={formatter}
            parser={parser}
            onChange={value => handleChangeInput(value, 0)}
            onPressEnter={e => {
              // Fix bug trigger sort when press enter in filter dropdown
              e.preventDefault()
              e.stopPropagation()
              confirm()
            }}
            onKeyDown={e => {
              if (e.key === 'Tab') {
                e.preventDefault()
                setTimeout(() => toRef.current?.select(), 100)
              }
            }}
          />
          <InputNumber
            ref={toRef}
            style={{ width: '100%' }}
            placeholder={placeholderTo}
            value={selectedKeys[1]}
            onChange={value => handleChangeInput(value, 1)}
            {...minRangeProps}
            {...maxRangeProps}
            formatter={formatter}
            parser={parser}
            onPressEnter={e => {
              // Fix bug trigger sort when press enter in filter dropdown
              e.preventDefault()
              e.stopPropagation()
              confirm()
            }}
          />
        </Space>
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
