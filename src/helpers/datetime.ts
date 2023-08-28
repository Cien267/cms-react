import dayjs from 'dayjs'
import weekday from 'dayjs/plugin/weekday'
import isBetween from 'dayjs/plugin/isBetween'

dayjs.extend(weekday)
dayjs.extend(isBetween)

export function formatDateTimeInstance(
  dateTimeIns,
  formatPattern = 'DD/MM/YYYY HH:mm',
) {
  return dayjs(dateTimeIns).format(formatPattern)
}

export function formatTimestampToDate(tp, formatPattern = 'DD/MM/YYYY') {
  return dayjs.unix(tp).format(formatPattern)
}

export function formatTimestampToDateTime(tp) {
  return dayjs.unix(tp).format('DD/MM/YYYY HH:mm')
}

export function formatDateTimeToTimeStamp(dateTime) {
  return dayjs(dateTime).unix()
}

export function startOfThisWeek() {
  return dayjs().startOf('week')
}

export function endOfThisWeek() {
  return dayjs().endOf('week')
}

export function startOfLastMonth() {
  return dayjs().subtract(1, 'month').startOf('month')
}

export function startOfThisMonth() {
  return dayjs().startOf('month')
}

export function getMonth(dateIns?: number | undefined) {
  return dayjs(dateIns).month() + 1
}

export function startOfThisMonthTimestamp() {
  return formatDateTimeToTimeStamp(startOfThisMonth())
}

export function endOfThisMonth() {
  return dayjs().endOf('month')
}

export function startOfThisDay() {
  return dayjs().startOf('day')
}

export function endOfThisDay() {
  return dayjs().endOf('day')
}

export function startOfDay(dateIns) {
  return dayjs(dateIns).startOf('day')
}

export function endOfDay(dateIns) {
  return dayjs(dateIns).endOf('day')
}

export function startOfMonth(dateIns) {
  return dayjs(dateIns).startOf('month')
}


export function startOfMonthTimestamp(dateIns) {
  return formatDateTimeToTimeStamp(startOfMonth(dateIns))
}

export function isSameDay(dateIns, otherDateIns) {
  return dayjs(dateIns).isSame(dayjs(otherDateIns), 'day')
}

export function getDisabledDateFromNow(date) {
  return !date || dayjs(date).isAfter(dayjs(), 'minute')
}

export function getStartOfMonthFromNumber(month: number) {


  return dayjs().month(month).startOf('month').valueOf() / 1000
}