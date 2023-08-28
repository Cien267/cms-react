import React from 'react'
import { ErrorBoundary } from 'react-error-boundary'
import { CloseOutlined, EyeOutlined } from '@ant-design/icons'
import { css } from '@emotion/react'
import { Button, Descriptions, Image } from 'antd'
import { PageHeader as AntPageHeader } from '@ant-design/pro-layout'

import responseCode from '@/api/responseCode'
import { formatLoanId } from '@/helpers/code'
import { formatMoney } from '@/helpers/currency'
import { useNavigateBack } from '@/helpers/navigate'
import { formatValue } from '@/helpers/utility'
import { useDetailMerchantLoan } from '@/hooks/useMerchantLoan'
import { useParams } from '@/hooks/useParams'

import { PageContent, PageHeader } from '@/components/Layout'
import { Page404, PageSpinner } from '@/components/Page'

import { emptyOffice } from '../constance'
import {
  formatAmountOfTimeToMonth,
  formatBusinessType,
  formatMaritalStatus,
} from '../helper'
import useSelectedIndustry from '../useIndustry'
import useSelectedLocation from '../useSelectedLocation'

export default function WithErrorDetailMerchantLoan() {
  return (
    <ErrorBoundary FallbackComponent={Page404}>
      <DetailMerchantLoan />
    </ErrorBoundary>
  )
}
function PreviewText() {
  return (
    <>
      <EyeOutlined />
    </>
  )
}

function DisplayLegalRecord({ merchantLoan }) {
  return (
    <div
      css={css`
        margin-bottom: 24px;
      `}
    >
      <Descriptions
        title="Hồ sơ pháp lý"
        column={2}
        labelStyle={{ fontWeight: '600' }}
        contentStyle={{ color: '#000000' }}
      >
        <Descriptions.Item label="Mã số doanh nghiệp/hộ kinh doanh">
          {formatValue(merchantLoan.fileCode)}
        </Descriptions.Item>
        <Descriptions.Item label="Ảnh chụp giấy đăng ký kinh doanh">
          <Image
            preview={{ mask: <PreviewText /> }}
            height={80}
            src={merchantLoan.urlImageFile}
          />
        </Descriptions.Item>
      </Descriptions>
    </div>
  )
}

