# Short10

A free URL shortener that shows relevant affiliate products before redirecting to the original destination.

## 🚀 Features

- 🔗 Instant short link generation
- 📚 Smart AI book matching with fuzzy fallback
- ⏱️ 30-second discovery window (15s + 15s auto-redirect)
- ⏰ **Link expiry options** (1 day, 3 days, 1 week, 1 month, never)
- 🗑️ **Auto-cleanup** of expired links (hourly)
- 📱 Fully responsive design
- 🔐 Secure admin panel
- 💾 **Supabase support with JSON fallback** (persistent storage)
- 🎯 Public API for automation

## Quick Setup

### 1. Install Dependencies
```bash
npm install
```

### 2. Configure Environment
```bash
cp .env.example .env
# Edit .env and set your admin password
```

### 3. Choose Storage

#### Option A: Start with JSON (No Setup Needed)
Leave Supabase variables empty in `.env` - works immediately!

#### Option B: Use Supabase (Recommended for Production)
# Supabase Setup Guide (5 Minutes)

## Step 1: Create Supabase Account
1. Go to [supabase.com](https://supabase.com)
2. Click "Start your project"
3. Sign up with GitHub (easiest) or email

## Step 2: Create New Project
1. Click "New Project"
2. Fill in:
   - **Name**: `url-shortener` (or anything you want)
   - **Database Password**: Save this! (you won't need it often)
   - **Region**: Choose closest to you
3. Click "Create new project"
4. Wait 2 minutes for setup

## Step 3: Get Your Credentials
1. In your project, go to **Settings** (gear icon) → **API**
2. You'll see:
   - **Project URL**: `https://xxxxx.supabase.co`
   - **anon/public key**: Long string starting with `eyJ...`
3. Copy both - you'll add them to `.env` file

## Step 4: Create Database Tables
1. Go to **SQL Editor** (left sidebar)
2. Click **New query**
3. Copy and paste this SQL:

```sql
-- Links table
CREATE TABLE links (
  code TEXT PRIMARY KEY,
  url TEXT NOT NULL,
  keywords TEXT,
  book JSONB,
  created TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Books table
CREATE TABLE books (
  id TEXT PRIMARY KEY,
  link TEXT NOT NULL,
  title TEXT NOT NULL,
  description TEXT,
  created TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE links ENABLE ROW LEVEL SECURITY;
ALTER TABLE books ENABLE ROW LEVEL SECURITY;

-- Allow public access (URL shortener needs this)
CREATE POLICY "Allow all on links" ON links FOR ALL USING (true);
CREATE POLICY "Allow all on books" ON books FOR ALL USING (true);
```

4. Click **Run** (or press Ctrl+Enter)
5. You should see "Success. No rows returned"

## Step 5: Add to Your .env File
Open your `.env` file and add:

```env
SUPABASE_URL=https://your-project-id.supabase.co
SUPABASE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

Replace with your actual values from Step 3.

## Step 6: Test It
```bash
npm start
```

You should see:
```
✅ Using Supabase for storage
✅ Server running on port 3000
```

If you see "Using JSON file storage" instead, check your credentials.

## Step 7: Verify Data
1. Create a short link on your homepage
2. Go to Supabase → **Table Editor**
3. Click **links** table
4. You should see your link there!

---

## ✅ You're Done!

Your URL shortener now uses Supabase:
- ✅ Data persists forever (never lost on restart)
- ✅ Can handle 500,000+ links
- ✅ Free tier never expires
- ✅ Automatic backups

## 🔄 Switching Between JSON and Supabase

**To use JSON storage**: Leave `SUPABASE_URL` and `SUPABASE_KEY` empty in `.env`

**To use Supabase**: Fill in both values in `.env`

The system automatically detects which to use!

---

## Common Issues

### "Invalid API key"
- Copy the **anon/public** key, not the service_role key
- Make sure no extra spaces in `.env` file

### "relation does not exist"
- You forgot to run the SQL from Step 4
- Go back and create the tables

### Can't see data in Supabase
- Check Table Editor → links/books tables
- Make sure RLS policies are created (Step 4)

### Falls back to JSON storage
- Check `.env` variables are correct
- Restart server after changing `.env`
- Check Supabase project is not paused (free tier doesn't pause)

---

Need help? Check your server logs - they show exactly what's happening!

## 📦 Deployment

### Deploy to Render(Highly Recommended)
1. Push code to GitHub
2. Create new Web Service on Render
3. Connect GitHub repo
4. Add environment variables (including Supabase if using)
5. Deploy!

### Deploy to Koyeb
1. Push code to GitHub
2. Create app on Koyeb
3. Connect GitHub repo
4. Add environment variables
5. Deploy!

## 🔧 Environment Variables

```env
# Required
ADMIN_USERNAME=admin
ADMIN_PASSWORD=your_secure_password

# Optional - Server
NODE_ENV=production
PORT=3000

# Optional - Supabase (leave empty for JSON storage)
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_KEY=your-anon-key-here
```

## 📖 How It Works

### For Users
1. Paste long URL → Get short link instantly
2. Click short link → See relevant book/product
3. "Explore" button (stay) or "Continue" button (go to original)
4. Auto-redirects after 30 seconds if no action

### For You
1. Add books in admin panel (`/admin`)
2. System uses AI + fuzzy matching to pair books with URLs
3. Every shortened link becomes free advertising
4. Works automatically - set it and forget it

## 🎯 Storage Behavior

- **Supabase configured**: Uses Supabase (persistent, scalable, never loses data)
- **Supabase not configured**: Uses JSON files (works locally, may reset on some hosts)
- **Supabase fails**: Automatically falls back to JSON files

## 🔐 Admin Panel

Access at `/admin` (not linked on homepage for security)

**Features**:
- Add/delete books
- View all shortened links
- See matching statistics
- Monitor system status

## 📡 API Usage

### Shorten URL
```bash
POST /api/shorten
Content-Type: application/json

{
  "url": "https://example.com/long-url",
  "keywords": "optional keywords",  // optional
  "expiry": "1week"  // optional: 1day, 3days, 1week, 1month, never (default: 1week)
}

Response:
{
  "shortUrl": "https://yoursite.com/abc123",
  "shortCode": "abc123",
  "expiresAt": "2025-12-21T12:00:00.000Z"  // or null if never expires
}
```

### Admin Endpoints
Require Basic Auth with admin credentials:
```bash
GET    /api/admin/books      # List books
POST   /api/admin/books      # Add book
DELETE /api/admin/books/:id  # Delete book
GET    /api/admin/links      # List links
```

## 🛠️ Customization

### Change Timing
Edit `public/redirect.html`:
```javascript
const BUTTON_APPEAR_DELAY = 15000; // Button appears (milliseconds)
const AUTO_REDIRECT_DELAY = 15000;  // Then auto-redirect
```

### Change Colors
Edit `public/style.css` - search for gradient colors

## 🔄 Migrating from JSON to Supabase

1. Export your data from JSON files
2. Set up Supabase and create tables (see above)
3. Add Supabase credentials to `.env`
4. Restart server
5. Import data via admin panel

Your old JSON files remain as backup.

## 📊 Scaling

- **JSON Storage**: Good for 10,000+ links
- **Supabase**: Handles 500,000+ links easily
- **Free tier**: 500 MB (you won't hit this limit)

## 🐛 Troubleshooting

### Server won't start
```bash
npm install
```

### Admin panel won't login
Check `.env` file has correct credentials (no spaces)

### Books not matching well
Add more detailed descriptions to books in admin panel

### Supabase connection fails
- Check URL and key are correct
- System automatically falls back to JSON
- Check Supabase project is not paused

## 🔒 Security

- Admin panel hidden (no public links)
- Basic authentication
- Environment variables for secrets
- HTTPS enforced by deployment platforms
- Optional RLS policies on Supabase

## 📝 License

MIT - Use freely for personal or commercial projects

---

**Need help?** Check server logs first - they tell you what's happening!
