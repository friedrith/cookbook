import { useTranslation, Trans } from 'react-i18next'
import { useLocation } from 'react-router-dom'
import { useEffect, useRef, Suspense } from 'react'
import { Disclosure } from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/24/outline'
import classNames from 'classnames'
import { Link } from 'react-router-dom'

import Page from 'components/templates/Page'
import Logo from 'components/atoms/Logo'
import LargeMainPage from 'components/templates/LargeMainPage'
import Header from 'components/atoms/Header'
import { useAppSelector } from 'hooks/redux'
import { getOfficialWebsites } from 'store/officialWebsites'

const WebsiteList = () => {
  const officialWebsites = useAppSelector(getOfficialWebsites)

  const { t } = useTranslation('faq', { keyPrefix: 'website-list' })

  return (
    <>
      {t(
        'CookBook officially support recipe import from the following websites'
      )}
      <ul className="list-disc ml-10 my-1">
        {officialWebsites.map((w: string) => (
          <li key={w}>
            <a
              className="text-indigo-600 hover:text-indigo-500"
              href={`https://${w}`}
              target="_blank"
              rel="noreferrer"
            >
              {w}
            </a>
          </li>
        ))}
      </ul>
      {t(
        'However import from other websites containing recipes might work too. If your recipe was not imported successfully, let us know by write a '
      )}
      <a
        className="text-indigo-600 hover:text-indigo-500"
        href="https://github.com/friedrith/cookbook/issues/new?assignees=&labels=issue%3A+proposal%2C+needs+triage&template=proposal.md"
        target="_blank"
        rel="noreferrer"
      >
        {t('proposal')}
      </a>
      {t(' or contact us at ')}
      <a
        className="text-indigo-600 hover:text-indigo-500"
        href="mailto:thibault.friedrich@gmail.com"
        target="_blank"
        rel="noreferrer"
        // eslint-disable-next-line i18next/no-literal-string
      >
        thibault.friedrich@gmail.com
      </a>
    </>
  )
}

const faqs = [
  'why-magic-link',
  'why-not-proposing',
  {
    id: 'website-list',
    component: WebsiteList,
  },
]

const Help = () => {
  const { t } = useTranslation(['default', 'faq'])

  const ref = useRef<HTMLInputElement>(null)

  const { hash } = useLocation()

  const questionId = hash.slice(1)

  useEffect(() => {
    const questionElement = document.getElementById(questionId)
    if (questionElement) {
      console.log('scroll', questionElement.offsetTop, questionId)
      questionElement.scrollIntoView()
    }
  }, [questionId])

  return (
    <Page title={t('faq.shortTitle')}>
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
              {t('faq.title')}
            </h2>
            <dl className="mt-6 space-y-6 divide-y divide-gray-200">
              {faqs
                .map(question =>
                  typeof question === 'string'
                    ? { id: question, component: null }
                    : question
                )
                .map(question => (
                  <Disclosure
                    as="div"
                    key={question.id}
                    className="pt-6"
                    defaultOpen={questionId === question.id}
                  >
                    {({ open }) => (
                      <>
                        <dt className="text-lg" id={question.id}>
                          <Disclosure.Button className="flex w-full items-start justify-between text-left text-gray-400">
                            <span className="font-medium text-gray-900">
                              <Trans
                                i18nKey={`${question.id}._question`}
                                ns="faq"
                              />
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
                          <div className="text-base text-gray-500">
                            {question.component ? (
                              <Suspense>
                                <question.component />
                              </Suspense>
                            ) : (
                              <Trans
                                i18nKey={`${question.id}._answer`}
                                ns="faq"
                              />
                            )}
                          </div>
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
