import { useState, useEffect, useMemo, useCallback } from 'react'
import { useLocation, Location } from 'react-router-dom'

import { isMobile } from '~/src/utils/platforms/mobile'

const PREFERENCES = '/preferences'

const areLocationIncludes = (
  location1: Location,
  location2: Location,
  routes: string[],
) =>
  routes.some(
    r => location1.pathname.includes(r) && location2.pathname.includes(r),
  )

const areLocationDifferent = (location1: Location, location2: Location) =>
  location1.pathname !== location2.pathname

const useTransition = (): [string, string, Location, () => void] => {
  const location = useLocation()

  const [previousLocation, setPreviousLocation] = useState('')

  const [displayLocation, setDisplayLocation] = useState(location)
  const [transitionStage, setTransistionStage] = useState('')

  useEffect(() => {
    if (areLocationDifferent(location, displayLocation)) {
      if (
        isMobile() &&
        (areLocationIncludes(location, displayLocation, [
          '/recipes',
          '/login',
        ]) ||
          location.pathname === PREFERENCES ||
          displayLocation.pathname === PREFERENCES)
      ) {
        if (
          displayLocation.pathname.includes(location.pathname) ||
          displayLocation.pathname === PREFERENCES
        ) {
          setTransistionStage('slideRight')
        } else {
          setTransistionStage('slideLeft')
        }
      } else {
        setDisplayLocation(location)
      }

      setPreviousLocation(displayLocation.pathname)
    }
  }, [location, displayLocation])

  const onAnimationEnd = useCallback(() => {
    if (transitionStage === 'slideRight') {
      setTransistionStage('slideRightEnd')
      setDisplayLocation(location)
    } else if (transitionStage === 'slideLeft') {
      setTransistionStage('slideLeftEnd')
      setDisplayLocation(location)
    }
  }, [transitionStage, setTransistionStage, setDisplayLocation, location])

  return useMemo(
    () => [transitionStage, previousLocation, displayLocation, onAnimationEnd],
    [transitionStage, previousLocation, displayLocation, onAnimationEnd],
  )
}

export default useTransition
