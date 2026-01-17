'use client'

import Link from 'next/link'
import { siteConfig } from '../lib/config'
import { useLanguage } from '../lib/LanguageContext'

export default function Hero() {
  const { t, isRTL } = useLanguage()

  return (
    <section
      id="hero"
      className={`hero ${isRTL ? 'rtl' : ''}`}
      style={{ backgroundImage: `url('${siteConfig.company.heroImage}')` }}
    >
      <div className="hero-overlay"></div>
      <div className="hero-content">
        <h1 className="hero-title">
          {t.hero.title}
          <span className="accent-text"> {t.hero.sourcingPartner}</span>
          <br />
          <span className="hero-subtitle">{t.hero.subtitle}</span>
        </h1>
        <Link href="#services" className="btn btn-primary">
          {t.hero.cta}
        </Link>
      </div>
    </section>
  )
}
