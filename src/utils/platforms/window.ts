// https://stackoverflow.com/questions/61868907/how-to-open-google-chrome-from-webview-via-javascript
export const openBrowserWindow = (path: string) =>
  window.open(`intent:${process.env.REACT_APP_URL}${path}#Intent;end`)

export const isWindowDefined = () => typeof window !== 'undefined'

export const isNavigatorDefined = () => typeof navigator !== 'undefined'

export const isDocumentDefined = () => typeof document !== 'undefined'
