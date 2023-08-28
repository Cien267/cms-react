import React from 'react'
import { PageHeader as AntPageHeader } from '@ant-design/pro-layout'
import { PageContent, PageHeader } from '@/components/Layout'
import { css } from '@emotion/react'
import {
  Form,
  Divider,
  Select,
  Button,
  InputNumber,
  Avatar,
  Table,
  Input,
} from 'antd'
import {
  useGetPackageLoan,
  useUpdatePackageLoanExpectations,
  useUpdatePackageLoanPriority,
} from '@/hooks/usePartner'
import { PageSpinner } from '@/components/Page'

const EditableContext = React.createContext(null)

function DetailConfigPriority({ packageLoan }) {
  const [priority, setPriority] = React.useState(packageLoan.priority)

  return (
    <>
      <div
        key={packageLoan.title}
        css={css`
          background-color: #ffffff;
          padding: 20px 24px;
          display: flex;
          justify-content: space-between;
          margin-top: 16px;
        `}
      >
        <div
          css={css`
            display: flex;
            gap: 12px;
          `}
        >
          <div>
            <InputNumber
              defaultValue={100}
              min={0}
              max={100}
              formatter={value => `${value}%`}
              parser={value => parseInt(value!.replace('%', ''), 10) as 0 | 100}
            />
          </div>
          <div>
            {priority ? (
              <Button
                css={css`
                  color: #1890ff;
                  border: none;
                `}
              >
                Đang ưu tiên
              </Button>
            ) : (
              <Button>Chọn ưu tiên</Button>
            )}
          </div>
        </div>
      </div>
    </>
  )
}

export default function ConfigPriority() {
  const { data, isLoading } = useGetPackageLoan()
  const { mutate: updateRule } = useUpdatePackageLoanPriority()
  const { mutateAsync: updateExpectation, isLoading: isSubmitLoading } =
    useUpdatePackageLoanExpectations()
  const [form] = Form.useForm()
  const initialValues = { expectations: data?.data }
  const expectations = Form.useWatch('expectations', form) || []
  const totalExpectation = expectations.reduce((accumulation, current) => {
    return accumulation + current.expectation
  }, 0)

  const listPackageLoan = data?.data || []
  const handleSubmit = async () => {
    try {
      const value = await form.validateFields()
      await updateExpectation(value)
    } catch (e) {
      console.log(e)
    }
  }
  const onCancel = () => {
    form.resetFields()
  }

  if (isLoading) return <PageSpinner />

  const columns = [
    {
      title: 'Tên gói vay',
      dataIndex: 'name',
      width: '55%',
      render: (name, row) => (
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
            {row.iconUrl ? (
              <img
                css={css`
                  border-radius: 100px;
                  width: 32px;
                  height: 32px;
                `}
                src={row.iconUrl}
                alt="logo icon"
              />
            ) : (
              <Avatar style={{ background: '#E57373' }}>
                {row.name.charAt(0)}
              </Avatar>
            )}
          </div>
          <div
            css={css`
              font-weight: 500;
              font-size: 16px;
            `}
          >
            {name}
          </div>
        </div>
      ),
    },
    {
      title: 'Số kỳ vọng',
      dataIndex: 'expectation',
      render: (_, record, index) => {
        return (
          <>
            <Form.Item
              name={['expectations', index, 'id']}
              style={{ display: 'none' }}
            >
              <InputNumber />
            </Form.Item>
            <Form.Item
              rules={[{ required: true, message: 'Vui lòng nhập số kỳ vọng' }]}
              name={['expectations', index, 'expectation']}
            >
              <InputNumber min={0} />
            </Form.Item>
          </>
        )
      },
    },
    {
      title: 'Tỷ lệ kỳ vọng',
      dataIndex: 'expectationPercent',
      render: (_, __, index) => {
        const currentExpectation = expectations[index]?.expectation || 0
        let percent = (currentExpectation / totalExpectation) * 100
        if (!totalExpectation) percent = 0
        return <div>{percent ? percent.toFixed(2) : percent}%</div>
      },
    },
    {
      key: 'action',
      title: 'Hành động',
      width: 100,
      render: (_, row) => {
        if (row.priority)
          return (
            <Button
              css={css`
                color: #1890ff !important;
              `}
              type="text"
              onClick={() => {
                updateRule({ priority: !row.priority, id: row.id })
              }}
            >
              Đang ưu tiên
            </Button>
          )
        return (
          <Button
            onClick={() => {
              updateRule({ priority: !row.priority, id: row.id })
            }}
          >
            Chọn ưu tiên
          </Button>
        )
      },
    },
  ]

  return (
    <>
      <PageHeader>
        <AntPageHeader
          title="Thiết lập ưu tiên và tỷ lệ OPT"
          extra={[
            // <Can ability="user.create">
            <Button key="cancel" onClick={onCancel}>
              Huỷ thay đổi
            </Button>,
            <Button
              type="primary"
              key="confirm"
              loading={isSubmitLoading}
              onClick={handleSubmit}
            >
              Cập nhật thay đổi
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
        <PageContent>
          <div
            css={css`
              background-color: #ffffff;
              border-radius: 12px;
            `}
          >
            <div
              css={css`
                padding: 24px 24px;
              `}
            >
              <div
                css={css`
                  font-weight: 500;
                  font-size: 16px;
                  line-height: 24px;
                `}
              >
                Thống kê số OPT hiện tại
              </div>
            </div>
            <Divider style={{ margin: 0 }} />
            <div
              css={css`
                overflow: auto;
                &::-webkit-scrollbar {
                  display: none;
                }
              `}
            >
              <div
                css={css`
                  min-width: 100%;
                  width: fit-content;
                  padding: 36px 24px;
                  display: flex;
                  justify-content: space-between;
                  div::-webkit-scrollbar {
                    display: none;
                  }
                `}
              >
                {listPackageLoan.map(packageLoan => (
                  <div
                    key={packageLoan.id}
                    css={css`
                      width: min(147px, 147px);
                    `}
                  >
                    <div
                      css={css`
                        margin-bottom: 10px;
                        font-weight: 500;
                      `}
                    >
                      {packageLoan.name}
                    </div>
                    <div
                      css={css`
                        color: rgba(0, 0, 0, 0.45);
                      `}
                    >
                      Bộ đếm OPT
                    </div>
                    <div
                      css={css`
                        font-weight: 500;
                        font-size: 24px;
                      `}
                    >
                      {packageLoan.sentLead}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div
            css={css`
              margin-top: 24px;
            `}
          >
            <div
              css={css`
                font-weight: 500;
                margin-bottom: 16px;
              `}
            >
              Thiết lập tỷ lệ & ưu tiên
            </div>
            <div>
              <Form
                initialValues={initialValues}
                id="formConfigPartnerPriority"
                form={form}
                component={false}
                onFinish={handleSubmit}
              >
                <Table
                  rowClassName={() => 'editable-row'}
                  rowKey="id"
                  bordered
                  dataSource={listPackageLoan}
                  columns={columns}
                  pagination={false}
                />
                {/* {listPackageLoan.map(packageLoan => (
                <DetailConfigPriority packageLoan={packageLoan} />
              ))} */}
              </Form>
            </div>
          </div>
        </PageContent>
      </div>
    </>
  )
}
