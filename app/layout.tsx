import type { Metadata } from 'next'
import { Inter, Oswald, Noto_Sans_Arabic } from 'next/font/google'
import Script from 'next/script'
import './globals.css'
import { LanguageProvider } from './lib/LanguageContext'

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
})

const oswald = Oswald({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-oswald',
})

const notoSansArabic = Noto_Sans_Arabic({
  subsets: ['arabic'],
  display: 'swap',
  variable: '--font-arabic',
})

export const metadata: Metadata = {
  title: 'Kugan Tech Works - Precision Engineering & Sourcing',
  description:
    'KuganTech is your trusted sourcing partner. We design your custom roadmap to Global sourcing and engineering solutions. Expert services in Product Design, Engineering Analysis, and Manufacturing.',
  keywords: [
    'engineering',
    'manufacturing',
    'sourcing',
    'product design',
    'CFD',
    'FEA',
    'automotive engineering',
    'electronics design',
  ],
  authors: [{ name: 'Kugan Tech Works' }],
  openGraph: {
    title: 'Kugan Tech Works - Precision Engineering & Sourcing',
    description:
      'Your trusted sourcing partner for global engineering solutions',
    type: 'website',
    locale: 'en_US',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${oswald.variable} ${notoSansArabic.variable}`}
    >
      <head>
        {/* Font Awesome for icons */}
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css"
          crossOrigin="anonymous"
        />
      </head>
      <body>
        <LanguageProvider>{children}</LanguageProvider>
      </body>
    </html>
  )
}
