import { useTranslation } from 'react-i18next'

import { FormattedRecipe } from 'models/Recipe'
import Step from 'models/Step'
import StepItem from 'components/molecules/StepItem'
import SectionTitle from 'components/atoms/SectionTitle'

type Props = {
  recipe: FormattedRecipe
  progress: number
  onSelectStep: (index: number) => void
}

const key = (step: Step, index: number) => `${step.description}${index}`

const evaluateStatus = (index: number, currentStepIndex: number) => {
  return index < currentStepIndex
    ? 'completed'
    : index === currentStepIndex
    ? 'current'
    : 'todo'
}

const StepList = ({ recipe, progress, onSelectStep }: Props) => {
  const { t } = useTranslation()

  return (
    <div className="py-4 lg:px-10 relative z-10">
      <div className="">
        <SectionTitle>{t('_Steps')}</SectionTitle>
        <ol className="overflow-hidden">
          {recipe.steps.map((step, stepIdx) => (
            <StepItem
              key={key(step, stepIdx)}
              step={step}
              isLastOne={stepIdx === recipe.steps.length - 1}
              status={evaluateStatus(stepIdx, progress)}
              onClick={() => onSelectStep(stepIdx)}
              ingredients={recipe.ingredients}
            />
          ))}
        </ol>
      </div>
    </div>
  )
}

export default StepList
