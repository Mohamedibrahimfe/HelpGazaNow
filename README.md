# HelpGazaNow - Humanitarian Aid Platform

A React-based humanitarian platform connecting Gaza families in need with Muslim donors worldwide through transparent, direct support.

## 🌟 Features

- **Multilingual Support**: Full English and Arabic support with RTL layout
- **Family Registration**: Secure form for families to register their needs
- **Donor Directory**: Browse verified families and connect directly
- **Multiple Payment Methods**: Support for PayPal, ZainCash, Binance, and more
- **Mobile-First Design**: Responsive and accessible design
- **Real-time Updates**: Live family directory with search functionality

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ 
- Supabase account
- npm or yarn

### Installation

1. **Clone and install dependencies**
   ```bash
   npm install
   ```

2. **Set up Supabase**
   - Create a new Supabase project at [supabase.com](https://supabase.com)
   - Copy your project URL and anon key
   - Create a `.env` file based on `.env.example`

3. **Database Setup**
   
   Create the families table in your Supabase SQL editor:
   
   ```sql
   -- Create families table
   CREATE TABLE families (
     id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
     full_name TEXT NOT NULL,
     city TEXT NOT NULL,
     family_size INTEGER NOT NULL,
     payment_methods TEXT[] NOT NULL,
     contact TEXT NOT NULL,
     contact_revealed BOOLEAN DEFAULT false,
     proof_image_url TEXT,
     verified BOOLEAN DEFAULT false,
     created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
     updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
   );

   -- Enable RLS
   ALTER TABLE families ENABLE ROW LEVEL SECURITY;

   -- Allow public read access
   CREATE POLICY "Public can view families" ON families FOR SELECT USING (true);

   -- Allow public insert for family registration
   CREATE POLICY "Public can insert families" ON families FOR INSERT WITH CHECK (true);
   ```

4. **Storage Setup**
   
   Create a storage bucket for family proof uploads:
   - Go to Storage in your Supabase dashboard
   - Create a new bucket named `family-proofs`
   - Set it to public

5. **Start the development server**
   ```bash
   npm run dev
   ```

## 🌍 Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Add environment variables in Vercel dashboard
4. Deploy!

### Environment Variables for Production

```
VITE_SUPABASE_URL=your-production-supabase-url
VITE_SUPABASE_ANON_KEY=your-production-anon-key
```

## 📱 Usage

### For Families
1. Click "Register as a Family"
2. Fill out the registration form
3. Upload optional proof documents
4. Submit and wait for verification

### For Donors
1. Click "Browse & Donate"
2. Search through verified families
3. Click "Help this Family" to reveal contact info
4. Contact directly via phone or WhatsApp

## 🔐 Admin Functions

To verify families, you can use the Supabase dashboard to:
1. Review submitted families
2. Update the `verified` status
3. Remove invalid entries

## 🌐 Internationalization

The app supports:
- **English** (default)
- **Arabic** with full RTL support

Language switching is automatic with proper text direction and layout adjustments.

## 🛠 Tech Stack

- **Frontend**: React 18, TypeScript, Vite
- **Styling**: Tailwind CSS
- **Routing**: React Router
- **Forms**: React Hook Form
- **Database**: Supabase (PostgreSQL)
- **Storage**: Supabase Storage
- **i18n**: react-i18next
- **Icons**: Lucide React

## 📄 License

This project is created for humanitarian purposes. Feel free to use and modify for similar humanitarian efforts.

## 🤝 Contributing

This is an urgent humanitarian project. Contributions are welcome:

1. Fork the repository
2. Create your feature branch
3. Make your changes
4. Submit a pull request

## 📞 Support

For technical support or humanitarian partnerships, please create an issue on GitHub.

---

**🚨 Emergency Humanitarian Project - Every minute counts in helping families in Gaza**