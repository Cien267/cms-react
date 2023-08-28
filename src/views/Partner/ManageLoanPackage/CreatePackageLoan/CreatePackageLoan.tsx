import React, { useMemo, useState } from 'react'
import { css } from '@emotion/react'
import {
  Button,
  Col,
  Divider,
  Form,
  Input,
  InputNumber,
  Modal,
  Row,
  Select,
  Switch,
  Upload,
} from 'antd'
import { trimObject } from '@/helpers/utility'
import { validatePassword } from '@/helpers/validate/password'
import { validatePhoneNumber } from '@/helpers/validate/phone'
import { validateUsername } from '@/helpers/validate/username'
import useResetFormModal from '@/hooks/useResetFormModal'
import { useRoles } from '@/hooks/useRole'
import { UploadOutlined } from '@ant-design/icons'
import type { UploadProps } from 'antd'
import { InlineUpload } from '@/components/Upload'
import { formatMinAndMinArrayPattern } from '@/views/Permission/PreScanning'

// handleUploadImage(event.target.files[0])
export default function CreatePackageLoan({
  open,
  onCancel,
  title,
  onSubmit,
  loading,
}) {
  const [form] = Form.useForm()
  useResetFormModal(form, open)

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
      await form.validateFields()

      onSubmit(
        trimObject({
          name: value.name,
          partner: value.partner,
          iconUrl: value.iconUrl,
          partnerRule: {
            revenue_6months:
              value.revenue6months.minPattern ||
              value.revenue6months.minArrayPattern
                ? {
                    required: value.revenue6months?.required ? true : false,
                    pattern: formatMinAndMinArrayPattern(value.revenue6months),
                  }
                : undefined,
            businessAge: {
              pattern: `min=${value.businessAge?.pattern || ''}` || undefined,
              required: value.businessAge?.required ? true : false,
            },
            lastTxnMonth: {
              pattern:
                `min_month=${value.lastTxnMonth?.pattern || ''}` || undefined,
              required: value.lastTxnMonth?.required ? true : false,
            },
          },
        }),
      )
    } catch (e) {
      console.error(e)
    }
  }
  return (
    <Modal
      confirmLoading={loading}
      title={title}
      width={850}
      footer={[
        <div
          css={css`
            margin-top: 100px;
          `}
        >
          <Button onClick={() => onCancel()}>Huỷ bỏ</Button>
          <Button htmlType="submit" type="primary" form="formAddLoan">
            Tạo mới gói vay
          </Button>
        </div>,
      ]}
      open={open}
      onCancel={onCancel}
    >
      <div css={css``}>
        <Form
          id="formAddLoan"
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
          <Form.Item required label="Tên gói vay" name="name">
            <Input />
          </Form.Item>
          <Form.Item required label="Đối tác" name="partner">
            <Input />
          </Form.Item>
          {/* <Form.Item label="Ảnh icon" n"ame="status"> */}
          <Form.Item noStyle name="iconUrl">
            <InlineUpload />
          </Form.Item>
          {/* </Form.Item> */}
          <Divider />
          <div>
            <div
              css={css`
                font-weight: 500;
                font-size: 16px;
              `}
            >
              Điều kiện đăng ký
            </div>
            <div>
              <div
                css={css`
                  display: flex;
                  align-items: center;
                  margin-bottom: 16px;
                `}
              >
                <div
                  css={css`
                    margin-right: 14px;
                  `}
                >
                  <Form.Item
                    noStyle
                    name={['businessAge', 'required']}
                    valuePropName="checked"
                  >
                    <Switch size="small" />
                  </Form.Item>
                </div>
                <div
                  css={css`
                    margin-right: 12px;
                  `}
                >
                  Merchant đã ký và sử dụng phần mềm tối thiểu
                </div>
                <div
                  css={css`
                    margin-right: 12px;
                  `}
                >
                  <Form.Item noStyle name={['businessAge', 'pattern']}>
                    <InputNumber />
                  </Form.Item>
                </div>
                <div>tháng</div>
              </div>

              <div
                css={css`
                  display: flex;
                  align-items: center;
                  margin-bottom: 16px;
                `}
              >
                <div
                  css={css`
                    margin-right: 14px;
                  `}
                >
                  <Form.Item
                    noStyle
                    name={['lastTxnMonth', 'required']}
                    valuePropName="checked"
                  >
                    <Switch size="small" />
                  </Form.Item>
                </div>
                <div
                  css={css`
                    margin-right: 12px;
                  `}
                >
                  Merchant có phát sinh giao dịch bán hàng liên tục
                </div>
                <div
                  css={css`
                    margin-right: 12px;
                  `}
                >
                  <Form.Item noStyle name={['lastTxnMonth', 'pattern']}>
                    <InputNumber />
                  </Form.Item>
                </div>
                <div>tháng gần nhất</div>
              </div>
            </div>
          </div>
          <div
            css={css`
              display: flex;
              align-items: center;
              margin-bottom: 16px;
            `}
          >
            <div
              css={css`
                margin-right: 14px;
              `}
            >
              <Form.Item
                noStyle
                name={['revenue6months', 'required']}
                valuePropName="checked"
              >
                <Switch size="small" />
              </Form.Item>
            </div>
            <div
              css={css`
                margin-right: 12px;
              `}
            >
              Doanh thu trung bình 6 tháng gần nhất trên
            </div>
            <div
              css={css`
                margin-right: 12px;
              `}
            >
              <Form.Item noStyle name={['revenue6months', 'minPattern']}>
                <InputNumber />
              </Form.Item>
            </div>
            <div
              css={css`
                margin-right: 12px;
              `}
            >
              triệu hoặc có 1 trong 6 tháng trên
            </div>
            <div
              css={css`
                margin-right: 12px;
              `}
            >
              <Form.Item noStyle name={['revenue6months', 'minArrayPattern']}>
                <InputNumber />
              </Form.Item>
            </div>
            <div>triệu</div>
          </div>
        </Form>
      </div>
    </Modal>
  )
}
