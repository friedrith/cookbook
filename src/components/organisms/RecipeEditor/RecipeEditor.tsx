import { useState, useRef, forwardRef, ForwardedRef } from 'react'

import { useTranslation } from 'react-i18next'
import { PhotographIcon } from '@heroicons/react/outline'
import { WithContext as ReactTags } from 'react-tag-input'
import { ArrowLeftIcon } from '@heroicons/react/outline'

import findUnitIcon from 'utils/findUnitIcon'
import { storeFile } from 'utils/api/firebase'
import Input from 'components/atoms/Input'
import TextArea from 'components/atoms/TextArea'
import ImageBanner from 'components/atoms/ImageBanner'
import LargeMainPage from 'components/templates/LargeMainPage'
import Box from 'components/atoms/Box'
import SectionTitle from 'components/atoms/SectionTitle'
import TopBar from 'components/atoms/TopBar'
import RecipeHeader from 'components/molecules/RecipeHeader'
import Saved from 'components/molecules/Saved'
import ImageUploader from 'components/atoms/ImageUploader'
import TopBarButton from 'components/molecules/TopBarButton'
import StatInput from './StatInput'

type Props = {
  name: string
  onNameChange: (value: string) => void
  ingredients: string
  onIngredientsChange: (value: string) => void
  steps: string
  onStepsChange: (value: string) => void
  keywords: string[]
  onKeywordsChange: (value: string[]) => void
  duration: number | string
  onDurationChange: (value: string) => void
  servings: number | string
  onServingsChange: (value: string) => void
  imageUrl: string
  onImageUrlChange: (value: string) => void
  saved: boolean
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
    {
      name,
      ingredients,
      steps,
      keywords,
      duration,
      servings,
      imageUrl,
      onNameChange,
      onIngredientsChange,
      onStepsChange,
      onKeywordsChange,
      onDurationChange,
      onServingsChange,
      onImageUrlChange,
      saved,
    }: Props,
    ref: ForwardedRef<HTMLDivElement>
  ) => {
    const [isUploading, setIsUploading] = useState(false)

    const uploadRef = useRef<HTMLInputElement>(null)

    const { t } = useTranslation()

    const changeImageUrl = async (file: File) => {
      setIsUploading(true)
      const newImageUrl = await storeFile(file)

      onImageUrlChange(newImageUrl)
      setIsUploading(false)
    }

    const DurationIcon = findUnitIcon('min')
    const ServingsIcon = findUnitIcon('servings')

    const handleDelete = (i: number) => {
      onKeywordsChange(keywords.filter((k, index) => index !== i))
    }

    const handleAddition = (tag: Tag) => {
      onKeywordsChange([...keywords, tag.text])
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
                onChange={onNameChange}
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
                  onChange={onIngredientsChange}
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
                  onChange={onStepsChange}
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
              <div>
                <div className="grid grid-cols-6 gap-3">
                  <div className="col-span-6 sm:col-span-2">
                    <StatInput
                      label={t('_Duration')}
                      id="duration"
                      value={duration}
                      onChange={onDurationChange}
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
              </div>
            </div>
          </Box>
        </LargeMainPage>
      </>
    )
  }
)

export default RecipeEditor
