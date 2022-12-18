import { useRef } from 'react'
import { Link } from 'react-router-dom'
import {
  PencilIcon,
  ShareIcon,
  ArrowUpOnSquareIcon,
} from '@heroicons/react/24/outline'
import { useTranslation } from 'react-i18next'

import { useAppSelector, useAppDispatch } from 'hooks/redux'
import Box from 'components/atoms/Box'
import Badge from 'components/atoms/Badge'
import IngredientList from 'components/organisms/IngredientList'
import StepList from 'components/molecules/StepList'
import FixedHeader from 'components/atoms/FixedHeader'
import RecipeHeader from 'components/molecules/RecipeHeader'
import Page from 'components/templates/Page'
import ImageBanner from 'components/molecules/ImageBanner'
import Loading from 'components/views/Loading'
import NotFound404 from 'components/views/NotFound404'
import Button from 'components/atoms/Button'
import SharePopup from 'components/organisms/SharePopup'
import usePopup from 'hooks/usePopup'
import BackButton from 'components/molecules/BackButton'
import renderRecipe from 'utils/render/renderRecipe'
import { getRecipeProgress, setRecipeProgress, areRecipesFetched } from 'store'
import Container from 'components/atoms/Container'
import { canShare, share } from 'utils/share'
import { isMacLike } from 'utils/platforms/mobile'
import useCurrentRecipe from 'hooks/useCurrentRecipe'

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
      await share(renderRecipe(recipe))
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
              <div className="text-center lg:text-left">
                {formattedRecipe.keywords.map(keyword => (
                  <Link
                    key={keyword}
                    className="mr-1"
                    to={`/recipes?q=${keyword}`}
                  >
                    <Badge>{keyword}</Badge>
                  </Link>
                ))}
              </div>
              {/* <Stats recipe={formattedRecipe} /> */}
              <div className="pt-6">
                <IngredientList recipe={formattedRecipe} />
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
          <>
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
                icon={isMacLike() ? ArrowUpOnSquareIcon : ShareIcon}
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
          </>
        )}
      </FixedHeader>
      <SharePopup
        recipe={recipe}
        open={sharePopup.isOpen}
        onClose={sharePopup.close}
      />
    </Page>
  )
}

export default RecipeView
