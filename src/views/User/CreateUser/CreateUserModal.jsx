import React, { useMemo } from 'react'
import { css } from '@emotion/react'
import { Button, Col, Form, Input, Modal, Row, Select, Switch } from 'antd'
import { trimObject } from '@/helpers/utility'
import { validatePassword } from '@/helpers/validate/password'
import { validatePhoneNumber } from '@/helpers/validate/phone'
import { validateUsername } from '@/helpers/validate/username'
import useResetFormModal from '@/hooks/useResetFormModal'
import { useRoles } from '@/hooks/useRole'

export default function CreateUser({
  visible,
  onCancel,
  title,
  onSubmit,
  loading,
}) {
  const [form] = Form.useForm()
  useResetFormModal(form, visible)

  const initialValues = useMemo(() => ({ status: true }), [])
  const { data: roles } = useRoles()

  const roleOptions = React.useMemo(() => {
    if (!Array.isArray(roles)) return []

    return roles
      .filter(role => role.status)
      .map(role => ({ label: role.name, value: role.id }))
  }, [roles])

  const handleSubmit = async value => {
    try {
      form.setFieldsValue(trimObject(value))
      await form.validateFields()
      onSubmit(trimObject(value))
    } catch (e) {}
  }
  return (
    <Modal
      loading={loading}
      title={title}
      width={550}
      footer={[
        <>
          <Button
            onClick={() => onCancel()}
            style={{
              borderRadius: '6px',
              background: '#fff',
              color: '#000000',
            }}
          >
            Bỏ qua
          </Button>
          <Button
            htmlType="submit"
            form="formCreateUser"
            style={{
              background: '#283593',
              color: 'white',
              borderRadius: '4px',
            }}
          >
            Lưu
          </Button>
        </>,
      ]}
      visible={visible}
      onCancel={onCancel}
    >
      <div css={css``}>
        <Form
          id="formCreateUser"
          onFinish={handleSubmit}
          form={form}
          layout={'horizontal'}
          initialValues={initialValues}
          autoComplete="off"
          css={css({
            '& .ant-form-item-label': {
              fontWeight: 600,
              padding: 0,
            },
          })}
        >
          <Form.Item
            label="Trạng thái hoạt động"
            name="status"
            valuePropName="checked"
          >
            <Switch size="small" />
          </Form.Item>
          <Row>
            <Col span={11}>
              <Form.Item
                label="Tên đăng nhập"
                labelCol={{ span: 24 }}
                name="username"
                rules={[
                  { required: true, message: 'Vui lòng nhập tên đăng nhập' },
                  { validator: (_, value) => validateUsername(value) },
                ]}
              >
                <Input maxLength={30} placeholder="Nhập tên đăng nhập" />
              </Form.Item>
            </Col>
            <Col offset={1} span={12}>
              <Form.Item
                label="Mật khẩu đăng nhập"
                labelCol={{ span: 24 }}
                name="password"
                rules={[
                  { required: true, message: 'Vui lòng nhập mật khẩu' },
                  {
                    min: 6,
                    max: 30,
                    type: 'string',
                    message: 'Mật khẩu phải từ 6 - 30 kí tự ',
                  },
                  {
                    validator: (_, value) => validatePassword(value),
                  },
                ]}
              >
                <Input.Password placeholder="Nhập mật khẩu đăng nhập" />
              </Form.Item>
            </Col>
          </Row>
          <Row>
            <Col span={11}>
              <Form.Item
                label="Họ tên"
                labelCol={{ span: 24 }}
                name="fullName"
                rules={[{ required: true, message: 'Vui lòng nhập họ tên' }]}
              >
                <Input maxLength={100} placeholder="Nhập họ tên người dùng" />
              </Form.Item>
            </Col>
            <Col offset={1} span={12}>
              <Form.Item
                label="Vai trò"
                labelCol={{ span: 24 }}
                name="role"
                rules={[{ required: true, message: 'Vui lòng nhập vai trò' }]}
              >
                <Select
                  placeholder="Chọn vai trò của người dùng"
                  options={roleOptions}
                />
              </Form.Item>
            </Col>
          </Row>
          <Row>
            <Col span={11}>
              <Form.Item
                label="Điện thoại"
                name="phoneNumber"
                labelCol={{ span: 24 }}
                rules={[
                  {
                    validator: (_, value) => validatePhoneNumber(value),
                  },
                ]}
              >
                <Input
                  placeholder="Nhập số điện thoại người dùng"
                  maxLength={10}
                />
              </Form.Item>
            </Col>
            <Col offset={1} span={12}>
              <Form.Item
                label="Email"
                name="email"
                labelCol={{ span: 24 }}
                rules={[
                  {
                    type: 'email',
                    message: 'Sai định dạng email',
                  },
                ]}
              >
                <Input maxLength={100} placeholder="Nhập email người dùng" />
              </Form.Item>
            </Col>
          </Row>
          <Row>
            <Col span={24}>
              <Form.Item label="Ghi chú" name="note" labelCol={{ span: 24 }}>
                <Input
                  maxLength={256}
                  placeholder="Nhập ghi chú cho người dùng này"
                />
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </div>
    </Modal>
  )
}
