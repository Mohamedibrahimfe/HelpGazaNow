import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'your-supabase-url'
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'your-supabase-anon-key'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

export type Family = {
  id: string
  full_name: string
  city: string
  family_size: number
  payment_methods: string[]
  contact: string
  contact_revealed: boolean
  proof_image_url?: string
  verified: boolean
  created_at: string
  updated_at: string
}