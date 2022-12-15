import { useTranslation } from 'react-i18next'

import Container from 'components/atoms/Container'
import Logo from 'components/atoms/Logo'
import Select from 'components/atoms/Select'
import { languages } from 'utils/services/i18n'
const Header = () => {
  const { i18n } = useTranslation('marketing')

  return (
    <header>
      <Container className="flex items-center py-4 lg:py-10 justify-between">
        <Logo className="!h-10" />
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
      </Container>
    </header>
  )
}

export default Header
