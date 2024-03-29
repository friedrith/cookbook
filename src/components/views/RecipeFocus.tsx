import { useRef, useEffect, useState, useCallback } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { AdjustmentsHorizontalIcon } from '@heroicons/react/24/outline'
import { useTranslation, Trans } from 'react-i18next'
// import { ParallaxBanner } from 'react-scroll-parallax'

import { useAppSelector } from '~/src/hooks/redux'
// import Box from '~/src/components/atoms/Box'
// import Badge from '~/src/components/atoms/Badge'
// import IngredientList from '~/src/components/organisms/IngredientList'
// import StepList from '~/src/components/molecules/StepList'
import FixedHeader from '~/src/components/atoms/FixedHeader'
// import RecipeHeader from '~/src/components/molecules/RecipeHeader'
import Page from '~/src/components/templates/Page'
// import ImageBanner from '~/src/components/molecules/ImageBanner'
import Loading from '~/src/components/views/Loading'
import NotFound404 from '~/src/components/views/NotFound404'
import Button from '~/src/components/atoms/Button'
// import SharePopup from '~/src/components/organisms/SharePopup'
import usePopup from '~/src/hooks/usePopup'
import BackButton from '~/src/components/molecules/BackButton'
// import renderRecipe from '~/src/utils/render/renderRecipe'
import {
  // getRecipe,
  // getRecipeProgress,
  // setRecipeProgress,
  areRecipesFetched,
  getVoiceControlEnabled,
  enableVoiceControl,
  getGestureControlEnabled,
  enableGestureControl,
} from '~/src/store/index'
// import LargeMainPage from '~/src/components/templates/LargeMainPage'
// import parseRecipe from '~/src/utils/parser/parseRecipe'
// import { canShare, share } from '~/src/utils/share'
// import { isMacLike } from '~/src/utils/platforms/mobile'
import useCurrentRecipe from '~/src/hooks/useCurrentRecipe'
import IngredientListFocus from '~/src/components/organisms/IngredientListFocus'
import SlidePage from '~/src/components/templates/SlidePage'
import { getStepsWithIngredients } from '~/src/features/steps/utils/parseStep'
import StepFocus from '~/src/components/organisms/StepFocus'
import FocusActions from '~/src/components/organisms/FocusActions'
import { releaseWakeLock, requestWakeLock } from '~/src/utils/services/wakeLock'
// import Menu from '~/src/components/atoms/Menu'
// import MenuItem from '~/src/components/atoms/MenuItem'
import Modal from '~/src/components/atoms/Modal'

import SpeechRecognition, {
  useSpeechRecognition,
} from 'react-speech-recognition'
// import HandPoseDetector from '~/src/components/molecules/HandPoseDetector'
import Form from '~/src/components/atoms/Form'
import useSetting from '~/src/hooks/useSetting'
import Header from '~/src/components/atoms/Header'

