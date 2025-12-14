# Short10: Smart URL Shortener with Product Discovery

Transform every shortened link into a passive marketing opportunity. Short10 displays your affiliate products or digital goods for 30 seconds before redirecting users, giving you free exposure with zero ad spend.

---

## 🎯 What is Short10?

Short10 is a free, powerful URL shortener that goes beyond simple link redirection. Unlike traditional shorteners, Short10 displays your affiliate products or digital goods for 30 seconds before redirecting users to their destination, turning every shared link into a potential sale. The system uses AI-powered matching to automatically pair each shortened URL with the most relevant product from your catalog based on content analysis and keywords, ensuring users see products that actually interest them.

Built for scalability and reliability, Short10 supports both local JSON storage and cloud-based Supabase integration, ensuring your data persists across server restarts and can handle 500,000+ links effortlessly. The platform includes a full REST API for automation with tools like n8n and MacroDroid, duplicate prevention to keep your product catalog clean, and responsive design that works flawlessly on any device.

---

## ✨ Key Features

### Core Functionality
- 🔗 **Instant Short Links** - Generate short URLs in milliseconds
- 📚 **Smart AI Matching** - Automatically pairs links with relevant products using Pollinations.ai
- 🔄 **Fuzzy Fallback** - Keyword matching when AI is unavailable
- ⏱️ **30-Second Discovery** - 15s button delay + 15s auto-redirect
- 🎯 **Product Showcase** - Full-screen iframe with minimal overlay
- 📱 **Fully Responsive** - Works perfectly on all devices

### Link Management
- ⏰ **Flexible Expiry** - 1 day, 3 days, 1 week (default), 1 month, or never
- 🗑️ **Auto-Cleanup** - Hourly deletion of expired links
- 🔍 **Duplicate Prevention** - Blocks duplicate book links and titles
- 📊 **Admin Dashboard** - Manage books and view statistics
- 🔐 **Hidden Admin Panel** - Secure `/admin` endpoint

### Storage & Scalability
- 💾 **Dual Storage** - Supabase (primary) with JSON fallback
- 🟢 **Storage Indicator** - Shows which system is active
- 📈 **Massive Scale** - Handle 500,000+ links on free tier
- 🔄 **Auto-Fallback** - Seamless switch if Supabase unavailable
- ☁️ **Cloud Ready** - Deploy on Render, Koyeb, Cloudflare

### API & Automation
- 🎯 **RESTful API** - Create links, manage books programmatically
- 🔑 **Basic Auth** - Secure admin endpoints
- 🤖 **Automation Ready** - Perfect for n8n, MacroDroid, Zapier
- 📡 **Webhook Compatible** - Integrate with any service

### User Experience
- 🎨 **Modern UI** - Beautiful gradient design
- ⚡ **Lightning Fast** - Instant link creation
- 🔘 **Two Action Buttons** - "Explore" (stay) or "Continue" (go)
- ❌ **Expired Link Handling** - Shows random product then error message
- 📋 **One-Click Copy** - Easy link sharing

---

## 🎬 How It Works

### For Link Creators
1. Paste any long URL
2. Optionally add keywords for better matching
3. Choose expiry time (default: 1 week)
4. Get short link instantly
5. System matches best product in background

### For End Users
1. Click short link (Link C)
2. See relevant product page (Link B) in full-screen
3. Two buttons appear at bottom corners:
   - **"Explore"** (blue, left) - Opens product page cleanly
   - **"Continue"** (green, right) - Goes to original destination
4. Continue button appears after 15 seconds
5. Auto-redirects to original URL after 30 seconds total
6. Or click either button anytime

### For Expired/Invalid Links
1. User clicks expired/invalid link
2. Shows random product for 15 seconds
3. Then displays error: "Link expired or not found"
4. No redirect to original URL

---

## 🏗️ Technical Stack

**Backend:** Node.js 18+, Express.js  
**Database:** Supabase (PostgreSQL) with JSON fallback  
**AI Matching:** Pollinations.ai (free, no API key)  
**ID Generation:** nanoid  
**Frontend:** Vanilla JavaScript, HTML5, CSS3  
**Deployment:** Render, Koyeb, or any Node.js host  

