import { WithContext as ReactTags } from 'react-tag-input'
import { useTranslation } from 'react-i18next'

import cleanKeywords from '~/src/features/categories/utils/cleanKeywords'
import categories from '~/src/features/categories/categories'

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

interface Props {
  keywords: string[]
  onChange: (keywords: string[]) => void
}

const KeywordsEditor: React.FC<Props> = ({ keywords, onChange }) => {
  const { t: tCategories } = useTranslation('categories')
  const { t } = useTranslation('default')

  const tags = keywords.map(k => ({ id: k, text: tCategories(k) }))

  const handleDelete = (i: number) => {
    onChange(cleanKeywords(keywords.filter((k, index) => index !== i)))
  }

  const handleAddition = (tag: Tag) => {
    onChange(cleanKeywords([...keywords, tag.id]))
  }

  const handleDrag = (
    tag: Tag,
    currentPosition: number,
    newPosition: number,
  ) => {
    const newKeywords = [...keywords]
    newKeywords.splice(currentPosition, 1)
    newKeywords.splice(newPosition, 0, tag.text)
    onChange(newKeywords)
  }

  return (
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
        text: tCategories(c.name),
      }))}
    />
  )
}

export default KeywordsEditor
