import React from 'react'
import { EyeOutlined } from '@ant-design/icons'
import { css } from '@emotion/react'
import { Link } from '@tanstack/react-location'
import { Button } from 'antd'
import { TableMetaProvider } from '@/contexts/tableProvider'
import { formatLoanId } from '@/helpers/code'
import { formatMoney, parserMoney } from '@/helpers/currency'
import { formatDateTimeInstance } from '@/helpers/datetime'
import { PageHeader as AntPageHeader } from '@ant-design/pro-layout'

import { PageContent, PageHeader } from '@/components/Layout'
import TableFilterBar from '@/components/Table/TableFilterBar'

import { amountOfTimeOptions, statusOptions } from '../constance'
import { formatAmountOfTimeToMonth, formatMerchantLoanStatus } from '../helper'

import TableMerchantLoan from './TableMerchantLoan'
import IncludeTestSwitch from './TestMerchantSwitch'

export default function ListMerchant() {
  const columns = React.useMemo(() => {
    return [
      {
        key: 'id',
        title: 'Mã hồ sơ',
        dataIndex: 'id',
        ellipsis: true,
        width: 180,
        filterSearch: true,
        filterType: 'text',
        filterPlaceholder: 'Lọc mã hồ sơ',
        render: (val, row) => (
          <Link target="_blank" to={`/merchant-loan/${val}`}>
            {formatLoanId(row.kflaId)}
          </Link>
        ),
      },
      {
        key: 'status',
        title: 'Trạng thái hồ sơ',
        dataIndex: 'status',
        filterType: 'radio',
        filterSearch: true,
        filterOptions: statusOptions,
        width: 160,
        render: val => (val ? formatMerchantLoanStatus(val) : '--'),
      },
      {
        key: 'updatedAt',
        title: 'Thời gian cập nhật',
        dataIndex: 'updatedAt',
        width: 180,
        filterType: 'dateRange',
        formatPattern: 'DD/MM/YYYY',
        showTime: false,
        filterSearch: true,
        render: val => (val ? formatDateTimeInstance(val) : '--'),
      },
      {
        key: 'createdAt',
        title: 'Thời gian tạo',
        dataIndex: 'createdAt',
        width: 150,
        filterType: 'dateRange',
        formatPattern: 'DD/MM/YYYY',
        showTime: false,
        filterSearch: true,
        render: val => (val ? formatDateTimeInstance(val) : '--'),
      },
      {
        key: 'fullName',
        title: 'Tên khách hàng',
        dataIndex: 'fullName',
        width: 160,
        filterSearch: true,
        filterType: 'text',
        filterPlaceholder: 'Lọc tên khách hàng',
        render: val => (val ? val : '--'),
      },
      {
        key: 'phone',
        title: 'Số điện thoại',
        width: 140,
        dataIndex: 'phone',
        filterSearch: true,
        filterType: 'text',
        filterPlaceholder: 'Lọc tên khách hàng',
        render: val => (val ? val : '--'),
      },
      {
        key: 'amount',
        title: 'Số tiền vay (VNĐ)',
        width: 170,
        filterType: 'numberRange',
        filterSearch: true,
        minRange: 100_000_000,
        maxRange: 500_000_000,
        dataIndex: 'amount',
        formatter: value =>
          Boolean(value) ? formatMoney(Math.floor(value)) : '',
        parser: value => (Boolean(value) ? parserMoney(value) : ''),
        render: val => (val ? formatMoney(val) : '--'),
      },
      {
        key: 'amountOfTime',
        title: 'Thời gian vay',
        width: 140,
        filterType: 'radio',
        filterSearch: true,
        dataIndex: 'amountOfTime',
        filterOptions: amountOfTimeOptions,
        render: val => (val ? `${formatAmountOfTimeToMonth(val)} tháng` : '--'),
      },
      {
        key: '',
        title: 'Thao tác',
        width: 100,
        align: 'right',
        render: (_, val) => {
          return (
            <>
              <Link target="_blank" to={`/merchant-loan/${val.id}`}>
                <Button type="text" icon={<EyeOutlined />} />
              </Link>
            </>
          )
        },
      },
    ]
  }, [])

  return (
    <TableMetaProvider columns={columns} initialValue={{ page: 1, limit: 15 }}>
      <PageHeader>
        <AntPageHeader title="Danh sách hồ sơ vay" />
      </PageHeader>
      <PageContent>
        <div
          css={css`
            margin-bottom: 12px;
          `}
        >
          <IncludeTestSwitch />
          <TableFilterBar />
        </div>
        <TableMerchantLoan />
      </PageContent>
    </TableMetaProvider>
  )
}
