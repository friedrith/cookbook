import { useTranslation } from 'react-i18next'

import { FormattedRecipe } from 'models/Recipe'
import Step from 'models/Step'
import StepItem from 'components/molecules/StepItem'
import SectionTitle from 'components/atoms/SectionTitle'
import matchIngredient from 'utils/parser/matchIngredient'
import Ingredient, { areEqual } from 'models/Ingredient'
import shortenIngredientName from 'utils/parser/shortenIngredientName'

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

const notInIfLongerThan =
  (list: Ingredient[], length: number) => (ingredient: Ingredient) =>
    shortenIngredientName(ingredient).length > length
      ? list.every(i => !areEqual(i, ingredient))
      : true

const StepList = ({ recipe, progress, onSelectStep }: Props) => {
  const { t } = useTranslation()

  const ingredientsByStep = recipe.steps.reduce(
    (
      acc: { steps: Ingredient[][]; ingredientsAlreadyUsed: Ingredient[] },
      step: Step
    ): { steps: Ingredient[][]; ingredientsAlreadyUsed: Ingredient[] } => {
      const { steps, ingredientsAlreadyUsed } = acc

      const ingredients = recipe.ingredients
        .filter(matchIngredient(step.description))
        .filter(notInIfLongerThan(ingredientsAlreadyUsed, 15))

      return {
        steps: [...steps, ingredients],
        ingredientsAlreadyUsed: [...ingredientsAlreadyUsed, ...ingredients],
      }
    },

    { steps: [], ingredientsAlreadyUsed: [] }
  )?.steps

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
              ingredients={ingredientsByStep[stepIdx]}
            />
          ))}
        </ol>
      </div>
    </div>
  )
}

export default StepList
