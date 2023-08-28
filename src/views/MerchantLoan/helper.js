import {
  mapBusinessType,
  mapMaritalStatus,
  mapMerchantLoanStatus,
} from './constance'

export const formatAmountOfTimeToMonth = time => time / 30

export const formatMerchantLoanStatus = status => mapMerchantLoanStatus[status]

export const formatMaritalStatus = status => mapMaritalStatus[status]

export const formatBusinessType = status => mapBusinessType[status]

export const formatIndustry = (industryId, listIndustry) =>
  listIndustry && industryId
    ? listIndustry.find(industry => industryId === industry.id.toString())
    : {}

export const formatCity = (cityId, listCity) =>
  listCity && cityId
    ? listCity.find(city => cityId === city.cityId.toString())
    : {}

export const formatDistrict = (districtId, listDistrict) =>
  listDistrict && districtId
    ? listDistrict.find(
        district => districtId === district.districtId.toString(),
      )
    : {}

export const formatWard = (wardId, listWard) =>
  listWard && wardId
    ? listWard.find(ward => wardId === ward.wardId.toString())
    : {}
