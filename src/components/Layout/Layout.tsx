import React from 'react'
import { LogoutOutlined } from '@ant-design/icons'
import { css, jsx } from '@emotion/react'
import { Link, Outlet } from '@tanstack/react-location'
import type { MenuProps } from 'antd'

import {
  Avatar,
  Divider,
  Dropdown,
  Layout,
  Menu,
  Space,
  Typography,
} from 'antd'
import { routeAbilities } from '@/constants/routes'
import { settingSidebars, sidebars } from '@/constants/sidebar'
import { useAuth } from '@/contexts/authContext'
import { usePermission } from '@/contexts/permissionContext'

import { PageSpinner } from '@/components/Page'

import useMenuKey from './hooks/useMenuKey'

const { Header, Sider, Content } = Layout
const { Title } = Typography

export default function MainLayout() {
  const { logout, user } = useAuth()
  const { can } = usePermission()
  const { selectedKey, openKey } = useMenuKey()
  const [collapsed, setCollapsed] = React.useState(false)
  const menuOptions = menuItems => {
    return (
      <Menu
        mode="inline"
        theme="dark"
        selectedKeys={[selectedKey]}
        defaultOpenKeys={[openKey]}
        style={{
          height: '100%',
          borderRight: 0,
        }}
        items={menuItems}
      />
    )
  }

  const actionMenuItems: MenuProps['items'] = [
    {
      key: 'logout',
      label: (
        <Space>
          <div>
            <LogoutOutlined />
          </div>
          <div>Đăng xuất</div>
        </Space>
      ),
      onClick: () => logout(),
    },
  ]

  const formatLinkSidebars = sidebars => {
    return sidebars.map(item => {
      const isChildrenHavePermission =
        !routeAbilities[item.link] &&
        item.children?.length &&
        item.children.some(_item => can(routeAbilities[_item.link]))

      const isOverviewPage = item.link === '/'
      const havePermission =
        can(routeAbilities[item.link]) ||
        isChildrenHavePermission ||
        isOverviewPage

      if (havePermission) {
        const formatItem = item => ({
          ...item,
          label: item.link ? (
            <Link key={item.label} to={item.link}>
              {item.label}
            </Link>
          ) : (
            item.label
          ),
        })

        let newChildren = ''

        if (item.children) {
          newChildren = item.children
            .filter(_item => can(routeAbilities[_item.link]))
            .map(__item => formatItem(__item))
        }

        return {
          ...item,
          label: item.link ? (
            <Link to={item.link}>{item.label}</Link>
          ) : (
            item.label
          ),
          children: newChildren,
        }
      }
      return null
    })
  }

  const WithLinkSidebars = formatLinkSidebars(sidebars)
  const WithLinkSettingSidebars = formatLinkSidebars(settingSidebars)
  return (
    <Layout>
      <Header
        style={{
          position: 'fixed',
          zIndex: 1,
          width: '100%',
          padding: '0px 12px',
          background: '#283593',
          height: '48px',
        }}
      >
        <div
          css={css`
            display: flex;
            justify-content: space-between;
            height: 100%;
            align-items: center;
          `}
        >
          <Link to={`/`}>
            <Title
              level={5}
              style={{
                color: '#ffffff',
                margin: 0,
                display: 'inline-flex',
                alignItems: 'center',
              }}
            >
              Kiot Finance Lending CMS
            </Title>
          </Link>
          <Dropdown menu={{ items: actionMenuItems }} trigger={['click']}>
            <a onClick={e => e.preventDefault()}>
              <Space style={{ alignItems: 'center', cursor: 'pointer' }}>
                <Avatar style={{ background: '#E57373' }} size="small">
                  {user.username.charAt(0)}
                </Avatar>
                <Title
                  level={5}
                  style={{ color: '#ffffff', margin: 'auto', fontWeight: 400 }}
                >
                  {user.username}
                </Title>
              </Space>
            </a>
          </Dropdown>
        </div>
      </Header>
      <Layout>
        <Sider
          style={{
            marginTop: 48,
            position: 'fixed',
            top: 0,
            left: 0,
            height: '100%',
            zIndex: 1000,
          }}
          width={240}
          collapsible
          collapsed={collapsed}
          onCollapse={value => setCollapsed(value)}
        >
          <div
            css={css({
              '& .ant-menu-item-selected': {
                background: 'transparent !important',
              },
            })}
          >
            {menuOptions(WithLinkSidebars)}
            <Divider style={{ backgroundColor: '#455570', margin: '16px 0' }} />
            {menuOptions(WithLinkSettingSidebars)}
          </div>
        </Sider>
        <Content
          style={{
            background: '#FFFFFF',
            marginTop: 48,
            marginLeft: collapsed ? 80 : 240,
            transition: 'all 0.2s',
          }}
        >
          <React.Suspense fallback={<PageSpinner />}>
            <Outlet />
          </React.Suspense>
        </Content>
      </Layout>
    </Layout>
  )
}
