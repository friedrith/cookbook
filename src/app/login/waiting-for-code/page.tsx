'use client'
import { useTranslation, Trans } from 'react-i18next'
import { useSearchParams } from 'next/navigation'

import useIsStandalonePWA from '@/hooks/useIsStandalonePWA'
import { isIpad } from '@/utils/platforms/mobile'
import StandaloneLinkValidation from '@/components/organisms/StandaloneLinkValidation'
import { useOnLoggedInAnotherTab } from '@/features/recipes/utils/broadcast'
import VerificationCodeInput from '@/components/atoms/VerificationCodeInput'
import Button from '@/components/atoms/Button'

const LinkWaiting = () => {
  const { t } = useTranslation()

  const searchParams = useSearchParams()

  const email = searchParams.get('email')

  const isStandalone = useIsStandalonePWA()

  useOnLoggedInAnotherTab(() => {
    window.location.reload()
  })

  return (
    <>
      <div>
        <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
          {t('waitingCode._Enter the verification code')}
        </h2>
        <p className="mt-2 text-sm text-gray-600">
          <Trans i18nKey="waitingCode._We sent an email" values={{ email }} />
        </p>
        <div className="py-7">
          <VerificationCodeInput.Wrapper className="flex justify-center gap-x-3">
            <VerificationCodeInput className="w-14 h-14 flex flex-col items-center justify-center text-center outline-none rounded-xl border border-gray-300 text-lg bg-white focus:bg-gray-50 focus:ring-1 focus:ring-primary-500 focus:border-primary-500" />
          </VerificationCodeInput.Wrapper>
        </div>
        <Button.Primary className="w-full mt-2">
          {t('waitingCode._submit')}
        </Button.Primary>
      </div>
    </>
  )
}

export default LinkWaiting
