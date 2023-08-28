export const billStatus = {
  PENDING: 'PENDING',
  APPROVED: 'APPROVED',
  TRACING: 'TRACING',
  CANCEL: 'CANCEL',
}

export const billTextColor = '#172B4D'

export const mapBillStatusToText = {
  APPROVED: 'Đã xác nhận',
  PENDING: 'Chờ xác nhận',
  TRACING: 'Tra soát',
  CANCEL: 'Hủy',
}

export const mapBillStatusToColor = {
  APPROVED: '#388E3C',
  PENDING: '#E0A353',
  TRACING: '#AF6A1A',
  CANCEL: '#5C6A82',
}

export const statusToBillText = status => mapBillStatusToText[status]

export const statusToBillColor = status => mapBillStatusToColor[status]

export const recipientOptions = [
  {
    label: 'Công ty cổ phần thương mại Citigo - Techcombank - 19033506666011',
    value: '1',
  },
  {
    label: 'Công ty cổ phần thương mại Citigo - VIB - 656686566',
    value: '2',
  },
]