const RecipeFocus = () => {
  const [recipe, formattedRecipe] = useCurrentRecipe()

  const areFetched = useAppSelector(areRecipesFetched)

  // const progress = useAppSelector(state => getRecipeProgress(state, recipe?.id))

  // const dispatch = useAppDispatch()

  const ref = useRef<HTMLInputElement>(null)

  const { t } = useTranslation()

  useEffect(() => {
    return () => {
      releaseWakeLock()
    }
  }, [])

  // useEffect(() => {
  //   console.log('transcript', transcript)
  // }, [transcript])
  const location = useLocation()

  const currentStepIndex = location.hash
    ? parseInt(location.hash.replace(/^#step-/, ''), 10)
    : 0

  const [currentStep, setStep] = useState(currentStepIndex)

  useEffect(() => {
    const element = document.getElementById(location.hash.replace(/^#/, ''))
    if (element) {
      element.scrollIntoView()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const navigate = useNavigate()

  const update = useCallback(
    async (newIndex: number) => {
      const element = document.getElementById(`step-${newIndex}`)
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' })
        await requestWakeLock()
        navigate(`/recipes/${recipe?.id}/focus#step-${newIndex}`)
        setStep(newIndex)
      }
    },
    [setStep, navigate, recipe],
  )

  const maxStepIndex = (formattedRecipe?.steps?.length || 0) + 1

  const nextStep = useCallback(async () => {
    console.warn('nextStep', currentStep, maxStepIndex)
    if (currentStep < maxStepIndex) await update(currentStep + 1)
  }, [currentStep, update, maxStepIndex])

  const previousStep = useCallback(async () => {
    if (currentStep > 0) await update(currentStep - 1)
  }, [currentStep, update])

  const [voiceControlEnabled, setVoiceControlEnable] = useSetting(
    getVoiceControlEnabled,
    enableVoiceControl,
  )

  const [gestureControlEnabled, setGestureControlEnable] = useSetting(
    getGestureControlEnabled,
    enableGestureControl,
  )

  useEffect(() => {
    if (voiceControlEnabled) {
      SpeechRecognition.startListening({
        continuous: true,
      })
    } else {
      SpeechRecognition.stopListening()
    }

    return () => {
      SpeechRecognition.stopListening()
    }
  }, [voiceControlEnabled])

  const {
    transcript,
    // listening,
    browserSupportsSpeechRecognition,
    // isMicrophoneAvailable,
  } = useSpeechRecognition({
    commands: [
      {
        command: 'next*',
        callback: () => {
          console.warn('next')
          nextStep()
        },
      },
      {
        command: 'previous*',
        callback: () => {
          previousStep()
        },
      },
    ],
  })

  const description = browserSupportsSpeechRecognition
    ? 'focusMode.Say next to Move to the next step'
    : 'focusMode.Voice recognition not supported by your browser'

  const settingsPopup = usePopup()

  if (!recipe || !formattedRecipe) {
    if (!areFetched) {
      return <Loading />
    }
    return <NotFound404 />
  }

  // const changeRecipeProgress = (index: number) => {
  //   dispatch(setRecipeProgress({ recipeId: recipe.id, index }))
  // }

  const ingredientsBySteps = getStepsWithIngredients(formattedRecipe)

  return (
    <Page title={recipe.name} className="snap-both snap-mandatory">
      <div
        className="fixed top-0 left-0 right-0 bottom-0 bg-cover bg-center blur-lg"
        style={{ backgroundImage: `url(${formattedRecipe.imageUrl})` }}
      />
      {/* <div>
        <HandPoseDetector onThumbsUpDetect={nextStep} />
      </div> */}

      <SlidePage id={`step-0`} title={t('_Ingredients')}>
        <IngredientListFocus recipe={formattedRecipe} />
        <FocusActions
          index={0}
          recipe={recipe}
          onNextStepClick={nextStep}
          speaking={Boolean(transcript)}
        />
      </SlidePage>
      {formattedRecipe.steps.map((step, stepIdx) => (
        <StepFocus
          key={`${step.description} ${stepIdx}`}
          step={step}
          length={formattedRecipe.steps.length}
          index={stepIdx}
          ingredients={ingredientsBySteps[stepIdx]}
        >
          <FocusActions
            index={stepIdx + 1}
            recipe={recipe}
            step={step}
            onNextStepClick={nextStep}
            speaking={Boolean(transcript)}
          />
        </StepFocus>
      ))}
      <SlidePage
        id={`step-${maxStepIndex}`}
        title={t('focusMode.Enjoy your meal')}
      >
        {t('focusMode.And remember to take photos')}
      </SlidePage>
      <Modal
        open={settingsPopup.isOpen}
        onClose={settingsPopup.close}
        icon={AdjustmentsHorizontalIcon}
        title={t('focusMode.Controls settings')}
      >
        <Form className="space-y-6">
          <Form.Item label={t('focusMode.Voice control')}>
            <Form.Switch
              checked={voiceControlEnabled}
              onChange={v => setVoiceControlEnable(v)}
              disabled={!browserSupportsSpeechRecognition}
              description={<Trans i18nKey={description} />}
            />
          </Form.Item>
          <Form.Item label={t('focusMode.Gesture control')}>
            <Form.Switch
              checked={gestureControlEnabled}
              onChange={v => setGestureControlEnable(v)}
              description={<Trans i18nKey={'focusMode.Make a thumbs up'} />}
            />
          </Form.Item>
        </Form>
      </Modal>

      <FixedHeader
        restRef={ref}
        className="pointer-events-none"
        disableMaximize
      >
        {isMaximized => (
          <Header>
            <BackButton
              url={`/recipes/${recipe.id}`}
              title={t('_Back to recipe')}
            />
            <div className="flex-1" />
            <Button.Icon
              icon={AdjustmentsHorizontalIcon}
              title={t('focusMode.Controls settings')}
              onClick={settingsPopup.open}
              blur
            />
          </Header>
        )}
      </FixedHeader>
    </Page>
  )
}

export default RecipeFocus
