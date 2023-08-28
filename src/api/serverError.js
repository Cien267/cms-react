class ServerError extends Error {
  constructor(message, responseCode, statusCode) {
    super(message)
    this.statusCode = statusCode
    this.responseCode = responseCode
  }
}

export default ServerError
