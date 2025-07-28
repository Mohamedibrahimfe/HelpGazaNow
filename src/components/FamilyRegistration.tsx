import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'
import { ArrowLeft, Upload, CheckCircle } from 'lucide-react'
import { supabase } from '../lib/supabase'

interface FormData {
  fullName: string
  city: string
  familySize: number
  paymentMethods: string[]
  contact: string
}

const paymentOptions = [
  'paypal', 'zainCash', 'binance', 'westernUnion', 'moneygram', 'bankTransfer','vodafone cash'
]

export default function FamilyRegistration() {
  const { t, i18n } = useTranslation()
  const navigate = useNavigate()
  const isArabic = i18n.language === 'ar'
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitSuccess, setSubmitSuccess] = useState(false)

  const { register, handleSubmit, watch, formState: { errors } } = useForm<FormData>()

  const selectedPaymentMethods = watch('paymentMethods', [])

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true)
    try {
      // Insert family record (with or without proof image)
      const { error } = await supabase
        .from('families')
        .insert([
          {
            full_name: data.fullName,
            city: data.city,
            family_size: data.familySize,
            payment_methods: data.paymentMethods,
            contact: data.contact,
            verified: false,
            contact_revealed: false
          }
        ])

      if (error) throw error

      setSubmitSuccess(true)
      setTimeout(() => {
        navigate('/')
      }, 2000)
    } catch (error) {
      console.error('Error submitting registration:', error)
      const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred'
      alert(isArabic 
        ? `حدث خطأ أثناء التسجيل: ${errorMessage}` 
        : `Registration error: ${errorMessage}`)
    } finally {
      setIsSubmitting(false)
    }
  }

  if (submitSuccess) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-blue-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md w-full text-center">
          <CheckCircle className="w-16 h-16 text-emerald-600 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-2">{t('success')}</h2>
          <p className="text-gray-600 mb-4">
            {isArabic 
              ? 'تم تسجيل عائلتك بنجاح. سيتم مراجعة طلبك قريباً.'
              : 'Your family has been registered successfully. Your request will be reviewed soon.'
            }
          </p>
          <Link
            to="/"
            className="inline-block bg-emerald-600 text-white px-6 py-2 rounded-lg hover:bg-emerald-700 transition-colors"
          >
            {t('backToHome')}
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-blue-50 py-8">
      <div className="container mx-auto px-4 max-w-2xl">
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          {/* Header */}
          <div className="bg-emerald-600 text-white p-6">
            <div className="flex items-center gap-4">
              <Link to="/" className="hover:bg-emerald-700 p-2 rounded-lg transition-colors">
                <ArrowLeft className={`w-6 h-6 ${isArabic ? 'rotate-180' : ''}`} />
              </Link>
              <h1 className="text-2xl font-bold">{t('familyRegistration')}</h1>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit(onSubmit)} className="p-6 space-y-6">
            {/* Full Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {t('fullName')} *
              </label>
              <input
                {...register('fullName', { required: t('required') })}
                type="text"
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors"
                placeholder={t('fullName')}
              />
              {errors.fullName && (
                <p className="text-red-600 text-sm mt-1">{errors.fullName.message}</p>
              )}
            </div>

            {/* City */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {t('city')} *
              </label>
              <input
                {...register('city', { required: t('required') })}
                type="text"
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors"
                placeholder={t('city')}
              />
              {errors.city && (
                <p className="text-red-600 text-sm mt-1">{errors.city.message}</p>
              )}
            </div>

            {/* Family Size */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {t('familySize')} *
              </label>
              <input
                {...register('familySize', { 
                  required: t('required'),
                  min: { value: 1, message: 'Minimum 1 family member' }
                })}
                type="number"
                min="1"
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors"
                placeholder="5"
              />
              {errors.familySize && (
                <p className="text-red-600 text-sm mt-1">{errors.familySize.message}</p>
              )}
            </div>

            {/* Payment Methods */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                {t('paymentMethods')} *
              </label>
              <div className="grid grid-cols-2 gap-3">
                {paymentOptions.map((method) => (
                  <label key={method} className="flex items-center space-x-3 p-3 border border-gray-200 rounded-xl hover:bg-gray-50 cursor-pointer transition-colors">
                    <input
                      {...register('paymentMethods', { required: 'Select at least one payment method' })}
                      type="checkbox"
                      value={method}
                      className="w-4 h-4 text-emerald-600 border-gray-300 rounded focus:ring-emerald-500"
                    />
                    <span className="text-sm text-gray-700">{t(method)}</span>
                  </label>
                ))}
              </div>
              {errors.paymentMethods && (
                <p className="text-red-600 text-sm mt-1">{errors.paymentMethods.message}</p>
              )}
            </div>

            {/* Contact */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {t('contact')} *
              </label>
              <input
                {...register('contact', { required: t('required') })}
                type="text"
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors"
                placeholder="+970123456789"
              />
              {errors.contact && (
                <p className="text-red-600 text-sm mt-1">{errors.contact.message}</p>
              )}
            </div>

          

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-emerald-600 hover:bg-emerald-700 disabled:bg-gray-400 text-white py-4 rounded-xl text-lg font-semibold transition-colors"
            >
              {isSubmitting ? t('submitting') : t('submit')}
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}