import React, { useMemo } from 'react'
import {
  DeleteOutlined,
  EditOutlined,
  FolderOpenOutlined,
} from '@ant-design/icons'
import { css } from '@emotion/react'
import { Button, Image, List } from 'antd'
import FolderDeleteOutlineImg from '@/assets/folder-delete-outline.svg'
import { actionsInTabPermission, RootAdmin } from '@/constants/roles'
import { usePermission } from '@/contexts/permissionContext'
import { mapPermissionToArray } from '@/helpers/array'
import { useRoles } from '@/hooks/useRole'

export default function ListRoles({
  activeItem,
  onChangeActiveItemAndAction,
  resources,
  action,
}) {
  const { data: rolesData } = useRoles()
  const { can } = usePermission()
  const tabItems = useMemo(() => {
    const tabAdd = {
      id: 'add',
      label: '+ Thêm mới vai trò',
      isTabAdd: true,
      isActive: true,
      canEdit: false,
      canDelete: false,
      data: {
        name: '',
        notes: '',
        status: true,
        abilities: new Array(resources.length).fill([]),
      },
    }
    const tabRoot = {
      id: 'root',
      label: 'Root Admin',
      isTabAdd: false,
      isActive: true,
      canEdit: false,
      canDelete: false,
      data: RootAdmin,
    }
    const tabItems = can('role.create') ? [tabAdd, tabRoot] : [tabRoot]

    if (rolesData) {
      const newRoles = rolesData.map(r => ({
        id: r.id,
        label: r.name,
        isTabAdd: false,
        isActive: r.status,
        canEdit: can('role.update'),
        canDelete: can('role.delete'),
        data: {
          ...r,
          abilities: mapPermissionToArray(
            resources,
            r.abilities || [],
            resources.length,
          ),
        },
      }))
      return [...tabItems, ...newRoles]
    }

    return tabItems
  }, [resources, rolesData, can])

  return (
    <List
      itemLayout="horizontal"
      dataSource={tabItems}
      css={css({
        '& .ant-list-item': {
          padding: '0',
        },
        '&.ant-list-split .ant-list-item': {
          borderBottom: '0',
        },
        '&': {
          height: '100vh',
          overflowY: 'auto',
        },
      })}
      renderItem={item => (
        <List.Item>
          <Item
            {...item}
            activeItem={activeItem}
            onChange={onChangeActiveItemAndAction}
            action={action}
          />
        </List.Item>
      )}
    />
  )
}

function Item({
  label,
  isActive,
  canEdit,
  canDelete,
  isTabAdd,
  id,
  activeItem,
  onChange,
  data,
  action,
}) {
  const isNotSeenEditButton = useMemo(() => {
    if (!canEdit) {
      return true
    }
    if (action === actionsInTabPermission.UPDATE && activeItem === id) {
      return true
    }
    return false
  }, [action, activeItem, canEdit, id])
  return (
    <>
      <div
        css={css`
          display: flex;
          width: 364px;
          border-bottom: 1px solid #e8e8e8;
          padding: 16px 16px 16px 24px;
          cursor: pointer;
          ${id === activeItem && 'background-color: rgba(187, 186, 186, 0.3);'}
        `}
        onClick={() => {
          onChange({
            activeItem: id,
            action:
              id === 'add'
                ? actionsInTabPermission.CREATE
                : actionsInTabPermission.READ,
            data: data,
          })
        }}
      >
        <div
          css={css`
            display: flex;
            flex: 1;
            align-items: center;
          `}
        >
          <div>
            {!isTabAdd &&
              (isActive ? (
                <Button
                  type="text"
                  icon={<FolderOpenOutlined />}
                  shape="circle"
                  size="middle"
                />
              ) : (
                <div
                  css={css`
                    height: 32px;
                    margin-right: 8px;
                  `}
                >
                  <Image
                    src={FolderDeleteOutlineImg}
                    alt="folder-delete-outline"
                    preview={false}
                    style={{ maxWidth: 22, maxHeight: 22 }}
                  />
                </div>
              ))}
          </div>

          <h5
            css={css`
              font-weight: 400;
              font-size: 14px;
              line-height: 16px;
              color: #172b4d;
              text-align: center;
              line-height: 32px;
              margin: 0;
              font-style: ${isTabAdd ? 'italic' : 'normal'};
            `}
          >
            {label}
          </h5>
        </div>
        <div>
          {!isNotSeenEditButton ? (
            <Button
              type="text"
              icon={<EditOutlined />}
              shape="circle"
              size="middle"
              onClick={e => {
                onChange({
                  activeItem: id,
                  action: actionsInTabPermission.UPDATE,
                  data: data,
                })
                e.stopPropagation()
              }}
            />
          ) : null}
          {canDelete ? (
            <Button
              type="text"
              icon={<DeleteOutlined />}
              shape="circle"
              size="middle"
              disabled
              onClick={e => {
                // onChange({
                //   activeItem: id,
                //   action: actionsInTabPermission.DELETE,
                //   data: data,
                // });
                e.stopPropagation()
              }}
            />
          ) : null}
        </div>
      </div>
    </>
  )
}
