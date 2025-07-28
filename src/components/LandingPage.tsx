import React from 'react'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import { Heart, Users, Shield, Globe } from 'lucide-react'

export default function LandingPage() {
  const { t, i18n } = useTranslation()
  const isArabic = i18n.language === 'ar'

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-blue-50">
      {/* Hero Section */}
      <div className="container mx-auto px-4 py-16">
        <div className="text-center max-w-4xl mx-auto">
          <div className="mb-8">
            <Heart className="w-16 h-16 mx-auto text-emerald-600 mb-4" />
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
              {t('title')}
            </h1>
            <p className="text-xl md:text-2xl text-gray-700 mb-4 leading-relaxed">
              {t('mission')}
            </p>
            <p className="text-lg text-gray-600 leading-relaxed">
              {t('description')}
            </p>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-16">
            <Link
              to="/register"
              className="w-full sm:w-auto bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-4 rounded-xl text-lg font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
            >
              {t('registerFamily')}
            </Link>
            <Link
              to="/browse"
              className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-xl text-lg font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
            >
              {t('browseDonate')}
            </Link>
          </div>

          {/* Features */}
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="text-center p-6 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300">
              <Users className="w-12 h-12 mx-auto text-emerald-600 mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                {isArabic ? 'اتصال مباشر' : 'Direct Connection'}
              </h3>
              <p className="text-gray-600">
                {isArabic 
                  ? 'ربط مباشر بين العائلات والمتبرعين بدون وسطاء'
                  : 'Direct connection between families and donors without intermediaries'
                }
              </p>
            </div>
            <div className="text-center p-6 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300">
              <Shield className="w-12 h-12 mx-auto text-blue-600 mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                {isArabic ? 'موثق وآمن' : 'Verified & Secure'}
              </h3>
              <p className="text-gray-600">
                {isArabic
                  ? 'عائلات موثقة ومنصة آمنة للتبرعات'
                  : 'Verified families and secure donation platform'
                }
              </p>
            </div>
            <div className="text-center p-6 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300">
              <Globe className="w-12 h-12 mx-auto text-amber-600 mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                {isArabic ? 'عالمي' : 'Global Reach'}
              </h3>
              <p className="text-gray-600">
                {isArabic
                  ? 'يربط المتبرعين من جميع أنحاء العالم'
                  : 'Connecting donors from around the world'
                }
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Emergency Banner */}
      <div className="bg-red-600 text-white py-4">
        <div className="container mx-auto px-4 text-center">
          <p className="text-lg font-semibold">
            {isArabic 
              ? '🚨 حالة طوارئ إنسانية - كل دقيقة مهمة'
              : '🚨 Humanitarian Emergency - Every Minute Counts'
            }
          </p>
        </div>
      </div>
    </div>
  )
}