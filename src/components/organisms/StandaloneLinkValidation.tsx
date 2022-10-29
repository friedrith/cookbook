import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'

const StandaloneLinkValidation = () => {
  const { t } = useTranslation()

  const [link, setLink] = useState('')

  const redirectToLink = (event: React.SyntheticEvent) => {
    window.location.assign(link)
    event.preventDefault()
  }

  return (
    <div className="mt-6">
      <form
        action="#"
        method="POST"
        className="space-y-6"
        onSubmit={redirectToLink}
      >
        <div>
          <label
            htmlFor="link"
            className="block text-sm font-medium text-gray-700"
          >
            {t('_Link sent by email')}
          </label>
          <div className="mt-1">
            <input
              id="link"
              name="link"
              type="text"
              onChange={e => setLink(e.target.value)}
              required
              placeholder="link"
              className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
        </div>

        <div>
          <button
            type="submit"
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            {t('_Login with magic link')}
          </button>
        </div>
      </form>
    </div>
  )
}

export default StandaloneLinkValidation
