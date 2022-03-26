import { ColorModeScript } from '@chakra-ui/react'
import NextDocument, { Html, Head, Main, NextScript } from 'next/document'

export default class Document extends NextDocument {
  render() {
    return (
      <Html lang='en'>
        <Head>
          <link
            rel='apple-touch-icon'
            sizes='180x180'
            href='/images/apple-touch-icon.png'
          />
          <link
            rel='icon'
            type='image/png'
            sizes='32x32'
            href='/images/favicon-32x32.png'
          />
          <link
            rel='icon'
            type='image/png'
            sizes='16x16'
            href='/images/favicon-16x16.png'
          />
          <link rel='manifest' href='/images/site.webmanifest' />
          <link
            rel='mask-icon'
            href='/images/safari-pinned-tab.svg'
            color='#5bbad5'
          />
          <link rel='shortcut icon' href='/images/favicon.ico' />
          <meta name='msapplication-TileColor' content='#da532c' />
          <meta
            name='msapplication-config'
            content='/images/browserconfig.xml'
          />
          <meta name='theme-color' content='#ffffff' />
          <script
            async
            src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS}`}
          />
          <script
            dangerouslySetInnerHTML={{
              __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS}', {
              page_path: window.location.pathname,
            });
          `,
            }}
          />
        </Head>
        <body>
          <ColorModeScript />
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}
