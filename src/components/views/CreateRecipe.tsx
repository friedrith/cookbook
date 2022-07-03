import { useRef } from 'react'
import { Link } from 'react-router-dom'
import { ArrowLeftIcon } from '@heroicons/react/outline'
import { useTranslation } from 'react-i18next'

import MainPage from 'components/templates/MainPage'
import TopBar from 'components/atoms/TopBar'
import Page from 'components/templates/Page'
import classNames from 'utils/classNames'

const CreateRecipe = () => {
  const ref = useRef<HTMLInputElement>(null)

  const { t } = useTranslation()

  return (
    <Page title={t('_New Recipe')}>
      <div className="relative h-full">
        <div className="h-96 fixed w-full overflow-hidden"></div>
        <div className="h-96" />
        <MainPage className="flex-1 relative z-10">
          <div className="flex flex-col items-stretch lg:flex-row lg:items-start">
            gfgfd
          </div>
        </MainPage>
        <TopBar
          restRef={ref}
          children={isMaximized => (
            <Link
              className={classNames(
                'p-2 text-base font-medium text-gray-900 hover:text-gray-900 flex h-15 w-15 items-center cursor-pointer mt-4 lg:mt-6',
                isMaximized ? '' : 'bg-white shadow rounded-md'
              )}
              to="/recipes"
            >
              <ArrowLeftIcon className="h-7 w-7" aria-hidden="true" />
            </Link>
          )}
        ></TopBar>
      </div>
    </Page>
  )
}

export default CreateRecipe
