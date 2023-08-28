import { css } from '@emotion/react'
import { Table } from 'antd'
import { actionTypes, useColumns, useMetaTable } from '@/contexts/tableProvider'
import { useListUserAccount } from '@/hooks/useUserAccount'
import type { ColumnsType, TableProps } from 'antd/es/table'
import { ListUserDataType } from '@/types'

export default function TableListUser() {
  const { state, dispatch } = useMetaTable()
  const { isLoading, data, isFetching } = useListUserAccount(
    {
      page: state.page,
      limit: state.limit,
    },
    {
      keepPreviousData: true,
    },
  )
  const dataSource = [...(data?.data ?? [])]
  const total = data?.meta?.total ?? 0
  const limit = state?.limit ? +state.limit : 15
  const currentPage = state?.page ? +state.page : 1

  const columns = useColumns()

  const onChangeTable: TableProps<ListUserDataType>['onChange'] = (
    pagination,
    filters,
    sorter,
    { action },
  ) => {
    if (action === 'paginate') {
      dispatch({ type: actionTypes.changePage, payload: pagination.current })
    } else if (action === 'filter') {
      dispatch({ type: actionTypes.changeAllFilter, payload: filters })
    } else if (action === 'sort') {
      dispatch({ type: actionTypes.changeSorter, payload: sorter })
    }
  }

  return (
    <div
      css={css({
        '& .ant-table-summary': {
          background: '#EDF2F7',
        },
        '& .ant-table-summary .ant-table-cell': {
          fontWeight: 600,
        },
        '& .ant-table-body': {
          overflow: 'auto !important',
        },
        '& .ant-pagination': {
          marginBottom: '0px !important',
        },
      })}
    >
      <Table
        locale={{
          triggerDesc: 'Chọn để sắp xếp giảm dần',
          triggerAsc: 'Chọn để sắp xếp tăng dần',
          cancelSort: 'Chọn để  về mặc định',
        }}
        dataSource={dataSource}
        columns={columns}
        loading={isLoading || isFetching}
        rowKey="id"
        onChange={onChangeTable}
        scroll={{ x: 1500, y: 'calc(100vh - 299px)' }}
        pagination={{
          total,
          pageSize: limit,
          showSizeChanger: false,
          current: currentPage,
        }}
      />
    </div>
  )
}
