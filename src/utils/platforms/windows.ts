export const openBrowserWindow = (path: string) =>
  window.open(`intent:${process.env.REACT_APP_URL}${path}#Intent;end`)
