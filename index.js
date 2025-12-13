const express = require('express');
const fetch = require('node-fetch');
const { nanoid } = require('nanoid');
const fs = require('fs').promises;
const path = require('path');
const { createClient } = require('@supabase/supabase-js');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(express.static('public'));

// Auth middleware
const auth = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Basic ')) {
    return res.status(401).json({ error: 'Unauthorized' });
  }
  
  const base64 = authHeader.slice(6);
  const [username, password] = Buffer.from(base64, 'base64').toString().split(':');
  
  const adminUser = process.env.ADMIN_USERNAME || 'admin';
  const adminPass = process.env.ADMIN_PASSWORD || 'changeme';
  
  if (username !== adminUser || password !== adminPass) {
    return res.status(401).json({ error: 'Invalid credentials' });
  }
  
  next();
};

// Storage setup - Supabase or JSON fallback
let supabase = null;
let useSupabase = false;

if (process.env.SUPABASE_URL && process.env.SUPABASE_KEY) {
  try {
    supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_KEY);
    useSupabase = true;
    console.log('✅ Using Supabase for storage');
  } catch (err) {
    console.warn('⚠️  Supabase init failed, falling back to JSON storage');
    useSupabase = false;
  }
} else {
  console.log('ℹ️  Using JSON file storage (Supabase not configured)');
}

// JSON Storage (Fallback)
const DATA_DIR = path.join(__dirname, 'data');
const LINKS_FILE = path.join(DATA_DIR, 'links.json');
const BOOKS_FILE = path.join(DATA_DIR, 'books.json');

async function ensureDataDir() {
  try {
    await fs.mkdir(DATA_DIR, { recursive: true });
  } catch (err) {
    console.error('Error creating data directory:', err);
  }
}

async function readJSON(file) {
  try {
    const data = await fs.readFile(file, 'utf8');
    return JSON.parse(data);
  } catch (err) {
    return file === LINKS_FILE ? {} : [];
  }
}

async function writeJSON(file, data) {
  await fs.writeFile(file, JSON.stringify(data, null, 2));
}

// Unified Storage API (works with both Supabase and JSON)
const storage = {
  // Get all links
  async getLinks() {
    if (useSupabase) {
      const { data, error } = await supabase.from('links').select('*');
      if (error) throw error;
      // Convert array to object with code as key
      const linksObj = {};
      data.forEach(link => {
        linksObj[link.code] = {
          url: link.url,
          keywords: link.keywords,
          book: link.book,
          created: link.created
        };
      });
      return linksObj;
    } else {
      return await readJSON(LINKS_FILE);
    }
  },

  // Get single link
  async getLink(code) {
    if (useSupabase) {
      const { data, error } = await supabase
        .from('links')
        .select('*')
        .eq('code', code)
        .single();
      if (error) return null;
      return {
        url: data.url,
        keywords: data.keywords,
        book: data.book,
        created: data.created
      };
    } else {
      const links = await readJSON(LINKS_FILE);
      return links[code] || null;
    }
  },

  // Save link
  async saveLink(code, linkData) {
    if (useSupabase) {
      const { error } = await supabase.from('links').upsert({
        code,
        url: linkData.url,
        keywords: linkData.keywords || '',
        book: linkData.book || null,
        created: linkData.created
      });
      if (error) throw error;
    } else {
      const links = await readJSON(LINKS_FILE);
      links[code] = linkData;
      await writeJSON(LINKS_FILE, links);
    }
  },

  // Get all books
  async getBooks() {
    if (useSupabase) {
      const { data, error } = await supabase.from('books').select('*').order('created', { ascending: false });
      if (error) throw error;
      return data;
    } else {
      return await readJSON(BOOKS_FILE);
    }
  },

  // Add book
  async addBook(book) {
    if (useSupabase) {
      const { error } = await supabase.from('books').insert(book);
      if (error) throw error;
    } else {
      const books = await readJSON(BOOKS_FILE);
      books.push(book);
      await writeJSON(BOOKS_FILE, books);
    }
  },

  // Delete book
  async deleteBook(id) {
    if (useSupabase) {
      const { error } = await supabase.from('books').delete().eq('id', id);
      if (error) throw error;
    } else {
      let books = await readJSON(BOOKS_FILE);
      books = books.filter(b => b.id !== id);
      await writeJSON(BOOKS_FILE, books);
    }
  }
};

