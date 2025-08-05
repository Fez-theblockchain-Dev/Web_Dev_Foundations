# Netlify Deployment Guide

## Overview
This project has been converted from a Node.js/Express server to a static site with Netlify Functions for serverless API endpoints.

## What Changed
- ✅ Express server converted to Netlify Functions
- ✅ Frontend JavaScript updated to work with Netlify Functions
- ✅ Static files (HTML, CSS, JS) remain unchanged
- ✅ API endpoints now served via serverless functions

## Deployment Steps

### 1. Install Netlify CLI (Optional)
```bash
npm install -g netlify-cli
```

### 2. Deploy to Netlify
You have several options:

#### Option A: Drag & Drop (Easiest)
1. Go to [netlify.com](https://netlify.com)
2. Create an account/login
3. Drag your entire project folder to the deploy area
4. Netlify will automatically detect the `netlify.toml` configuration

#### Option B: Git Integration (Recommended)
1. Push your code to GitHub/GitLab/Bitbucket
2. Connect your repository to Netlify
3. Netlify will automatically deploy on every push

#### Option C: Netlify CLI
```bash
netlify deploy
```

## Local Development

### Testing Netlify Functions Locally
```bash
# Install Netlify CLI
npm install -g netlify-cli

# Start local development server
netlify dev
```

This will start your site locally with Netlify Functions support.

## API Endpoints
Your API endpoints are now available at:
- `/.netlify/functions/api/` - Main API function
- `/.netlify/functions/api/home` - Home data endpoint

## Environment Variables
If you need environment variables (for database connections, API keys, etc.):
1. Go to your Netlify dashboard
2. Navigate to Site settings > Environment variables
3. Add your variables there

## Troubleshooting
- If functions don't work, check the Netlify Functions logs in your dashboard
- Make sure your `netlify.toml` file is in the root directory
- Verify that the `netlify/functions` directory exists 