import { useRef, useState } from 'react'
// import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import {
  ArchiveBoxArrowDownIcon,
  ArrowRightOnRectangleIcon,
  ExclamationTriangleIcon,
} from '@heroicons/react/24/outline'

import HttpError from '~/src/models/HttpError'
import Page from '~/src/components/templates/Page'
import MainPage from '~/src/components/templates/MainPage'
import FixedHeader from '~/src/components/atoms/FixedHeader'
import Header from '~/src/components/atoms/Header'
// import RecipePreview from '~/src/components/molecules/RecipePreview'
// import LargeMainPage from '~/src/components/templates/LargeMainPage'
import BackButton from '~/src/components/molecules/BackButton'

import PreferencesEntry from '~/src/features/settings/components/PreferencesEntry'
import PreferencesSection from '~/src/features/settings/components/PreferencesSection'
import Select from '~/src/components/atoms/Select'
import { languages } from '~/src/utils/services/i18n'
import * as temperatures from '~/src/features/units/temperatures'
import Button from '~/src/components/atoms/Button'
import downloadAllRecipes from '~/src/utils/export'

import {
  getTemperature,
  setTemperature,
  getIngredienTemplate,
  setIngredientTemplate,
  // deleteAccount,
  deleteAllRecipes,
  getAutomaticImport,
  setAutomaticimport,
  // logout,
  getRecipeList,
} from '~/src/store/index'
import { useAppDispatch, useAppSelector } from '~/src/hooks/redux'
import { getCurrentUser } from '~/src/store/index'
import Switch from '~/src/components/atoms/Switch'
import useAuthentication from '~/src/features/authentication/hooks/useAuthentication'
import Modal, { PopupType } from '~/src/components/atoms/Modal'
import usePopup from '~/src/hooks/usePopup'
import { track } from '~/src/utils/services/tracking'
import useSetting from '~/src/hooks/useSetting'
import Input from '~/src/components/atoms/Input'
import { ShoppingBagIcon } from '@heroicons/react/20/solid'

