import React, { useMemo } from 'react'
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
  Table,
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
import {
  useGetPackageLoan,
  useGetPackageLoanSummary,
  useUpdatePackageLoanTarget,
} from '@/hooks/usePartner'
import {
  getMonth,
  getStartOfMonthFromNumber,
  startOfThisMonthTimestamp,
} from '@/helpers/datetime'
import dayjs from 'dayjs'

type MonthInputProps = {
  onChangeMonth: (monthChange: any) => void
  value?: any
  onChange?: any
}

const formatUpdateLoanTarget = (packageLoan: any) => {
  return {
    month: packageLoan.month,
    targetLeads: Object.keys(packageLoan.targetLeads).map(key => ({
      id: key,
      target: packageLoan.targetLeads[`${key}`].target,
    })),
  }
}
function MonthInput({ value, onChange, onChangeMonth }: MonthInputProps) {
  const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]

  const handleChange = changeNumber => {
    onChangeMonth(changeNumber)
    onChange(changeNumber)
  }
  return (
    <>
      {numbers.map(number => (
        <Button
          key={number}
          onClick={() => handleChange(number)}
          type={value === number ? 'primary' : 'default'}
        >
          {number}
        </Button>
      ))}
    </>
  )
}

export default function ConfigCriteriaModal({
  open,
  onCancel,
  title,
  onSubmit,
}) {
  const currentMonth = getMonth()
  const [month, setMonth] = React.useState(currentMonth)
  const [form] = Form.useForm()

  const queryMonth = month
    ? getStartOfMonthFromNumber(month - 1)
    : startOfThisMonthTimestamp()
  const { mutateAsync: updateTarget, isLoading: isSubmitLoading } =
    useUpdatePackageLoanTarget({ month: queryMonth })
  const { data, isLoading } = useGetPackageLoanSummary({ month: queryMonth })
  useResetFormModal(form, open)

  const handleChangeMonth = monthChange => {
    setMonth(monthChange)
  }
  const packageLoanSummary =
    (data?.data || []).map(packageLoan => ({
      id: packageLoan.id,
    })) || []

  const initialValues = useMemo(
    () => ({ month, targetLeads: packageLoanSummary }),
    [packageLoanSummary],
  )

  const { data: roles } = useRoles()

  const roleOptions = React.useMemo(() => {
    if (!Array.isArray(roles)) return []

    return roles
      .filter(role => role.status)
      .map(role => ({ label: role.name, value: role.id }))
  }, [roles])

  const handleSubmit = async value => {
    try {
      await updateTarget(value)
      onSubmit()
    } catch (e) {
      console.log(e)
    }
  }

  return (
    <Modal
      title={title}
      width={888}
      forceRender
      footer={[
        <div
          css={css`
            margin-top: 100px;
          `}
        >
          <Button onClick={() => onCancel()}>Huỷ bỏ</Button>
          <Button
            htmlType="submit"
            type="primary"
            form="formAddLoan"
            loading={isSubmitLoading}
          >
            Cập nhật thay đổi
          </Button>
        </div>,
      ]}
      open={open}
      onCancel={onCancel}
    >
      <div
        css={css`
          font-size: 14px;
        `}
      >
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
          <Form.Item label="Tháng" name="month">
            <MonthInput onChangeMonth={handleChangeMonth} />
          </Form.Item>
          <div
            css={css`
              padding: 16px;
              border: 1px solid #f5f5f5;
              max-height: 364px;
              overflow: auto;
              &::-webkit-scrollbar {
                display: none;
              }
            `}
          >
            <Row>
              <Col
                span={12}
                css={css`
                  color: rgba(0, 0, 0, 0.45);
                  margin-bottom: 16px;
                `}
              >
                Sảm phẩm vay
              </Col>
              <Col
                push={1}
                span={5}
                css={css`
                  color: rgba(0, 0, 0, 0.45);
                `}
              >
                Chỉ tiêu tháng
              </Col>
              <Col
                span={6}
                push={1}
                css={css`
                  color: rgba(0, 0, 0, 0.45);
                `}
              >
                Cập nhật chỉ tiêu tháng
              </Col>
              {(data?.data || []).map((packageLoan, index) => (
                <React.Fragment key={packageLoan.id}>
                  <Col
                    span={12}
                    css={css`
                      color: rgba(0, 0, 0, 0.45);
                      margin-bottom: 16px;
                    `}
                  >
                    {packageLoan.name}
                  </Col>
                  <Col
                    push={1}
                    span={5}
                    css={css`
                      color: rgba(0, 0, 0, 0.45);
                    `}
                  >
                    {packageLoan.targetLead}
                  </Col>
                  <Col
                    span={6}
                    push={1}
                    css={css`
                      color: rgba(0, 0, 0, 0.45);
                    `}
                  >
                    <Form.Item
                      required
                      name={['targetLeads', index, 'id']}
                      style={{ display: 'none' }}
                    >
                      <InputNumber />
                    </Form.Item>
                    <Form.Item
                      rules={[
                        {
                          required: true,
                          message: 'Vui lòng nhập tên chỉ tiêu tháng',
                        },
                      ]}
                      name={['targetLeads', index, 'target']}
                    >
                      <InputNumber min={0} />
                    </Form.Item>
                  </Col>
                </React.Fragment>
              ))}
            </Row>
          </div>
        </Form>
      </div>
    </Modal>
  )
}
