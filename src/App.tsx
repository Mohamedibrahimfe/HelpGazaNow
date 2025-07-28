
import React, { useEffect } from 'react'
import { Component, ReactNode } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { Helmet, HelmetProvider } from 'react-helmet-async'

import LandingPage from './components/LandingPage'
import FamilyRegistration from './components/FamilyRegistration'
import FamilyDirectory from './components/FamilyDirectory'
import LanguageSwitcher from './components/LanguageSwitcher'
import './i18n'
import NotFound from './components/NotFound'
import ErrorBoundary from './components/ErrorBoundry'


function App() {
  const { i18n } = useTranslation()

  useEffect(() => {
    // Set initial direction and language
    document.dir = i18n.language === 'ar' ? 'rtl' : 'ltr'
    document.documentElement.lang = i18n.language

    // Update on language change
    const handleLanguageChange = (lng: string) => {
      document.dir = lng === 'ar' ? 'rtl' : 'ltr'
      document.documentElement.lang = lng
    }

    i18n.on('languageChanged', handleLanguageChange)
    return () => {
      i18n.off('languageChanged', handleLanguageChange)
    }
  }, [i18n])

  return (
    <HelmetProvider>
      <ErrorBoundary >
        <Helmet>
          <title>Help Gaza Now</title>
          <meta name="description" content="Support families in Gaza by registering and browsing the family directory. Help Gaza Now is a humanitarian platform for aid and connection." />
          <meta name="keywords" content="Gaza, Help, Humanitarian, Aid, Family, Directory, Registration" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <meta charSet="utf-8" />
          <meta property="og:title" content="Help Gaza Now" />
          <meta property="og:description" content="Support families in Gaza by registering and browsing the family directory." />
          <meta property="og:type" content="website" />
          <meta property="og:url" content="https://helpgazanow.com" />
          <meta property="og:image" content="/og-image.png" />
          <meta name="twitter:card" content="summary_large_image" />
          <meta name="twitter:title" content="Help Gaza Now" />
          <meta name="twitter:description" content="Support families in Gaza by registering and browsing the family directory." />
          <meta name="twitter:image" content="/og-image.png" />

          
        </Helmet>
        <Router>
          <div className="min-h-screen">
            <LanguageSwitcher />
            <Routes>
              <Route path="/" element={<LandingPage />} />
              <Route path="/register" element={<FamilyRegistration />} />
              <Route path="/browse" element={<FamilyDirectory />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </div>
        </Router>
      </ErrorBoundary>
    </HelmetProvider>
  )
}

export default App