// Fetch URL content for analysis
async function fetchURLContent(url) {
  try {
    const response = await fetch(url, { 
      timeout: 5000,
      headers: { 'User-Agent': 'Mozilla/5.0' }
    });
    const html = await response.text();
    
    const titleMatch = html.match(/<title[^>]*>([^<]+)<\/title>/i);
    const title = titleMatch ? titleMatch[1].trim() : '';
    
    const descMatch = html.match(/<meta[^>]+name=["']description["'][^>]+content=["']([^"']+)["']/i);
    const description = descMatch ? descMatch[1].trim() : '';
    
    const bodyText = html
      .replace(/<script[^>]*>[\s\S]*?<\/script>/gi, '')
      .replace(/<style[^>]*>[\s\S]*?<\/style>/gi, '')
      .replace(/<[^>]+>/g, ' ')
      .replace(/\s+/g, ' ')
      .trim()
      .slice(0, 500);
    
    return { title, description, bodyText };
  } catch (err) {
    console.error('Error fetching URL:', err.message);
    return { title: '', description: '', bodyText: '' };
  }
}

// AI-powered book matching
async function matchBookWithAI(urlContent, books, keywords = '') {
  try {
    const bookList = books.map((b, i) => 
      `${i + 1}. ${b.title} - ${b.description}`
    ).join('\n');
    
    const prompt = `Given this webpage content and keywords, which book is most relevant?

URL Title: ${urlContent.title}
URL Description: ${urlContent.description}
URL Content: ${urlContent.bodyText}
User Keywords: ${keywords}

Available Books:
${bookList}

Reply ONLY with the book number (1-${books.length}) that best matches. If no good match, reply "0".`;

    const encodedPrompt = encodeURIComponent(prompt);
    const response = await fetch(`https://text.pollinations.ai/${encodedPrompt}`, {
      timeout: 8000
    });
    
    const result = await response.text();
    const bookNum = parseInt(result.trim());
    
    if (bookNum > 0 && bookNum <= books.length) {
      console.log(`AI matched book #${bookNum}: ${books[bookNum - 1].title}`);
      return books[bookNum - 1];
    }
    
    return null;
  } catch (err) {
    console.error('AI matching error:', err.message);
    return null;
  }
}

// Fuzzy matching fallback
function fuzzyMatch(urlContent, books, keywords = '') {
  const searchText = `${urlContent.title} ${urlContent.description} ${urlContent.bodyText} ${keywords}`.toLowerCase();
  
  let bestMatch = null;
  let bestScore = 0;
  
  books.forEach(book => {
    const bookText = `${book.title} ${book.description}`.toLowerCase();
    const bookWords = bookText.split(/\s+/);
    
    let score = 0;
    bookWords.forEach(word => {
      if (word.length > 3 && searchText.includes(word)) {
        score++;
      }
    });
    
    if (score > bestScore) {
      bestScore = score;
      bestMatch = book;
    }
  });
  
  if (bestScore > 2) {
    console.log(`Fuzzy matched: ${bestMatch.title} (score: ${bestScore})`);
    return bestMatch;
  }
  
  return null;
}

// Match book with URL
async function matchBook(url, keywords = '') {
  const books = await storage.getBooks();
  
  if (books.length === 0) {
    console.log('No books available');
    return null;
  }
  
  const urlContent = await fetchURLContent(url);
  let matched = await matchBookWithAI(urlContent, books, keywords);
  
  if (!matched) {
    matched = fuzzyMatch(urlContent, books, keywords);
  }
  
  if (!matched) {
    matched = books[books.length - 1];
    console.log(`No match found, using newest: ${matched.title}`);
  }
  
  return matched;
}

// Routes
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.get('/admin', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'admin.html'));
});

// Shorten URL (Public API)
app.post('/api/shorten', async (req, res) => {
  try {
    const { url, keywords } = req.body;
    
    if (!url || !url.match(/^https?:\/\/.+/)) {
      return res.status(400).json({ error: 'Invalid URL' });
    }
    
    const shortCode = nanoid(7);
    const shortUrl = `${req.protocol}://${req.get('host')}/${shortCode}`;
    
    await storage.saveLink(shortCode, {
      url,
      keywords: keywords || '',
      book: null,
      created: new Date().toISOString()
    });
    
    res.json({ shortUrl, shortCode });
    
    // Match book in background
    matchBook(url, keywords || '').then(async (book) => {
      const link = await storage.getLink(shortCode);
      if (link) {
        link.book = book;
        await storage.saveLink(shortCode, link);
        console.log(`Book matched for ${shortCode}: ${book ? book.title : 'none'}`);
      }
    }).catch(err => {
      console.error('Background matching error:', err);
    });
    
  } catch (err) {
    console.error('Shorten error:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

// Redirect handler
app.get('/:code', async (req, res) => {
  try {
    const { code } = req.params;
    const link = await storage.getLink(code);
    
    if (!link) {
      return res.status(404).send('Short link not found');
    }
    
    const data = encodeURIComponent(JSON.stringify({
      originalUrl: link.url,
      book: link.book
    }));
    
    res.redirect(`/redirect.html?d=${data}`);
  } catch (err) {
    console.error('Redirect error:', err);
    res.status(500).send('Server error');
  }
});

// Admin: Add book
app.post('/api/admin/books', auth, async (req, res) => {
  try {
    const { link, title, description } = req.body;
    
    if (!link || !title) {
      return res.status(400).json({ error: 'Link and title required' });
    }
    
    const newBook = {
      id: nanoid(10),
      link,
      title,
      description: description || '',
      created: new Date().toISOString()
    };
    
    await storage.addBook(newBook);
    res.json({ success: true, book: newBook });
  } catch (err) {
    console.error('Add book error:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

// Admin: List books
app.get('/api/admin/books', auth, async (req, res) => {
  try {
    const books = await storage.getBooks();
    res.json(books);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

// Admin: Delete book
app.delete('/api/admin/books/:id', auth, async (req, res) => {
  try {
    const { id } = req.params;
    await storage.deleteBook(id);
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

// Admin: List links
app.get('/api/admin/links', auth, async (req, res) => {
  try {
    const links = await storage.getLinks();
    const linkArray = Object.entries(links).map(([code, data]) => ({
      code,
      ...data
    }));
    res.json(linkArray);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

// Start server
if (!useSupabase) {
  ensureDataDir().then(() => {
    app.listen(PORT, () => {
      console.log(`✅ Server running on port ${PORT}`);
      console.log(`🏠 Homepage: http://localhost:${PORT}`);
      console.log(`🔐 Admin: http://localhost:${PORT}/admin`);
    });
  });
} else {
  app.listen(PORT, () => {
    console.log(`✅ Server running on port ${PORT}`);
    console.log(`🏠 Homepage: http://localhost:${PORT}`);
    console.log(`🔐 Admin: http://localhost:${PORT}/admin`);
  });
}
