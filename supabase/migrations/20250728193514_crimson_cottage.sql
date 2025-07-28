/*
  # Create families table with dummy data

  1. New Tables
    - `families`
      - `id` (uuid, primary key)
      - `full_name` (text)
      - `city` (text) 
      - `family_size` (integer)
      - `payment_methods` (text array)
      - `contact` (text)
      - `contact_revealed` (boolean)
      - `proof_image_url` (text, optional)
      - `verified` (boolean)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)

  2. Security
    - Enable RLS on `families` table
    - Add policy for public read access
    - Add policy for public insert (family registration)

  3. Sample Data
    - Insert 8 sample families from different Gaza cities
    - Mix of verified and unverified families
    - Various payment methods and family sizes
*/

-- Create families table
CREATE TABLE IF NOT EXISTS families (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  full_name text NOT NULL,
  city text NOT NULL,
  family_size integer NOT NULL,
  payment_methods text[] NOT NULL,
  contact text NOT NULL,
  contact_revealed boolean DEFAULT false,
  proof_image_url text,
  verified boolean DEFAULT false,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE families ENABLE ROW LEVEL SECURITY;

-- Allow public read access
CREATE POLICY "Public can view families" 
  ON families 
  FOR SELECT 
  USING (true);

-- Allow public insert for family registration
CREATE POLICY "Public can insert families" 
  ON families 
  FOR INSERT 
  WITH CHECK (true);

-- Insert dummy data
INSERT INTO families (full_name, city, family_size, payment_methods, contact, verified, created_at) VALUES
  ('أحمد محمد الخالدي', 'غزة', 7, ARRAY['paypal', 'zainCash', 'bankTransfer'], '+970591234567', true, now() - interval '2 days'),
  ('فاطمة عبد الرحمن', 'رفح', 5, ARRAY['binance', 'westernUnion'], '+970599876543', true, now() - interval '1 day'),
  ('محمود سالم أبو زيد', 'خان يونس', 9, ARRAY['paypal', 'moneygram', 'bankTransfer'], '+970567891234', true, now() - interval '3 hours'),
  ('عائشة حسن النجار', 'جباليا', 4, ARRAY['zainCash', 'binance'], '+970598765432', false, now() - interval '5 hours'),
  ('يوسف أحمد الشاعر', 'بيت لاهيا', 6, ARRAY['paypal', 'westernUnion', 'zainCash'], '+970591122334', true, now() - interval '8 hours'),
  ('مريم خالد العطار', 'دير البلح', 3, ARRAY['binance', 'bankTransfer'], '+970567788990', false, now() - interval '12 hours'),
  ('عمر فؤاد الدحدوح', 'غزة', 8, ARRAY['paypal', 'moneygram', 'westernUnion'], '+970599887766', true, now() - interval '1 day'),
  ('خديجة سمير قاسم', 'رفح', 5, ARRAY['zainCash', 'binance', 'bankTransfer'], '+970598877665', false, now() - interval '6 hours');

-- Create updated_at trigger
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_families_updated_at 
  BEFORE UPDATE ON families 
  FOR EACH ROW 
  EXECUTE FUNCTION update_updated_at_column();