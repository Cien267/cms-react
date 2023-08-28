import React from 'react'

import {
  AppstoreOutlined,
  ContactsOutlined,
  PoundOutlined,
  UsergroupAddOutlined,
  UserOutlined,
  WindowsOutlined,
  ScanOutlined,
  SmileOutlined,
} from '@ant-design/icons'

const sidebars = [
  {
    icon: <UserOutlined />,
    label: 'Tổng quan',
    key: 'overview',
    link: '/',
  },
  {
    icon: <AppstoreOutlined />,
    label: 'BNPL',
    key: 'package/bnpl',
    link: '/package/bnpl',
  },
  {
    icon: <ContactsOutlined />,
    label: 'Quản lý nợ BNPL',
    key: 'loan',
    children: [
      {
        key: 'loan/bnpl',
        link: '/loan/bnpl',
        label: 'Khoản vay BNPL',
      },
      {
        key: 'loan/bill',
        link: '/loan/bill',
        label: 'Phiếu thanh toán',
      },
    ],
  },
  {
    icon: <PoundOutlined />,
    label: 'Quản lý hồ sơ vay',
    key: 'merchant-loan',
    link: '/merchant-loan',
  },
]

const settingSidebars = [
  {
    icon: <UserOutlined />,
    label: 'Quản lý người dùng ',
    key: 'user',
    link: '/user',
  },
  {
    icon: <UsergroupAddOutlined />,
    label: 'Phân quyền',
    key: 'permission',
    link: '/permission',
  },
  {
    icon: <WindowsOutlined />,
    label: 'Gian hàng dùng thử',
    key: 'merchant-test',
    link: '/merchant-test',
  },
  {
    icon: <ScanOutlined />,
    label: 'Pre-Scanning',
    key: 'pre-scanning',
    link: '/pre-scanning',
  },
  {
    icon: <SmileOutlined />,
    label: 'Phân phối Partner',
    key: 'loan',
    children: [
      {
        key: 'partner/business-effectiveness',
        link: '/partner/business-effectiveness',
        label: 'Hiệu quả kinh doanh',
      },
      {
        key: 'partner/config-priority',
        link: '/partner/config-priority',
        label: 'Thiết lập ưu tiên',
      },
      {
        key: 'partner/manage-loan-package',
        link: '/partner/manage-loan-package',
        label: 'Quản lý gói vay',
      },
    ],
  },
]

const allSidebars = [...settingSidebars, ...sidebars]

export { allSidebars, settingSidebars, sidebars }
