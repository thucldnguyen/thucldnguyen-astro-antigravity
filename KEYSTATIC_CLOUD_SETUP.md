# Keystatic Cloud Setup Guide

## Why Keystatic Cloud?

Keystatic Cloud is the perfect solution for your needs:
- ✅ Works with static sites (no SSR required)
- ✅ Mobile-friendly interface for posting thoughts on the go
- ✅ Handles all authentication automatically
- ✅ No GitHub App configuration needed
- ✅ Free for personal projects

## Setup Steps

### 1. Sign Up for Keystatic Cloud

1. Go to https://keystatic.cloud
2. Click "Sign up" or "Get Started"
3. Sign in with your GitHub account
4. Authorize Keystatic Cloud to access your repositories

### 2. Create a New Project

1. Click "Create Project" or "New Project"
2. **Project Name**: `thucldnguyen-portfolio` (or any name you prefer)
3. **Repository**: Select `thucldnguyen/thucldnguyen-astro-antigravity`
4. **Branch**: `main`
5. Click "Create Project"

### 3. Get Your Project Slug

After creating the project, you'll see a **project slug** (usually in the URL or project settings).

Example: `thucldnguyen/thucldnguyen-portfolio`

**Copy this slug** - you'll need it for the next step.

### 4. Update Keystatic Configuration

I'll update the `keystatic.config.ts` file to use Keystatic Cloud mode.

The configuration will change from:
```typescript
storage: import.meta.env.DEV
  ? { kind: 'local' }
  : { kind: 'github', repo: '...' }
```

To:
```typescript
storage: import.meta.env.DEV
  ? { kind: 'local' }
  : { kind: 'cloud' }

cloud: {
  project: 'your-project-slug'
}
```

### 5. Remove GitHub App Environment Variables

Once Keystatic Cloud is working, you can remove these from Netlify:
- `KEYSTATIC_GITHUB_CLIENT_ID`
- `KEYSTATIC_GITHUB_CLIENT_SECRET`
- `PUBLIC_KEYSTATIC_GITHUB_APP_SLUG`

You won't need them anymore!

### 6. Deploy and Test

1. Push the updated configuration
2. Wait for Netlify to deploy
3. Visit `https://thucldnguyen.com/keystatic`
4. Sign in with Keystatic Cloud
5. Start posting thoughts from anywhere! 📱

## Mobile Usage

Once set up:
1. Visit `thucldnguyen.com/keystatic` on your phone
2. Sign in with Keystatic Cloud
3. Navigate to "Thoughts" collection
4. Click "Create Thought"
5. Write your thought and publish!

Keystatic Cloud will automatically commit changes to your GitHub repo, triggering a Netlify deploy.

## Benefits

- 🚀 **Static site performance** - No SSR overhead
- 📱 **Mobile-friendly** - Post from anywhere
- 🔐 **Secure** - Keystatic handles all authentication
- 🎯 **Simple** - No complex GitHub App setup
- ⚡ **Fast** - Optimized for content editing

## Next Steps

1. Sign up at https://keystatic.cloud
2. Create your project and get the project slug
3. Share the project slug with me
4. I'll update the configuration and deploy

Let's get you set up! 🎉
