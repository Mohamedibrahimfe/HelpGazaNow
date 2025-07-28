# Supabase Setup Instructions

## 1. Create Supabase Project

1. Go to [supabase.com](https://supabase.com) and create a new account
2. Click "New Project"
3. Choose your organization
4. Enter project name: `helpgazanow`
5. Enter a strong database password
6. Select a region close to your users
7. Click "Create new project"

## 2. Get Your Project Credentials

1. Go to Settings → API in your Supabase dashboard
2. Copy your Project URL and anon public key
3. Create a `.env` file in your project root:

```env
VITE_SUPABASE_URL=your-project-url-here
VITE_SUPABASE_ANON_KEY=your-anon-key-here
```

## 3. Set Up Database Schema

1. Go to the SQL Editor in your Supabase dashboard
2. Copy and paste the entire content from `supabase/migrations/create_families_table.sql`
3. Click "Run" to execute the SQL
4. This will create the families table with sample data

5. **Create Storage Bucket** (Optional - for proof image uploads):
   - Go to **Storage** in your Supabase dashboard
   - Click **New bucket**
   - Name: `family-proofs`
   - Make it **Public**
   - Click **Create bucket**
   
   **Note**: If you skip this step, the app will still work but proof images won't be uploaded. The registration will continue without the image.

6. **Set up RLS policies for storage** (if you created the bucket):
   - The bucket should allow public uploads and reads for the app to function properly

## 4. Set Up Storage (Optional - for proof uploads)

1. Go to Storage in your Supabase dashboard
2. Click "Create a new bucket"
3. Name it `family-proofs`
4. Make it public by toggling "Public bucket"
5. Click "Create bucket"

## 5. Verify Setup

After running the SQL migration, you should see:
- A `families` table with 8 sample families
- Row Level Security enabled
- Public policies for reading and inserting data

## 6. Test the Application

1. Start your development server: `npm run dev`
2. Visit the family directory to see the sample families
3. Try registering a new family
4. Test the language switcher (English/Arabic)

## Sample Data Included

The database comes pre-populated with 8 Gaza families:
- Mix of verified and unverified families
- Various cities: Gaza, Rafah, Khan Younis, Jabalia, etc.
- Different family sizes and payment methods
- Arabic names and Palestinian phone numbers
- Realistic timestamps spread over recent days

## Admin Access

To verify families or manage data:
1. Go to Table Editor in Supabase dashboard
2. Select the `families` table
3. Edit the `verified` column to approve families
4. Delete any inappropriate entries

## Production Deployment

For production:
1. Update your environment variables in Vercel
2. Ensure your Supabase project is in a stable region
3. Consider setting up email notifications for new registrations
4. Monitor usage and scale as needed

---

**🚨 Your humanitarian platform is now ready to help families in Gaza!**