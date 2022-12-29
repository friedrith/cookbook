import Button from 'components/atoms/Button'
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
              className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
            />
          </div>
        </div>

        <Button.Black type="submit" className="w-full">
          {t('_Login with magic link')}
        </Button.Black>
      </form>
    </div>
  )
}

export default StandaloneLinkValidation
