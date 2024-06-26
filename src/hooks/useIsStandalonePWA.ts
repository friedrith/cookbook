import { useState } from 'react'

import useEventListener from '~/src/hooks/useEventListener'
import { isRunningInStandalonePWA } from '~/src/utils/platforms/pwa'

const useIsStandalonePWA = () => {
  const [isStandalonePWA, setStandalonePWA] = useState(
    isRunningInStandalonePWA(),
  )

  useEventListener('resize', () => {
    const newValue = isRunningInStandalonePWA()
    if (newValue !== isStandalonePWA) {
      setStandalonePWA(newValue)
    }
  })

  return isStandalonePWA
}

export default useIsStandalonePWA
