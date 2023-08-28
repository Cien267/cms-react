import { css } from '@emotion/react'
import { Table } from 'antd'
import { actionTypes, useColumns, useMetaTable } from '@/contexts/tableProvider'
import { convertTextToId } from '@/helpers/code'

import { formatDateTimeToTimeStamp } from '@/helpers/datetime'
import {
  formatOptionsSearch,
  formatRange,
  formatTextSearch,
} from '@/helpers/utility'
import { useListMerchantLoan } from '@/hooks/useMerchantLoan'
import type { ColumnsType, TableProps } from 'antd/es/table'
import { ListLoanMerchantDataType } from '@/types'

export default function TableMerchants() {
  const { state, dispatch } = useMetaTable()
  const { isLoading, data, isFetching } = useListMerchantLoan(
    {
      page: state.page,
      limit: state.limit,
      includeTest: Boolean(state.includeTest),
      kflaId: state.id ? convertTextToId(state.id[0]) : undefined,
      status: formatOptionsSearch(state.status)?.[0],
      amountOfTime: formatOptionsSearch(state.amountOfTime)?.[0],
      phone: formatTextSearch(state.phone),
      fullName: formatTextSearch(state.fullName),
      ...formatRange(
        'UpdatedAt',
        state.updatedAt,
        val => formatDateTimeToTimeStamp(val),
        `${'UpdatedAt'}_min`,
        `${'UpdatedAt'}_max`,
      ),
      ...formatRange(
        'CreatedAt',
        state.createdAt,
        val => formatDateTimeToTimeStamp(val),
        `${'CreatedAt'}_min`,
        `${'CreatedAt'}_max`,
      ),
      ...formatRange(
        'Amount',
        state.amount,
        val => val,
        `${'Amount'}_min`,
        `${'Amount'}_max`,
      ),
      sort: ['updated_at_desc'],
    },
    {
      meta: {
        shouldNotHandleErrorGlobal: true,
      },
    },
  )
  const dataSource = data?.data ?? []

  const total = data?.total ?? 0
  const limit = state?.limit ? +state.limit : 15
  const currentPage = state?.page ? +state.page : 1

  const columns = useColumns()
  const onChangeTable: TableProps<ListLoanMerchantDataType>['onChange'] = (
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
        '& .ant-table-body': {
          overflow: 'auto !important',
        },
        '& .ant-pagination': {
          marginBottom: '0px !important',
        },
        '& .ant-pagination-total-text': {
          color: '#000000',
          fontWeight: 600,
          marginRight: 'auto',
        },
      })}
    >
      <Table
        dataSource={dataSource}
        columns={columns}
        loading={isLoading || isFetching}
        rowKey="id"
        onChange={onChangeTable}
        scroll={{ y: 'calc(100vh - 330px)' }}
        pagination={{
          total,
          pageSize: limit,
          showSizeChanger: false,
          current: currentPage,
          showTotal: total => `${total} hồ sơ vay`,
        }}
      />
    </div>
  )
}
