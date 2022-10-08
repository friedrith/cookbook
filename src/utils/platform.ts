export const isWindows = () => navigator.platform.indexOf('Win') > -1

export const endOfLine = () => (isWindows() ? `\r\n` : `\n`)
