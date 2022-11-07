import { Disclosure, Switch, Transition } from '@headlessui/react'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import classNames from 'classnames'
import { ArchiveBoxArrowDownIcon } from '@heroicons/react/24/outline'

import { languages } from 'utils/services/i18n'
import * as temperatures from 'utils/parser/temperatures'
// import * as units from 'utils/parser/units'
import { useAppDispatch, useAppSelector } from 'hooks/redux'
import {
  getTemperature,
  setTemperature,
  getIngredienTemplate,
  setIngredientTemplate,
  deleteAccount,
  deleteAllRecipes,
  getAutomaticImport,
  setAutomaticimport,
  logout,
  getRecipeList,
} from 'store'
import Button from 'components/atoms/Button'
import usePopup from 'hooks/usePopup'
import HttpError from 'models/HttpError'
import downloadAllRecipes from 'utils/export'

const Settings = () => {
  const { t, i18n } = useTranslation()

  const dispatch = useAppDispatch()

  const temperature = useAppSelector(getTemperature)
  const ingredientTemplate = useAppSelector(getIngredienTemplate)
  const automaticImport = useAppSelector(getAutomaticImport)
  const recipes = useAppSelector(getRecipeList)

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
        setError('_For security reasons')
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
            {temperatures.choices.map(({ label, symbol, value }) => (
              <option key={value} value={value}>
                {t(label)} {symbol}
              </option>
            ))}
          </select>
        </div>
        {/* <div>
          <label
            htmlFor="units"
            className="block text-sm font-medium text-gray-700"
          >
            {t('settings.units.Other units')}
          </label>
          <select
            id="units"
            name="units"
            className="mt-1 block w-full rounded-md border-gray-300 py-2 pl-3 pr-10 text-base focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm cursor-pointer"
            onChange={event => {
              dispatch(setTemperature(event.target.value))
            }}
            value={temperature}
          >
            {units.choices.map(({ label, value }) => (
              <option key={value} value={value}>
                {t(label)}
              </option>
            ))}
          </select>
        </div> */}
        <div>
          <label
            htmlFor="temperature"
            className="block text-sm font-medium text-gray-700"
          >
            {t('settings.Export')}
          </label>
          <Button.White
            className="w-full mt-1 flex-1 flex justify-center !py-0 "
            onClick={async () => {
              await downloadAllRecipes(recipes)
            }}
          >
            <span className="!py-2.5">
              {t('settings.Download all your recipes')}
            </span>
            <ArchiveBoxArrowDownIcon className="h-5 w-5  ml-2" />
          </Button.White>
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
              <Transition
                enter="transition duration-100 ease-out"
                enterFrom="transform scale-95 opacity-0"
                enterTo="transform scale-100 opacity-100"
                leave="transition duration-75 ease-out"
                leaveFrom="transform scale-100 opacity-100"
                leaveTo="transform scale-95 opacity-0"
              >
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
                  <div>
                    <Switch.Group
                      as="li"
                      className="flex items-center justify-between py-4"
                    >
                      <div className="flex flex-col">
                        <Switch.Label
                          as="p"
                          className="text-sm font-medium text-gray-700"
                          passive
                        >
                          {t('_Automatic import')}
                        </Switch.Label>
                        <Switch.Description className="mt-1 text-xs text-gray-500">
                          {t(
                            '_If you click on new recipe with a valid url in your clipboard, it will be automatically imported.'
                          )}
                        </Switch.Description>
                      </div>
                      <Switch
                        checked={automaticImport}
                        onChange={async (v: boolean) => {
                          if (v) {
                            await navigator.clipboard.readText()
                          }

                          dispatch(setAutomaticimport(v))
                        }}
                        className={classNames(
                          automaticImport ? 'bg-indigo-600' : 'bg-gray-200',
                          'mt-1  relative ml-4 inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-offset-2'
                        )}
                      >
                        <span
                          aria-hidden="true"
                          className={classNames(
                            automaticImport ? 'translate-x-5' : 'translate-x-0',
                            'inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out'
                          )}
                        />
                      </Switch>
                    </Switch.Group>
                  </div>
                </Disclosure.Panel>
              </Transition>
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
                        <span className="text-sm font-bold	">{t(error)}</span>
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
