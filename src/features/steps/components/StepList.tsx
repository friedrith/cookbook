import { useTranslation } from 'react-i18next'
import { useState, useEffect } from 'react'
import { BoltIcon } from '@heroicons/react/24/solid'

import { FormattedRecipe } from 'models/Recipe'
import Step from 'models/Step'
import StepItem from 'features/steps/components/StepItem'
import SectionTitle from 'components/atoms/SectionTitle'
import { getStepsWithIngredients } from 'utils/parser/parserStep'
import Toggle from 'components/atoms/Toggle'
import SectionAction from 'components/atoms/SectionAction'
import usePopup from 'hooks/usePopup'
import Modal, { PopupType } from 'components/atoms/Modal'
import Button from 'components/atoms/Button'
import { releaseWakeLock, requestWakeLock } from 'utils/services/wakeLock'
import { useAppDispatch, useAppSelector } from 'hooks/redux'
import { cookingModeActivated, getCookingModeActivatedOnce } from 'store'

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

  const ingredientsByStep = getStepsWithIngredients(recipe)

  const [focusModeEnabled, enableFocusMode] = useState(false)

  const confirmCookingMode = usePopup()

  const cookingModeActivatedOnce = useAppSelector(getCookingModeActivatedOnce)

  const toggleFocusMode = () => {
    if (focusModeEnabled) {
      enableFocusMode(false)
    } else if (cookingModeActivatedOnce) {
      requestWakeLock()
      enableFocusMode(true)
    } else {
      confirmCookingMode.open()
    }
  }

  useEffect(() => {
    return () => {
      releaseWakeLock()
    }
  }, [])

  const dispatch = useAppDispatch()

  return (
    <div className="pb-10 relative z-10">
      <div className="">
        <SectionTitle
          more={
            <SectionAction
              label={t('_Focus Mode')}
              onClick={toggleFocusMode}
              tooltip={
                focusModeEnabled
                  ? t('shoppingList.Close shopping list')
                  : t('shoppingList.Create shopping list')
              }
            >
              <Toggle
                enabled={focusModeEnabled}
                onChange={toggleFocusMode}
                aria-label={t('Toggle focus mode')}
              />
            </SectionAction>
          }
        >
          {t('_Steps')}
        </SectionTitle>
        <ol className="overflow-hidden">
          {recipe.steps.map((step, stepIdx) => (
            <StepItem
              key={key(step, stepIdx)}
              step={step}
              isLastOne={
                recipe.originUrl ? false : stepIdx === recipe.steps.length - 1
              }
              status={evaluateStatus(stepIdx, progress)}
              onClick={() => onSelectStep(stepIdx)}
              ingredients={ingredientsByStep[stepIdx]}
            />
          ))}
          {recipe.originUrl && (
            <StepItem
              step={{ description: t('_originUrl', { url: recipe.originUrl }) }}
              isLastOne
              status={evaluateStatus(recipe.steps.length, progress)}
              onClick={() => onSelectStep(recipe.steps.length)}
              ingredients={[]}
            />
          )}
        </ol>
      </div>
      <Modal
        open={confirmCookingMode.isOpen}
        onClose={confirmCookingMode.close}
        icon={BoltIcon}
        title={t('_Focus Mode')}
        type={PopupType.Info}
        description={
          <>
            <p>
              {t(
                'focusMode.While the focus mode is activated, your device still stay awake'
              )}
            </p>
          </>
        }
      >
        <Button.White
          className="mb-3 w-full"
          onClick={confirmCookingMode.close}
        >
          {t('_Cancel')}
        </Button.White>
        <Button.Primary
          className="mb-3 w-full"
          onClick={() => {
            dispatch(cookingModeActivated())
            enableFocusMode(true)
            requestWakeLock()
            confirmCookingMode.close()
          }}
        >
          {t('focusMode.Activate')}
        </Button.Primary>
      </Modal>
    </div>
  )
}

export default StepList
