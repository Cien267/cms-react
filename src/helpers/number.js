export const roundFloat = (numb, round = 3) => {
  if (!numb) return 0
  if (round === 0) return Math.round(numb)
  return Math.round(numb * round ** 10) / round ** 10
}
export const convertInteger = numb => {
  return roundFloat(numb, 0)
}