function DetailMerchantLoan() {
  const { id } = useParams()
  const { isLoading, data: merchantLoan } = useDetailMerchantLoan(id, {
    useErrorBoundary: error => {
      return error?.responseCode === responseCode.NotFound
    },
  })
  const { industry } = useSelectedIndustry(merchantLoan?.industryId)
  const { city, district, ward } = useSelectedLocation({
    cityId: merchantLoan?.cityId,
    districtId: merchantLoan?.districtId,
    wardId: merchantLoan?.wardId,
  })
  const navigateBack = useNavigateBack()

  if (isLoading) return <PageSpinner />
  return (
    <>
      <PageHeader loading={isLoading}>
        <AntPageHeader
          title={formatLoanId(merchantLoan.kflaId)}
          extra={
            <Button
              onClick={() => navigateBack()}
              key="close"
              type="text"
              shape="circle"
              icon={<CloseOutlined />}
            />
          }
        />
      </PageHeader>
      <PageContent loading={isLoading}>
        <div
          css={css`
            margin-bottom: 24px;
          `}
        >
          <Descriptions
            title="Nhu cầu vay vốn"
            column={2}
            labelStyle={{ fontWeight: '600' }}
            contentStyle={{ color: '#000000' }}
          >
            <Descriptions.Item label="Số tiền muốn vay (VNĐ)">
              {formatValue(formatMoney(merchantLoan.amount))}
            </Descriptions.Item>
            <Descriptions.Item label="Thời hạn vay">
              {formatValue(
                formatAmountOfTimeToMonth(merchantLoan.amountOfTime),
              )}{' '}
              tháng
            </Descriptions.Item>
            <Descriptions.Item label="Mục đích vay vốn">
              {formatValue(merchantLoan.purpose)}
            </Descriptions.Item>
          </Descriptions>
        </div>
        <div
          css={css`
            margin-bottom: 24px;
          `}
        >
          <Descriptions
            title="Thông tin người vay"
            column={2}
            labelStyle={{ fontWeight: '600' }}
            contentStyle={{ color: '#000000' }}
          >
            <Descriptions.Item label="Họ tên">
              {formatValue(merchantLoan.fullName)}
            </Descriptions.Item>
            <Descriptions.Item label="Số điện thoại">
              {formatValue(merchantLoan.phone)}
            </Descriptions.Item>
            <Descriptions.Item label="Ngày sinh">
              {formatValue(merchantLoan.birthday)}
            </Descriptions.Item>
            <Descriptions.Item label="Tỉnh/Thành - Quận/Huyện">
              {formatValue(city?.name)}, {formatValue(district?.name)}
            </Descriptions.Item>
            <Descriptions.Item label="Tình trạng hôn nhân">
              {formatValue(formatMaritalStatus(merchantLoan.maritalStatus))}
            </Descriptions.Item>
            <Descriptions.Item label="Phường/Xã">
              {formatValue(ward?.name)}
            </Descriptions.Item>
            <Descriptions.Item />
            <Descriptions.Item label="Số nhà/Tên đường/Thôn xóm">
              {formatValue(merchantLoan.address)}
            </Descriptions.Item>
          </Descriptions>
        </div>
        <div
          css={css`
            margin-bottom: 24px;
          `}
        >
          <Descriptions
            title="Thông tin định danh"
            column={2}
            labelStyle={{ fontWeight: '600' }}
            contentStyle={{ color: '#000000' }}
          >
            <Descriptions.Item label="Số CCCD/CMND">
              {formatValue(merchantLoan.identifyNumber)}
            </Descriptions.Item>
            <Descriptions.Item label="Ảnh mặt trước CCCD/CMND">
              <Image
                preview={{ mask: <PreviewText /> }}
                height={80}
                src={merchantLoan.identifyImageFrontSide}
              />
            </Descriptions.Item>
            <Descriptions.Item label="Ngày cấp">
              {formatValue(merchantLoan.identifyOpenDate)}
            </Descriptions.Item>
            <Descriptions.Item label="Ảnh mặt sau CCCD/CMND">
              <Image
                preview={{ mask: <PreviewText /> }}
                height={80}
                src={merchantLoan.identifyImageBackSide}
              />
            </Descriptions.Item>
            <Descriptions.Item label="Nơi cấp">
              {formatValue(merchantLoan.identifyAddress)}
            </Descriptions.Item>
            <Descriptions.Item label="Ảnh chụp chân dung">
              <Image
                preview={{ mask: <PreviewText /> }}
                height={80}
                src={merchantLoan.identifyImagePortrait}
              />
            </Descriptions.Item>
          </Descriptions>
        </div>
        <div
          css={css`
            margin-bottom: 24px;
          `}
        >
          <Descriptions
            title="Lĩnh vực hoạt động"
            column={2}
            labelStyle={{ fontWeight: '600' }}
            contentStyle={{ color: '#000000' }}
          >
            <Descriptions.Item label="Ngành hàng">
              {formatValue(industry?.name)}
            </Descriptions.Item>
            <Descriptions.Item label="Hình thức kinh doanh">
              {formatValue(formatBusinessType(merchantLoan.businessType))}
            </Descriptions.Item>
            <Descriptions.Item label="Mặt hàng kinh doanh chính">
              {formatValue(merchantLoan.businessItem)}
            </Descriptions.Item>
          </Descriptions>
        </div>
        <div
          css={css`
            margin-bottom: 24px;
          `}
        >
          <Descriptions
            title="Cơ sở kinh doanh"
            column={2}
            labelStyle={{ fontWeight: '600' }}
            contentStyle={{ color: '#000000' }}
          />
          {(merchantLoan?.offices?.length
            ? merchantLoan.offices
            : emptyOffice
          ).map((office, index) => (
            <Descriptions
              title={`Cở sở ${index + 1}`}
              column={2}
              labelStyle={{ fontWeight: '600' }}
              contentStyle={{ color: '#000000' }}
            >
              <Descriptions.Item label="Tên cửa hàng/cơ sở kinh doanh">
                {formatValue(office.name)}
              </Descriptions.Item>
              {index === 0 ? (
                <>
                  <Descriptions.Item label="Đường link cửa hàng">
                    {office.linkMedia ? (
                      <a href={office.linkMedia}>{office.linkMedia}</a>
                    ) : (
                      '--'
                    )}
                  </Descriptions.Item>
                  <Descriptions.Item label="Địa chỉ kinh doanh/kho hàng">
                    {formatValue(office.address)}
                  </Descriptions.Item>
                  <Descriptions.Item label="Ảnh chụp cơ sở kinh doanh/kho hàng">
                    <Image
                      preview={{ mask: <PreviewText /> }}
                      height={80}
                      src={office.urlImage}
                    />
                  </Descriptions.Item>
                </>
              ) : (
                <>
                  <Descriptions.Item label="Ảnh chụp cơ sở kinh doanh/kho hàng">
                    <Image
                      preview={{ mask: <PreviewText /> }}
                      height={80}
                      src={office.urlImage}
                    />
                  </Descriptions.Item>
                  <Descriptions.Item label="Địa chỉ kinh doanh/kho hàng">
                    {formatValue(office.address)}
                  </Descriptions.Item>
                </>
              )}
            </Descriptions>
          ))}
        </div>
        <DisplayLegalRecord merchantLoan={merchantLoan} />
      </PageContent>
    </>
  )
}
