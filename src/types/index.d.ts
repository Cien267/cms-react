interface ListUserDataType {
  id: string
  username: string
  fullName: string
  role: string | number
  status: string
  createdAt: Date
  createdBy: string
}

interface ListLoanMerchantDataType {
  id: string
  status: string
  updatedAt: Date
  phone: string
  fullName: string | number
  amount: number
  amountOfTime: number
  createdAt: Date
}

export { ListLoanMerchantDataType, ListUserDataType }
