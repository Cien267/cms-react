import React from 'react'
import { DeleteOutlined, EditOutlined, LockOutlined } from '@ant-design/icons'
import { css } from '@emotion/react'
import { Button, Spin } from 'antd'
import { mapStatusToText } from '@/constants/packageBnplStatus'
import { Can } from '@/contexts/permissionContext'
import { TableMetaProvider } from '@/contexts/tableProvider'
import { formatDateTimeInstance } from '@/helpers/datetime'
import { formatValue } from '@/helpers/utility'
import useBoolean from '@/hooks/useBoolean'
import { useRoles } from '@/hooks/useRole'
import { useMutationCreateUserAccount } from '@/hooks/useUserAccount'
import CreateUserModal from '@/views/User/CreateUser/CreateUserModal'
import { PageHeader as AntPageHeader } from '@ant-design/pro-layout'

import Avatar from '@/components/Avatar'
import { PageContent, PageHeader } from '@/components/Layout'
import TableFilterBar from '@/components/Table/TableFilterBar'

import TableListUser from './TableListUser'

export default function ListUser() {
  const [visible, setVisible] = useBoolean()
  const { data: roles, isLoading: roleLoading } = useRoles()
  const { mutateAsync: createUserAccount, isLoading } =
    useMutationCreateUserAccount()

  const handleCancelModal = () => {
    setVisible.off()
  }
  const handleOpenModal = () => {
    setVisible.on()
  }
  const handleSubmit = async value => {
    try {
      await createUserAccount(value)
      setVisible.off()
    } catch (e) {}
  }

  const columns = React.useMemo(() => {
    return [
      {
        title: 'Tên đăng nhập',
        dataIndex: 'username',
        key: 'username',
        ellipsis: true,
        width: 160,
        render: val => formatValue(val),
      },
      {
        title: 'Họ tên',
        dataIndex: 'fullName',
        key: 'fullName',
        width: 160,
        render: val => formatValue(val),
      },
      {
        title: 'Vai trò',
        dataIndex: 'role',
        key: 'role',
        width: 170,
        render: val => {
          const getRoleName = id =>
            roles?.length ? roles.find(role => role.id === id)?.name : '--'
          return val === '' ? 'root' : getRoleName(val)
        },
      },
      {
        title: 'Trạng thái hoạt động',
        dataIndex: 'status',
        key: 'status',
        width: 180,
        render: val => mapStatusToText(val),
      },
      {
        title: 'Ngày tạo',
        dataIndex: 'createdAt',
        key: 'createdAt',
        width: 180,
        render: val => formatDateTimeInstance(val),
      },
      {
        title: 'Người tạo',
        dataIndex: 'createdBy',
        key: 'createdBy',
        width: 160,
        render: val => (val ? <Avatar name={val} /> : '--'),
      },
      {
        title: 'Thao tác',
        width: 100,
        render: _ => (
          <div
            css={css`
              display: flex;
              color: #5c6a82;
            `}
          >
            <Button
              type="text"
              icon={<EditOutlined />}
              shape="circle"
              size="small"
              disabled
            />
            <Button
              type="text"
              icon={<DeleteOutlined />}
              shape="circle"
              size="small"
              disabled
            />
            <Button
              type="text"
              icon={<LockOutlined />}
              shape="circle"
              size="small"
              disabled
            />
          </div>
        ),
      },
    ]
  }, [roles])
  if (roleLoading) return <Spin />
  return (
    <>
      <CreateUserModal
        loading={isLoading}
        visible={visible}
        title="Thêm mới người dùng"
        onCancel={handleCancelModal}
        onSubmit={handleSubmit}
      />
      <PageHeader>
        <AntPageHeader
          title="Quản lý ngươi dùng"
          extra={[
            <Can ability="user.create">
              <Button
                style={{
                  background: '#283593',
                  color: 'white',
                  borderRadius: '4px',
                }}
                key="1"
                onClick={handleOpenModal}
              >
                Thêm mới người dùng
              </Button>
            </Can>,
          ]}
        />
      </PageHeader>
      <PageContent>
        <TableMetaProvider
          columns={columns}
          initialValue={{ page: 1, limit: 15 }}
        >
          <div
            css={css`
              margin-top: 16px;
            `}
          >
            <TableFilterBar />
          </div>
          <div
            css={css`
              margin-top: 12px;
            `}
          >
            <TableListUser />
          </div>
        </TableMetaProvider>
      </PageContent>
    </>
  )
}
