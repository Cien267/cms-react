
export const formatMoney = (money: Money): string => {
  if (!money) return '0'
  return `${money}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
}

export const parserMoney = (money: Money): string => {
  if (!money) return '0'
  return `${money}`.replace(/\$\s?|(,*)/g, '')
}
