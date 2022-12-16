/* eslint-disable i18next/no-literal-string */
import { useTranslation, Trans } from 'react-i18next'

import Container from 'components/atoms/Container'
import ImportHelpPopup from 'components/organisms/ImportHelpPopup'
import usePopup from 'hooks/usePopup'

const faqs = [
  [
    {
      question: 'email-not-visible._question',
      answer: 'email-not-visible._answer',
    },
    {
      question: 'website-list._question',
      answer: 'website-list._answer',
    },
  ],
  [
    {
      question: 'why-magic-link._question',
      answer: 'why-magic-link._answer',
    },
    {
      question: 'website-not-working._question',
      answer: 'website-not-working._answer',
    },
  ],
  [
    {
      question: 'why-not-proposing._question',
      answer: 'why-not-proposing._answer',
    },
  ],
]

const Faqs = () => {
  const { t } = useTranslation('faq')

  const importHelpPopup = usePopup()

  const Link = ({ children }: { children: React.ReactNode }) => (
    <button
      onClick={importHelpPopup.open}
      className="text-indigo-600 hover:text-primary-500 cursor-pointer"
    >
      {children}
    </button>
  )

  return (
    <section
      id="faqs"
      aria-labelledby="faqs-title"
      className="border-t border-gray-200 py-20 sm:py-32"
    >
      <Container>
        <div className="mx-auto max-w-2xl lg:mx-0">
          <h2
            id="faqs-title"
            className="text-3xl font-medium tracking-tight text-gray-900"
          >
            {t('Frequently asked questions')}
          </h2>
          <p className="mt-2 text-lg text-gray-600">
            {t('If you have anything else you want to ask,')}
            <a
              href="mailto:thibault.friedrich@gmail.com"
              className="text-gray-900 underline"
            >
              {t('reach out to us')}
            </a>
            .
          </p>
        </div>
        <ul className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-8 sm:mt-20 lg:max-w-none lg:grid-cols-3">
          {faqs.map((column, columnIndex) => (
            <li key={columnIndex}>
              <ul className="space-y-10">
                {column.map((faq, faqIndex) => (
                  <li key={faqIndex}>
                    <h3 className="text-lg font-semibold leading-6 text-gray-900">
                      {t(faq.question)}
                    </h3>

                    <p className="mt-4 text-sm text-gray-700">
                      <Trans
                        i18nKey={t(faq.answer)}
                        components={{ Link: <Link /> }}
                      />
                    </p>
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      </Container>
      <ImportHelpPopup
        open={importHelpPopup.isOpen}
        onClose={importHelpPopup.close}
      />
    </section>
  )
}

export default Faqs
