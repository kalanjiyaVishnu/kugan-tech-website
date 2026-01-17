'use client'

import { useEffect, useCallback } from 'react'
import { Service } from '../lib/config'
import { useLanguage } from '../lib/LanguageContext'
import { serviceTranslations } from '../lib/i18n'

interface ServiceModalProps {
  service: Service
  onClose: () => void
  onInquire: () => void
}

export default function ServiceModal({
  service,
  onClose,
  onInquire,
}: ServiceModalProps) {
  const { t, language, isRTL } = useLanguage()
  const translation = serviceTranslations[language][service.id]

  const title = translation?.title || service.title
  const fullDesc = translation?.fullDesc || service.fullDesc
  const experienceText = translation?.experienceText || service.experienceText

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose()
      }
    },
    [onClose]
  )

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown)
    document.body.style.overflow = 'hidden'

    return () => {
      document.removeEventListener('keydown', handleKeyDown)
      document.body.style.overflow = ''
    }
  }, [handleKeyDown])

  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose()
    }
  }

  return (
    <div
      className={`modal ${isRTL ? 'rtl' : ''}`}
      onClick={handleBackdropClick}
    >
      <div className="modal-content">
        <button
          className="close-modal"
          onClick={onClose}
          aria-label={t.common.close}
        >
          &times;
        </button>
        <h3>{title}</h3>
        <p className="modal-desc">{fullDesc}</p>
        {service.hasExperience && experienceText && (
          <div className="modal-experience">
            <h4>{t.services.pastExperience}</h4>
            <p>{experienceText}</p>
          </div>
        )}
        <button className="btn btn-primary" onClick={onInquire}>
          {t.services.requestQuote}
        </button>
      </div>
    </div>
  )
}
