/* eslint-disable i18next/no-literal-string */
import { useEffect, useRef, useState } from 'react'
import { useParams } from 'react-router-dom'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import cx from 'classnames'
import { usePathname } from 'next/navigation'

import { ArrowDownOnSquareIcon } from '@heroicons/react/24/outline'
import { useTranslation } from 'react-i18next'

import { useAppDispatch } from '@/hooks/redux'
import Box from '@/components/atoms/Box'
import Badge from '@/components/atoms/Badge'
import FixedHeader from '@/components/atoms/FixedHeader'
import RecipeHeader from '@/components/molecules/RecipeHeader'
import Page from '@/components/templates/Page'
import ImageBanner from '@/components/molecules/ImageBanner'
import Loading from '@/components/templates/Loading'
import NotFound404 from '@/components/views/NotFound404'
import Button from '@/components/atoms/Button'
import BackButton from '@/components/molecules/BackButton'
import Container from '@/components/atoms/Container'
import * as recipesApi from '@/utils/api/recipes.api'
import parseRecipe from '@/features/recipes/utils/parseRecipe'
import Recipe, { FormattedRecipe } from '@/models/Recipe'
import { getCurrentUser, getRecipe, importRecipe } from '@/store'
import { useAppSelector } from '@/hooks/redux'
import SectionTitle from '@/components/atoms/SectionTitle'
import StepItemGeneric from '@/features/steps/components/StepItemGeneric'
import Modal, { PopupType } from '@/components/atoms/Modal'
import { renderSharingLink } from '@/utils/urls/sharingLinks'
import { getSharingLinks, saveSharingLinks } from '@/utils/urls/sharingLinks'
import Header from '@/components/atoms/Header'

const LineSkeleton = ({ className }: { className?: string }) => (
  <div className={cx('bg-gray-200 rounded-full', className)} />
)

const RecipePublic = () => {
  const router = useRouter()

  // const { id } = router.query
  // const { linkId } = useParams()
  const [loading, setLoading] = useState(true)

  const user = useAppSelector(getCurrentUser)

  const [{ recipe, formattedRecipe }, setRecipe] = useState<{
    recipe: null | Recipe
    formattedRecipe: null | FormattedRecipe
  }>({
    recipe: null,
    formattedRecipe: null,
  })

  const alreadyExistingRecipe = useAppSelector(state =>
    getRecipe(state, recipe?.id),
  )

  useEffect(() => {
    if (alreadyExistingRecipe) {
      router.push(`/recipes/${alreadyExistingRecipe.id}`)
    }
  }, [alreadyExistingRecipe, router])

  const fetch = async () => {
    try {
      if (linkId) {
        const recipe = await recipesApi.fetchOneByLink(linkId)

        const formattedRecipe = parseRecipe(recipe)

        setRecipe({ recipe, formattedRecipe })
      }
    } catch (error) {
      console.error('error', error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetch()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const dispatch = useAppDispatch()

  const ref = useRef<HTMLInputElement>(null)

  const { t } = useTranslation()

  if (!recipe || !formattedRecipe || !linkId) {
    if (loading) {
      return <Loading />
    }
    return <NotFound404 />
  }

  const importSharedRecipe = async () => {
    try {
      const url = renderSharingLink(linkId)

      const recipe = await dispatch(importRecipe(url)).unwrap()
      router.push(`/recipes/${recipe.id}`)
    } catch (error) {
      console.error(error)
    }
  }

  const login = () => {
    saveSharingLinks([...getSharingLinks(), linkId])

    router.push('/login')
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
                    href={`/recipes?q=${keyword}`}
                  >
                    <Badge>{keyword}</Badge>
                  </Link>
                ))}
              </div>
              {/* <Stats recipe={formattedRecipe} /> */}
              <div className="pt-6">
                <SectionTitle>{t('_Ingredients')}</SectionTitle>
                <LineSkeleton className="h-2.5 w-48 mb-4" />
                <LineSkeleton className="h-2.5 w-28 mb-4" />
                <LineSkeleton className="h-2.5 w-52 mb-4" />
                <LineSkeleton className="h-2.5 w-60 mb-4" />
              </div>
            </Box>
          </div>

          <div className="flex-1 relative ltr:lg:pl-10 rtl:lg:pr-10 lg:pt-10 top-[-5rem] lg:top-[0rem]">
            <SectionTitle>{t('_Steps')}</SectionTitle>
            <ol className="overflow-hidden">
              <StepItemGeneric
                linkClassName="bg-gray-300"
                iconClassName="bg-white border-2 border-gray-300 group-hover:border-gray-400"
                icon={<span className="h-2.5 w-2.5 bg-black rounded-full" />}
                description={
                  <>
                    <LineSkeleton className="h-2.5 w-48 mb-4" />
                    <LineSkeleton className="h-2.5 w-28 mb-4" />
                  </>
                }
                onClick={() => {}}
                ingredients={[]}
              />
              <StepItemGeneric
                linkClassName="bg-gray-300"
                iconClassName="bg-white border-2 border-gray-300 group-hover:border-gray-400"
                icon={<span className="h-2.5 w-2.5 bg-black rounded-full" />}
                description={
                  <>
                    <LineSkeleton className="h-2.5 w-48 mb-4" />
                    <LineSkeleton className="h-2.5 w-28 mb-4" />
                  </>
                }
                onClick={() => {}}
                ingredients={[]}
              />{' '}
              <StepItemGeneric
                linkClassName="bg-gray-300"
                iconClassName="bg-white border-2 border-gray-300 group-hover:border-gray-400"
                icon={<span className="h-2.5 w-2.5 bg-black rounded-full" />}
                description={
                  <>
                    <LineSkeleton className="h-2.5 w-48 mb-4" />
                    <LineSkeleton className="h-2.5 w-28 mb-4" />
                  </>
                }
                onClick={() => {}}
                ingredients={[]}
              />
              <StepItemGeneric
                linkClassName="bg-gray-300"
                iconClassName="bg-white border-2 border-gray-300 group-hover:border-gray-400"
                icon={<span className="h-2.5 w-2.5 bg-black rounded-full" />}
                description={
                  <>
                    <LineSkeleton className="h-2.5 w-48 mb-4" />
                    <LineSkeleton className="h-2.5 w-28 mb-4" />
                  </>
                }
                onClick={() => {}}
                ingredients={[]}
              />
            </ol>
          </div>
        </div>
      </Container>
      <div className="fixed inset-0 z-20 flex items-center justify-center bg-gradient-to-b from-transparent via-white to-white"></div>
      <Modal
        open
        type={PopupType.Black}
        icon={ArrowDownOnSquareIcon}
        onClose={() => {}}
        description={t(
          '_To view this recipe, you need to import it in CookBook.',
        )}
      >
        <div className="text-center">
          {user ? (
            <Button.Primary onClick={importSharedRecipe}>
              {t('_Import in CookBook')}
            </Button.Primary>
          ) : (
            <Button.Primary onClick={login}>
              {t('_Log in and import it')}
            </Button.Primary>
          )}
        </div>
      </Modal>
      <FixedHeader restRef={ref} className="pointer-events-none">
        {isMaximized => (
          <Header>
            {user ? (
              <BackButton url="/recipes" title={t('_Back to recipes')} />
            ) : (
              <BackButton url="/" title={t('_Back to landing page')} />
            )}
            {isMaximized ? (
              <RecipeHeader
                recipeName={formattedRecipe.name}
                keywords={formattedRecipe.keywords}
              />
            ) : (
              <div className="flex-1" />
            )}
          </Header>
        )}
      </FixedHeader>
    </Page>
  )
}

export default RecipePublic
