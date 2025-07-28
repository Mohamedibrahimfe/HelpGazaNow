import React, { useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import LandingPage from './components/LandingPage'
import FamilyRegistration from './components/FamilyRegistration'
import FamilyDirectory from './components/FamilyDirectory'
import LanguageSwitcher from './components/LanguageSwitcher'
import './i18n'

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
    <Router>
      <div className="min-h-screen">
        <LanguageSwitcher />
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/register" element={<FamilyRegistration />} />
          <Route path="/browse" element={<FamilyDirectory />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App