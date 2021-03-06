import { CheckIcon } from '@heroicons/react/solid'
import { Step, Ingredient } from 'models/Recipe'
import StepStatus from 'models/StepStatus'
import classNames from 'utils/classNames'
import matchingIngredients from 'utils/matchingIngredients'
import Badge from 'components/atoms/Badge'
import renderMeasure from 'utils/renderMeasure'

type PropsGeneric = {
  className?: string
  linkClassName: string
  description: string
  descriptionClassName: string
  iconClassName: string
  icon: React.ReactNode
  isLastOne: boolean
  onClick?: () => void
  ingredients: Ingredient[]
}

const StepItemGeneric = ({
  className,
  linkClassName,
  isLastOne,
  iconClassName,
  description,
  descriptionClassName,
  icon,
  onClick,
  ingredients,
}: PropsGeneric) => {
  const ingredientsForStep = ingredients.filter(
    matchingIngredients(description)
  )

  return (
    <li className={className}>
      {!isLastOne ? (
        <div
          className={`-ml-px absolute mt-0.5 top-4 left-4 w-0.5 h-full ${linkClassName}`}
          aria-hidden="true"
        />
      ) : null}
      <button
        onClick={onClick}
        className="relative z-10 flex items-start group"
      >
        <span className="h-9 flex items-center">
          <span
            className={`w-8 h-8 flex items-center justify-center rounded-full ${iconClassName}`}
          >
            {icon}
          </span>
        </span>
        <div className="ml-4 min-w-0 flex flex-col">
          <div className={`text-sm text-left ${descriptionClassName}`}>
            {description}
          </div>
          <div className="text-left lg:hidden">
            {ingredientsForStep.map((ingredient) => (
              <Badge color="pink" className="mr-1">{`${renderMeasure(
                ingredient.measure
              )} ${ingredient.name}`}</Badge>
            ))}
          </div>
        </div>
      </button>
    </li>
  )
}

type Props = {
  step: Step
  status: StepStatus
  isLastOne: boolean
  onClick?: () => void
  ingredients: Ingredient[]
}

const StepItem = ({ step, status, isLastOne, onClick, ingredients }: Props) => {
  const linkClassName = status === 'completed' ? 'bg-indigo-600' : 'bg-gray-300'

  const iconClassName =
    status === 'completed'
      ? 'bg-indigo-600 group-hover:bg-indigo-800'
      : status === 'current'
      ? 'bg-white border-2 border-indigo-600'
      : 'bg-white border-2 border-gray-300 group-hover:border-gray-400'

  const descriptionClassName =
    status === 'completed'
      ? ''
      : status === 'current'
      ? 'text-indigo-600'
      : 'text-gray-500'

  return (
    <StepItemGeneric
      className={classNames(!isLastOne ? 'pb-10' : '', 'relative')}
      linkClassName={linkClassName}
      isLastOne={isLastOne}
      iconClassName={iconClassName}
      icon={
        status === 'completed' ? (
          <CheckIcon className="w-5 h-5 text-white" aria-hidden="true" />
        ) : status === 'current' ? (
          <span className="h-2.5 w-2.5 bg-indigo-600 rounded-full" />
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
