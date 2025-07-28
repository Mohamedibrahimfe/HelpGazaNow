import React from 'react'
import { useTranslation } from 'react-i18next'

export default function LanguageSwitcher() {
  const { i18n } = useTranslation()

  const toggleLanguage = () => {
    const newLang = i18n.language === 'en' ? 'ar' : 'en'
    i18n.changeLanguage(newLang)
    document.dir = newLang === 'ar' ? 'rtl' : 'ltr'
    document.documentElement.lang = newLang
  }

  return (
    <button
      onClick={toggleLanguage}
      className="fixed top-4 right-4 z-50 bg-white shadow-lg rounded-full p-3 hover:shadow-xl transition-all duration-300 border border-gray-200"
      aria-label="Switch Language"
    >
      <div className="flex items-center space-x-2">
        <span className="text-sm font-medium text-gray-700">
          {i18n.language === 'en' ? 'العربية' : 'English'}
        </span>
        <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
      </div>
    </button>
  )
}