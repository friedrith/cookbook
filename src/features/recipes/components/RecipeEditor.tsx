import { useState, useRef, forwardRef, ForwardedRef } from 'react'
import { useTranslation } from 'react-i18next'
import { PhotoIcon } from '@heroicons/react/24/outline'

import { storeFile } from '~/src/utils/services/firebase'
import TextArea from '~/src/components/atoms/TextArea'
import ImageBanner from '~/src/components/molecules/ImageBanner'
import Container from '~/src/components/atoms/Container'
import Box from '~/src/components/atoms/Box'
import SectionTitle from '~/src/components/atoms/SectionTitle'
import ImageUploader from '~/src/components/molecules/ImageUploader'
import Recipe from '~/src/types/Recipe'
import Button from '~/src/components/atoms/Button'

import KeywordsEditor from '~/src/features/categories/components/KeywordsEditor'

type Props = {
  recipe: Recipe
  onChange: (recipe: Recipe) => void
  saved?: boolean
  children?: React.ReactNode
}

const RecipeEditor = forwardRef(
  (
    { recipe, onChange, children }: Props,
    ref: ForwardedRef<HTMLDivElement>,
  ) => {
    const [isUploading, setIsUploading] = useState(false)

    const uploadRef = useRef<HTMLInputElement>(null)

    const { t } = useTranslation()

    const change = (props: any) => onChange({ ...recipe, ...props })

    // const changeStats = (props: any) => onChange({ ...recipe, stats: { ...recipe.stats, [] } })

    const changeImageUrl = async (file: File) => {
      setIsUploading(true)
      const imageUrl = await storeFile(file)

      change({ imageUrl })
      setIsUploading(false)
    }

    const { name, ingredients, steps, keywords, imageUrl } = recipe

    // const DurationIcon = findUnitIcon('min')
    // const ServingsIcon = findUnitIcon('servings')

    return (
      <>
        <ImageBanner imageUrl={imageUrl} alt={name} />
        <div className="h-64 md:h-96 absolute top-0 left-0 right-0 flex">
          <ImageUploader
            ref={uploadRef}
            onChange={changeImageUrl}
            isUploading={isUploading}
          >
            <Button.Icon
              blur
              onClick={() => uploadRef.current?.click()}
              icon={PhotoIcon}
            >
              {t('_Change image')}
            </Button.Icon>
          </ImageUploader>
        </div>
        <Container className="bg-white">
          <Box className="p-4 relative top-[-7rem]">
            <div className="max-w-screen-md m-auto sm:p-6 space-y-8" ref={ref}>
              <TextArea.Primary
                className="text-2xl sm:text-3xl font-bold leading-7 text-gray-900 w-full"
                id="recipe-name"
                rows={1}
                placeholder={t('_Recipe Name [required]')}
                value={name}
                onChange={name => change({ name: name.replace(/\n/g, '') })}
              />
              <div>
                <SectionTitle className="pb-3">
                  <label htmlFor="ingredients">{t('_Ingredients')}</label>
                </SectionTitle>
                <TextArea.Primary
                  className="mt-1 w-full resize-none"
                  id="ingredients"
                  rows={5}
                  placeholder={t('editor.Add ingredients there')}
                  value={ingredients}
                  onChange={ingredients => change({ ingredients })}
                />
              </div>
              <div>
                <SectionTitle className="pb-3">
                  <label htmlFor="steps">{t('_Steps')}</label>
                </SectionTitle>
                <TextArea.Primary
                  className="mt-1 w-full resize-none"
                  id="steps"
                  rows={5}
                  placeholder={t('editor.Add steps there')}
                  value={steps}
                  onChange={steps => change({ steps })}
                />
              </div>
              <div>
                <SectionTitle className="pb-3">
                  <label htmlFor="keywords">{t('_Categories')}</label>
                </SectionTitle>
                <KeywordsEditor
                  keywords={keywords}
                  onChange={keywords => change({ keywords })}
                />
              </div>
              {/* <div>
                <div className="grid grid-cols-6 gap-3">
                  <div className="col-span-6 sm:col-span-2">
                    <StatInput
                      label={t('_Duration')}
                      id="duration"
                      value={duration}
                      onChange={duration }
                      placeholder="20"
                      unit="min"
                      icon={DurationIcon}
                    />
                  </div>
                  <div className="col-span-6 sm:col-span-2">
                    <StatInput
                      label={t('_Servings')}
                      id="servings"
                      value={servings}
                      onChange={onServingsChange}
                      placeholder="2"
                      icon={ServingsIcon}
                    />
                  </div>
                </div>
              </div> */}
              {children}
            </div>
          </Box>
        </Container>
      </>
    )
  },
)

export default RecipeEditor
