import React, { useMemo } from 'react'
import { css } from '@emotion/react'
import { Checkbox, Col, Collapse, Row } from 'antd'
import { chunk } from '@/helpers/array'

const CheckboxGroup = Checkbox.Group
const { Panel } = Collapse

const ITEM_PER_COL = 4

function ResourcesCheckboxGroup({
  resources,
  value = [],
  onChange,
  active,
  defaultCloseAllCheckbox,
}) {
  const newResources = chunk(resources, ITEM_PER_COL)

  const onChangeItem = (idx, data) => {
    const newValue = [...value.slice(0, idx), data, ...value.slice(idx + 1)]
    onChange?.(newValue)
  }

  return (
    <Row>
      {newResources.map((_resources, idx) => (
        <Col span={12} key={idx}>
          {_resources.map((resource, index) => (
            <ResourceCheckboxGroup
              resource={resource}
              key={resource.name}
              idx={idx * ITEM_PER_COL + index}
              checkedList={value[idx * ITEM_PER_COL + index]}
              setCheckedList={onChangeItem}
              active={active}
              defaultCloseAllCheckbox={defaultCloseAllCheckbox}
            />
          ))}
        </Col>
      ))}
    </Row>
  )
}

function ResourceCheckboxGroup({
  resource,
  idx,
  checkedList,
  setCheckedList,
  active,
  defaultCloseAllCheckbox,
}) {
  const checkAll = useMemo(() => {
    return (
      !!checkedList &&
      !!resource.actions &&
      resource.actions.every(v => checkedList.includes(v.value))
    )
  }, [checkedList, resource.actions])

  const indeterminate = useMemo(() => {
    return (
      !!checkedList &&
      !!resource.actions &&
      !checkAll &&
      resource.actions.some(v => checkedList.includes(v.value))
    )
  }, [checkAll, checkedList, resource.actions])

  const onChange = list => {
    setCheckedList(idx, list)
  }

  const onCheckAllChange = e => {
    setCheckedList(
      idx,
      e.target.checked ? resource.actions.map(a => a.value) : [],
    )
  }

  const header = (
    <Checkbox
      indeterminate={indeterminate}
      onChange={onCheckAllChange}
      checked={checkAll}
      disabled={!active}
      onClick={event => event.stopPropagation()}
    >
      <p
        onClick={e => e.stopPropagation()}
        css={css`
          margin: 0;
        `}
      >
        {resource.name}
      </p>
    </Checkbox>
  )

  return (
    <Collapse
      defaultActiveKey={defaultCloseAllCheckbox ? '' : idx}
      css={css({
        '&.ant-collapse': {
          border: 0,
          backgroundColor: 'white',
        },
        '&.ant-collapse > .ant-collapse-item': {
          border: 0,
        },
        '& .ant-collapse-content': {
          border: 0,
        },
        '& .ant-checkbox-group-item': {
          padding: '8px 0',
          borderBottom: '1px solid #F4F4F4',
        },
        '& .ant-checkbox-wrapper': {
          display: 'flex',
        },
        '& .ant-form label': {
          fontSize: '14px',
          lineHeight: '20px',
          color: '#333333',
        },
        '& .ant-checkbox-group': {
          marginLeft: '48px',
        },
        '& .ant-collapse-content > .ant-collapse-content-box': {
          padding: 0,
        },
        '& .ant-checkbox-disabled + span': {
          color: 'rgba(0, 0, 0, 1)',
        },
      })}
    >
      <Panel header={header} key={idx}>
        <CheckboxGroup
          options={resource.actions}
          value={checkedList}
          onChange={onChange}
          disabled={!active}
        />
      </Panel>
    </Collapse>
  )
}

export default ResourcesCheckboxGroup
