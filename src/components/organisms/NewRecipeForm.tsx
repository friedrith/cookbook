/* eslint-disable i18next/no-literal-string */
import { useTranslation } from 'react-i18next'
import { useState, useEffect, useCallback } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Transition } from '@headlessui/react'
import {
  ExclamationCircleIcon,
  QuestionMarkCircleIcon,
} from '@heroicons/react/20/solid'

import { parseRecipeImportUrl, ImportUrlStatus } from 'utils/importRecipe'
import { useAppDispatch, useAppSelector } from 'hooks/redux'
import { getAutomaticImport, importRecipe } from 'store'
import LoadingSpinner from 'components/atoms/LoadingSpinner'
import { getOfficialWebsites } from 'store/officialWebsites'
import Button from 'components/atoms/Button'
import { track } from 'utils/services/tracking'

const NewRecipeForm = () => {
  const { t } = useTranslation()

  const [url, setUrl] = useState('')
  const [status, setStatus] = useState(ImportUrlStatus.Empty)
  const [isLoading, setLoading] = useState(false)

  const officialWebsites = useAppSelector(getOfficialWebsites)

  const automaticImport = useAppSelector(getAutomaticImport)

  const processUrl = (newUrl: string) => {
    setUrl(newUrl)
    setStatus(parseRecipeImportUrl(newUrl))
  }

  const dispatch = useAppDispatch()

  const navigate = useNavigate()

  const startImportingRecipe = useCallback(async () => {
    if (isLoading) return
    try {
      track('ImportRecipe', { url })
      setLoading(true)
      const recipe = await dispatch(importRecipe(url)).unwrap()
      plausible('ImportRecipe')
      navigate(`/recipes/${recipe.id}`)
      track('ImportRecipeSuccess')
    } catch (error) {
      const { hostname } = new URL(url)
      if (officialWebsites.includes(hostname)) {
        setStatus(ImportUrlStatus.Error)
      } else {
        setStatus(ImportUrlStatus.NotAManagedWebsite)
      }
      track('ImportRecipeError', { error })
    } finally {
      setLoading(false)
    }
  }, [url, dispatch, setLoading, navigate, isLoading, officialWebsites])

  const init = useCallback(async () => {
    const newUrl = await navigator.clipboard.readText()
    if (parseRecipeImportUrl(newUrl) === ImportUrlStatus.NotUrl) return
    processUrl(newUrl)
  }, [])

  useEffect(() => {
    if (automaticImport) {
      init()
    }
  }, [init, automaticImport, startImportingRecipe])

  return (
    <div className="p-5">
      <div className="text-left w-full">
        <label
          htmlFor="url"
          className="flex text-sm font-medium text-gray-700 items-center"
        >
          {t('import.Import from a recipe catalog')}
          <a target="_blank" rel="noreferrer" href="/faq#website-list">
            <span className="sr-only">{t('_See the official websites')}</span>
            <QuestionMarkCircleIcon className="inline h-4 w-4 ml-1" />
          </a>
        </label>
        <div className="mt-1 flex rounded-md shadow-sm w-full">
          <div className="relative flex flex-grow items-stretch focus-within:z-10">
            <input
              type="text"
              name="url"
              id="url"
              className="block w-full rounded-none rounded-l-md border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              placeholder={t('import.Enter a url')}
              onChange={event => processUrl(event.target.value)}
              value={url}
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
          <span className="flex items-center mt-2 text-xs text-red-600 ">
            {status !== ImportUrlStatus.Ok &&
              status !== ImportUrlStatus.Empty && (
                <ExclamationCircleIcon className="inline w-5 h-5 align-middle mr-1" />
              )}
            <span>
              {status === ImportUrlStatus.NotUrl &&
                t('import.Enter a valid url')}
              {status === ImportUrlStatus.Error &&
                t(
                  'import.Oups an error happened. We suggest you to enter the recipe manually this time.'
                )}
              {status === ImportUrlStatus.NotAManagedWebsite && (
                <>
                  {t('import.Only few recipe catalog are managed')}{' '}
                  <Link
                    onClick={() => track('NewRecipe')}
                    to="/faq#website-list"
                    className="text-indigo-600 hover:text-indigo-500 cursor-pointer"
                  >
                    {t('import.Check the list there')}
                  </Link>
                </>
              )}
            </span>
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
      <Button.Black
        to="/recipes/new"
        className="flex w-full items-center justify-center bg-black py-2.5 text-white hover:bg-gray-800 focus:ring-gray-900"
      >
        {t('import.Create new from blank page')}
      </Button.Black>
    </div>
  )
}

export default NewRecipeForm
