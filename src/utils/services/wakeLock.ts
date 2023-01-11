import NoSleep from 'nosleep.js'

const noSleep = new NoSleep()

let wakeLock: boolean = false

export const requestWakeLock = async () => {
  if (!wakeLock) {
    noSleep.enable()
  }
}

export const releaseWakeLock = async () => {
  if (wakeLock) {
    noSleep.disable()
  }
}
