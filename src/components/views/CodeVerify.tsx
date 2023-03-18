import { useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { useTranslation, Trans } from 'react-i18next'

import LoginPage from 'components/templates/LoginPage'
import Button from 'components/atoms/Button'
import Form from 'components/atoms/Form'
import VerificationCodeInput from 'components/atoms/VerificationCodeInput'
import useAuthentication from 'features/authentication/hooks/useAuthentication'
import LoadingSpinner from 'components/atoms/LoadingSpinner'

const CODE_LENGTH = 6

const CodeVerify = () => {
  const { t } = useTranslation('login')

  const [code, setCode] = useState('')

  const [searchParams] = useSearchParams()
  const [email] = useState(searchParams.get('email'))
  const [isLoading, setLoading] = useState(false)

  const { checkVerificationCode } = useAuthentication()

  const validateCode = async (newCode: string) => {
    setLoading(true)
    try {
      await checkVerificationCode(newCode)
    } catch (error) {
      setLoading(false)
      console.error(error)
    } finally {
    }
  }

  return (
    <LoginPage
      title={t('_Log in')}
      description={
        <Trans t={t} i18nKey="_An email on its way" values={{ email }} />
      }
    >
      <Form className="space-y-4" onSubmit={() => validateCode(code)}>
        <VerificationCodeInput.Wrapper className="flex justify-center md:justify-start gap-x-3">
          <VerificationCodeInput
            fields={CODE_LENGTH}
            className="w-12 h-12 flex flex-col items-center justify-center text-center outline-none rounded-xl border border-gray-300 text-lg bg-white focus:bg-gray-50 focus:ring-1 focus:ring-primary-500 focus:border-primary-500"
            onComplete={validateCode}
            onChange={v => setCode(v.join(''))}
          />
        </VerificationCodeInput.Wrapper>

        <div>
          <Button.Primary
            type="submit"
            className="w-full"
            disabled={code.length < 6}
          >
            {isLoading ? (
              <LoadingSpinner className="h-5 w-5 text-white" />
            ) : (
              t('_Verify')
            )}
          </Button.Primary>
        </div>
      </Form>
    </LoginPage>
  )
}

export default CodeVerify
