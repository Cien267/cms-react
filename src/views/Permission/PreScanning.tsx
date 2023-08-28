import { PageHeader as AntPageHeader } from '@ant-design/pro-layout'
import { Button, Form, Input, InputNumber, Space, Switch } from 'antd'
import React from 'react'
import { PageContent, PageHeader } from '@/components/Layout'
import { css } from '@emotion/react'
import {
  useGetPreScanningRule,
  useUpdatePreScanningRule,
} from '@/hooks/usePreScanning'
import { PageSpinner } from '@/components/Page'
import { PreScanningConfigProps } from '@/types/preScanning'
import { addUnderscoreBeforeNumber } from '@/helpers/utility'
import { usePermission } from '@/contexts/permissionContext'
import { formatMoney, parserMoney } from '@/helpers/currency'
import { UpdatePartnerTargetType } from '@/types/partner'

const moneyUnit = 1_000_000

const formatMoneyUnit = (money: Money): number => {
  if (!money) return 0
  return Number(money) / moneyUnit
}

const formatMinMonth = pattern => {
  return `min_month=${pattern[`pattern`] || ''}`
}
const formatMin = pattern => {
  return `min=${pattern[`pattern`] || ''}`
}
export const formatMinAndMinArrayPattern = pattern => {
  return `min=${pattern[`minPattern`] * moneyUnit || ''}|min_arr=${
    pattern[`minArrayPattern`] * moneyUnit || ''
  }`
}

export function formatPreScanning(preScanning: PreScanningConfigProps) {
  let format = preScanning
  for (const key in preScanning) {
    if (Object.prototype.hasOwnProperty.call(preScanning, key)) {
      const pattern = format[key][`pattern`]

      const mixMinArrayPattern =
        pattern && pattern.match(/^(min=(\d+)*\|min_arr=(\d+)*)$/)

      //split min=d|min_arr=e to minPattern = e and minArrayPattern = e
      if (mixMinArrayPattern && mixMinArrayPattern.length > 1) {
        const pattern = mixMinArrayPattern[1].split('|')

        const min = pattern[0].split('=')[1]
        const minArray = pattern[1].split('=')[1]
        const minPattern = min ? parseInt(min) : ''
        const minArrayPattern = minArray ? parseInt(minArray) : ''
        format[key][`minPattern`] = formatMoneyUnit(minPattern)
        format[key][`minArrayPattern`] = formatMoneyUnit(minArrayPattern)
        continue
      }

      const minPattern = pattern && pattern.match(/min=(\d+)*/)
      if (minPattern && minPattern.length > 1) {
        format[key][`pattern`] = minPattern[1]
        continue
      }

      const minMonthPatter = pattern && pattern.match(/min_month=(\d+)*/)
      if (minMonthPatter && minMonthPatter.length > 1) {
        format[key][`pattern`] = minMonthPatter[1]
        continue
      }
    }
  }
  return format
}

export function formatMutationPreScanning(rule: PreScanningConfigProps) {
  let format = rule

  for (const key in rule) {
    if (Object.prototype.hasOwnProperty.call(rule, key)) {
      const pattern = format[key][`pattern`]
      if (['revenue3months', 'revenue6months'].includes(key)) {
        format[addUnderscoreBeforeNumber(key)] = {
          required: format[key][`required`],
          pattern: formatMinAndMinArrayPattern(format[key]),
        }
        delete format[key]
        continue
      }
      if (key === 'lastTxnMonth') {
        format[key][`pattern`] = formatMinMonth(format[key])
        continue
      }
      if (['activeDay6months', 'activeDay3months'].includes(key)) {
        format[addUnderscoreBeforeNumber(key)] = {
          ...format[key],
          pattern: formatMin(format[key]),
        }
        delete format[key]
        continue
      }
      if (['businessAge', 'noDayRemain'].includes(key)) {
        format[key][`pattern`] = formatMin(format[key])
        continue
      }
    }
  }
  return format
}

