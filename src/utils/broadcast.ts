import useEventListener from 'hooks/useEventListener'

const CHANNEL_ID = 'app-data'

const channel = new BroadcastChannel(CHANNEL_ID)

export const broadcastLogin = () => channel.postMessage('login')

export const useOnLoggedInAnotherTab = (callback: () => void) => {
  useEventListener(
    'message',
    event => {
      if (event.data === 'login') {
        callback()
      }
    },
    channel
  )
}
