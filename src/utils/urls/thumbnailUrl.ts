const thumbnailUrl = (url: string): string =>
  url.replace(/banner%2F([a-zA-Z0-9-]*\.[a-zAZ])/, `banner%2Fthumb_$1`)

export default thumbnailUrl
