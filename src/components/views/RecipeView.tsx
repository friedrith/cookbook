import { useRef } from 'react'
import { PencilIcon } from '@heroicons/react/24/outline'
import { useTranslation } from 'react-i18next'

import { useAppSelector, useAppDispatch } from '~/src/hooks/redux'
import Box from '~/src/components/atoms/Box'
import IngredientList from '~/src/features/ingredients/components/IngredientList'
import StepList from '~/src/features/steps/components/StepList'
import FixedHeader from '~/src/components/atoms/FixedHeader'
import RecipeHeader from '~/src/components/molecules/RecipeHeader'
import Page from '~/src/components/templates/Page'
import ImageBanner from '~/src/components/molecules/ImageBanner'
import Loading from '~/src/components/views/Loading'
import NotFound404 from '~/src/components/views/NotFound404'
import Button from '~/src/components/atoms/Button'
import SharePopup from '~/src/components/organisms/SharePopup'
import usePopup from '~/src/hooks/usePopup'
import BackButton from '~/src/components/molecules/BackButton'
import {
  getRecipeProgress,
  setRecipeProgress,
  areRecipesFetched,
} from '~/src/store/index'
import Container from '~/src/components/atoms/Container'
import useCurrentRecipe from '~/src/hooks/useCurrentRecipe'
import ShareIcon from '~/src/assets/ShareIcon'
import { canShare, shareText } from '~/src/utils/services/share'
import renderRecipe from '~/src/features/recipes/utils/renderTextRecipe'
import CategoryBadgeList from '~/src/features/categories/components/CategoryBadgeList'
import { BadgeSize } from '~/src/components/atoms/Badge'
import TimerCenter from '~/src/features/timers/components/TimersCenter'
import Header from '~/src/components/atoms/Header'

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
      <div className="relative z-20 bg-white">
        <Container className="flex-1 relative z-20 bg-white">
          <div className="flex flex-col items-stretch lg:flex-row lg:items-start">
            <div ref={ref} />
            <div className="w-full lg:flex-[0_0_400px] lg:max-w-screen-md relative top-[-7rem]">
              <Box className="p-4 lg:w-[400px] relative">
                <h1 className="text-2xl sm:text-3xl font-bold leading-7 text-gray-900 break-words overflow-hidden text-center ltr:lg:text-left rtl:lg:text-right pb-2 select-text">
                  {formattedRecipe.name}
                </h1>

                <CategoryBadgeList
                  className="text-center lg:text-left"
                  size={BadgeSize.large}
                  categories={formattedRecipe.keywords}
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
      </div>

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
