# Valentine's Day Web App 💕

A fun and interactive Valentine's Day web application where the "No" button shrinks and the "Yes" button grows until there's only one option left! Built with vanilla HTML/CSS/JS frontend and Cloudflare Workers + D1 database backend.

## ✨ Features

- **Interactive Button Behavior**: 
  - "No" button gets smaller with each hover
  - "Yes" button gets bigger with each hover over "No"
  - "No" button eventually disappears completely
  - Playful hints appear as user hovers over "No"

- **Beautiful Animations**:
  - Heart animations floating up
  - Colorful confetti celebration
  - Smooth scaling and transitions
  - Success message with stats

- **Backend Integration**:
  - Saves responses to Cloudflare D1 database
  - Tracks how many times user hovered over "No"
  - Records timestamp and user agent
  - Statistics dashboard to view all responses

## 🚀 Quick Start

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- Cloudflare account (free tier works!)
- Wrangler CLI

### Installation

1. **Install Wrangler CLI**:
```bash
npm install -g wrangler
```

2. **Login to Cloudflare**:
```bash
wrangler login
```

3. **Create D1 Database**:
```bash
wrangler d1 create valentine_db
```

This will output something like:
```
✅ Successfully created DB 'valentine_db'

[[d1_databases]]
binding = "DB"
database_name = "valentine_db"
database_id = "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx"
```

4. **Update wrangler.toml**:
   - Copy the `database_id` from the output above
   - Replace `YOUR_DATABASE_ID` in `wrangler.toml` with your actual database ID

5. **Initialize the Database Schema**:
```bash
wrangler d1 execute valentine_db --file=./schema.sql
```

6. **Install Dependencies**:
```bash
npm install
```

## 📝 Configuration

### wrangler.toml
The configuration file contains:
- Worker name
- D1 database binding
- Compatibility date

### Update Worker to Serve HTML

You have two options:

**Option 1: Use Cloudflare Pages (Recommended)**
1. Upload `index.html` and `stats.html` to Cloudflare Pages
2. Deploy the worker separately
3. Configure routes in `wrangler.toml`

**Option 2: Embed HTML in Worker**
Update `worker.js` to include your HTML:
```javascript
const HTML_CONTENT = `
  // Paste your index.html content here
`;
```

## 🚀 Deployment

### Local Development
```bash
npm run dev
```
This will start a local development server at `http://localhost:8787`

### Deploy to Cloudflare
```bash
npm run deploy
```

Your app will be deployed to: `https://valentine-app.YOUR_SUBDOMAIN.workers.dev`

## 📊 Database Schema

The app uses two tables:

### valentine_responses
- `id`: Auto-incrementing primary key
- `response`: User's response (always "yes")
- `no_hover_count`: Number of times user hovered over "No"
- `timestamp`: When the response was submitted
- `user_agent`: Browser/device information
- `ip_address`: User's IP address
- `created_at`: Database timestamp

### page_views (optional)
- Track page visits
- Useful for analytics

## 🔧 API Endpoints

### POST /api/save-response
Saves a user's response to the database.

**Request Body**:
```json
{
  "response": "yes",
  "noHoverCount": 5,
  "timestamp": "2024-02-14T12:00:00.000Z",
  "userAgent": "Mozilla/5.0..."
}
```

**Response**:
```json
{
  "success": true,
  "id": 123
}
```

### GET /api/stats
Retrieves statistics about all responses.

**Response**:
```json
{
  "success": true,
  "stats": {
    "total": 100,
    "averageHovers": 3.5,
    "hoverDistribution": [
      {"no_hover_count": 0, "count": 25},
      {"no_hover_count": 1, "count": 20}
    ],
    "recentResponses": [...]
  }
}
```

## 📱 Pages

### index.html
The main Valentine's Day question page with interactive buttons.

### stats.html
A beautiful dashboard showing:
- Total number of responses
- Average hesitation (hover count)
- Percentage of immediate "Yes" responses
- Distribution chart of hover counts
- Recent responses with timestamps

## 🎨 Customization

### Change Colors
Edit the CSS gradient backgrounds in `index.html`:
```css
background: linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%);
```

### Modify Hints
Edit the `hints` array in the JavaScript:
```javascript
const hints = [
  "Your custom hint here 🥺",
  "Another hint 💭",
  // Add more...
];
```

### Adjust Button Behavior
Modify these variables:
```javascript
const maxHovers = 8; // Number of hovers before "No" disappears
```

### Personalize Messages
Update the heading and question:
```html
<h1>Hey Beautiful!</h1>
<p class="question">Will you be my Valentine?</p>
```

## 🔒 Security Considerations

- IP addresses are stored but can be removed if privacy is a concern
- CORS is enabled for all origins (`*`) - restrict this in production
- Consider adding rate limiting to prevent spam
- User agents are stored for analytics but contain no personal information

## 📊 Querying Your Database

You can query your database directly using Wrangler:

```bash
# Get total responses
wrangler d1 execute valentine_db --command "SELECT COUNT(*) FROM valentine_responses"

# Get all responses
wrangler d1 execute valentine_db --command "SELECT * FROM valentine_responses ORDER BY timestamp DESC"

# Get average hover count
wrangler d1 execute valentine_db --command "SELECT AVG(no_hover_count) FROM valentine_responses"
```

## 🐛 Troubleshooting

### Worker not deploying
- Make sure you're logged in: `wrangler login`
- Check your `wrangler.toml` configuration
- Verify database ID is correct

### Database errors
- Ensure schema was applied: `wrangler d1 execute valentine_db --file=./schema.sql`
- Check D1 binding name matches in worker and config

### CORS issues
- Verify CORS headers are set correctly in worker
- Check browser console for specific errors

## 📈 Future Enhancements

- [ ] Add email notifications when someone says yes
- [ ] Create admin dashboard with authentication
- [ ] Add custom domain support
- [ ] Implement rate limiting
- [ ] Add multiple language support
- [ ] Create shareable result pages
- [ ] Add sound effects
- [ ] Mobile app version

## 📄 License

MIT License - feel free to use this for your own Valentine's Day proposal!

## 💝 Credits

Created with love for Valentine's Day 2024!

---

Made with ❤️ and Cloudflare Workers
