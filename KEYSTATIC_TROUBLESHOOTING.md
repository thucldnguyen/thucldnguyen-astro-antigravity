# Keystatic Authentication Troubleshooting

## Issue
"Page isn't working" error when clicking "Sign in with GitHub" on production.

## Most Common Causes & Solutions

### 1. ✅ Missing GitHub App Slug Environment Variable

Keystatic needs to know your GitHub App's slug. Add this to Netlify:

**Variable name**: `PUBLIC_KEYSTATIC_GITHUB_APP_SLUG`  
**Value**: `thucldnguyen-app` (your GitHub App name in lowercase with hyphens)

### 2. ✅ Verify Callback URL Matches Exactly

In your GitHub App settings, the callback URL must be EXACTLY:
```
https://thucldnguyen.com/api/keystatic/github/oauth/callback
```

**Common mistakes:**
- Missing `/api/` prefix
- Using `www.thucldnguyen.com` instead of `thucldnguyen.com`
- Trailing slash

### 3. ✅ Check Environment Variables in Netlify

Go to Netlify → Site settings → Environment variables and verify you have:

```
KEYSTATIC_GITHUB_CLIENT_ID = <your-client-id>
KEYSTATIC_GITHUB_CLIENT_SECRET = <your-client-secret>
PUBLIC_KEYSTATIC_GITHUB_APP_SLUG = thucldnguyen-app
```

**Important**: After adding/changing environment variables, you MUST redeploy!

### 4. ✅ Verify GitHub App Permissions

In your GitHub App settings, confirm:
- ✅ Contents: **Read and write**
- ✅ Metadata: **Read-only**
- ✅ Repository: `thucldnguyen-astro-antigravity` is selected

### 5. ✅ Check Netlify Deploy Logs

After redeploying, check the Netlify deploy logs for any errors related to Keystatic or environment variables.

## Step-by-Step Fix

1. **Add the missing environment variable** to Netlify:
   - Name: `PUBLIC_KEYSTATIC_GITHUB_APP_SLUG`
   - Value: `thucldnguyen-app`

2. **Trigger a new deploy** in Netlify (or push a commit)

3. **Wait for deploy to complete**

4. **Test** by visiting `https://thucldnguyen.com/keystatic`

## Alternative: Check Browser Console

If it still doesn't work:

1. Open browser DevTools (F12)
2. Go to Console tab
3. Click "Sign in with GitHub"
4. Look for error messages
5. Share the error message for further debugging

## Nuclear Option: Regenerate Client Secret

If nothing else works:

1. Go to your GitHub App settings
2. Generate a NEW client secret
3. Update `KEYSTATIC_GITHUB_CLIENT_SECRET` in Netlify with the new value
4. Redeploy

## Expected Behavior

When working correctly:
1. Click "Sign in with GitHub"
2. Redirected to GitHub authorization page
3. Click "Authorize"
4. Redirected back to Keystatic admin interface
5. See your collections (Blog Posts, Thoughts)
