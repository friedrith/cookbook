import { useTranslation } from 'react-i18next'

import Header from '@/components/atoms/Header'
import Logo from '@/components/atoms/Logo'
import Select from '@/components/atoms/Select'
import { languages, saveLocale } from '@/utils/services/locales'

const LandingHeader = () => {
  const { i18n } = useTranslation('marketing')

  return (
    <Header>
      <Logo />
      <div className="flex-1" />
      <div>
        <Select
          id="languages"
          name="languages"
          className="mt-1 !text-gray-500 !border-none !focus:outline-none flex-auto"
          defaultValue={i18n.language}
          onChange={locale => {
            i18n.changeLanguage(locale)
            saveLocale(locale)
          }}
          options={languages}
        />
      </div>
    </Header>
  )
}

export default LandingHeader