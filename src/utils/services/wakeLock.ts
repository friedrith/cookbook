export const isWakeLockSupported = () => 'wakeLock' in navigator

let wakeLock: null | WakeLockSentinel = null

const forceRequestWakeLock = async () => {
  try {
    if (!isWakeLockSupported()) return
    wakeLock = await navigator.wakeLock.request('screen')

    // listen for our release event
    wakeLock.onrelease = () => {
      console.log('wakelock released')
    }
    wakeLock.addEventListener('release', () => {})
    console.log('wakelocked')
  } catch (error) {
    console.error('error while wake lock', error)
  }
}

export const requestWakeLock = async () => {
  if (!wakeLock) {
    forceRequestWakeLock()
  }
}

export const releaseWakeLock = async () => {
  if (wakeLock) {
    await wakeLock.release()
    wakeLock = null
  }
}
