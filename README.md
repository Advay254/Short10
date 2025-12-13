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
1. Go to [supabase.com](https://supabase.com) and create account
2. Create new project (takes 2 minutes)
3. Go to Project Settings → API
4. Copy your project URL and anon/public key
5. Add to `.env`:
```env
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_KEY=your-anon-key-here
```

6. Create tables in Supabase SQL Editor:
```sql
-- Links table
CREATE TABLE links (
  code TEXT PRIMARY KEY,
  url TEXT NOT NULL,
  keywords TEXT,
  book JSONB,
  expires_at TIMESTAMP WITH TIME ZONE,
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

-- Create index for faster expiry checks
CREATE INDEX idx_links_expires ON links(expires_at);

-- Enable Row Level Security (RLS) - Optional but recommended
ALTER TABLE links ENABLE ROW LEVEL SECURITY;
ALTER TABLE books ENABLE ROW LEVEL SECURITY;

-- Allow public read access (since this is a URL shortener)
CREATE POLICY "Allow public read on links" ON links FOR SELECT USING (true);
CREATE POLICY "Allow public read on books" ON books FOR SELECT USING (true);

-- Allow public insert (for creating short links)
CREATE POLICY "Allow public insert on links" ON links FOR INSERT WITH CHECK (true);

-- You can manage books only through admin panel via API
```

### 4. Start Server
```bash
npm start
# Visit http://localhost:3000
```

## 📦 Deployment

### Deploy to Render
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
