import React from 'react'
import { SearchOutlined } from '@ant-design/icons'
import { css } from '@emotion/react'
import { Button, DatePicker, Space } from 'antd'
import {
  endOfDay,
  endOfThisDay,
  endOfThisMonth,
  startOfDay,
  startOfLastMonth,
  startOfThisDay,
  startOfThisMonth,
  startOfThisWeek,
} from '@/helpers/datetime'

const { RangePicker } = DatePicker
const dateFormatList = 'DD/MM/YYYY'
const defaultPickerValue = [startOfLastMonth(), endOfThisMonth()]
const disabledDate = current => {
  return current && current > endOfDay() // Can not select days after today
}
export default function DateRangeFilter({
  setSelectedKeys,
  selectedKeys,
  confirm,
  clearFilters,
}) {
  const dateRangeRef = React.useRef(null)
  const formatSelectedKeys = selectedKeys.length
    ? selectedKeys
    : [startOfThisMonth(), endOfThisDay()]

  const filter = () => {
    if (!selectedKeys.length) {
      setSelectedKeys([startOfThisMonth(), endOfThisDay()])
    }
    confirm()
  }
  return (
    <div
      css={css`
        width: 280px;
        padding: 16px 12px;
      `}
    >
      <div
        css={css`
          margin-bottom: 16px;
        `}
      >
        <Space direction="vertical">
          <RangePicker
            ref={dateRangeRef}
            defaultPickerValue={defaultPickerValue}
            disabledDate={disabledDate}
            dropdownClassName="date-range-filter"
            allowClear={false}
            allowEmpty={[true, true]}
            value={formatSelectedKeys}
            onChange={rangeValue => {
              const [from, to] = rangeValue
              const newRange = [
                from ? startOfDay(from) : undefined,
                to ? endOfDay(to) : undefined,
              ]
              setSelectedKeys(newRange)
            }}
            onKeyDown={e => {
              // Fix bug trigger sort when press enter in filter dropdown
              e.stopPropagation()
            }}
            ranges={{
              'Hôm nay': [startOfThisDay(), endOfThisDay()],
              'Tuần này': [startOfThisWeek(), endOfThisDay()],
              'Tháng này': [startOfThisMonth(), endOfThisDay()],
            }}
            format={dateFormatList}
            renderExtraFooter={() => (
              <Button
                type="primary"
                size="small"
                onClick={() => dateRangeRef.current?.blur()}
              >
                Chọn
              </Button>
            )}
          />
        </Space>
      </div>
      <Space>
        <Button
          type="primary"
          onClick={() => filter()}
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
