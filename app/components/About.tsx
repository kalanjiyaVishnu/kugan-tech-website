'use client'

import { useLanguage } from '../lib/LanguageContext'

export default function About() {
  const { t, isRTL } = useLanguage()

  return (
    <section id="about" className={`about-section ${isRTL ? 'rtl' : ''}`}>
      <div className="section-header">
        <h2>{t.about.title}</h2>
        <div className="divider"></div>
      </div>
      <div className="about-content">
        <div className="about-text">
          <p>{t.about.description}</p>
          <div className="about-tagline">
            {t.about.taglinePrefix}
            <span className="accent-text">{t.about.taglineSuffix}</span>
          </div>
        </div>
      </div>
    </section>
  )
}
