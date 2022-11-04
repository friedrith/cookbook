import { Disclosure } from '@headlessui/react'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'

import { languages } from 'utils/services/i18n'
import { choices } from 'utils/parser/temperatures'
import { useAppDispatch, useAppSelector } from 'hooks/redux'
import {
  getTemperature,
  setTemperature,
  getIngredienTemplate,
  setIngredientTemplate,
  deleteAccount,
  deleteAllRecipes,
  logout,
} from 'store'
import Button from 'components/atoms/Button'
import usePopup from 'hooks/usePopup'
import HttpError from 'models/HttpError'

const Settings = () => {
  const { t, i18n } = useTranslation()

  const dispatch = useAppDispatch()

  const temperature = useAppSelector(getTemperature)
  const ingredientTemplate = useAppSelector(getIngredienTemplate)

  const confirmDeleteAccountPopup = usePopup(false)

  const [error, setError] = useState('')

  const deleteAccountConfirmed = async () => {
    try {
      await dispatch(deleteAllRecipes()).unwrap()
      await dispatch(deleteAccount()).unwrap()
      await dispatch(logout()).unwrap()
    } catch (error) {
      const exception = error as HttpError
      if (exception.code === 'auth/requires-recent-login') {
        setError(t('__For security reasons'))
      }
    }
  }

  return (
    <form className="md:w-auto" onSubmit={event => event.preventDefault()}>
      <div className="space-y-6">
        <div>
          <label
            htmlFor="languages"
            className="block text-sm font-medium text-gray-700"
          >
            {t('languages.Language')}
          </label>
          <select
            id="languages"
            name="languages"
            className="mt-1 block w-full rounded-md border-gray-300 py-2 pl-3 pr-10 text-base focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm cursor-pointer"
            defaultValue={i18n.language}
            onChange={event => i18n.changeLanguage(event.target.value)}
          >
            {languages.map(({ key, lang }) => (
              <option key={key} value={key}>
                {lang}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label
            htmlFor="temperature"
            className="block text-sm font-medium text-gray-700"
          >
            {t('settings.temperatures.Temperatures')}
          </label>
          <select
            id="temperature"
            name="temperature"
            className="mt-1 block w-full rounded-md border-gray-300 py-2 pl-3 pr-10 text-base focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm cursor-pointer"
            onChange={event => {
              dispatch(setTemperature(event.target.value))
            }}
            value={temperature}
          >
            {choices.map(({ label, symbol, value }) => (
              <option key={value} value={value}>
                {t(label)} {symbol}
              </option>
            ))}
          </select>
        </div>
        <Disclosure as="div" className="pt-6">
          {({ open }) => (
            <>
              <Disclosure.Button className="flex w-full items-start justify-between text-left text-gray-400">
                <span className="font-medium text-indigo-500 group-hover:text-indigo-900 text-sm">
                  {open
                    ? t('settings.Hide advanced')
                    : t('settings.Show advanced')}
                </span>
              </Disclosure.Button>
              <Disclosure.Panel as="div" className="pt-2">
                <>
                  <label
                    htmlFor="project-name"
                    className="block text-sm font-medium text-gray-700"
                  >
                    {t('settings.ingredient template')}
                  </label>
                  <div className="mt-1">
                    <input
                      type="text"
                      name="project-name"
                      id="project-name"
                      className="block w-full rounded-md border-gray-300 shadow-sm focus:border-sky-500 focus:ring-sky-500 sm:text-sm"
                      placeholder="$1"
                      defaultValue={ingredientTemplate}
                      onChange={event =>
                        dispatch(setIngredientTemplate(event.target.value))
                      }
                    />
                  </div>
                </>
              </Disclosure.Panel>
            </>
          )}
        </Disclosure>
        <div className="pt-7">
          <div className="relative ">
            <div
              className="relative flex w-[200%] transition-all duration-300"
              style={{
                left: confirmDeleteAccountPopup.isOpen ? '-100%' : '0%',
              }}
            >
              <div className="relative flex-1	flex ">
                {!confirmDeleteAccountPopup.isOpen && (
                  <Button.Error
                    className="flex-1 flex justify-center !py-2.5"
                    onClick={confirmDeleteAccountPopup.open}
                  >
                    {t('_Delete account')}
                  </Button.Error>
                )}
              </div>
              <div className="relative flex-1	">
                {confirmDeleteAccountPopup.isOpen && (
                  <>
                    <div className="font-medium text-red-600 text-sm">
                      {t('_Do you really want to delete your account?')}
                    </div>
                    <div className="font-medium text-red-600 text-xs pb-3">
                      {t('_This action is definitive.')}
                    </div>
                    <div className="flex">
                      {error ? (
                        <span>{error}</span>
                      ) : (
                        <>
                          <Button.Error
                            className="flex-1 flex justify-center !py-2.5 mr-1"
                            onClick={deleteAccountConfirmed}
                          >
                            {t('_Confirm')}
                          </Button.Error>

                          <Button.Black
                            className="flex-1 flex justify-center !py-2.5 ml-1"
                            onClick={confirmDeleteAccountPopup.close}
                          >
                            {t('_Cancel')}
                          </Button.Black>
                        </>
                      )}
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </form>
  )
}

export default Settings
