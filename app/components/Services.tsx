'use client'

import { useState } from 'react'
import Image from 'next/image'
import { siteConfig, Service } from '../lib/config'
import { useLanguage } from '../lib/LanguageContext'
import { serviceTranslations } from '../lib/i18n'
import ServiceModal from './ServiceModal'

export default function Services() {
  const [selectedService, setSelectedService] = useState<Service | null>(null)
  const { t, language, isRTL } = useLanguage()

  const openModal = (service: Service) => {
    setSelectedService(service)
  }

  const closeModal = () => {
    setSelectedService(null)
  }

  const scrollToContact = (serviceName: string) => {
    const selectElement = document.getElementById(
      'service-select'
    ) as HTMLSelectElement
    if (selectElement) {
      selectElement.value = serviceName
    }
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })
  }

  const getServiceTranslation = (serviceId: string) => {
    return serviceTranslations[language][serviceId] || null
  }

  return (
    <>
      <section
        id="services"
        className={`services-section ${isRTL ? 'rtl' : ''}`}
      >
        <div className="section-header">
          <h2>{t.services.title}</h2>
          <div className="divider"></div>
        </div>
        <div className="services-grid">
          {siteConfig.services.map((service) => {
            const translation = getServiceTranslation(service.id)
            const title = translation?.title || service.title
            const shortDesc = translation?.shortDesc || service.shortDesc

            return (
              <div key={service.id} className="service-card">
                <div className="service-media">
                  <Image
                    src={service.image}
                    alt={title}
                    width={500}
                    height={300}
                    style={{
                      objectFit: 'cover',
                      width: '100%',
                      height: '100%',
                    }}
                  />
                </div>
                <div className="service-content">
                  <h3>{title}</h3>
                  <p>{shortDesc}</p>
                  <div className="service-actions">
                    <button
                      className="link-btn"
                      onClick={() => openModal(service)}
                    >
                      {t.services.learnMore}
                    </button>
                    <button
                      className="btn btn-small"
                      onClick={() => scrollToContact(title)}
                    >
                      {t.services.inquire}
                    </button>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </section>

      {selectedService && (
        <ServiceModal
          service={selectedService}
          onClose={closeModal}
          onInquire={() => {
            const translation = getServiceTranslation(selectedService.id)
            scrollToContact(translation?.title || selectedService.title)
            closeModal()
          }}
        />
      )}
    </>
  )
}
