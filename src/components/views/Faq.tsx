import { useTranslation } from 'react-i18next'
import { useRef } from 'react'
import { Disclosure } from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/24/outline'
import classNames from 'classnames'
import { Link } from 'react-router-dom'

import Page from 'components/templates/Page'
import Logo from 'components/atoms/Logo'
import LargeMainPage from 'components/templates/LargeMainPage'
import Header from 'components/atoms/Header'

const faqs = [
  {
    question: 'Why loging only with a magic link?',
    answer:
      'The CookBook believes in security by design. By using only a magic link we are sure no one can hack your password. In the future, we would like to propose new login systems like Google or Apple authentication or 6-digits codes.',
  },
  {
    question: 'Why not proposing recipes?',
    answer:
      'CookBook is the digital replacement of your grandmother recipe book. In order to really improve the user experience, we want to focus on this scope, from once you have the recipe until you smell the nice meal ready.',
  },
  // More questions...
]

const Help = () => {
  const { t } = useTranslation()

  const ref = useRef<HTMLInputElement>(null)

  return (
    <Page title={t('_FAQ')}>
      <LargeMainPage className="flex-1 relative z-10">
        <div className="mx-auto max-w-7xl py-12 px-4 sm:py-16 sm:px-6 lg:px-8">
          {/* <div className="flex flex-shrink-0 justify-center">
          <Logo />
        </div> */}
          <div
            className="mx-auto max-w-3xl divide-y-2 divide-gray-200"
            ref={ref}
          >
            <h2 className="text-center text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              {t('_FAQ')}
            </h2>
            <dl className="mt-6 space-y-6 divide-y divide-gray-200">
              {faqs.map(faq => (
                <Disclosure as="div" key={faq.question} className="pt-6">
                  {({ open }) => (
                    <>
                      <dt className="text-lg">
                        <Disclosure.Button className="flex w-full items-start justify-between text-left text-gray-400">
                          <span className="font-medium text-gray-900">
                            {faq.question}
                          </span>
                          <span className="ml-6 flex h-7 items-center">
                            <ChevronDownIcon
                              className={classNames(
                                open ? '-rotate-180' : 'rotate-0',
                                'h-6 w-6 transform'
                              )}
                              aria-hidden="true"
                            />
                          </span>
                        </Disclosure.Button>
                      </dt>
                      <Disclosure.Panel as="dd" className="mt-2 pr-12">
                        <p className="text-base text-gray-500">{faq.answer}</p>
                      </Disclosure.Panel>
                    </>
                  )}
                </Disclosure>
              ))}
            </dl>
          </div>
          <div className="mt-12 text-center">
            <Link
              to="/recipes"
              className="text-base font-medium text-indigo-600 hover:text-indigo-500"
            >
              {t('_Go back home')}
              {/* eslint-disable-next-line i18next/no-literal-string */}
              <span aria-hidden="true"> &rarr;</span>
            </Link>
          </div>
        </div>
      </LargeMainPage>
      <Header restRef={ref} offset={0} className="bg-white">
        {() => (
          <>
            <Logo />
          </>
        )}
      </Header>
    </Page>
  )
}

export default Help