---

## 💡 Use Cases

- **Affiliate Marketers** - Monetize every shared link
- **Digital Product Creators** - Promote your products passively
- **Content Publishers** - Add revenue stream to external links
- **Social Media Managers** - Track engagement with product exposure
- **Email Campaigns** - Include discovery moments in newsletters
- **Course Creators** - Promote related materials

---

## Support
If this project saved you time, helped you learn something new, or inspired you in any way, consider supporting me. Every contribution keeps me motivated, maintained, and improving since most of my projects are hobby based and I want to share my 💡 with you guys. Even a small coffee goes a long way. Thank you for being here.

[![Buy Me A Coffee](https://cdn.buymeacoffee.com/buttons/v2/default-yellow.png)](https://www.buymeacoffee.com/advay254)

---

## 🚀 Quick Start (5 Minutes)

### Prerequisites
- Node.js 18+ installed
- Git installed
- GitHub account (for deployment)
- Text editor

### Local Installation

```bash
# 1. Clone or download the project
git clone <your-repo-url>
cd short10

# 2. Install dependencies
npm install

# 3. Setup environment variables
cp .env.example .env

# 4. Edit .env file
# Change ADMIN_PASSWORD to something secure!
# Leave Supabase variables empty for now (JSON storage)

# 5. Start the server
npm start

# 6. Open browser
# Homepage: http://localhost:3000
# Admin: http://localhost:3000/admin
```

**Default Credentials:**
- Username: `admin`
- Password: (whatever you set in `.env`)

---

## 📦 Project Structure

```
short10/
├── index.js              # Main server (Express + Storage)
├── package.json          # Dependencies
├── .env                  # Your credentials (git-ignored)
├── .env.example          # Template
├── .gitignore           # Protect secrets
├── README.md            # This file
│
├── public/              # Frontend files
│   ├── index.html      # Homepage (shortener)
│   ├── admin.html      # Admin panel
│   ├── redirect.html   # Discovery page
│   └── style.css       # Styles
│
└── data/                # JSON storage (fallback)
    ├── links.json      # Auto-created
    └── books.json      # Auto-created
```

---

## 🗄️ Supabase Setup (Production Storage)

Supabase provides persistent storage that never resets. Free tier includes 500MB (enough for 500,000+ links).

### Step 1: Create Account (2 minutes)

1. Go to **[supabase.com](https://supabase.com)**
2. Click **"Start your project"**
3. Sign up with:
   - GitHub (easiest - one click)
   - Or email/password

### Step 2: Create Project (2 minutes)

1. After login, click **"New Project"**
2. Fill in:
   - **Organization**: Create new or use existing
   - **Name**: `short10` (or any name you want)
   - **Database Password**: Create strong password (**save it!**)
   - **Region**: Choose closest to your target users
   - **Pricing Plan**: Select **Free** ($0/month)
3. Click **"Create new project"**
4. Wait ~2 minutes for setup (grab a coffee ☕)

### Step 3: Get API Credentials (1 minute)

1. In your project dashboard, click **Settings** (gear icon, left sidebar)
2. Click **API** in settings menu
3. You'll see two important values:
   - **Project URL**: `https://abcdefgh.supabase.co`
   - **API Keys** section:
     - `anon` key (public) - **← Copy this one**
     - `service_role` key - DON'T use this

4. Copy these two items:
   ```
   Project URL: https://your-project-id.supabase.co
   anon key: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
   ```

### Step 4: Create Database Tables (3 minutes)

1. Click **SQL Editor** (left sidebar, looks like `</>`)
2. Click **"New query"** button
3. Copy and paste this **entire SQL code**:

```sql
-- Create links table
CREATE TABLE links (
  code TEXT PRIMARY KEY,
  url TEXT NOT NULL,
  keywords TEXT,
  book JSONB,
  expires_at TIMESTAMP WITH TIME ZONE,
  created TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create books table
CREATE TABLE books (
  id TEXT PRIMARY KEY,
  link TEXT NOT NULL UNIQUE,
  title TEXT NOT NULL UNIQUE,
  description TEXT,
  created TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for performance
CREATE INDEX idx_links_expires ON links(expires_at);
CREATE INDEX idx_books_link ON books(link);
CREATE INDEX idx_books_title ON books(title);

-- Enable Row Level Security
ALTER TABLE links ENABLE ROW LEVEL SECURITY;
ALTER TABLE books ENABLE ROW LEVEL SECURITY;

-- Create permissive policies (allows all operations)
CREATE POLICY "Allow all on links" ON links 
  FOR ALL USING (true) WITH CHECK (true);

CREATE POLICY "Allow all on books" ON books 
  FOR ALL USING (true) WITH CHECK (true);
```

4. Click **"Run"** button (or press Ctrl+Enter)
5. You should see: ✅ **"Success. No rows returned"**

If you see an error, make sure you copied the entire SQL block.

### Step 5: Fix Policies (If Needed)

If you get policy errors or can't add books later, run this cleanup SQL:

```sql
-- Drop all existing policies
DROP POLICY IF EXISTS "Allow public read on links" ON links;
DROP POLICY IF EXISTS "Allow public read on books" ON books;
DROP POLICY IF EXISTS "Allow public insert on links" ON links;
DROP POLICY IF EXISTS "Allow all operations on links" ON links;
DROP POLICY IF EXISTS "Allow all operations on books" ON books;
DROP POLICY IF EXISTS "Allow everything on links" ON links;
DROP POLICY IF EXISTS "Allow everything on books" ON books;

-- Recreate simple policies
CREATE POLICY "Allow all on links" ON links 
  FOR ALL USING (true) WITH CHECK (true);

CREATE POLICY "Allow all on books" ON books 
  FOR ALL USING (true) WITH CHECK (true);
```

### Step 6: Add Credentials to Project (1 minute)

**For Local Development:**

1. Open your `.env` file
2. Add these lines (replace with your actual values):
```env
SUPABASE_URL=https://your-project-id.supabase.co
SUPABASE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...your-anon-key
```
3. Save file
4. Restart server: `npm start`

**For Deployment (Render/Koyeb):**

1. Go to your hosting platform dashboard
2. Find "Environment Variables" section
3. Add these two variables:
```
SUPABASE_URL = https://your-project-id.supabase.co
SUPABASE_KEY = eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```
4. Save and restart your service

### Step 7: Verify It's Working

1. Start your server (local or deployed)
2. Check console logs for:
   ```
   ✅ Using Supabase for storage
   ✅ Server running on port 3000
   ```
3. Login to admin panel
4. Top right should show: **🟢 Supabase Storage**
5. Try adding a book - should work!

### Step 8: Verify Data in Supabase

1. Go to Supabase → **Table Editor** (left sidebar)
2. Click **books** table
3. You should see your added books
4. Create a short link on homepage
5. Check **links** table - your link should appear

✅ **Done!** Your data now persists forever and never resets.

---

## 🌐 Deployment

### Option 1: Deploy to Render (Easiest)

**Step 1: Prepare Repository**
1. Push all code to GitHub
2. Make sure `.env` is in `.gitignore` (it is by default)

**Step 2: Deploy on Render**
1. Go to [render.com](https://render.com) and sign up
2. Click **"New +"** → **"Web Service"**
3. Click **"Connect GitHub"** and authorize
4. Select your `short10` repository
5. Configure:
   - **Name**: `short10` (or your choice)
   - **Environment**: `Node`
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
   - **Plan**: **Free**

**Step 3: Add Environment Variables**
In Render dashboard → Environment section, add:
```
ADMIN_USERNAME = admin
ADMIN_PASSWORD = your_secure_password_here
NODE_ENV = production
PORT = 3000
SUPABASE_URL = https://your-project.supabase.co
SUPABASE_KEY = your-anon-key-here
```

**Step 4: Deploy**
- Click **"Create Web Service"**
- Wait 2-3 minutes for deployment
- Your site will be live at: `https://short10.onrender.com`

**Step 5: Test**
1. Visit your URL
2. Create a short link
3. Login to `/admin`
4. Add a book
5. Test the complete flow

### Option 2: Deploy to Koyeb

**Step 1: Prepare Repository**
Same as Render - push to GitHub

**Step 2: Deploy on Koyeb**
1. Go to [koyeb.com](https://www.koyeb.com) and sign up
2. Click **"Create App"**
3. Choose **"GitHub"** as source
4. Select your repository
5. Configure:
   - **Builder**: Buildpack
   - **Build command**: `npm install`
   - **Run command**: `npm start`
   - **Port**: 3000
   - **Instance**: Free tier

**Step 3: Add Environment Variables**
Same as Render:
```
ADMIN_USERNAME = admin
ADMIN_PASSWORD = your_secure_password
NODE_ENV = production
PORT = 3000
SUPABASE_URL = https://your-project.supabase.co
SUPABASE_KEY = your-anon-key
```

**Step 4: Deploy**
- Click **"Deploy"**
- Wait 2-3 minutes
- Your site: `https://your-app.koyeb.app`

### Custom Domain Setup

**For Render:**
1. Settings → Custom Domain
2. Add your domain
3. Update DNS records as shown
4. SSL certificate is automatic

**For Koyeb:**
1. Settings → Domains
2. Add custom domain
3. Update DNS CNAME record
4. SSL is automatic

---

## 🎨 Configuration

### Change Redirect Timing

Edit `public/redirect.html` lines 126-127:

```javascript
const BUTTON_APPEAR_DELAY = 15000; // Button appears (milliseconds)
const AUTO_REDIRECT_DELAY = 15000;  // Then auto-redirect (milliseconds)
```

### Change Colors

Edit `public/style.css`:

```css
/* Main gradient background */
background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);

/* Explore button */
.btn-explore {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
}

/* Continue button */
.btn-continue {
  background: linear-gradient(135deg, #10b981 0%, #059669 100%);
}
```

### Change Default Expiry

Edit `index.js` line ~180:

```javascript
// Default expiry (if not specified)
expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000); // 7 days
```

### Environment Variables Reference

```env
# Required
ADMIN_USERNAME=admin              # Admin login username
ADMIN_PASSWORD=strongpassword     # Admin login password

# Optional - Server
NODE_ENV=production               # Environment (production/development)
PORT=3000                         # Server port

# Optional - Supabase (leave empty for JSON storage)
SUPABASE_URL=                     # Your Supabase project URL
SUPABASE_KEY=                     # Your Supabase anon/public key
```

---

## 📡 API Documentation

### Base URL
```
https://your-site.com
```

### Public Endpoints

#### 1. Shorten URL

Create a short link with optional expiry.

**Request:**
```bash
POST /api/shorten
Content-Type: application/json

{
  "url": "https://example.com/long-url",
  "keywords": "crypto trading bitcoin",  // optional
  "expiry": "1month"  // optional: 1day, 3days, 1week, 1month, never
}
```

**Response:**
```json
{
  "shortUrl": "https://your-site.com/abc123X",
  "shortCode": "abc123X",
  "expiresAt": "2025-12-21T12:00:00.000Z"
}
```

**Expiry Options:**
- `1day` - 24 hours
- `3days` - 3 days
- `1week` - 7 days (default)
- `1month` - 30 days
- `never` - Never expires

**cURL Example:**
```bash
curl -X POST https://your-site.com/api/shorten \
  -H "Content-Type: application/json" \
  -d '{
    "url": "https://example.com/article",
    "keywords": "gaming fps",
    "expiry": "1week"
  }'
```

**JavaScript Example:**
```javascript
const response = await fetch('https://your-site.com/api/shorten', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    url: 'https://example.com/article',
    keywords: 'gaming fps',
    expiry: '1week'
  })
});

const data = await response.json();
console.log('Short URL:', data.shortUrl);
```

### Admin Endpoints (Require Auth)

All admin endpoints require Basic Authentication header:
```
Authorization: Basic base64(username:password)
```

Generate auth header:
```bash
echo -n "admin:yourpassword" | base64
# Returns: YWRtaW46eW91cnBhc3N3b3Jk
```

#### 2. Add Book

**Request:**
```bash
POST /api/admin/books
Authorization: Basic YWRtaW46eW91cnBhc3N3b3Jk
Content-Type: application/json

{
  "link": "https://payhip.com/b/xxxxx",
  "title": "Crypto Trading Guide",
  "description": "Complete guide to cryptocurrency trading, Bitcoin, Ethereum, DeFi protocols"
}
```

**Response:**
```json
{
  "success": true,
  "book": {
    "id": "gJL5zYaVBX",
    "link": "https://payhip.com/b/xxxxx",
    "title": "Crypto Trading Guide",
    "description": "Complete guide to...",
    "created": "2025-12-14T12:00:00.000Z"
  }
}
```

**Error Responses:**
```json
// Duplicate link
{
  "error": "Duplicate book link",
  "message": "This link already exists: \"Existing Book Title\""
}

// Duplicate title
{
  "error": "Duplicate book title",
  "message": "A book with this title already exists"
}
```

#### 3. List Books

**Request:**
```bash
GET /api/admin/books
Authorization: Basic YWRtaW46eW91cnBhc3N3b3Jk
```

**Response:**
```json
[
  {
    "id": "gJL5zYaVBX",
    "link": "https://payhip.com/b/xxxxx",
    "title": "Crypto Trading Guide",
    "description": "Complete guide...",
    "created": "2025-12-14T12:00:00.000Z"
  }
]
```

#### 4. Delete Book

**Request:**
```bash
DELETE /api/admin/books/gJL5zYaVBX
Authorization: Basic YWRtaW46eW91cnBhc3N3b3Jk
```

**Response:**
```json
{
  "success": true
}
```

#### 5. Check Storage Type

**Request:**
```bash
GET /api/storage-info
Authorization: Basic YWRtaW46eW91cnBhc3N3b3Jk
```

**Response:**
```json
{
  "type": "supabase"  // or "json"
}
```

---

## 🔧 Troubleshooting

### Can't Add Books

**Symptoms:** "Failed to add book" error

**Solutions:**
1. Check Supabase policies (run cleanup SQL from Step 5)
2. Verify credentials in `.env` are correct
3. Check if book link/title already exists (duplicates blocked)
4. Look at server logs for specific error

### Storage Indicator Shows 🟡 JSON Instead of 🟢 Supabase

**Cause:** Supabase not connected

**Solutions:**
1. Check `SUPABASE_URL` and `SUPABASE_KEY` in `.env`
2. Make sure no extra spaces in values
3. Restart server after changing `.env`
4. Verify Supabase project is not paused (it won't be on free tier)

### Links Not Expiring

**Cause:** Cleanup job may not be running

**Solutions:**
1. Restart server (cleanup runs hourly)
2. Check server logs for "Deleted X expired links"
3. Verify `expires_at` field exists in Supabase table

### Can't Login to Admin

**Cause:** Wrong credentials

**Solutions:**
1. Check `.env` file for `ADMIN_USERNAME` and `ADMIN_PASSWORD`
2. No spaces around values: `ADMIN_PASSWORD=mypass` not `ADMIN_PASSWORD = mypass`
3. Restart server after changing `.env`

### Short Links Return 404

**Cause:** Link doesn't exist or already expired

**Check:**
1. Admin panel → Statistics → Total Links
2. Supabase Table Editor → links table
3. Check if code exists

### Books Not Matching Well

**Cause:** Poor descriptions or missing keywords

**Solutions:**
1. Add detailed descriptions to books
2. Include relevant keywords when creating links
3. AI sometimes times out - uses fuzzy match as fallback (this is normal)

### Server Won't Start

**Cause:** Port in use or missing dependencies

**Solutions:**
```bash
# Kill process on port 3000
lsof -ti:3000 | xargs kill -9  # Mac/Linux
netstat -ano | findstr :3000   # Windows, then kill PID

# Reinstall dependencies
rm -rf node_modules
npm install
```

---

## 🎯 Best Practices

### For Link Creators
1. **Use descriptive keywords** - Helps AI match better books
2. **Set appropriate expiry** - Time-sensitive content = short expiry
3. **Test your links** - Click them to verify the flow works
4. **Monitor statistics** - Check which books perform best

### For Book Management
1. **Write detailed descriptions** - Include all relevant keywords
2. **Avoid duplicates** - System blocks them, but be mindful
3. **Update regularly** - Remove outdated products
4. **Use clear titles** - Helps users and matching algorithm

### For API Usage
1. **Handle errors** - Check response status codes
2. **Store short codes** - Save them for future reference
3. **Rate limit yourself** - Don't spam link creation
4. **Use keywords** - Better matching results

### For Security
1. **Change default password** - First thing after deployment
2. **Use strong passwords** - 12+ characters, mixed case, numbers
3. **Don't share admin URL** - Keep `/admin` secret
4. **Regular backups** - Export Supabase data monthly
5. **Monitor logs** - Check for suspicious activity

---

## 📊 Scaling & Performance

### Current Capacity

**JSON Storage:**
- Good for: 10,000+ links
- Performance: Fast for small datasets
- Use case: Testing, personal use

**Supabase Free Tier:**
- Storage: 500 MB
- Links capacity: 500,000+ links
- Books capacity: Unlimited (practically)
- Performance: Fast, indexed queries
- Use case: Production, scaling

### When to Upgrade

**Still on JSON?** Move to Supabase when:
- You have 1,000+ links
- Deploying to production
- Need data persistence

**Supabase Free Tier Full?** You won't hit this, but:
- 500 MB = ~500,000 links
- If you somehow do: Upgrade to Supabase Pro ($25/month for 8GB)

### Performance Tips

1. **Use Supabase** - Faster than JSON for 1,000+ links
2. **Add detailed descriptions** - Better AI matching, fewer fallbacks
3. **Clean expired links** - Auto-cleanup runs hourly
4. **Use keywords** - Speeds up matching process

---

## 🔐 Security Features

- ✅ Hidden admin panel (no public links)
- ✅ Basic authentication on all admin endpoints
- ✅ Environment variables for secrets
- ✅ HTTPS enforced by hosting platforms
- ✅ Row Level Security on Supabase
- ✅ Input validation on all endpoints
- ✅ Duplicate prevention
- ✅ Rate limiting ready (via hosting platform)

---

## 📝 Data Privacy

- No analytics or tracking by default
- User data (links, books) stored only in your database
- No third-party data sharing
- AI matching happens server-side (URLs not logged by Pollinations.ai)
- You own all your data
- Easy data export from Supabase

---

## 🤝 Contributing

This is an open-source project. Feel free to:
- Fork and modify
- Submit pull requests
- Report bugs
- Suggest features
- Share improvements

---

## 📄 License

MIT License - Use freely for personal or commercial projects.

---

## 🆘 Support

**Issues?**
1. Check this README first
2. Review Troubleshooting section
3. Check server logs
4. Verify Supabase connection
5. Test with simple cases

**Feature Requests?**
Open an issue on GitHub with:
- Clear description
- Use case
- Why it's useful

---

## 🎉 Quick Summary

**What you get:**
- Free URL shortener with product discovery
- AI-powered book matching
- Supabase or JSON storage
- Full admin dashboard
- REST API for automation
- Link expiry system
- Auto-cleanup
- Duplicate prevention
- Mobile responsive
- Deploy anywhere

**What you need:**
- 10 minutes setup time
- Free Supabase account (optional but recommended)
- Free hosting (Render/Koyeb)
- Your affiliate products/books

**What happens:**
1. Create short links
2. System matches relevant products
3. Users see products before redirect
4. You earn passive income
5. Everything runs automatically

---

**Built with ❤️ FROM ADVAY254 for ethical affiliate marketing**

Deploy it. Share links. Earn passively. 🚀
[![Buy Me A Coffee](https://cdn.buymeacoffee.com/buttons/v2/default-yellow.png)](https://www.buymeacoffee.com/advay254)
