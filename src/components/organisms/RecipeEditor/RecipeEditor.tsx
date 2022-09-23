import { useState, useRef, forwardRef, ForwardedRef } from 'react'

import { useTranslation } from 'react-i18next'
import { PhotographIcon } from '@heroicons/react/outline'
import { WithContext as ReactTags } from 'react-tag-input'

import findUnitIcon from 'utils/findUnitIcon'
import { storeFile } from 'utils/api/firebase'
import Input from 'components/atoms/Input'
import TextArea from 'components/atoms/TextArea'
import ImageBanner from 'components/atoms/ImageBanner'
import LargeMainPage from 'components/templates/LargeMainPage'
import Box from 'components/atoms/Box'
import SectionTitle from 'components/atoms/SectionTitle'
import ImageUploader from 'components/atoms/ImageUploader'
import TopBarButton from 'components/molecules/TopBarButton'
import StatInput from './StatInput'
import Recipe from 'models/Recipe'
import Button from 'components/atoms/Button'

type Props = {
  recipe: Recipe
  onChange: (recipe: Recipe) => void
  saved?: boolean
  children?: React.ReactNode
}

const KeyCodes = {
  comma: 188,
  enter: 13,
  space: 32,
}

const delimiters = [KeyCodes.comma, KeyCodes.enter, KeyCodes.space]

type Tag = {
  id: string
  text: string
}

const RecipeEditor = forwardRef(
  (
    { recipe, onChange, children }: Props,
    ref: ForwardedRef<HTMLDivElement>
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

    const DurationIcon = findUnitIcon('min')
    const ServingsIcon = findUnitIcon('servings')

    const handleDelete = (i: number) => {
      change({ keywords: keywords.filter((k, index) => index !== i) })
    }

    const handleAddition = (tag: Tag) => {
      change({ keywords: [...keywords, tag.text] })
    }

    const tags = keywords.map(k => ({ id: k, text: k }))

    return (
      <>
        <ImageBanner imageUrl={imageUrl} alt={name}></ImageBanner>
        <div className="h-64 md:h-96 absolute top-0 left-0 right-0 flex">
          <ImageUploader
            ref={uploadRef}
            onChange={changeImageUrl}
            isUploading={isUploading}
          >
            <TopBarButton
              blur
              onClick={() => uploadRef.current?.click()}
              icon={PhotographIcon}
            >
              {t('_Change image')}
            </TopBarButton>
          </ImageUploader>
        </div>
        <LargeMainPage>
          <Box className="p-4 relative top-[-7rem]">
            <div className="max-w-screen-md m-auto space-y-8 sm:p-6" ref={ref}>
              <Input.Basic
                placeholder={t('_Recipe Name [required]')}
                id="recipe-name"
                className="text-2xl sm:text-3xl font-bold leading-7 text-gray-900 w-full"
                value={name}
                onChange={name => change({ name })}
              />
              <div>
                <SectionTitle className="pb-3">
                  <label htmlFor="ingredients">{t('_Ingredients')}</label>
                </SectionTitle>
                <TextArea.Basic
                  className="mt-1 w-full resize-none"
                  id="ingredients"
                  rows={5}
                  placeholder="- ..."
                  value={ingredients}
                  onChange={ingredients => change({ ingredients })}
                />
              </div>
              <div>
                <SectionTitle className="pb-3">
                  <label htmlFor="steps">{t('_Steps')}</label>
                </SectionTitle>
                <TextArea.Basic
                  className="mt-1 w-full resize-none"
                  id="steps"
                  rows={5}
                  placeholder="- ..."
                  value={steps}
                  onChange={steps => change({ steps })}
                />
              </div>
              <div>
                <SectionTitle className="pb-3">
                  <label htmlFor="steps">{t('_Keywords')}</label>
                </SectionTitle>
                <ReactTags
                  tags={tags}
                  delimiters={delimiters}
                  inputFieldPosition="inline"
                  handleDelete={handleDelete}
                  handleAddition={handleAddition}
                  inline
                  classNames={{
                    selected: 'flex flex-row items-center flex-wrap',
                    tag: 'p-0.25 px-1 my-1 mx-1 rounded font-medium bg-red-100 text-red-800',
                    tagInput:
                      'border-0 overflow-none focus:ring-0 flex-1 min-w-[100px]',
                    tagInputField:
                      'border-0 overflow-none focus:ring-0 w-full p-0',
                    remove: 'ml-0.5',
                  }}
                  allowDragDrop={false}
                  placeholder={t('_Press enter to add a keyword')}
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
        </LargeMainPage>
      </>
    )
  }
)

export default RecipeEditor
