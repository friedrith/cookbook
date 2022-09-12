import { useState, forwardRef, ForwardedRef, useEffect } from 'react'
import { CloudUploadIcon, BanIcon } from '@heroicons/react/outline'
import { useTranslation } from 'react-i18next'

import useEventListener from 'hooks/useEventListener'
import LoadingSpinner from 'components/atoms/LoadingSpinner'
import classNames from 'classnames'

type Props = {
  onChange: (file: File) => void
  isUploading: boolean
  authorizedTypes?: string[]
  children?: React.ReactNode
}

const defaultAuthorizedTypes = [
  'image/png',
  'image/jpg',
  'image/jpeg',
  'image/gif',
]

const getItem = (event: React.DragEvent<HTMLDivElement>) =>
  event.dataTransfer?.items?.[0]

const ImageUploader = forwardRef(
  (
    {
      onChange,
      isUploading,
      authorizedTypes = defaultAuthorizedTypes,
      children,
    }: Props,
    ref: ForwardedRef<HTMLInputElement>
  ) => {
    const [isDragging, setDragging] = useState(false)
    const [areFilesAuthorized, setFilesAuthorized] = useState(false)

    useEffect(() => {
      if (isUploading) {
        setDragging(false)
      }
    }, [isUploading])

    const onUploadImage = async (
      event: React.ChangeEvent<HTMLInputElement>
    ) => {
      if (event.currentTarget.files && event.currentTarget.files?.length > 0) {
        onChange(event.currentTarget.files[0])
      }
    }

    const onDrop = async (event: React.DragEvent<HTMLDivElement>) => {
      event.preventDefault()
      event.stopPropagation()
      const item = getItem(event)
      if (item && item.kind === 'file') {
        const file = item.getAsFile()
        if (file !== null) {
          onChange(file)
        }
      }
    }

    const onDragEnter = async (event: React.DragEvent<HTMLDivElement>) => {
      event.preventDefault()
      event.stopPropagation()

      const item = getItem(event)

      if (item) {
        const hasAuthorizedTypes = authorizedTypes.includes(item?.type)
        setFilesAuthorized(hasAuthorizedTypes)
        setDragging(true)
      }
    }

    useEventListener('drop', event => {
      event.stopPropagation()
      event.preventDefault()
    })

    useEventListener('dragover', event => {
      event.stopPropagation()
      event.preventDefault()
    })

    const { t } = useTranslation()

    return (
      <>
        <div
          className={classNames(
            'absolute inset-0 text-white flex items-center justify-center transition-colors',
            { 'bg-[#000000cc]': isUploading || isDragging }
          )}
          onDrop={onDrop}
          onDragEnter={onDragEnter}
          onDragLeave={() => setDragging(false)}
        >
          {isUploading && <LoadingSpinner />}
          {isDragging && areFilesAuthorized && (
            <div className="flex flex-col items-center">
              <CloudUploadIcon className="h-7 w-7" aria-hidden="true" />
              <div>{t('_Drop image there')}</div>
            </div>
          )}
          {isDragging && !areFilesAuthorized && (
            <div className="flex flex-col items-center">
              <BanIcon className="h-7 w-7" aria-hidden="true" />
              <div>{t('_only PNG, JPG, GIF up to 10MB')}</div>
            </div>
          )}
          {!isDragging && !isUploading && children}
        </div>
        <input
          id="file-upload"
          name="file-upload"
          type="file"
          className="sr-only"
          accept={authorizedTypes.join(', ')}
          onChange={onUploadImage}
          ref={ref}
        />
      </>
    )
  }
)

export default ImageUploader
