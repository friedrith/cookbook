import { useRef } from 'react'
// import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

import Page from '@/components/templates/Page'
import MainPage from '@/components/templates/MainPage'
import Header from '@/components/atoms/FixedHeader'
// import RecipePreview from '@/components/molecules/RecipePreview'
// import LargeMainPage from '@/components/templates/LargeMainPage'
import BackButton from '@/components/molecules/BackButton'

import PreferencesEntry from '@/components/organisms/PreferencesEntry'
import PreferencesSection from '@/components/organisms/PreferencesSection'

import { useAppDispatch, useAppSelector } from '@/hooks/redux'
import { logout, getCurrentUser } from '@/store'

const Preferences = () => {
  const dispatch = useAppDispatch()

  const { t } = useTranslation()

  const user = useAppSelector(getCurrentUser)

  const ref = useRef<HTMLInputElement>(null)

  return (
    <Page title={t('_settings')}>
      <MainPage className="flex-1 relative z-10">
        <div className="pt-20">
          <PreferencesSection title="User Interface">
            <PreferencesEntry />
            <PreferencesEntry />
            <PreferencesEntry />
          </PreferencesSection>
          <PreferencesSection title="User Interface">
            <PreferencesEntry />
            <PreferencesEntry />
            <PreferencesEntry />
          </PreferencesSection>

          <dl className="divide-y divide-gray-200">
            <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4">
              <dt className="text-sm font-medium text-gray-500">
                {t('_Account')}
              </dt>
              <dd className="mt-1 flex text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                <span className="flex-grow">{user?.email}</span>
                <span className="ml-4 flex-shrink-0">
                  <button
                    onClick={() => dispatch(logout())}
                    className="bg-white rounded-md font-medium text-purple-600 hover:text-purple-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
                  >
                    {t('_Sign out')}
                  </button>
                </span>
              </dd>
            </div>
          </dl>
        </div>
      </MainPage>
      <Header restRef={ref}>
        {isMaximized => (
          <>
            <BackButton url="/recipes" basic title={t('_Back to recipes')} />

            <h1 className="text-3xl font-extrabold text-gray-900 pl-4">
              {t('_settings')}
            </h1>
          </>
        )}
      </Header>
    </Page>
  )
}

export default Preferences
