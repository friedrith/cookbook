import { Link } from 'react-router-dom'
import { ArrowLeftIcon } from '@heroicons/react/outline'

import Page from 'components/templates/Page'

import { useAppDispatch } from 'hooks/redux'
import { logout } from 'store'

const Preferences = () => {
  const dispatch = useAppDispatch()

  return (
    <Page>
      <main className="max-w-lg mx-auto pt-10 pb-12 px-4 lg:pb-16">
        <Link
          className="text-base font-medium text-gray-900 hover:text-gray-900 flex items-center cursor-pointer fixed top-5 left-5"
          to="/recipes"
        >
          <ArrowLeftIcon className="h-7 w-7" aria-hidden="true" />
        </Link>

        <div className="pt-10 pb-16">
          <div className="px-4 sm:px-6 md:px-0">
            <h1 className="text-3xl font-extrabold text-gray-900">Settings</h1>
          </div>
        </div>
        <div>
          <div className="mt-10 divide-y divide-gray-200">
            {/* <div className="space-y-1">
              <h3 className="text-lg leading-6 font-medium text-gray-900">
                Account
              </h3>
              <p className="max-w-2xl text-sm text-gray-500">
                Manage how information is displayed on your account.
              </p>
            </div> */}
            <div className="mt-6">
              <dl className="divide-y divide-gray-200">
                <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4">
                  <dt className="text-sm font-medium text-gray-500">Account</dt>
                  <dd className="mt-1 flex text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                    <span className="flex-grow">English</span>
                    <span className="ml-4 flex-shrink-0">
                      <button
                        onClick={() => dispatch(logout())}
                        className="bg-white rounded-md font-medium text-purple-600 hover:text-purple-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
                      >
                        Sign out
                      </button>
                    </span>
                  </dd>
                </div>
              </dl>
            </div>
          </div>
        </div>
      </main>
    </Page>
  )
}

export default Preferences