const PreScanning: React.FC = () => {
  const { can } = usePermission()
  const { data: preScanning, isLoading } = useGetPreScanningRule()
  const { mutate: updateRule, isLoading: isUpdateLoading } =
    useUpdatePreScanningRule()
  const [form] = Form.useForm()
  const canUpdate = can('pre_scanning.update')
  const handleSubmit = async (value: any) => {
    try {
      await form.validateFields()
      const formatValue = formatMutationPreScanning(value)

      await updateRule(formatValue)
    } catch (e) {}
  }
  const onCancel = () => {
    form.resetFields()
  }
  if (isLoading) return <PageSpinner />
  const initialValues = formatPreScanning(preScanning)

  return (
    <>
      <PageHeader>
        <AntPageHeader
          title="Tiêu chí Pre-Scanning"
          extra={[
            // <Can ability="user.create">
            <Button key="cancel" disabled={!canUpdate} onClick={onCancel}>
              Hủy thay đổi
            </Button>,
            <Button
              type="primary"
              key="confirm"
              htmlType="submit"
              form="formPreScanning"
              disabled={!canUpdate}
            >
              Lưu thay đổi
            </Button>,
            // </Can>,
          ]}
        />
      </PageHeader>
      <PageContent css={css``}>
        <div
          css={css`
            padding: 8px;
          `}
        >
          <div
            css={css`
              font-weight: 500;
              font-size: 20px;
              margin-bottom: 18px;
            `}
          >
            Thiết lập tiêu chí
          </div>
          <div
            css={css`
              padding: 32px 24px;
              background-color: #f5f5f5;
            `}
          >
            <Form
              form={form}
              id="formPreScanning"
              onFinish={handleSubmit}
              // onFinish={updateMerchantTests}
              initialValues={initialValues}
            >
              <Space
                css={css`
                  align-items: center;
                  margin-bottom: 16px;
                `}
              >
                <div>
                  <Form.Item
                    noStyle
                    name={['businessAge', 'required']}
                    valuePropName="checked"
                  >
                    <Switch disabled={!canUpdate} />
                  </Form.Item>
                </div>
                <div>Merchant đã ký và sử dụng phần mềm tối thiểu</div>
                <Form.Item noStyle name={['businessAge', 'pattern']}>
                  <InputNumber
                    css={css`
                      width: 90px;
                    `}
                    controls={false}
                    disabled={!canUpdate}
                  />
                </Form.Item>
                <div>tháng</div>
              </Space>
              <Space
                css={css`
                  display: flex;
                  align-items: center;
                  margin-bottom: 16px;
                `}
              >
                <div>
                  <Form.Item
                    noStyle
                    name={['lastTxnMonth', 'required']}
                    valuePropName="checked"
                  >
                    <Switch disabled={!canUpdate} />
                  </Form.Item>
                </div>
                <div>Merchant có phát sinh giao dịch bán hàng liên tục</div>
                <Form.Item noStyle name={['lastTxnMonth', 'pattern']}>
                  <InputNumber
                    css={css`
                      width: 90px;
                    `}
                    disabled={!canUpdate}
                    controls={false}
                  />
                </Form.Item>
                <div>tháng gần nhất</div>
              </Space>
              <Space
                css={css`
                  display: flex;
                  align-items: center;
                  margin-bottom: 16px;
                `}
              >
                <div>
                  <Form.Item
                    noStyle
                    name={['activeDay6months', 'required']}
                    valuePropName="checked"
                  >
                    <Switch disabled={!canUpdate} />
                  </Form.Item>
                </div>
                <div> Có nhiều hơn</div>
                <Form.Item noStyle name={['activeDay6months', 'pattern']}>
                  <InputNumber
                    css={css`
                      width: 90px;
                    `}
                    disabled={!canUpdate}
                    controls={false}
                  />
                </Form.Item>
                <div>ngày có phát sinh giao dịch trong 6 tháng gần nhất</div>
              </Space>
              <Space
                css={css`
                  display: flex;
                  align-items: center;
                  margin-bottom: 16px;
                `}
              >
                <div>
                  <Form.Item
                    noStyle
                    name={['activeDay3months', 'required']}
                    valuePropName="checked"
                  >
                    <Switch disabled={!canUpdate} />
                  </Form.Item>
                </div>
                <div> Có nhiều hơn</div>
                <Form.Item noStyle name={['activeDay3months', 'pattern']}>
                  <InputNumber
                    css={css`
                      width: 90px;
                    `}
                    disabled={!canUpdate}
                    controls={false}
                  />
                </Form.Item>
                <div>ngày có phát sinh giao dịch trong 3 tháng gần nhất</div>
              </Space>
              <Space
                css={css`
                  display: flex;
                  align-items: center;
                  margin-bottom: 16px;
                `}
              >
                <div>
                  <Form.Item
                    noStyle
                    name={['revenue6months', 'required']}
                    valuePropName="checked"
                  >
                    <Switch disabled={!canUpdate} />
                  </Form.Item>
                </div>
                <div> Doanh thu trung bình 6 tháng gần nhất trên</div>
                <Form.Item noStyle name={['revenue6months', 'minPattern']}>
                  <InputNumber
                    css={css`
                      width: 120px;
                    `}
                    disabled={!canUpdate}
                    controls={false}
                    formatter={value =>
                      Boolean(value) ? formatMoney(value) : ''
                    }
                    parser={value => (Boolean(value) ? parserMoney(value) : '')}
                  />
                </Form.Item>
                <div>triệu hoặc có 1 trong 6 tháng trên</div>
                <Form.Item noStyle name={['revenue6months', 'minArrayPattern']}>
                  <InputNumber
                    css={css`
                      width: 120px;
                    `}
                    disabled={!canUpdate}
                    controls={false}
                    formatter={value =>
                      Boolean(value) ? formatMoney(value) : ''
                    }
                    parser={value => (Boolean(value) ? parserMoney(value) : '')}
                  />
                </Form.Item>
                <div>triệu</div>
              </Space>
              <Space
                css={css`
                  display: flex;
                  align-items: center;
                  margin-bottom: 16px;
                `}
              >
                <div>
                  <Form.Item
                    noStyle
                    name={['revenue3months', 'required']}
                    valuePropName="checked"
                  >
                    <Switch disabled={!canUpdate} />
                  </Form.Item>
                </div>
                <div> Doanh thu trung bình 3 tháng gần nhất trên</div>
                <Form.Item noStyle name={['revenue3months', 'minPattern']}>
                  <InputNumber
                    css={css`
                      width: 120px;
                    `}
                    disabled={!canUpdate}
                    controls={false}
                    formatter={value =>
                      Boolean(value) ? formatMoney(value) : ''
                    }
                    parser={value => (Boolean(value) ? parserMoney(value) : '')}
                  />
                </Form.Item>
                <div>triệu hoặc có 1 trong 3 tháng trên</div>
                <Form.Item noStyle name={['revenue3months', 'minArrayPattern']}>
                  <InputNumber
                    css={css`
                      width: 120px;
                    `}
                    disabled={!canUpdate}
                    controls={false}
                    formatter={value =>
                      Boolean(value) ? formatMoney(value) : ''
                    }
                    parser={value => (Boolean(value) ? parserMoney(value) : '')}
                  />
                </Form.Item>
                <div>triệu</div>
              </Space>
              <Space
                css={css`
                  display: flex;
                  align-items: center;
                `}
              >
                <div>
                  <Form.Item
                    noStyle
                    name={['noDayRemain', 'required']}
                    valuePropName="checked"
                  >
                    <Switch disabled={!canUpdate} />
                  </Form.Item>
                </div>
                <div>Thời gian sử dụng phần mềm KiotViet còn lại tối thiểu</div>
                <Form.Item noStyle name={['noDayRemain', 'pattern']}>
                  <InputNumber
                    css={css`
                      width: 90px;
                    `}
                    disabled={!canUpdate}
                    controls={false}
                  />
                </Form.Item>
                <div>ngày tiếp theo</div>
              </Space>
            </Form>
          </div>
        </div>
      </PageContent>
    </>
  )
}

export default PreScanning
