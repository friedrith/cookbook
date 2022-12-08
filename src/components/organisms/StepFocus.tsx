import { useTranslation } from 'react-i18next'

import SlidePage from 'components/templates/SlidePage'
import Step from 'models/Step'
import Ingredient from 'models/Ingredient'
import IngredientBadge from 'components/organisms/IngredientBadge'

type Props = {
  step: Step
  ingredients: Ingredient[]
  index: number
  length: number
  children: React.ReactNode
}

const StepFocus = ({ step, index, ingredients, length, children }: Props) => {
  const { t } = useTranslation()

  return (
    <>
      <SlidePage
        title={t('focusMode.Step', {
          stepIndex: index + 1,
          stepLength: length,
        })}
        id={`step-${index + 1}`}
      >
        <div className="text-lg text-gray-900 leading-7">
          {step.description}
        </div>
        {ingredients.length > 0 && (
          <div className="text-left pt-5">
            {ingredients.map((ingredient, index) => (
              <IngredientBadge
                className="mr-2 mb-2 text-base"
                key={`${ingredient.name} ${index}`}
                ingredient={ingredient}
              />
            ))}
          </div>
        )}
        {children}
      </SlidePage>
    </>
  )
}

export default StepFocus
