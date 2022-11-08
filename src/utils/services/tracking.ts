import mixpanel from 'mixpanel-browser'

mixpanel.init(process.env.REACT_APP_MIX_PANEL_ID || '', {
  debug: process.env.NODE_ENV !== 'production',
})

export const track = (eventName: string, obj: any = {}) =>
  mixpanel.track(eventName, obj)
