import { useTranslation } from 'react-i18next'
// import { useState } from 'react'
import Logo from 'components/atoms/Logo'
import Container from 'components/atoms/Container'
// import Select from 'components/atoms/Select'
// import Button from 'components/atoms/Button'
// import Input from 'components/atoms/Input'
// import { languages } from 'utils/services/i18n'

const Footer = () => {
  // const [email, setEmail] = useState('')

  const { t } = useTranslation('marketing')

  return (
    <footer className=" border-gray-200 py-4 lg:py-10">
      <Container>
        <div className="flex flex-col items-center border-gray-200 pt-8 pb-12 md:flex-row-reverse md:justify-between md:pt-6">
          {/* <form className="flex w-full justify-center md:w-auto"> */}
          {/* <Input.Black
              type="email"
              value={email}
              onChange={setEmail}
              aria-label="Email address"
              placeholder="Email address"
              className="w-60 min-w-0 shrink"
            />
            <Button.Black type="submit" className="ml-3 flex-none">
              <span className="hidden lg:inline">Join our newsletter</span>
              <span className="lg:hidden">Join newsletter</span>
            </Button.Black> */}
          {/* <Select
              id="languages"
              name="languages"
              className="mt-1 !text-gray-500 !border-none !focus:outline-none"
              defaultValue={i18n.language}
              onChange={language => i18n.changeLanguage(language)}
              options={languages}
            /> */}
          {/* </form> */}
          <span className="pl-3 text-sm text-gray-500">
            {t('All rights reserved', { date: new Date().getFullYear() })}
          </span>
          <p className="mt-6 text-sm text-gray-500 md:mt-0 flex items-center">
            <Logo />
          </p>
        </div>
      </Container>
    </footer>
  )
}

export default Footer
