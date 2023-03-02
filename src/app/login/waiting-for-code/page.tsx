'use client'
import { useState } from 'react'
import { useTranslation, Trans } from 'react-i18next'
import { useSearchParams, useRouter } from 'next/navigation'

import useIsStandalonePWA from '@/hooks/useIsStandalonePWA'
import { isIpad } from '@/utils/platforms/mobile'
import StandaloneLinkValidation from '@/components/organisms/StandaloneLinkValidation'
import { useOnLoggedInAnotherTab } from '@/features/recipes/utils/broadcast'
import VerificationCodeInput from '@/components/atoms/VerificationCodeInput'
import Button from '@/components/atoms/Button'
import Form from '@/components/atoms/Form'
import LoadingSpinner from '@/components/atoms/LoadingSpinner'
import useAuth from '@/features/authentication/hooks/useAuthentication'

const CODE_LENGTH = 6

const WaitingForCodePage = () => {
  const { t } = useTranslation()

  const searchParams = useSearchParams()

  const [email] = useState(searchParams.get('email'))

  const [code, setCode] = useState('')
  const [error, setError] = useState('')
  const [isLoading, setLoading] = useState(false)
  const router = useRouter()

  const { checkVerificationCode } = useAuth()

  const verifySignInCode = async () => {
    try {
      setLoading(true)
      await checkVerificationCode(code)
    } catch (err) {
    } finally {
      setLoading(false)
    }
  }

  const onComplete = async (newCode: string) => {
    setLoading(true)
    setCode(newCode)

    try {
      await checkVerificationCode(newCode)
    } catch (err) {
      setLoading(false)
    }
  }

  return (
    <>
      <Form onSubmit={verifySignInCode}>
        <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
          {t('waitingCode._Enter the verification code')}
        </h2>
        <p className="mt-2 text-sm text-gray-600">
          <Trans i18nKey="waitingCode._We sent an email" values={{ email }} />
        </p>
        <div className="py-7">
          <VerificationCodeInput.Wrapper className="flex justify-center gap-x-3">
            <VerificationCodeInput
              fields={CODE_LENGTH}
              className="w-12 h-12 flex flex-col items-center justify-center text-center outline-none rounded-xl border border-gray-300 text-lg bg-white focus:bg-gray-50 focus:ring-1 focus:ring-primary-500 focus:border-primary-500"
              onComplete={onComplete}
            />
          </VerificationCodeInput.Wrapper>
        </div>
        <Button.Primary
          type="submit"
          className="w-full mt-2"
          disabled={code.length !== CODE_LENGTH || isLoading}
        >
          {isLoading ? (
            <LoadingSpinner className="h-5 w-5 text-white" />
          ) : (
            t('waitingCode._submit')
          )}
        </Button.Primary>
      </Form>
    </>
  )
}

export default WaitingForCodePage
