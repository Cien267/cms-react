import React from 'react'
import { PageHeader as AntPageHeader } from '@ant-design/pro-layout'
import { PageContent, PageHeader } from '@/components/Layout'
import useBoolean from '@/hooks/useBoolean'
import { PageSpinner } from '@/components/Page'
import { css } from '@emotion/react'
import {
  Divider,
  Select,
  Button,
  InputNumber,
  Collapse,
  Switch,
  Spin,
  Avatar,
  Form,
  Space,
} from 'antd'
import CreatePackageLoan from './CreatePackageLoan/CreatePackageLoan'
import {
  useCreatePackageLoan,
  useGetPackageLoan,
  useUpdatePackageLoanRule,
} from '@/hooks/usePartner'
import {
  formatMutationPreScanning,
  formatPreScanning,
} from '@/views/Permission/PreScanning'
import { UpdatePartnerRuleType } from '@/types/partner'
const { Panel } = Collapse

function ConditionPackageLoan({ loan }) {
  const [form] = Form.useForm()
  const { mutateAsync: updateRule, isLoading } = useUpdatePackageLoanRule({
    id: loan.id,
  })
  const onCancel = () => {
    form.resetFields()
  }
  const handleSubmit = async (value: any) => {
    try {
      await form.validateFields()
      const formatValue = { partnerRule: formatMutationPreScanning(value) }

      await updateRule(formatValue as UpdatePartnerRuleType)
    } catch (e) {
      console.log(e)
    }
  }
  const initialValues = formatPreScanning(loan.partnerRule)

  return (
    <Form form={form} onFinish={handleSubmit} initialValues={initialValues}>
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
              <Switch />
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
              <InputNumber
                css={css`
                  width: 90px;
                `}
                controls={false}
              />
            </Form.Item>{' '}
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
              name={['revenue6months', 'required']}
              valuePropName="checked"
            >
              <Switch />
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
              <InputNumber
                css={css`
                  width: 90px;
                `}
                controls={false}
              />
            </Form.Item>{' '}
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
          </div>{' '}
          <div>triệu</div>
        </div>
        <div
          css={css`
            display: flex;
            align-items: center;
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
              <Switch />
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
              <InputNumber
                css={css`
                  width: 90px;
                `}
                controls={false}
              />
            </Form.Item>
          </div>
          <div>tháng gần nhất</div>
        </div>
        <Divider />
        <div
          css={css`
            display: flex;
            justify-content: end;
          `}
        >
          <Form.Item>
            <Space>
              <Button onClick={onCancel}>Hủy thay đổi</Button>
              <Button type="primary" htmlType="submit">
                Lưu thay đổi
              </Button>
            </Space>
          </Form.Item>
        </div>
      </div>
    </Form>
  )
}
export default function ManageLoan() {
  const [visible, setVisible] = useBoolean()
  const { data, isLoading } = useGetPackageLoan()
  const { mutateAsync: createPackageLoan, isLoading: isCreateLoading } =
    useCreatePackageLoan()
  const handleCancelModal = () => {
    setVisible.off()
  }
  const handleOpenModal = () => {
    setVisible.on()
  }
  const handleSubmit = async value => {
    try {
      await createPackageLoan(value)
      setVisible.off()
    } catch (e) {}
  }
  if (isLoading) return <PageSpinner />
  const listPackageLoan = data.data
  return (
    <>
      <PageHeader>
        <AntPageHeader
          title="Quản lý gói vay"
          extra={[
            // <Can ability="user.create">
            <Button key="add" onClick={handleOpenModal}>
              Thêm gói vay
            </Button>,

            // </Can>,
          ]}
        />
      </PageHeader>
      <div
        css={css`
          background-color: #f5f5f5;
        `}
      >
        <CreatePackageLoan
          loading={isCreateLoading}
          open={visible}
          title="Thông tin gói vay"
          onCancel={handleCancelModal}
          onSubmit={handleSubmit}
        />
        <PageContent>
          <div
            css={css`
              margin-top: 24px;
            `}
          >
            <div>
              {listPackageLoan.map(loan => (
                <Collapse
                  key={loan.id}
                  css={css`
                    background-color: #ffffff;
                    margin-top: 16px;
                  `}
                  expandIconPosition="end"
                >
                  <Panel
                    header={
                      <div
                        key={loan.id}
                        css={css`
                          display: flex;
                          justify-content: space-between;
                          align-items: center;
                        `}
                      >
                        <div
                          css={css`
                            display: flex;
                            align-items: center;
                          `}
                        >
                          <div
                            css={css`
                              display: flex;
                              align-items: center;
                              width: 32px;
                              height: 32px;
                              border-radius: 100px;
                              margin-right: 12px;
                            `}
                          >
                            {loan.iconUrl ? (
                              <img
                                css={css`
                                  border-radius: 100px;
                                  width: 32px;
                                  height: 32px;
                                `}
                                src={loan.iconUrl}
                                alt="logo icon"
                              />
                            ) : (
                              <Avatar style={{ background: '#E57373' }}>
                                {loan.name.charAt(0)}
                              </Avatar>
                            )}
                          </div>
                          <div
                            css={css`
                              font-weight: 500;
                              font-size: 16px;
                            `}
                          >
                            {loan.name}
                          </div>
                        </div>
                      </div>
                    }
                    key="1"
                    extra={<Button>Thiết lập điều kiện</Button>}
                  >
                    <ConditionPackageLoan loan={loan} />
                  </Panel>
                </Collapse>
              ))}
            </div>
          </div>
        </PageContent>
      </div>
    </>
  )
}
