# Thuc Nguyen's Portfolio

A modern, performant portfolio and blog built with Astro, featuring a micro-blogging platform and content management via Keystatic CMS.

🌐 **Live Site**: [thucldnguyen.com](https://thucldnguyen.com)

## ✨ Features

- 🚀 **Lightning Fast**: Built with Astro for optimal performance
- 📝 **Blog**: Long-form articles with MDX support
- 💭 **Thoughts**: Twitter-like micro-blogging feature with social interactions
- 🎨 **Modern Design**: Glassmorphism UI with dark mode support
- 📱 **Fully Responsive**: Mobile-first design that works on all devices
- ✍️ **Keystatic CMS**: Easy content management with GitHub integration
- 🔍 **SEO Optimized**: Canonical URLs, OpenGraph, and sitemap support
- ⚡ **Interactive Features**: Likes, comments, and sharing (no login required)

## 🛠️ Tech Stack

- **Framework**: [Astro](https://astro.build) v5
- **Styling**: Tailwind CSS with custom glassmorphism design
- **CMS**: [Keystatic](https://keystatic.com) for content management
- **Deployment**: Netlify with serverless functions
- **Storage**: Netlify Blob for reactions and comments
- **Security**: Cloudflare Turnstile, rate limiting, spam protection

## 📁 Project Structure

```
├── netlify/functions/     # Serverless API endpoints
│   ├── reactions.ts       # Likes/reactions handler
│   └── comments.ts        # Comments with spam protection
├── src/
│   ├── components/        # Reusable components
│   │   ├── ReactionButtons.tsx
│   │   ├── CommentSection.tsx
│   │   └── ThoughtCard.astro
│   ├── content/          # Content collections
│   │   ├── blog/         # Blog posts (MDX)
│   │   └── thoughts/     # Micro-blog posts
│   ├── layouts/          # Page layouts
│   └── pages/            # Routes
│       ├── blog/
│       └── thoughts/
├── keystatic.config.ts   # CMS configuration
└── astro.config.mjs      # Astro configuration
```

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ 
- npm or pnpm

### Installation

```bash
# Clone the repository
git clone https://github.com/thucldnguyen/thucldnguyen-astro-antigravity.git
cd thucldnguyen-astro-antigravity

# Install dependencies
npm install

# Start development server
npm run dev
```

Visit `http://localhost:4321` to see the site.

### Content Management

Access Keystatic CMS at `http://localhost:4321/keystatic` (local mode, no auth required in development).

## 📝 Available Commands

| Command           | Action                                                      |
| ----------------- | ----------------------------------------------------------- |
| `npm install`     | Install dependencies                                        |
| `npm run dev`     | Start dev server at `localhost:4321`                        |
| `npm run build`   | Build production site to `./dist/`                          |
| `npm run preview` | Preview production build locally                            |
| `netlify dev`     | Run with Netlify functions (for testing reactions/comments) |
| `npm run test:e2e` | Run Playwright E2E tests (headed by default)              |
| `npm run test:e2e -- --mode headless` | Run Playwright E2E tests in headless mode |

## 🧪 E2E Tests (Playwright)

The project includes Playwright end-to-end tests for:
- Blog reading flow
- GeoGuru gameplay start flow
- Contact form submission flow
- Thoughts reactions/comments flow
- Key edge cases (404 route, comment validation)

### Test Runner Options

```bash
# Local target, headed mode, screenshot on failure (default)
npm run test:e2e

# Headless mode
npm run test:e2e -- --mode headless

# Distributed run: 3 runner instances (shards) in parallel
npm run test:e2e -- --instances 3

# Distributed + headless
npm run test:e2e -- --instances 3 --mode headless

# Capture screenshots at all checkpoints (headed mode)
npm run test:e2e -- --screenshots all

# Run against production
npm run test:e2e -- --target prod

# Run against a custom URL
npm run test:e2e -- --target https://thucldnguyen.com
```

Options:
- `--mode headed|headless` (default: `headed`)
- `--screenshots all|failure` (default: `failure`)
- `--instances <n>` (default: `1`)
- `--target local|prod|<url>` (default: `local`)

For distributed runs, each shard is stored under:
- `test-results/artifacts/<run-id>/shard-<n>-of-<total>/`
- `playwright-report/<run-id>/shard-<n>-of-<total>/`

Example orchestration for 6 tests:
- `--instances 3` creates 3 shard runners.
- Playwright shard routing distributes tests across them (typically ~2 tests per shard).

## 🔧 Environment Variables

For production deployment, set these in Netlify:

```env
# Keystatic GitHub Authentication
KEYSTATIC_GITHUB_CLIENT_ID=your_github_app_client_id
KEYSTATIC_GITHUB_CLIENT_SECRET=your_github_app_client_secret
PUBLIC_KEYSTATIC_GITHUB_APP_SLUG=your-github-app-slug

# Cloudflare Turnstile (for comment CAPTCHA)
PUBLIC_TURNSTILE_SITE_KEY=your_turnstile_site_key
TURNSTILE_SECRET_KEY=your_turnstile_secret_key
```

## 🎨 Key Features

### Micro-Blogging (Thoughts)
- Quick posts up to 500 characters
- Optional image attachments
- Like and share functionality
- Comment system with spam protection
- Responsive grid layout (1/2/3 columns)

### Blog
- Full MDX support with custom components
- Syntax highlighting for code blocks
- Reading time estimates
- Tag-based organization
- Related posts

### Interactive Features
- **Reactions**: Like posts without authentication
- **Comments**: Spam-protected with honeypot, profanity filter, and CAPTCHA
- **Rate Limiting**: IP-based to prevent abuse
- **Optimistic UI**: Instant feedback on interactions

## 📄 License

MIT License - feel free to use this as a template for your own portfolio!

## 🙏 Credits

- Built with [Astro](https://astro.build)
- CMS powered by [Keystatic](https://keystatic.com)
- Deployed on [Netlify](https://netlify.com)
- Original blog template based on [Bear Blog](https://github.com/HermanMartinus/bearblog/)

---

Made with ❤️ by [Thuc Nguyen](https://thucldnguyen.com)
