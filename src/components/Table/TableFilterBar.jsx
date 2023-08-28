import { Button, Tag } from 'antd'
import { actionTypes, useMetaTable } from '@/contexts/tableProvider'
import { formatDateTimeInstance, isSameDay } from '@/helpers/datetime'
import { isNotNil } from '@/helpers/utility'

export default function TableFilterBar() {
  const { columns, state, dispatch } = useMetaTable()

  const filteredCols = columns.filter(col => col.filterSearch && state[col.key])

  const clearFilter = key => {
    dispatch({
      type: actionTypes.changeFilter,
      payload: {
        key,
        value: null,
      },
    })
  }

  const clearAll = () => {
    dispatch({
      type: actionTypes.clearAllFilter,
    })
  }

  const clearOneOfValueFilter = (key, val) => {
    const oldFilter = state[key]
    const newFilter = oldFilter.filter(oldVal => oldVal !== val)
    dispatch({
      type: actionTypes.changeFilter,
      payload: {
        key,
        value: newFilter.length ? newFilter : null,
      },
    })
  }

  const tags = []

  filteredCols.forEach(col => {
    if (col.filterTags) {
      col.filterTags(state[col.key]).forEach((labelTag, idx) => {
        tags.push(
          <Tag closable key={labelTag} onClose={idx => col.filterCloseTag(idx)}>
            {labelTag}
          </Tag>,
        )
      })
    } else if (['checkbox', 'radio'].includes(col.filterType)) {
      state[col.key].forEach(filteredVal => {
        const filteredLabel = col.filterOptions.find(
          op => op.value === filteredVal,
        ).label
        const labelTag = `${col.title}: ${filteredLabel}`
        tags.push(
          <Tag
            closable
            key={labelTag}
            onClose={() => clearOneOfValueFilter(col.key, filteredVal)}
          >
            {labelTag}
          </Tag>,
        )
      })
    } else if (col.filterType === 'numberRange') {
      const numberRange = state[col.key] ?? []
      const [from, to] = numberRange

      let labelVal = ''
      if (isNotNil(from) && isNotNil(to)) {
        labelVal = `${from} - ${to}`
      } else if (isNotNil(from)) {
        labelVal = `Từ ${from}`
      } else {
        labelVal = `Đến ${to}`
      }

      const title = col.titleFilter ?? col.title
      const labelTag = `${title}: ${labelVal}`

      tags.push(
        <Tag closable key={labelTag} onClose={() => clearFilter(col.key)}>
          {labelTag}
        </Tag>,
      )
    } else if (col.filterType === 'dateRange') {
      const dateRange = state[col.key] ?? []
      const [from, to] = dateRange
      const formatPattern = col.formatPattern

      let labelVal = [from, to]
      if (!col.showTime && from && to && isSameDay(from, to)) {
        labelVal = [from]
      }

      labelVal = labelVal
        .filter(Boolean)
        .map(ins => formatDateTimeInstance(ins, formatPattern))
        .join(' - ')

      const title = col.titleFilter ?? col.title
      const labelTag = `${title}: ${labelVal}`

      tags.push(
        <Tag closable key={labelTag} onClose={() => clearFilter(col.key)}>
          {labelTag}
        </Tag>,
      )
    } else {
      const title = col.titleFilter ?? col.title
      const labelTag = `${title}: ${state[col.key]}`

      tags.push(
        <Tag closable key={labelTag} onClose={() => clearFilter(col.key)}>
          {labelTag}
        </Tag>,
      )
    }
  })

  if (tags.length > 0) {
    return (
      <div>
        {tags}
        <Button type="link" onClick={clearAll}>
          Xóa bộ lọc
        </Button>
      </div>
    )
  }

  return null
}
