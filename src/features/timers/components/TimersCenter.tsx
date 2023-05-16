import CountDownTimer from './CountDownTimer'

import { useAppSelector } from '~/src/hooks/redux'
import { getActiveTimer } from '~/src/features/timers/timers.slice'
import { enabled } from '~/src/utils/services/features'

const TimerCenter = () => {
  const activeTimer = useAppSelector(getActiveTimer)

  if (!activeTimer || !enabled('timer')) return null

  return (
    <div className="fixed bottom-2 left-2 right-2 md:bottom-5 md:left-auto md:right-5 z-50">
      <CountDownTimer timer={activeTimer} />
    </div>
  )
}

export default TimerCenter
