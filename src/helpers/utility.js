import { decamelize } from 'humps'

export function isNil(val) {
  return typeof val === 'undefined' || val === null
}

export function isNotNil(val) {
  return !isNil(val)
}

export function isFalsy(val) {
  return (
    typeof val === 'undefined' || val === null || val === false || val === ''
  )
}

export function isNotFalsy(val) {
  return !isFalsy(val)
}

export function isObjectEmpty(val) {
  for (const key in val) {
    if (hasOwnProperty.call(val, key)) {
      return false
    }
  }
  return true
}

export function formatRange(
  key,
  range = [],
  formatValue = val => val,
  minKeyText = `min${key}`,
  maxKeyText = `max${key}`,
) {
  if (!Array.isArray(range)) return {}
  const [from, to] = range

  return {
    ...(isNotNil(from) && {
      [`${minKeyText}`]: formatValue(from),
    }),
    ...(isNotNil(to) && {
      [`${maxKeyText}`]: formatValue(to),
    }),
  }
}

export function formatSorter(sorter, formatField = f => f) {
  if (!sorter) return

  let [field, direction] = sorter.split('_')
  field = formatField(field)

  field = decamelize(field)

  if (direction === 'descend') {
    direction = 'desc'
  }
  if (direction === 'ascend') {
    direction = 'asc'
  }

  return `${field}_${direction}`
}

export const isEmptyObject = object => {
  return object ? Object.keys(object).length === 0 : false
}
export const isNotEmptyObject = object => {
  return !isEmptyObject(object)
}
export const arrayToObject = ({ array, key }) => {
  return Object.fromEntries(new Map(array.map(data => [data[`${key}`], data])))
}

export const uniqueArray = ({ array, key }) => {
  return [...new Map(array.map(data => [data[`${key}`], data])).values()]
}

export const formatValue = value => (isNotFalsy(value) ? value : '--')

export function formatTextSearch(value) {
  return value ? value[0].trim() : undefined
}

export function formatOptionsSearch(value) {
  return value ? value : undefined
}

export const range = value => {
  return typeof value === 'number' ? [...Array(Math.round(value)).keys()] : []
}
export const rangeWithStartAndEnd = (start, end) => {
  const result = []
  for (let i = start; i < end; i++) {
    result.push(i)
  }
  return result
}

export const trimObject = object => {
  Object.keys(object).forEach(item => {
    const canTrimObjectItem =
      typeof object[item] === 'string' && isNotFalsy(object[item])
    object[item] = canTrimObjectItem ? object[item].trim() : object[item]
  })
  return object
}

export function addUnderscoreBeforeNumber(str) {
  return str.replace(/\d+/g, function (match) {
    return '_' + match
  })
}
