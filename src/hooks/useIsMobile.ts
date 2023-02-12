import { useState, useEffect } from 'react'

import { isMobile } from '@/utils/platforms/mobile'

const useIsMobile = (): boolean => {
  const [shouldBeMobile, setMobile] = useState(false)

  useEffect(() => {
    setMobile(isMobile())
  }, [])

  return shouldBeMobile
}

export default useIsMobile
