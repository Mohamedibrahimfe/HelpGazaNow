
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

class ErrorBoundary extends Component<{ children: ReactNode }, { hasError: boolean }> {
  constructor(props: { children: ReactNode }) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError() {
    return { hasError: true }
  }

  componentDidCatch(error: any, info: any) {
    // You can log error to an error reporting service here
    console.error('ErrorBoundary caught an error', error, info)
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="flex flex-col items-center justify-center min-h-screen text-red-600">
          <h1 className="text-2xl font-bold mb-4">Something went wrong.</h1>
          <p>Please refresh the page or contact support.</p>
        </div>
      )
    }
    return this.props.children
  }
}

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
      <ErrorBoundary>
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

          {/* Google Tag Manager */}
          <script>
            {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','GTM-XXXXXXX');`}
          </script>

          {/* Google Analytics */}
          <script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
          <script>
            {`window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-XXXXXXXXXX');`}
          </script>
        </Helmet>
        <Router>
          <div className="min-h-screen">
            <LanguageSwitcher />
            <Routes>
              <Route path="/" element={<LandingPage />} />
              <Route path="/register" element={<FamilyRegistration />} />
              <Route path="/browse" element={<FamilyDirectory />} />
              <Route path="*" element={<LandingPage />} />
            </Routes>
          </div>
        </Router>
      </ErrorBoundary>
    </HelmetProvider>
  )
}

export default App