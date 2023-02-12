import { useState } from 'react'
import { StopIcon, CheckCircleIcon } from '@heroicons/react/20/solid'
import { ClockIcon } from '@heroicons/react/24/outline'
import classNames from 'classnames'

import Timer, { durationLeft } from '@/features/timers/models/Timer'
import {
  secondsToDuration,
  durationLessThan,
} from '@/features/timers/models/Duration'
import { renderDuration } from '../utils/renderDuration'
import { useAppDispatch } from '@/hooks/redux'
import { stopTimer } from '../timers.slice'
import { useEffect } from 'react'

type Props = {
  timer: Timer
}

enum TimerStatus {
  NotFinished,
  SoonFinished,
  AlmostFinished,
  Finished,
}

const CountDownTimer = ({ timer }: Props) => {
  const dispatch = useAppDispatch()

  const [status, setStatus] = useState(TimerStatus.NotFinished)

  const [countDown, setCountDown] = useState(
    timer.duration - secondsToDuration(1),
  )

  useEffect(() => {
    const duration = durationLeft(timer)
    setCountDown(Math.max(0, duration))
    setStatus(TimerStatus.NotFinished)

    let interval = setInterval(() => {
      const duration = durationLeft(timer)
      setCountDown(Math.max(0, duration))

      if (durationLessThan(duration, 0)) {
        setStatus(TimerStatus.Finished)
      } else if (durationLessThan(duration, secondsToDuration(10))) {
        setStatus(TimerStatus.AlmostFinished)
      } else if (durationLessThan(duration, secondsToDuration(30))) {
        setStatus(TimerStatus.SoonFinished)
      } else {
        setStatus(TimerStatus.NotFinished)
      }
    }, 1000)

    return () => clearInterval(interval)
  }, [timer])

  return (
    <div
      className={classNames(
        'flex justify-around items-center px-3 md:px-4 gap-x-3 text-3xl md:text-lg font-medium shadow-2xl rounded-md  overflow-hidden',
        {
          'bg-white bg-opacity-50 backdrop-filter backdrop-blur':
            status === TimerStatus.NotFinished,
          'bg-primary-500 text-white': status !== TimerStatus.NotFinished,
        },
      )}
    >
      <ClockIcon className="h-8 w-8 md:h-6 md:w-6 stroke-2" />
      <div
        className={classNames('text-4xl md:text-2xl py-2 md:py-4', {
          'animate-[pulse_1s_ease-in-out_infinite]':
            status === TimerStatus.AlmostFinished,
          'animate-[pulse_0.25s_ease-in-out_infinite]':
            status === TimerStatus.Finished,
        })}
      >
        {renderDuration(countDown)}
      </div>

      <button
        className="py-3 md:py-4 hover:text-gray-200"
        onClick={() => dispatch(stopTimer(timer.id))}
      >
        {status === TimerStatus.Finished ? (
          <CheckCircleIcon className="h-8 w-8 md:h-6 md:w-6" />
        ) : (
          <StopIcon className="h-8 w-8 md:h-6 md:w-6" />
        )}
      </button>
    </div>
  )
}

export default CountDownTimer
