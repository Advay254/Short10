# API Documentation

Complete API reference for Short10 URL shortener.

## Base URL
```
https://short10.onrender.com
```

---

## Public Endpoints (No Auth Required)

### 1. Shorten URL

Create a short link with optional expiry.

**Endpoint:** `POST /api/shorten`

**Headers:**
```
Content-Type: application/json
```

**Body:**
```json
{
  "url": "https://example.com/very-long-url-here",
  "keywords": "gaming fps bloodstrike",  // optional
  "expiry": "1week"  // optional
}
```

**Expiry Options:**
- `1day` - Expires in 24 hours
- `3days` - Expires in 3 days
- `1week` - Expires in 7 days (default)
- `1month` - Expires in 30 days
- `never` - Never expires

**Response:**
```json
{
  "shortUrl": "https://short10.onrender.com/abc123X",
  "shortCode": "abc123X",
  "expiresAt": "2025-12-21T12:00:00.000Z"
}
```

**Example (cURL):**
```bash
curl -X POST https://short10.onrender.com/api/shorten \
  -H "Content-Type: application/json" \
  -d '{
    "url": "https://example.com/long-url",
    "keywords": "crypto trading",
    "expiry": "1month"
  }'
```

**Example (JavaScript):**
```javascript
const response = await fetch('https://short10.onrender.com/api/shorten', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    url: 'https://example.com/long-url',
    keywords: 'crypto trading',
    expiry: '1month'
  })
});

const data = await response.json();
console.log(data.shortUrl);
```

**Example (Python):**
```python
import requests

response = requests.post('https://short10.onrender.com/api/shorten', json={
    'url': 'https://example.com/long-url',
    'keywords': 'crypto trading',
    'expiry': '1month'
})

data = response.json()
print(data['shortUrl'])
```

---

## Admin Endpoints (Require Authentication)

All admin endpoints require Basic Authentication.

**Authentication Header:**
```
Authorization: Basic base64(username:password)
```

To generate the header value:
```bash
# In terminal
echo -n "admin:yourpassword" | base64
# Returns: YWRtaW46eW91cnBhc3N3b3Jk

# Use in header:
Authorization: Basic YWRtaW46eW91cnBhc3N3b3Jk
```

### 2. Add Book

Add a new product/book to your catalog.

**Endpoint:** `POST /api/admin/books`

**Headers:**
```
Content-Type: application/json
Authorization: Basic base64(username:password)
```

**Body:**
```json
{
  "link": "https://payhip.com/b/xxxxx",
  "title": "Crypto Passive Income Guide",
  "description": "Complete guide to cryptocurrency staking, yield farming, DeFi protocols, and passive income strategies for Bitcoin, Ethereum, and altcoins"
}
```

**Response:**
```json
{
  "success": true,
  "book": {
    "id": "gJL5zYaVBX",
    "link": "https://payhip.com/b/xxxxx",
    "title": "Crypto Passive Income Guide",
    "description": "Complete guide to...",
    "created": "2025-12-13T20:47:46.856Z"
  }
}
```

**Example (cURL):**
```bash
curl -X POST https://short10.onrender.com/api/admin/books \
  -H "Content-Type: application/json" \
  -H "Authorization: Basic YWRtaW46eW91cnBhc3N3b3Jk" \
  -d '{
    "link": "https://payhip.com/b/xxxxx",
    "title": "Crypto Guide",
    "description": "Learn crypto trading"
  }'
```

### 3. List Books

Get all books in your catalog.

**Endpoint:** `GET /api/admin/books`

**Headers:**
```
Authorization: Basic base64(username:password)
```

**Response:**
```json
[
  {
    "id": "gJL5zYaVBX",
    "link": "https://payhip.com/b/xxxxx",
    "title": "Crypto Passive Income Guide",
    "description": "Complete guide to...",
    "created": "2025-12-13T20:47:46.856Z"
  },
  {
    "id": "abc123def4",
    "link": "https://payhip.com/b/yyyyy",
    "title": "Gaming Strategy Guide",
    "description": "Master FPS games...",
    "created": "2025-12-14T10:30:00.000Z"
  }
]
```

**Example (cURL):**
```bash
curl https://short10.onrender.com/api/admin/books \
  -H "Authorization: Basic YWRtaW46eW91cnBhc3N3b3Jk"
```

### 4. Delete Book

Delete a book from your catalog.

**Endpoint:** `DELETE /api/admin/books/:id`

**Headers:**
```
Authorization: Basic base64(username:password)
```

**Response:**
```json
{
  "success": true
}
```

**Example (cURL):**
```bash
curl -X DELETE https://short10.onrender.com/api/admin/books/gJL5zYaVBX \
  -H "Authorization: Basic YWRtaW46eW91cnBhc3N3b3Jk"
```

### 5. List All Links

Get all shortened links (admin only).

**Endpoint:** `GET /api/admin/links`

**Headers:**
```
Authorization: Basic base64(username:password)
```

**Response:**
```json
[
  {
    "code": "abc123X",
    "url": "https://example.com/long-url",
    "keywords": "crypto trading",
    "book": {
      "id": "gJL5zYaVBX",
      "link": "https://payhip.com/b/xxxxx",
      "title": "Crypto Guide"
    },
    "expiresAt": "2025-12-21T12:00:00.000Z",
    "created": "2025-12-14T12:00:00.000Z"
  }
]
```

### 6. Check Storage Type

Check if using Supabase or JSON storage.

**Endpoint:** `GET /api/storage-info`

**Headers:**
```
Authorization: Basic base64(username:password)
```

**Response:**
```json
{
  "type": "supabase"  // or "json"
}
```

---

## Error Responses

All endpoints return standard HTTP status codes:

**400 Bad Request**
```json
{
  "error": "Invalid URL"
}
```

**401 Unauthorized**
```json
{
  "error": "Unauthorized"
}
```

**404 Not Found**
```json
{
  "error": "Short link not found"
}
```

**500 Server Error**
```json
{
  "error": "Server error"
}
```

---

## Rate Limits

- Public endpoints: No rate limit currently
- Admin endpoints: No rate limit currently

**Recommended:** Don't create more than 100 links per minute to avoid overwhelming the AI matching service.

---

## Webhooks

Not currently supported. Consider polling `/api/admin/links` for updates.

---

## Use Cases

### 1. Automation with n8n
```
1. Trigger: RSS feed or webhook
2. Action: HTTP Request to /api/shorten
3. Store: Save short URL to database
4. Send: Email or social media post
```

### 2. Mobile App with MacroDroid
```
1. Trigger: Share URL to MacroDroid
2. HTTP POST to /api/shorten with URL
3. Parse response JSON
4. Copy shortUrl to clipboard
5. Show toast notification
```

### 3. Bulk Link Creation
```python
import requests

urls = [
    'https://example.com/page1',
    'https://example.com/page2',
    'https://example.com/page3'
]

for url in urls:
    response = requests.post('https://short10.onrender.com/api/shorten', json={
        'url': url,
        'expiry': '1month'
    })
    print(f"Created: {response.json()['shortUrl']}")
```

---

## Best Practices

1. **Use keywords** - Better book matching
2. **Set appropriate expiry** - Clean up old links automatically
3. **Store short codes** - Save codes for future reference
4. **Handle errors** - Always check response status
5. **Batch requests** - Don't spam the API

---

## Support

Questions? Check the main README.md or open an issue on GitHub.
