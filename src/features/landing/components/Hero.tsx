import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'

import Button from 'components/atoms/Button'
import { getCurrentUser } from 'store'
import { useAppSelector } from 'hooks/redux'
import Container from 'components/atoms/Container'
import BackgroundIllustration from 'features/landing/components/BackgroundIllustration'
import PhoneFrame from 'components/atoms/PhoneFrame'

import appDemo from 'assets/app.png'
import { isWebview } from 'utils/platforms/mobile'
import { openBrowserWindow } from 'utils/platforms/window'

const AppDemo = () => (
  <img className="absolute inset-0" src={appDemo} alt="App demo" />
)

const Hero = () => {
  const { t } = useTranslation('marketing')

  const user = useAppSelector(getCurrentUser)

  const navigate = useNavigate()

  const openApp = () => {
    if (user) {
      if (isWebview()) {
        openBrowserWindow(`/recipes`)
      } else {
        navigate('/recipes')
      }
    } else {
      if (isWebview()) {
        openBrowserWindow(`/login`)
      } else {
        navigate('/login')
      }
    }
  }

  return (
    <div className="relative overflow-hidden py-20 sm:py-32 lg:pb-32 xl:pb-36">
      {/* <img className="absolute inset-0" src={wallpaper} alt="foo" /> */}
      <Container>
        <div className="lg:grid lg:grid-cols-12 lg:gap-x-8 lg:gap-y-20">
          <div className="relative z-10 mx-auto max-w-2xl lg:col-span-7 lg:max-w-none lg:pt-6 xl:col-span-6">
            <h1
              className="text-4xl font-medium tracking-tight text-gray-900"
              style={{
                wordSpacing: t('Cook awesome meals easier, faster').includes(
                  '·',
                )
                  ? '0.55rem'
                  : undefined,
              }}
            >
              {t('Cook awesome meals easier, faster')}
            </h1>
            <p className="mt-6 text-lg text-gray-500 leading-8">
              {t('gathering recipes')}
            </p>
            <div className="mt-8 flex flex-wrap gap-x-6 gap-y-4">
              <Button.Primary className="!py-3 !px-5" onClick={openApp}>
                {user ? t('Open CookBook') : t('Create your CookBook')}
              </Button.Primary>
              {/* <Button.White className="!py-3 !px-5">Try the demo</Button.White> */}
            </div>
          </div>
          <div className="relative mt-10 sm:mt-20 lg:col-span-5 lg:row-span-2 lg:mt-0 xl:col-span-6">
            <BackgroundIllustration className="absolute left-1/2 top-4 h-[1026px] w-[1026px] -translate-x-1/3 stroke-gray-300/70 [mask-image:linear-gradient(to_bottom,white_20%,transparent_75%)] sm:top-16 sm:-translate-x-1/2 lg:-top-16 lg:ml-12 xl:-top-14 xl:ml-0" />
            <div className="-mx-4 h-[448px] px-9 [mask-image:linear-gradient(to_bottom,white_70%,transparent)] sm:mx-0 lg:absolute lg:-inset-x-10 lg:-top-10 lg:-bottom-20 lg:h-auto lg:px-0 lg:pt-10 xl:-bottom-32">
              <PhoneFrame className="mx-auto max-w-[366px]">
                <AppDemo />
              </PhoneFrame>
            </div>
          </div>
        </div>
      </Container>
    </div>
  )
}

export default Hero
