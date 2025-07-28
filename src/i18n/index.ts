import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'

const resources = {
  en: {
    translation: {
      // Landing Page
      title: "HelpGazaNow",
      mission: "Connecting Gaza families in need with Muslim donors worldwide through transparent, direct support",
      description: "Our mission is to provide immediate humanitarian aid to families in Gaza during these critical times. We connect verified families directly with generous donors to ensure fast, transparent, and effective support.",
      registerFamily: "📤 Register as a Family",
      browseDonate: "💚 Browse & Donate",
      
      // Family Registration
      familyRegistration: "Family Registration",
      fullName: "Full Name",
      city: "City",
      familySize: "Family Size",
      paymentMethods: "Payment Methods (Select all that apply)",
      contact: "Phone/WhatsApp Contact",
      proofUpload: "Upload Proof (Optional)",
      submit: "Submit Registration",
      submitting: "Submitting...",
      
      // Payment Methods
      paypal: "PayPal",
      zainCash: "ZainCash",
      binance: "Binance",
      westernUnion: "Western Union",
      moneygram: "MoneyGram",
      bankTransfer: "Bank Transfer",
      
      // Family Directory
      familyDirectory: "Family Directory",
      searchFamilies: "Search families by name or city...",
      helpThisFamily: "Help This Family",
      hideContact: "Hide Contact",
      verified: "Verified",
      familyMembers: "family members",
      acceptedPayments: "Accepted Payment Methods",
      contactInfo: "Contact Information",
      backToHome: "← Back to Home",
      
      // Common
      loading: "Loading...",
      error: "Error occurred",
      success: "Success!",
      cancel: "Cancel",
      
      // Form Validation
      required: "This field is required",
      minLength: "Minimum length is {{min}} characters",
      invalidEmail: "Invalid email format",
      invalidPhone: "Invalid phone number format"
    }
  },
  ar: {
    translation: {
      // Landing Page
      title: "ساعد غزة الآن",
      mission: "ربط العائلات المحتاجة في غزة بالمتبرعين المسلمين حول العالم من خلال الدعم المباشر والشفاف",
      description: "مهمتنا هي تقديم المساعدات الإنسانية الفورية للعائلات في غزة خلال هذه الأوقات الحرجة. نحن نربط العائلات المتحققة مباشرة بالمتبرعين الكرماء لضمان دعم سريع وشفاف وفعال.",
      registerFamily: "📤 تسجيل كعائلة",
      browseDonate: "💚 تصفح وتبرع",
      
      // Family Registration
      familyRegistration: "تسجيل العائلة",
      fullName: "الاسم الكامل",
      city: "المدينة",
      familySize: "حجم العائلة",
      paymentMethods: "طرق الدفع (اختر كل ما ينطبق)",
      contact: "رقم الهاتف/واتساب",
      proofUpload: "رفع دليل (اختياري)",
      submit: "إرسال التسجيل",
      submitting: "جاري الإرسال...",
      
      // Payment Methods
      paypal: "باي بال",
      zainCash: "زين كاش",
      binance: "بايننس",
      westernUnion: "ويسترن يونيون",
      moneygram: "موني جرام",
      bankTransfer: "تحويل مصرفي",
      
      // Family Directory
      familyDirectory: "دليل العائلات",
      searchFamilies: "البحث عن العائلات بالاسم أو المدينة...",
      helpThisFamily: "ساعد هذه العائلة",
      hideContact: "إخفاء التواصل",
      verified: "موثق",
      familyMembers: "أفراد العائلة",
      acceptedPayments: "طرق الدفع المقبولة",
      contactInfo: "معلومات التواصل",
      backToHome: "← العودة للرئيسية",
      
      // Common
      loading: "جاري التحميل...",
      error: "حدث خطأ",
      success: "نجح!",
      cancel: "إلغاء",
      
      // Form Validation
      required: "هذا الحقل مطلوب",
      minLength: "الحد الأدنى للطول هو {{min}} أحرف",
      invalidEmail: "تنسيق البريد الإلكتروني غير صحيح",
      invalidPhone: "تنسيق رقم الهاتف غير صحيح"
    }
  }
}

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: 'en',
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false
    }
  })

export default i18n