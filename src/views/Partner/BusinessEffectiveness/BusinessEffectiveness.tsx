import React from 'react'

import { PageHeader as AntPageHeader } from '@ant-design/pro-layout'
import useBoolean from '@/hooks/useBoolean'
import { PageContent, PageHeader } from '@/components/Layout'
import { css } from '@emotion/react'
import {
  Button,
  Select,
  Tabs,
  Row,
  Col,
  Divider,
  Progress,
  Avatar,
  DatePicker,
} from 'antd'
import type { DatePickerProps, TabsProps } from 'antd'
import { InfoCircleOutlined } from '@ant-design/icons'
import ConfigCriteriaModal from './ConfigCriteria/ConfigCriteria'
import { useGetPackageLoanSummary } from '@/hooks/usePartner'
import {
  startOfMonthTimestamp,
  startOfThisDay,
  startOfThisMonthTimestamp,
} from '@/helpers/datetime'
import { PageSpinner } from '@/components/Page'
import { formatMoney } from '@/helpers/currency'

const RenderOption = ({ packageLoanSummary, loading }) => {
  if (loading) return <PageSpinner />
  return (
    <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32, xl: 32, xxl: 32 }}>
      {packageLoanSummary.map((packageLoan, index) => {
        let percent = 0
        percent = packageLoan.targetLead
          ? (packageLoan.sendLead / packageLoan.targetLead) * 100
          : 0
        const fixedPercent = percent.toFixed(2)
        return (
          <Col
            key={packageLoan.id}
            css={css`
              margin-top: 24px;
              background-color: #fff;
              padding: 20px 24px !important;
            `}
            span={11}
          >
            <div
              css={css`
                display: flex;
              `}
            >
              <div
                css={css`
                  margin-right: 12px;
                  display: flex;
                `}
              >
                {packageLoan.iconUrl ? (
                  <img
                    css={css`
                      border-radius: 100px;
                      width: 32px;
                      height: 32px;
                    `}
                    src={packageLoan.iconUrl}
                    alt="packageLoan logo"
                  />
                ) : (
                  <Avatar style={{ background: '#E57373' }}>
                    {packageLoan.name.charAt(0)}
                  </Avatar>
                )}
              </div>
              <div
                css={css`
                  font-weight: 500;
                  font-size: 16px;
                `}
              >
                {packageLoan.name}
              </div>
            </div>
            <Divider style={{ margin: '4px 0' }} />
            <div>
              <div
                css={css`
                  display: flex;
                  justify-content: space-between;
                `}
              >
                <div
                  css={css`
                    font-weight: 500;
                    font-size: 16px;
                    color: rgba(0, 0, 0, 0.45);
                    line-height: 24px;
                  `}
                >
                  Đã đạt ngày trước đó
                </div>
                <div>
                  <InfoCircleOutlined />
                </div>
              </div>
              <div
                css={css`
                  font-weight: 500;
                  font-size: 30px;
                  line-height: 40px;
                  color: rgba(0, 0, 0, 0.85);
                `}
              >
                {formatMoney(packageLoan.targetLead)} OPT
              </div>
              <div
                css={css`
                  font-weight: 400;
                  font-size: 14px;
                  line-height: 22px;
                  color: rgba(0, 0, 0, 0.85);
                `}
              >
                Đạt {fixedPercent}% (đã đạt {formatMoney(packageLoan.sendLead)})
              </div>
              <div
                css={css`
                  .ant-progress-inner {
                    height: 14px;
                  }
                  .ant-progress-bg {
                    height: 14px !important;
                  }
                `}
              >
                <Progress percent={percent} showInfo={false} />
              </div>
            </div>
          </Col>
        )
      })}
    </Row>
  )
}

export default function BusinessEffectiveness() {
  const [visible, setVisible] = useBoolean()
  const [month, setMonth] = React.useState(startOfThisMonthTimestamp())
  const { data, isLoading } = useGetPackageLoanSummary({ month })
  const packageLoanSummary = data?.data || []
  const handleCancelModal = () => {
    setVisible.off()
  }
  const handleOpenModal = () => {
    setVisible.on()
  }
  const handleSubmit = value => {
    setVisible.off()
  }
  const onChange: DatePickerProps['onChange'] = (date, dateString) => {
    setMonth(startOfMonthTimestamp(date))
  }
  const items: TabsProps['items'] = [
    {
      key: '1',
      label: `Xem theo tháng`,
      children: RenderOption({ packageLoanSummary, loading: isLoading }),
    },
  ]

  return (
    <>
      <ConfigCriteriaModal
        open={visible}
        title="Thiết lập chỉ tiêu"
        onCancel={handleCancelModal}
        onSubmit={handleCancelModal}
      />
      <PageHeader>
        <AntPageHeader
          title="Hiệu quả kinh doanh"
          extra={[
            // <Can ability="user.create">
            <Button type="primary" key="confirm" onClick={handleOpenModal}>
              Thiết lập chỉ tiêu
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
          <div css={css``}>
            <div
              css={css`
                display: flex;
                justify-content: space-between;
                margin-bottom: 20px;
                background-color: #fff;
              `}
            >
              <div
                css={css`
                  padding: 28px 24px 20px 24px;
                  font-weight: 500;
                  font-size: 16px;
                `}
              >
                Thống kê hiệu quả
              </div>
              <div
                css={css`
                  padding: 28px 24px 20px 24px;
                  font-weight: 500;
                  font-size: 16px;
                `}
              >
                <DatePicker
                  defaultValue={startOfThisDay()}
                  onChange={onChange}
                  picker="month"
                />
                {/* <Select
                  defaultValue="6 tháng"
                  options={[
                    { value: '6 tháng', label: '6 tháng' },
                    { value: 'lucy', label: 'Lucy' },
                    { value: 'Yiminghe', label: 'yiminghe' },
                    { value: 'disabled', label: 'Disabled', disabled: true },
                  ]}
                /> */}
              </div>
            </div>
            <div
              css={css`
                .ant-tabs-nav {
                  background-color: #fff;
                  padding: 28px 24px 0 24px !important;
                }
                .ant-row {
                  margin: 0 !important;
                  justify-content: space-between;
                }
                .ant-col-11 {
                  display: block;
                  flex: 0 0 48.833333%;
                  max-width: 49.833333%;
                }
              `}
            >
              <Tabs defaultActiveKey="1" items={items} />
            </div>
          </div>
        </PageContent>
      </div>
    </>
  )
}
