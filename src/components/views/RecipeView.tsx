import { useRef } from 'react'
import { PencilIcon } from '@heroicons/react/24/outline'
import { useTranslation } from 'react-i18next'

import { useAppSelector, useAppDispatch } from '@/hooks/redux'
import Box from '@/components/atoms/Box'
import IngredientList from '@/features/ingredients/components/IngredientList'
import StepList from '@/features/steps/components/StepList'
import FixedHeader from '@/components/atoms/FixedHeader'
import RecipeHeader from '@/components/molecules/RecipeHeader'
import Page from '@/components/templates/Page'
import ImageBanner from '@/components/molecules/ImageBanner'
import Loading from '@/components/templates/Loading'
import NotFound404 from '@/components/views/NotFound404'
import Button from '@/components/atoms/Button'
import SharePopup from '@/components/organisms/SharePopup'
import usePopup from '@/hooks/usePopup'
import BackButton from '@/components/molecules/BackButton'
import {
  getRecipeProgress,
  setRecipeProgress,
  areRecipesFetched,
} from '@/store'
import Container from '@/components/atoms/Container'
import useCurrentRecipe from '@/hooks/useCurrentRecipe'
import ShareIcon from 'assets/ShareIcon'
import { canShare, shareText } from '@/utils/services/share'
import renderRecipe from '@/features/recipes/utils/renderTextRecipe'
import KeywordList from '@/features/categories/components/KeywordList'
import { BadgeSize } from '@/components/atoms/Badge'
import TimerCenter from '@/features/timers/components/TimersCenter'
import Header from '@/components/atoms/Header'

const RecipeView = () => {
  const [recipe, formattedRecipe] = useCurrentRecipe()

  const areFetched = useAppSelector(areRecipesFetched)

  const progress = useAppSelector(state => getRecipeProgress(state, recipe?.id))

  const dispatch = useAppDispatch()

  const ref = useRef<HTMLInputElement>(null)

  const sharePopup = usePopup()

  const { t } = useTranslation()

  if (!recipe || !formattedRecipe) {
    if (!areFetched) {
      return <Loading />
    }
    return <NotFound404 />
  }

  const changeRecipeProgress = (index: number) => {
    dispatch(setRecipeProgress({ recipeId: recipe.id, index }))
  }

  const startSharing = async () => {
    if (canShare()) {
      await shareText(await renderRecipe(recipe, t))
    } else {
      sharePopup.open()
    }
  }
  return (
    <Page title={recipe.name}>
      <ImageBanner imageUrl={recipe.imageUrl} alt={recipe.name} />
      <Container className="flex-1 relative z-10">
        <div className="flex flex-col items-stretch lg:flex-row lg:items-start">
          <div ref={ref} />
          <div className="w-full lg:flex-[0_0_400px] lg:max-w-screen-md relative top-[-7rem]">
            <Box className="p-4 lg:w-[400px] relative">
              <h1 className="text-2xl sm:text-3xl font-bold leading-7 text-gray-900 break-words overflow-hidden text-center ltr:lg:text-left rtl:lg:text-right pb-2 select-text">
                {formattedRecipe.name}
              </h1>

              <KeywordList
                className="text-center lg:text-left"
                size={BadgeSize.large}
                keywords={formattedRecipe.keywords}
              />
              {/* <Stats recipe={formattedRecipe} /> */}
              <div className="pt-6">
                <IngredientList formattedRecipe={formattedRecipe} />
              </div>
            </Box>
          </div>

          <div className="flex-1 relative ltr:lg:pl-10 rtl:lg:pr-10 lg:pt-10 top-[-5rem] lg:top-[0rem]">
            <StepList
              recipe={formattedRecipe}
              progress={progress}
              onSelectStep={changeRecipeProgress}
            />
          </div>
        </div>
      </Container>
      <FixedHeader restRef={ref} className="pointer-events-none">
        {isMaximized => (
          <Header white={isMaximized}>
            <BackButton url="/recipes" title={t('_Back to recipes')} />
            {isMaximized ? (
              <RecipeHeader
                recipeName={formattedRecipe.name}
                keywords={formattedRecipe.keywords}
              />
            ) : (
              <div className="flex-1" />
            )}
            <span data-tip={t('_Share Recipe')}>
              <Button.Icon
                className="ltr:mr-3 rtl:ml-3"
                onClick={startSharing}
                icon={ShareIcon}
                blur
                title={t('_Share Recipe')}
              />
            </span>
            <span data-tip={t('_Edit Recipe')}>
              <Button.Icon
                url={`/recipes/${recipe.id}/edit`}
                icon={PencilIcon}
                title={t('_Edit Recipe')}
                blur
              />
            </span>
          </Header>
        )}
      </FixedHeader>
      <SharePopup
        recipe={recipe}
        open={sharePopup.isOpen}
        onClose={sharePopup.close}
      />
      <TimerCenter />
    </Page>
  )
}

export default RecipeView
