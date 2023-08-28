export const amountOfTimeOptions = [
  { label: '3 tháng', value: 90 },
  { label: '6 tháng', value: 180 },
  { label: '12 tháng', value: 360 },
  { label: '24 tháng', value: 720 },
  { label: '36 tháng', value: 1080 },
]

export const statusOptions = [
  { label: 'Bước 1', value: 'base_info' },
  { label: 'Bước 2', value: 'business_info' },
  { label: 'Hoàn thành', value: 'submit' },
  { label: 'Từ chối', value: 'denial' },
  { label: 'Phê duyệt', value: 'approved' },
]

export const mapMerchantLoanStatus = {
  base_info: 'Bước 1',
  business_info: 'Bước 2',
  file_info: 'Bước 3',
  submit: 'Hoàn thành',
}

export const mapMaritalStatus = {
  single: 'Độc thân',
  married: 'Đã kết hôn',
}

export const mapBusinessType = {
  offline: 'Cửa hàng truyền thống',
  online: 'Thương mại điện tử',
  both: 'Cả hai',
}

export const emptyOffice = [
  { address: '', linkMedia: '', name: '', urlImage: undefined },
]
