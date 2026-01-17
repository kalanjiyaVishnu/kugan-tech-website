'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { siteConfig } from '../lib/config'
import { useLanguage } from '../lib/LanguageContext'
import { Language } from '../lib/i18n'

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isDarkMode, setIsDarkMode] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const { language, setLanguage, t, isRTL } = useLanguage()

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    // Check for saved theme preference
    const savedTheme = localStorage.getItem('theme')
    if (savedTheme === 'dark') {
      setIsDarkMode(true)
      document.body.classList.add('dark-mode')
    }
  }, [])

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode)
    if (!isDarkMode) {
      document.body.classList.add('dark-mode')
      localStorage.setItem('theme', 'dark')
    } else {
      document.body.classList.remove('dark-mode')
      localStorage.setItem('theme', 'light')
    }
  }

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  const closeMenu = () => {
    setIsMenuOpen(false)
  }

  const toggleLanguage = () => {
    const newLang: Language = language === 'en' ? 'ar' : 'en'
    setLanguage(newLang)
  }

  return (
    <header className={`site-header ${isScrolled ? 'scrolled' : ''}`}>
      <div className="header-inner">
        <Link href="/" className="logo">
          <i className={siteConfig.company.icon}></i>
          <span>{siteConfig.company.name}</span>
        </Link>

        <button
          className="mobile-menu-btn"
          onClick={toggleMenu}
          aria-label="Toggle menu"
          aria-expanded={isMenuOpen}
        >
          <i className={isMenuOpen ? 'fas fa-times' : 'fas fa-bars'}></i>
        </button>

        <nav className={`main-nav ${isMenuOpen ? 'active' : ''}`}>
          <ul>
            <li>
              <Link href="#about" onClick={closeMenu}>
                {t.nav.about}
              </Link>
            </li>
            <li>
              <Link href="#services" onClick={closeMenu}>
                {t.nav.services}
              </Link>
            </li>
            <li>
              <Link href="#contact" onClick={closeMenu}>
                {t.nav.contact}
              </Link>
            </li>
            <li>
              <button
                className="lang-toggle"
                onClick={toggleLanguage}
                title={
                  language === 'en'
                    ? 'Switch to Arabic'
                    : 'التبديل إلى الإنجليزية'
                }
                aria-label="Toggle language"
              >
                <i className="fas fa-globe"></i>
                <span className="lang-text">
                  {language === 'en' ? 'AR' : 'EN'}
                </span>
              </button>
            </li>
            <li>
              <button
                className="theme-toggle"
                onClick={toggleTheme}
                title="Toggle Dark Mode"
                aria-label="Toggle dark mode"
              >
                <i className={isDarkMode ? 'fas fa-sun' : 'fas fa-moon'}></i>
              </button>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  )
}
