import { useState, useRef, forwardRef, ForwardedRef } from 'react'
import { useTranslation } from 'react-i18next'

import { PhotoIcon } from '@heroicons/react/24/outline'
import { WithContext as ReactTags } from 'react-tag-input'

import { storeFile } from '@/utils/services/firebase'
import TextArea from '@/components/atoms/TextArea'
import ImageBanner from '@/components/molecules/ImageBanner'
import Container from '@/components/atoms/Container'
import Box from '@/components/atoms/Box'
import SectionTitle from '@/components/atoms/SectionTitle'
import ImageUploader from '@/components/molecules/ImageUploader'
import Recipe from '@/models/Recipe'
import Button from '@/components/atoms/Button'
import cleanKeywords from '@/features/categories/utils/cleanKeywords'

import categories from '@/features/categories/categories'

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

    const handleDelete = (i: number) => {
      change({
        keywords: cleanKeywords(keywords.filter((k, index) => index !== i)),
      })
    }

    const handleAddition = (tag: Tag) => {
      change({ keywords: cleanKeywords([...keywords, tag.text]) })
    }

    const handleDrag = (
      tag: Tag,
      currentPosition: number,
      newPosition: number,
    ) => {
      const newKeywords = [...keywords]
      newKeywords.splice(currentPosition, 1)
      newKeywords.splice(newPosition, 0, tag.text)
      change({ keywords: newKeywords })
    }

    const tags = keywords.map(k => ({ id: k, text: k }))

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
                <ReactTags
                  tags={tags}
                  delimiters={delimiters}
                  inputFieldPosition="inline"
                  handleDelete={handleDelete}
                  handleAddition={handleAddition}
                  handleDrag={handleDrag}
                  inline
                  id="keywords"
                  classNames={{
                    selected: 'flex flex-row items-start flex-wrap',
                    tag: 'p-0.25 px-1 my-1.5 mx-1 rounded font-medium bg-indigo-100 text-indigo-800',
                    tagInput: 'border-0 overflow-none flex-1 min-w-[100px]',
                    tagInputField:
                      'border border-gray-300  overflow-none focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-black focus:border-black shadow-sm rounded-md w-full p-1.5',
                    remove: 'ml-0.5',
                    suggestions:
                      'absolute rounded mt-2 p-1 font-medium bg-red-100 text-red-800',
                    activeSuggestion: 'bg-red-200 cursor-pointer',
                  }}
                  allowDragDrop={true}
                  placeholder={t('_Press enter to add a keyword')}
                  autofocus={false}
                  suggestions={categories.map(c => ({
                    id: c.name,
                    text: c.name,
                  }))}
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
