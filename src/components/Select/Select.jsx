import React from 'react'
import { Select as AntdSelect } from 'antd'

const { Option } = AntdSelect

export default function Select({
  options = [],
  showSearch = false,
  loadMore,
  percentHeight = 1 / 6,
  ...rest
}) {
  const handleScroll = (event, percentHeight) => {
    if (typeof loadMore !== 'function') return
    const isEndOfList =
      event.target.scrollTop > percentHeight * event.target.scrollHeight
    if (isEndOfList) loadMore()
  }
  return (
    <AntdSelect
      showSearch={showSearch}
      optionFilterProp="children"
      onPopupScroll={event => handleScroll(event, percentHeight)}
      filterOption={(input, option) => {
        return option.children?.toLowerCase().indexOf(input?.toLowerCase()) >= 0
      }}
      {...rest}
    >
      {options.map((recipient, index) => (
        <Option key={index} value={recipient.value}>
          {recipient.label}
        </Option>
      ))}
    </AntdSelect>
  )
}
