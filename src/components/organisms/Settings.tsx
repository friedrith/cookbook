import { Disclosure, Transition } from '@headlessui/react'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { ArchiveBoxArrowDownIcon } from '@heroicons/react/24/outline'

import { languages } from 'utils/services/i18n'
import * as temperatures from 'features/units/temperatures'
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
import { track } from 'utils/services/tracking'
import Form from 'components/atoms/Form'
import Input from 'components/atoms/Input'
import useSetting from 'hooks/useSetting'
import Select from 'components/atoms/Select'

const Settings = () => {
  const { t, i18n } = useTranslation()

  const dispatch = useAppDispatch()

  const temperature = useAppSelector(getTemperature)
  const automaticImport = useAppSelector(getAutomaticImport)
  const recipes = useAppSelector(getRecipeList)

  const confirmDeleteAccountPopup = usePopup(false)

  const [error, setError] = useState('')

  const [ingredientTemplate, changeIngredientTemplate] = useSetting(
    getIngredienTemplate,
    setIngredientTemplate,
  )

  const deleteAccountConfirmed = async () => {
    try {
      track('DeleteAccount')
      await dispatch(deleteAllRecipes()).unwrap()
      await dispatch(deleteAccount()).unwrap()
      track('DeleteAccountSuccess')
      await dispatch(logout()).unwrap()
    } catch (error) {
      const exception = error as HttpError
      if (exception.code === 'auth/requires-recent-login') {
        setError('_For security reasons')
      }
      track('DeleteAccountError')
    }
  }

  return (
    <Form className="md:w-auto space-y-6">
      <Form.Item id="languages" label={t('languages.Language')}>
        <Select
          id="languages"
          name="languages"
          className="mt-1"
          defaultValue={i18n.language}
          onChange={language => i18n.changeLanguage(language)}
          options={languages}
        />
      </Form.Item>
      <Form.Item
        id="temperature"
        label={t('settings.temperatures.Temperatures')}
      >
        <Select
          id="temperature"
          name="temperature"
          className="mt-1"
          defaultValue={temperature}
          onChange={value => dispatch(setTemperature(value))}
          options={temperatures.choices.map(({ label, symbol, value }) => ({
            value,
            label: `${t(label)} ${symbol}`,
          }))}
        />
      </Form.Item>
      <Form.Item id="export" label={t('settings.Export')}>
        <Button.White
          id="export"
          name="export"
          className="w-full mt-1 flex-1 flex justify-center !py-0 "
          onClick={async () => {
            await downloadAllRecipes(recipes, t)
          }}
        >
          <span className="!py-2.5">
            {t('settings.Download all your recipes')}
          </span>
          <ArchiveBoxArrowDownIcon className="h-5 w-5  ml-2" />
        </Button.White>
      </Form.Item>
      <Disclosure as="div" className="pt-6">
        {({ open }) => (
          <>
            <Disclosure.Button className="flex w-full items-start justify-between text-left text-gray-400">
              <span className="font-medium text-primary-500 group-hover:text-indigo-900 text-sm">
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
              <Disclosure.Panel as="div" className="pt-2 space-y-6">
                <Form.Item
                  id="template"
                  label={t('settings.ingredient template')}
                >
                  <Input.Black
                    type="text"
                    name="template"
                    id="template"
                    className="mt-1"
                    placeholder="$1"
                    value={ingredientTemplate}
                    onChange={changeIngredientTemplate}
                  />
                </Form.Item>
                <Form.Item id="import" label={t('_Automatic import')}>
                  <Form.Switch
                    description={t(
                      '_If you click on new recipe with a valid url in your clipboard, it will be automatically imported.',
                    )}
                    checked={automaticImport}
                    onChange={async (v: boolean) => {
                      if (v) {
                        await navigator.clipboard.readText()
                      }

                      dispatch(setAutomaticimport(v))
                    }}
                  />
                </Form.Item>
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
    </Form>
  )
}

export default Settings
