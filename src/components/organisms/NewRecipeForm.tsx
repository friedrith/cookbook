/* eslint-disable i18next/no-literal-string */
import { useTranslation } from 'react-i18next'
import React, { useState, useEffect, useCallback, useRef } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Transition } from '@headlessui/react'

import { parseRecipeImportUrl, ImportUrlStatus } from 'utils/importRecipe'
import { useAppDispatch } from 'hooks/redux'
import { importRecipe } from 'store'
import LoadingSpinner from 'components/atoms/LoadingSpinner'

const NewRecipeForm = () => {
  const { t } = useTranslation()

  const [url, setUrl] = useState('')
  const [status, setStatus] = useState(ImportUrlStatus.Empty)
  const [isLoading, setLoading] = useState(false)

  const processUrl = (newUrl: string) => {
    setUrl(newUrl)
    setStatus(parseRecipeImportUrl(newUrl))
  }

  const inputRef = useRef<HTMLInputElement | null>(null)

  const init = useCallback(async () => {
    const newUrl = await navigator.clipboard.readText()
    if (parseRecipeImportUrl(newUrl) === ImportUrlStatus.NotUrl) return
    processUrl(newUrl)
  }, [])

  useEffect(() => {
    // init()
    if (inputRef.current) {
      inputRef.current.focus()
    }
  }, [init])

  const dispatch = useAppDispatch()

  const navigate = useNavigate()

  const startImportingRecipe = async () => {
    if (isLoading) return
    setLoading(true)
    const recipe = await dispatch(importRecipe(url)).unwrap()
    navigate(`/recipes/${recipe.id}`)
    setLoading(false)
  }

  return (
    <div className="p-5">
      <div className="text-left w-full">
        <label
          htmlFor="url"
          className="block text-sm font-medium text-gray-700"
        >
          {t('import.Import from a recipe catalog')}
        </label>
        <div className="mt-1 flex rounded-md shadow-sm w-full">
          <div className="relative flex flex-grow items-stretch focus-within:z-10">
            {/* <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
              <GlobeAltIcon
                className="h-5 w-5 text-gray-400"
                aria-hidden="true"
              />
            </div> */}
            <input
              type="text"
              name="url"
              id="url"
              className="block w-full rounded-none rounded-l-md border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              placeholder={t('import.Enter a url')}
              onChange={event => processUrl(event.target.value)}
              value={url}
              ref={inputRef}
              autoComplete="off"
            />
          </div>
          <button
            type="button"
            disabled={status !== ImportUrlStatus.Ok}
            onClick={startImportingRecipe}
            className="relative -ml-px inline-flex items-center space-x-2 rounded-r-md border border-gray-300 bg-gray-50 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 whitespace-nowrap disabled:opacity-50"
          >
            <span>
              {isLoading ? (
                <LoadingSpinner className="h-4 w-4" />
              ) : (
                t('import.Import')
              )}
            </span>
          </button>
        </div>
        <Transition
          show={
            status !== ImportUrlStatus.Ok && status !== ImportUrlStatus.Empty
          }
          enter="transition-all duration-75"
          enterFrom="h-0"
          enterTo="h-4"
          leave="transition-all duration-150"
          leaveFrom="h-4"
          leaveTo="h-0"
        >
          <span className="block mt-2 text-xs text-red-600">
            {status === ImportUrlStatus.NotUrl && t('import.Enter a valid url')}
            {status === ImportUrlStatus.NotAManagedWebsite && (
              <>
                {t('import.Only few recipe catalog are managed')}{' '}
                {/* <Link
                  to="/faq"
                  className="text-indigo-600 hover:text-indigo-500 cursor-pointer"
                >
                  {t('import.Check the list there')}
                </Link> */}
              </>
            )}
          </span>
        </Transition>
      </div>
      <div className="relative mt-5 mb-5">
        <div className="absolute inset-0 flex items-center" aria-hidden="true">
          <div className="w-full border-t border-gray-200" />
        </div>
        <div className="relative flex justify-center">
          <span className="bg-white px-4 text-sm font-medium text-gray-500">
            {t('import.or')}
          </span>
        </div>
      </div>
      <Link
        to="/recipes/new"
        className="flex w-full items-center justify-center rounded-md text-sm font-medium shadow-sm border border-transparent bg-black py-2 text-white hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:ring-offset-2"
      >
        {t('import.Create new from blank page')}
      </Link>
    </div>
  )
}

export default NewRecipeForm
