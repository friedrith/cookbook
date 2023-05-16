import { useTranslation } from 'react-i18next'

import Header from '~/src/components/atoms/Header'
import Logo from '~/src/components/atoms/Logo'
import Select from '~/src/components/atoms/Select'
import { languages } from '~/src/utils/services/i18n'

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
          onChange={language => i18n.changeLanguage(language)}
          options={languages}
        />
      </div>
    </Header>
  )
}

export default LandingHeader