const Preferences = () => {
  const dispatch = useAppDispatch()

  const { t, i18n } = useTranslation()

  const user = useAppSelector(getCurrentUser)
  const temperature = useAppSelector(getTemperature)

  const ref = useRef<HTMLDivElement>(null)

  const recipes = useAppSelector(getRecipeList)

  const automaticImport = useAppSelector(getAutomaticImport)

  const { logout } = useAuthentication()

  const confirmDeleteAccountPopup = usePopup()

  const [error, setError] = useState('')

  const deleteAccountConfirmed = async () => {
    try {
      track('DeleteAccount')
      await dispatch(deleteAllRecipes()).unwrap()
      // await dispatch(deleteAccount()).unwrap()
      track('DeleteAccountSuccess')
      await logout()
    } catch (error) {
      const exception = error as HttpError
      if (exception.code === 'auth/requires-recent-login') {
        setError('_For security reasons')
      }
      track('DeleteAccountError')
    }
  }

  const ingredientTemplatePopup = usePopup()

  const [ingredientTemplate, changeIngredientTemplate] = useSetting(
    getIngredienTemplate,
    setIngredientTemplate,
  )

  return (
    <Page title={t('_settings')}>
      <MainPage className="flex-1 relative z-10">
        <div className="pt-20">
          <div ref={ref} />
          <PreferencesSection title={t('settings.userInterface')}>
            <PreferencesEntry title={t('languages.Language')}>
              <Select
                id="languages"
                name="languages"
                className="mt-1"
                defaultValue={i18n.language}
                onChange={language => i18n.changeLanguage(language)}
                options={languages}
              />
            </PreferencesEntry>
            <PreferencesEntry
              title={t('settings.temperatures.Temperatures')}
              description={t('settings.temperatures.Unit in recipes')}
            >
              <Select
                id="temperature"
                name="temperature"
                className="mt-1"
                defaultValue={temperature}
                onChange={value => dispatch(setTemperature(value))}
                options={temperatures.choices.map(
                  ({ label, symbol, value }) => ({
                    value,
                    label: `${t(label)} ${symbol}`,
                  }),
                )}
              />
            </PreferencesEntry>
          </PreferencesSection>
          <PreferencesSection title={t('import.Import')}>
            <PreferencesEntry
              title={t('_Automatic import')}
              description={t(
                '_when you click on new recipe with a valid url in your clipboard',
              )}
              onClick={async () => {
                const v = !automaticImport
                if (v) {
                  await navigator.clipboard.readText()
                }

                dispatch(setAutomaticimport(v))
              }}
            >
              <Switch
                checked={automaticImport}
                onChange={async (v: boolean) => {
                  if (v) {
                    await navigator.clipboard.readText()
                  }

                  dispatch(setAutomaticimport(v))
                }}
              />
            </PreferencesEntry>
          </PreferencesSection>
          <PreferencesSection title={t('settings.advanced')}>
            <PreferencesEntry
              title={t('settings.ingredient template')}
              description={t('settings.ingredient template description')}
              onClick={ingredientTemplatePopup.open}
            >
              {/* {ingredientTemplate ? ingredientTemplate : '$1'} */}
            </PreferencesEntry>
            <Modal
              open={ingredientTemplatePopup.isOpen}
              onClose={ingredientTemplatePopup.close}
              icon={ShoppingBagIcon}
              type={PopupType.Success}
              description={t('settings.ingredient template')}
            >
              <Input.Black
                type="text"
                name="template"
                id="template"
                placeholder="$1"
                value={ingredientTemplate}
                onChange={changeIngredientTemplate}
              />
              <Button.White
                className="mt-3 w-full"
                onClick={ingredientTemplatePopup.close}
              >
                {t('notifications.Close')}
              </Button.White>
            </Modal>
          </PreferencesSection>
          <PreferencesSection title={t('settings.account')}>
            <PreferencesEntry
              title={t('settings.Export')}
              description={t('settings.Download all your recipes')}
              onClick={async () => await downloadAllRecipes(recipes, t)}
            >
              <ArchiveBoxArrowDownIcon className="h-6 w-6 ml-2" />
            </PreferencesEntry>
            <PreferencesEntry
              title={t('_Logout')}
              description={t('settings._You are logged in as', {
                emailAddress: user?.email,
              })}
              onClick={logout}
            >
              <ArrowRightOnRectangleIcon className="h-6 w-6 ml-2" />
            </PreferencesEntry>
            <PreferencesEntry
              title={t('_Delete account')}
              description={t('_This action is definitive.')}
              onClick={confirmDeleteAccountPopup.open}
            >
              <ExclamationTriangleIcon className="h-6 w-6 ml-2 text-orange-400" />
            </PreferencesEntry>
          </PreferencesSection>
        </div>
      </MainPage>
      <FixedHeader restRef={ref}>
        {isMaximized => (
          <Header white={isMaximized}>
            <BackButton url="/recipes" basic title={t('_Back to recipes')} />

            <h1 className="text-2xl font-extrabold text-gray-900 pl-4">
              {t('_settings')}
            </h1>
            <div className="flex-1" />
          </Header>
        )}
      </FixedHeader>
      <Modal
        open={confirmDeleteAccountPopup.isOpen}
        onClose={confirmDeleteAccountPopup.close}
        icon={ExclamationTriangleIcon}
        type={PopupType.Warning}
        description={t('_Do you really want to delete your account?')}
      >
        {error ? (
          <span className="text-sm font-bold	">{t(error)}</span>
        ) : (
          <>
            <Button.White
              className="mb-3 w-full"
              onClick={confirmDeleteAccountPopup.close}
            >
              {t('_Cancel')}
            </Button.White>
            <Button.Black
              className="mb-3 w-full"
              onClick={deleteAccountConfirmed}
            >
              {t('_Delete account')}
            </Button.Black>
          </>
        )}
      </Modal>
    </Page>
  )
}

export default Preferences
