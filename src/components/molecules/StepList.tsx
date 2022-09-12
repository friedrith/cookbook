import Recipe, { Step } from 'models/Recipe'
import StepItem from 'components/atoms/StepItem'
import SectionTitle from 'components/atoms/SectionTitle'

type Props = {
  recipe: Recipe
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
  return (
    <div className="py-10 lg:px-10 relative z-10">
      <div className="">
        <SectionTitle>Steps</SectionTitle>
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
