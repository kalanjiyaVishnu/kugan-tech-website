'use client'

import { useState, FormEvent } from 'react'
import { siteConfig } from '../lib/config'
import { useLanguage } from '../lib/LanguageContext'
import { serviceTranslations } from '../lib/i18n'

export default function Contact() {
  const { t, language, isRTL } = useLanguage()

  const [formState, setFormState] = useState({
    name: '',
    email: '',
    service: language === 'ar' ? 'استفسار عام' : 'General Inquiry',
    message: '',
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<{
    type: 'success' | 'error' | null
    message: string
  }>({ type: null, message: '' })

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitStatus({ type: null, message: '' })

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formState,
          language, // Send current language for auto-reply
        }),
      })

      const data = await response.json()

      if (response.ok) {
        setSubmitStatus({
          type: 'success',
          message: t.contact.successMessage,
        })
        setFormState({
          name: '',
          email: '',
          service: language === 'ar' ? 'استفسار عام' : 'General Inquiry',
          message: '',
        })
      } else {
        throw new Error(data.error || 'Failed to send message')
      }
    } catch (error) {
      console.error('Error:', error)
      // Fallback to mailto
      setSubmitStatus({
        type: 'error',
        message: t.contact.errorMessage,
      })

      setTimeout(() => {
        triggerMailto()
      }, 1000)
    } finally {
      setIsSubmitting(false)
    }
  }

  const triggerMailto = () => {
    const subject = `Inquiry: ${formState.service} - KuganTech Website`
    const body = `Dear Team,

I am interested in your services regarding ${formState.service}.

Here are my details:
Name: ${formState.name}
Email: ${formState.email}
Service Interest: ${formState.service}

Message:
${formState.message}

Looking forward to hearing from you.

Best regards,
${formState.name}`

    const mailtoLink = `mailto:${siteConfig.contact.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
    window.location.href = mailtoLink
  }

  const handleServiceChange = (serviceName: string) => {
    const generalInquiry = language === 'ar' ? 'استفسار عام' : 'General Inquiry'
    setFormState((prev) => ({
      ...prev,
      service: serviceName,
      message:
        serviceName && serviceName !== generalInquiry
          ? language === 'ar'
            ? `استفسار حول: ${serviceName}\n\nيرجى مشاركة التفاصيل...`
            : `Inquiry about: ${serviceName}\n\nPlease share details...`
          : '',
    }))
  }

  const getServiceTitle = (serviceId: string) => {
    const translation = serviceTranslations[language][serviceId]
    return (
      translation?.title ||
      siteConfig.services.find((s) => s.id === serviceId)?.title ||
      ''
    )
  }

  return (
    <section id="contact" className={`contact-section ${isRTL ? 'rtl' : ''}`}>
      <div className="section-header">
        <h2>{t.contact.title}</h2>
        <div className="divider"></div>
      </div>
      <div className="contact-container">
        <div className="contact-info">
          <div className="contact-item">
            <i className="fas fa-phone"></i>
            <div>
              <strong>{t.contact.phone}</strong>
              <br />
              <a href={`tel:${siteConfig.contact.phone.replace(/\s+/g, '')}`}>
                {siteConfig.contact.phone}
              </a>
            </div>
          </div>
          <div className="contact-item">
            <i className="fas fa-envelope"></i>
            <div>
              <strong>{t.contact.email}</strong>
              <br />
              <a href={`mailto:${siteConfig.contact.email}`}>
                {siteConfig.contact.email}
              </a>
            </div>
          </div>
        </div>

        <div className="contact-form-wrapper">
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="name">{t.contact.name}</label>
              <input
                type="text"
                id="name"
                name="name"
                className="form-control"
                required
                placeholder={t.contact.yourName}
                value={formState.name}
                onChange={(e) =>
                  setFormState((prev) => ({ ...prev, name: e.target.value }))
                }
              />
            </div>
            <div className="form-group">
              <label htmlFor="email">{t.contact.email}</label>
              <input
                type="email"
                id="email"
                name="email"
                className="form-control"
                required
                placeholder={t.contact.yourEmail}
                value={formState.email}
                onChange={(e) =>
                  setFormState((prev) => ({ ...prev, email: e.target.value }))
                }
              />
            </div>
            <div className="form-group">
              <label htmlFor="service-select">
                {t.contact.serviceInterest}
              </label>
              <select
                id="service-select"
                name="service"
                className="form-control"
                value={formState.service}
                onChange={(e) => handleServiceChange(e.target.value)}
              >
                <option
                  value={language === 'ar' ? 'استفسار عام' : 'General Inquiry'}
                >
                  {t.contact.generalInquiry}
                </option>
                {siteConfig.services.map((service) => (
                  <option key={service.id} value={getServiceTitle(service.id)}>
                    {getServiceTitle(service.id)}
                  </option>
                ))}
              </select>
            </div>
            <div className="form-group">
              <label htmlFor="message">{t.contact.message}</label>
              <textarea
                id="message"
                name="message"
                className="form-control"
                rows={5}
                placeholder={t.contact.messagePlaceholder}
                value={formState.message}
                onChange={(e) =>
                  setFormState((prev) => ({ ...prev, message: e.target.value }))
                }
              ></textarea>
            </div>

            {submitStatus.type && (
              <div className={`form-message ${submitStatus.type}`}>
                {submitStatus.message}
              </div>
            )}

            <button
              type="submit"
              className="submit-btn"
              disabled={isSubmitting}
            >
              {isSubmitting ? t.contact.sending : t.contact.sendMessage}
            </button>
          </form>
        </div>
      </div>
    </section>
  )
}
