import React from 'react'
import { LockOutlined, UserOutlined } from '@ant-design/icons'
import { css } from '@emotion/react'
import { Button, Form, Input, message, Typography } from 'antd'
import useAsync from '@/hooks/useAsync'

const { Title } = Typography

export default function Login({ onSubmit }) {
  const { isLoading, isError, error, run } = useAsync()

  const onFinish = values => {
    run(
      onSubmit({
        username: values.username,
        password: values.password,
      }),
    )
  }

  React.useEffect(() => {
    if (isError && error) {
      message.error(error.message ?? 'Có lỗi xảy ra')
    }
  }, [isError, error])

  return (
    <div
      css={css`
        height: 100vh;
      `}
    >
      <div
        css={css`
          padding-top: 60px;
          margin: auto;
          max-width: 300px;
        `}
      >
        <div
          css={css`
            margin-bottom: 10px;
            text-align: center;
          `}
        >
          <Title level={3}>KFinance</Title>
        </div>
        <Form onFinish={onFinish} autoComplete="off">
          <Form.Item
            name="username"
            rules={[{ required: true, message: 'Vui lòng nhập tên đăng nhập' }]}
          >
            <Input prefix={<UserOutlined />} placeholder="Tên đăng nhập" />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[{ required: true, message: 'Vui lòng nhập mật khẩu' }]}
          >
            <Input.Password
              prefix={<LockOutlined />}
              type="password"
              placeholder="Mật khẩu"
            />
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              style={{ width: '100%' }}
              loading={isLoading}
            >
              Đăng nhập
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  )
}
