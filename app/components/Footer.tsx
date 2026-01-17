'use client'

import { siteConfig } from '../lib/config'
import { useLanguage } from '../lib/LanguageContext'

export default function Footer() {
  const { t, isRTL } = useLanguage()
  const currentYear = new Date().getFullYear()

  return (
    <footer className={`site-footer ${isRTL ? 'rtl' : ''}`}>
      <p>
        &copy; {currentYear} {siteConfig.company.name}. {t.footer.copyright}
      </p>
    </footer>
  )
}
