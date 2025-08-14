# Database Setup Guide for ABC Fitness

## ✅ What's Been Done

1. **PostgreSQL client installed** in `netlify/functions/`
2. **Database connection code** added to `api.js`
3. **Real database queries** replacing mock functions
4. **Database schema** created in `database-schema.sql`
5. **Newsletter integration** updated to use real database

## 🔧 Next Steps to Complete Setup

### 1. Set Up Your Neon Database

1. Go to your [Neon Console](https://console.neon.tech)
2. Create a new project or use existing one
3. Copy your connection string (it looks like: `postgresql://username:password@host/database`)

### 2. Create Database Tables

1. Open your Neon SQL Editor
2. Copy and paste the contents of `database-schema.sql`
3. Run the SQL to create your tables

### 3. Add Environment Variables to Netlify

1. Go to your [Netlify Dashboard](https://app.netlify.com)
2. Select your site
3. Go to **Site settings** → **Environment variables**
4. Add a new variable:
   - **Key**: `DATABASE_URL`
   - **Value**: Your Neon connection string

### 4. Test the Connection

1. Deploy your site to Netlify
2. Test the newsletter subscription form
3. Check Netlify Functions logs for any errors

## 📊 Database Tables Created

- **users**: Store user information
- **newsletter_subscribers**: Store newsletter subscriptions
- **contact_submissions**: Store contact form submissions

## 🔗 API Endpoints Available

- `POST /.netlify/functions/api/home` - Get home page data
- `POST /.netlify/functions/api/newsletter` - Subscribe to newsletter
- `POST /.netlify/functions/api/users` - Create new user

## 🐛 Troubleshooting

If you see database connection errors:

1. Check that `DATABASE_URL` is set correctly in Netlify
2. Verify your Neon database is running
3. Check Netlify Functions logs for detailed error messages
4. Ensure your database tables exist

## 🚀 Local Development

To test locally:

```bash
# Install Netlify CLI
npm install -g netlify-cli

# Create .env file with your DATABASE_URL
echo "DATABASE_URL=your_neon_connection_string" > .env

# Start local development
netlify dev
```
