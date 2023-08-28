import React, { useEffect, useMemo, useState } from 'react'
import { css } from '@emotion/react'
import { useLocation } from '@tanstack/react-location'
import { Col, Row } from 'antd'
import { resources as resourcesConst } from '@/constants/resources'
import { actionsInTabPermission, RootAdmin } from '@/constants/roles'
import { usePermission } from '@/contexts/permissionContext'

import { Page404 } from '@/components/Page'

import ListRoles from './ListRoles'
import {
  getActions,
  getInitialAction,
  getInitialActiveItem,
  getInitialRole,
} from './permissionHelper'
import RoleForm from './RoleForm'

export default function PermissionContent({ roles, initResource }) {
  const { can } = usePermission()
  const { current } = useLocation()

  const id = current?.search?.id
  const havePermissionCreate = can('role.create')

  const initialActiveItem = getInitialActiveItem({
    id,
    havePermissionCreate,
  })
  const [activeItem, setActiveItem] = useState(initialActiveItem)
  const initialAction = getInitialAction({ activeItem, havePermissionCreate })
  const [action, setAction] = useState(initialAction)
  const resources = useMemo(() => {
    const _resources = initResource
    if (_resources) {
      const newResources = _resources.map(r => ({
        name: resourcesConst[r.group],
        group: r.group,
        actions: getActions(r.actions),
      }))
      return newResources
    }
    return []
  }, [initResource])

  const [role, setRole] = useState()

  React.useEffect(() => {
    setRole(getInitialRole({ roles, activeItem, resources }))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [roles])

  useEffect(() => {
    if (resources && !resources.length) return
    if (can('role.create') && activeItem === 'add') {
      setRole({
        name: '',
        notes: '',
        status: true,
        abilities: new Array(resources.length).fill([]),
      })
    }
    //Check ìf current user's create permission has taken away
    else if (activeItem === 'add' || activeItem === 'root') {
      setActiveItem('root')
      setRole(RootAdmin)
      setAction(actionsInTabPermission.READ)
    }
  }, [can, resources, activeItem])
  const onChangeActiveItemAndAction = ({ activeItem, action, data }) => {
    setActiveItem(activeItem)
    setAction(action)
    setRole(data)
  }
  if (!role && id) return <Page404 />
  return (
    <>
      <div
        css={css`
          background: #f3f4f6;
          border-radius: 2px;
          padding: 20px;
          margin-bottom: 20px;
        `}
      >
        <h3
          css={css`
            margin: 0;
            font-weight: 700;
            font-size: 18px;
            line-height: 17px;
            color: #172b4d;
          `}
        >
          Vai trò
        </h3>
      </div>
      <Row>
        <Col span={6}>
          <ListRoles
            activeItem={activeItem}
            onChangeActiveItemAndAction={onChangeActiveItemAndAction}
            resources={resources}
            action={action}
          />
        </Col>
        <Col span={16} offset={1}>
          {role ? (
            <RoleForm
              key={activeItem}
              initialValues={role}
              action={action}
              resources={resources}
              setActiveItem={setActiveItem}
              setAction={setAction}
              setRole={setRole}
            />
          ) : null}
        </Col>
      </Row>
    </>
  )
}
