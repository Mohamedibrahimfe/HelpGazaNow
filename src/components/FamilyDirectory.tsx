import React, { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import { ArrowLeft, Search, Users, Shield, Phone, Eye, EyeOff } from 'lucide-react'
import { supabase, Family } from '../lib/supabase'

export default function FamilyDirectory() {
  const { t, i18n } = useTranslation()
  const isArabic = i18n.language === 'ar'
  const [families, setFamilies] = useState<Family[]>([])
  const [filteredFamilies, setFilteredFamilies] = useState<Family[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [revealedContacts, setRevealedContacts] = useState<Set<string>>(new Set())

  useEffect(() => {
    fetchFamilies()
  }, [])

  useEffect(() => {
    const filtered = families.filter(family =>
      family.full_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      family.city.toLowerCase().includes(searchTerm.toLowerCase())
    )
    setFilteredFamilies(filtered)
  }, [families, searchTerm])

  const fetchFamilies = async () => {
    try {
      const { data, error } = await supabase
        .from('families')
        .select('*')
        .order('created_at', { ascending: false })

      if (error) throw error
      setFamilies(data || [])
    } catch (error) {
      console.error('Error fetching families:', error)
    } finally {
      setLoading(false)
    }
  }

  const toggleContactReveal = (familyId: string) => {
    const newRevealed = new Set(revealedContacts)
    if (newRevealed.has(familyId)) {
      newRevealed.delete(familyId)
    } else {
      newRevealed.add(familyId)
    }
    setRevealedContacts(newRevealed)
  }

  const formatPaymentMethods = (methods: string[]) => {
    return methods.map(method => t(method)).join(', ')
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-blue-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-4 border-emerald-600 border-t-transparent mx-auto mb-4"></div>
          <p className="text-gray-600">{t('loading')}</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-blue-50 py-8">
      <div className="container mx-auto px-4 max-w-6xl">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-4 mb-6">
            <Link to="/" className="bg-white hover:bg-gray-50 p-3 rounded-xl shadow-lg transition-colors">
              <ArrowLeft className={`w-6 h-6 text-gray-700 ${isArabic ? 'rotate-180' : ''}`} />
            </Link>
            <h1 className="text-3xl font-bold text-gray-900">{t('familyDirectory')}</h1>
          </div>

          {/* Search */}
          <div className="relative">
            <Search className={`absolute top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 ${isArabic ? 'right-4' : 'left-4'}`} />
            <input
              type="text"
              placeholder={t('searchFamilies')}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className={`w-full bg-white shadow-lg rounded-xl py-4 border border-gray-200 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors ${
                isArabic ? 'pr-12 pl-4' : 'pl-12 pr-4'
              }`}
            />
          </div>
        </div>

        {/* Families Grid */}
        {filteredFamilies.length === 0 ? (
          <div className="text-center py-16">
            <Users className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <p className="text-xl text-gray-600">
              {searchTerm 
                ? (isArabic ? 'لم يتم العثور على عائلات' : 'No families found')
                : (isArabic ? 'لا توجد عائلات مسجلة بعد' : 'No families registered yet')
              }
            </p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredFamilies.map((family) => (
              <div key={family.id} className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden">
                <div className="p-6">
                  {/* Header with verification badge */}
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-gray-900 mb-1">
                        {family.full_name}
                      </h3>
                      <p className="text-gray-600 flex items-center gap-2">
                        <span>📍 {family.city}</span>
                        {family.verified && (
                          <span className="inline-flex items-center gap-1 bg-emerald-100 text-emerald-800 text-xs px-2 py-1 rounded-full">
                            <Shield className="w-3 h-3" />
                            {t('verified')}
                          </span>
                        )}
                      </p>
                    </div>
                  </div>

                  {/* Family Size */}
                  <div className="mb-4">
                    <div className="flex items-center gap-2 text-gray-700">
                      <Users className="w-4 h-4" />
                      <span>{family.family_size} {t('familyMembers')}</span>
                    </div>
                  </div>

                  {/* Payment Methods */}
                  <div className="mb-6">
                    <p className="text-sm text-gray-600 mb-2">{t('acceptedPayments')}:</p>
                    <div className="flex flex-wrap gap-1">
                      {family.payment_methods.map((method) => (
                        <span key={method} className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">
                          {t(method)}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Contact Button */}
                  <button
                    onClick={() => toggleContactReveal(family.id)}
                    className="w-full bg-emerald-600 hover:bg-emerald-700 text-white py-3 rounded-xl font-semibold transition-colors flex items-center justify-center gap-2"
                  >
                    {revealedContacts.has(family.id) ? (
                      <>
                        <EyeOff className="w-4 h-4" />
                        {t('hideContact')}
                      </>
                    ) : (
                      <>
                        <Eye className="w-4 h-4" />
                        {t('helpThisFamily')}
                      </>
                    )}
                  </button>

                  {/* Contact Info (revealed) */}
                  {revealedContacts.has(family.id) && (
                    <div className="mt-4 p-4 bg-emerald-50 rounded-xl border border-emerald-200">
                      <p className="text-sm text-emerald-800 font-medium mb-2">
                        {t('contactInfo')}:
                      </p>
                      <div className="flex items-center gap-2 text-emerald-900">
                        <Phone className="w-4 h-4" />
                        <a 
                          href={`tel:${family.contact}`}
                          className="hover:underline font-mono"
                        >
                          {family.contact}
                        </a>
                      </div>
                      <div className="mt-2">
                        <a
                          href={`https://wa.me/${family.contact.replace(/\D/g, '')}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 bg-emerald-600 text-white px-3 py-2 rounded-lg text-sm hover:bg-emerald-700 transition-colors"
                        >
                          💬 WhatsApp
                        </a>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}