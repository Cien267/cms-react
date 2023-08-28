export default function mock(data, duration = 3000) {
  return new Promise((resolve, reject) =>
    setTimeout(() => {
      if (data instanceof Error) {
        reject(data)
      } else {
        resolve(data)
      }
    }, duration),
  )
}
