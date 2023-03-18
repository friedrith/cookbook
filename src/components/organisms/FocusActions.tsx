import { CheckIcon, ClockIcon } from '@heroicons/react/24/outline'
// import { useNavigate } from 'react-router-dom'
import { useMemo } from 'react'
import { useTranslation } from 'react-i18next'

import Button from 'components/atoms/Button'
import Recipe from 'types/Recipe'
import findDurations from 'features/timers/utils/findDurations'
import Step from 'models/Step'
import { renderDuration } from 'features/timers/utils/renderDuration'

type Props = {
  recipe: Recipe
  step?: Step
  index: number
  onNextStepClick: () => void
  speaking?: boolean
}

const FocusActions = ({
  recipe,
  index,
  step,
  onNextStepClick,
  speaking,
}: Props) => {
  const { t } = useTranslation()

  const durations = useMemo(
    () => (step ? findDurations(step.description) : []),
    [step],
  )

  return (
    <div className="pt-2 flex flex-row justify-end">
      {durations.map(duration => (
        <div
          data-tip={t('focusMode.Start Timer')}
          className="mr-5"
          key={renderDuration(duration)}
        >
          <Button.Icon
            className="rounded-md"
            icon={ClockIcon}
            title={t('focusMode.Start Timer')}
          >
            <span className="pl-1">{renderDuration(duration)}</span>
          </Button.Icon>
        </div>
      ))}
      <div data-tip={t('focusMode.Next Step')}>
        <Button.Icon
          className="rounded-md !text-white !bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
          onClick={onNextStepClick}
          icon={CheckIcon}
          blur
          title={t('focusMode.Next Step')}
        />
      </div>
    </div>
  )
}

export default FocusActions
