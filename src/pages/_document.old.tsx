import Document, {
  DocumentContext,
  Html,
  Head,
  Main,
  NextScript,
} from 'next/document'
import { GetServerSideProps } from 'next'
import { serverSideTranslations } from 'react-i18next/serverSideTranslations'

import { getClosestLocale } from '@/utils/services/locales'

import i18nextConfig from '../../react-i18next.config'

// https://daily-dev-tips.com/posts/nextjs-add-lang-attribute-to-html-tag/
// https://stackoverflow.com/questions/61310847/how-to-set-html-lang-attribute-dynamically-on-nextjs-document
class MyDocument extends Document {
  static async getInitialProps(ctx: DocumentContext) {
    const initialProps = await Document.getInitialProps(ctx)

    return {
      ...initialProps,
      locale: getClosestLocale(ctx.req, ctx.defaultLocale),
    }
  }

  render() {
    const currentLocale = this.props.__NEXT_DATA__.locale ?? this.props.locale

    console.log('this.props', this.props.locale)

    return (
      <Html lang={currentLocale}>
        <Head />
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

export default MyDocument
