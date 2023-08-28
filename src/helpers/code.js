const zeroPad = (num, places) => String(num).padStart(places, '0')
export function formatLoanId(id) {
  if (!id) return
  return `KFLA${zeroPad(id, 6)}`
}

export function convertTextToId(text) {
  if (!text) return 0

  const lowerText = text.toLowerCase().trim()

  const [, idText] = lowerText.split('kfla')

  if (!idText || idText.length < 6) {
    return 0
  }

  const idNum = Number(idText)

  if (!idNum) return 0

  return idNum
}
