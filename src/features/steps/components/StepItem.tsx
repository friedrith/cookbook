import { CheckIcon } from '@heroicons/react/24/solid'

import Step from '@/models/Step'
import Ingredient from '@/models/Ingredient'
import StepStatus from '@/models/StepStatus'
import StepItemGeneric from '@/features/steps/components/StepItemGeneric'

type Props = {
  step: Step
  status: StepStatus
  isLastOne: boolean
  onClick?: () => void
  ingredients: Ingredient[]
}

const StepItem = ({ step, status, isLastOne, onClick, ingredients }: Props) => {
  const linkClassName = status === 'completed' ? 'bg-gray-600' : 'bg-gray-300'

  const iconClassName =
    status === 'completed'
      ? 'bg-gray-600 group-hover:bg-black'
      : status === 'current'
      ? 'bg-white border-2 border-primary-400'
      : 'bg-white border-2 border-gray-300 group-hover:border-gray-400'

  const descriptionClassName =
    status === 'completed'
      ? 'text-gray-600'
      : status === 'current'
      ? 'text-gray-800'
      : 'text-gray-500'

  return (
    <StepItemGeneric
      className={!isLastOne ? 'pb-10' : ''}
      linkClassName={linkClassName}
      isLastOne={isLastOne}
      iconClassName={iconClassName}
      icon={
        status === 'completed' ? (
          <CheckIcon className="w-5 h-5 text-white" aria-hidden="true" />
        ) : status === 'current' ? (
          <span className="h-2.5 w-2.5 bg-black rounded-full" />
        ) : (
          <span className="h-2.5 w-2.5 bg-transparent rounded-full group-hover:bg-gray-300" />
        )
      }
      description={step.description}
      descriptionClassName={descriptionClassName}
      onClick={onClick}
      ingredients={ingredients}
    />
  )
}

export default StepItem
