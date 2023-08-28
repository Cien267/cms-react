export const packageBnplStatus = {
  ACTIVE: 'ACTIVE',
  INACTIVE: 'INACTIVE',
}

export const packageBnplTextColor = '#172B4D'

export const mapPackageBnplStatusToText = {
  INACTIVE: 'Ngưng hoạt động',
  ACTIVE: 'Hoạt động',
}

export const mapPackageBnplStatusToColor = {
  INACTIVE: '#D32F2F',
  ACTIVE: '#388E3C',
}

export const statusToText = status =>
  Boolean(status)
    ? mapPackageBnplStatusToText.ACTIVE
    : mapPackageBnplStatusToText.INACTIVE

export const statusToPackageText = status => mapPackageBnplStatusToText[status]

export const statusToPackageColor = status =>
  mapPackageBnplStatusToColor[status]

export const mapPackageBnplStatus = isActived =>
  isActived ? 'ACTIVE' : 'INACTIVE'

export const mapStatusToText = isActived =>
  isActived ? 'Hoạt động' : 'Ngưng hoạt động'

export const countActivity = (list = []) =>
  list.reduce(
    (accumulate, current) => {
      if (Boolean(current.status))
        return { inactive: accumulate.inactive, active: accumulate.active + 1 }
      return { inactive: accumulate.inactive + 1, active: accumulate.active }
    },
    { inactive: 0, active: 0 },
  )
