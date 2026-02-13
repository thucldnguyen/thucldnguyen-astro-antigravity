# Keystatic GitHub Authentication Setup

## Problem
Keystatic requires GitHub OAuth authentication to work with GitHub storage. The "page isn't working" error occurs because the GitHub App hasn't been configured yet.

## Solution: Create a GitHub App

### Step 1: Create GitHub App

1. Go to https://github.com/settings/apps/new
2. Fill in the following details:

**GitHub App name**: `Keystatic CMS - thucldnguyen.com` (or any unique name)

**Homepage URL**: `https://thucldnguyen.com`

**Callback URL**: `https://thucldnguyen.com/api/keystatic/github/oauth/callback`

**Webhook**: Uncheck "Active"

**Permissions**:
- Repository permissions:
  - Contents: Read and write
  - Metadata: Read-only

**Where can this GitHub App be installed?**: Only on this account

3. Click "Create GitHub App"

### Step 2: Generate Client Secret

1. After creating the app, scroll down to "Client secrets"
2. Click "Generate a new client secret"
3. Copy the client secret (you'll only see it once!)

### Step 3: Install the App

1. On the GitHub App page, click "Install App" in the left sidebar
2. Select your account
3. Choose "Only select repositories"
4. Select `thucldnguyen-astro-antigravity`
5. Click "Install"

### Step 4: Add Environment Variables to Netlify

1. Go to your Netlify site dashboard
2. Navigate to **Site settings** → **Environment variables**
3. Add these variables:

```
KEYSTATIC_GITHUB_CLIENT_ID=<your-github-app-client-id>
KEYSTATIC_GITHUB_CLIENT_SECRET=<your-github-app-client-secret>
```

**Where to find these values:**
- Client ID: On your GitHub App page (https://github.com/settings/apps/your-app-name)
- Client Secret: The one you generated in Step 2

### Step 5: Deploy

After adding the environment variables, trigger a new deploy on Netlify (or just push a new commit).

## Local Development

For local development, the config is already set to use `local` mode, so you don't need GitHub authentication when running `npm run dev`. 

If you want to test GitHub mode locally:

1. Create a `.env` file in your project root:
```env
KEYSTATIC_GITHUB_CLIENT_ID=your-client-id
KEYSTATIC_GITHUB_CLIENT_SECRET=your-client-secret
```

2. Add `http://localhost:4321/api/keystatic/github/oauth/callback` to your GitHub App's callback URLs

## Verification

After setup:
1. Visit `https://thucldnguyen.com/keystatic`
2. Click "Sign in with GitHub"
3. Authorize the app
4. You should now see the Keystatic admin interface!

## Alternative: Keystatic Cloud (Easier)

If you don't want to manage a GitHub App, you can use Keystatic Cloud:

1. Sign up at https://keystatic.cloud
2. Connect your GitHub repository
3. Update `keystatic.config.ts`:

```typescript
export default config({
  storage: {
    kind: 'cloud',
  },
  cloud: {
    project: 'your-project-slug',
  },
  // ... rest of config
});
```

This handles all authentication for you automatically.
