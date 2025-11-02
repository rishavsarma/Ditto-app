# Deployment Guide - Ditto App

## Pre-Deployment Checklist

- [ ] All tests passing
- [ ] No TypeScript errors
- [ ] Environment variables configured
- [ ] Images optimized
- [ ] Security headers configured
- [ ] Analytics setup complete
- [ ] Error tracking configured
- [ ] Performance tested

## Environment Setup

### Production Environment Variables

Create `.env.production` with:

```env
NEXT_PUBLIC_APP_URL=https://ditto-app.com
NEXT_PUBLIC_APP_NAME=Ditto
NEXT_PUBLIC_ENABLE_ANALYTICS=true
NEXT_PUBLIC_ENABLE_PWA=true
NODE_ENV=production
```

## Deployment Options

### Option 1: Vercel (Recommended)

**Automatic Deployment via GitHub:**

1. Push your code to GitHub
2. Go to [Vercel](https://vercel.com)
3. Click "New Project"
4. Import your GitHub repository
5. Configure:
   - Framework Preset: Next.js
   - Build Command: `npm run build`
   - Output Directory: `.next`
6. Add environment variables
7. Deploy

**CLI Deployment:**

```bash
# Install Vercel CLI
npm i -g vercel

# Login
vercel login

# Deploy to production
vercel --prod
```

### Option 2: Netlify

```bash
# Install Netlify CLI
npm install -g netlify-cli

# Login
netlify login

# Initialize
netlify init

# Deploy
netlify deploy --prod
```

Build settings:
- Build command: `npm run build`
- Publish directory: `.next`

### Option 3: AWS Amplify

1. Go to AWS Amplify Console
2. Connect your repository
3. Configure build settings:
```yaml
version: 1
frontend:
  phases:
    preBuild:
      commands:
        - npm install
    build:
      commands:
        - npm run build
  artifacts:
    baseDirectory: .next
    files:
      - '**/*'
  cache:
    paths:
      - node_modules/**/*
```

### Option 4: Docker

```bash
# Build Docker image
docker build -t ditto-app .

# Run container
docker run -p 3000:3000 ditto-app
```

Create `Dockerfile`:
```dockerfile
FROM node:20-alpine AS base

FROM base AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app
COPY package*.json ./
RUN npm ci

FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN npm run build

FROM base AS runner
WORKDIR /app
ENV NODE_ENV production
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs
COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static
USER nextjs
EXPOSE 3000
ENV PORT 3000
CMD ["node", "server.js"]
```

### Option 5: Self-Hosted (VPS)

**Prerequisites:**
- Node.js 18+ installed
- Nginx configured
- PM2 for process management

```bash
# Clone repository
git clone https://github.com/yourusername/ditto-app.git
cd ditto-app

# Install dependencies
npm install

# Build
npm run build

# Install PM2
npm install -g pm2

# Start with PM2
pm2 start npm --name "ditto-app" -- start

# Save PM2 configuration
pm2 save
pm2 startup
```

**Nginx Configuration:**

```nginx
server {
    listen 80;
    server_name ditto-app.com www.ditto-app.com;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
```

## Post-Deployment Steps

### 1. Configure Custom Domain

**Vercel:**
- Go to project settings
- Add domain under "Domains" section
- Update DNS records as instructed

**DNS Records:**
```
Type: A
Name: @
Value: [Your server IP]

Type: CNAME
Name: www
Value: ditto-app.com
```

### 2. SSL Certificate

**Vercel:** Automatic SSL via Let's Encrypt

**Manual (Let's Encrypt):**
```bash
sudo certbot --nginx -d ditto-app.com -d www.ditto-app.com
```

### 3. Configure CDN

**Cloudflare Setup:**
1. Add site to Cloudflare
2. Update nameservers
3. Enable:
   - Auto Minify (JS, CSS, HTML)
   - Brotli compression
   - HTTP/2
   - Always Use HTTPS

### 4. Monitoring & Analytics

**Setup Vercel Analytics:**
Already integrated via `@vercel/analytics`

**Add Error Tracking (Sentry):**
```bash
npm install @sentry/nextjs
npx @sentry/wizard@latest -i nextjs
```

**Add Performance Monitoring:**
- Google PageSpeed Insights
- Lighthouse CI
- Web Vitals monitoring

### 5. Database & Backend (When Ready)

```bash
# Setup environment variables
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
RAZORPAY_KEY_ID=your_razorpay_key
RAZORPAY_KEY_SECRET=your_razorpay_secret
```

## Performance Optimization

### 1. Image Optimization
- Already configured via Next.js Image
- Using Unsplash CDN for external images

### 2. Code Splitting
- Automatic via Next.js App Router
- Dynamic imports for heavy components

### 3. Caching Strategy
```javascript
// next.config.mjs
async headers() {
  return [
    {
      source: '/:all*(svg|jpg|png)',
      headers: [
        {
          key: 'Cache-Control',
          value: 'public, max-age=31536000, immutable',
        },
      ],
    },
  ];
}
```

## Security Best Practices

### 1. Environment Variables
- Never commit `.env` files
- Use separate configs for dev/prod
- Rotate secrets regularly

### 2. API Rate Limiting
```typescript
// middleware.ts (when adding API)
import { rateLimit } from './lib/rate-limit'

export async function middleware(request: Request) {
  const limiter = await rateLimit(request)
  if (!limiter.success) {
    return new Response('Too Many Requests', { status: 429 })
  }
}
```

### 3. CORS Configuration
```typescript
// When adding API routes
const corsOptions = {
  origin: ['https://ditto-app.com'],
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true,
}
```

## Rollback Strategy

**Vercel:**
- Go to Deployments
- Select previous successful deployment
- Click "Promote to Production"

**PM2:**
```bash
# View previous deployments
pm2 list

# Restart with previous version
git checkout <previous-commit>
npm run build
pm2 restart ditto-app
```

## Monitoring

### Health Check Endpoint
Create `app/api/health/route.ts`:
```typescript
export async function GET() {
  return Response.json({ 
    status: 'ok', 
    timestamp: new Date().toISOString() 
  })
}
```

### Uptime Monitoring
- Use UptimeRobot or Pingdom
- Monitor `/api/health` endpoint
- Set up alerts for downtime

## Backup Strategy

```bash
# Automated daily backups
0 0 * * * /path/to/backup-script.sh

# backup-script.sh
#!/bin/bash
git archive --format=tar.gz -o backup-$(date +%Y%m%d).tar.gz HEAD
```

## CI/CD Pipeline

**GitHub Actions** (`.github/workflows/deploy.yml`):
```yaml
name: Deploy to Production

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '20'
      - run: npm ci
      - run: npm run build
      - run: npm run test
      - uses: amondnet/vercel-action@v25
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: ${{ secrets.ORG_ID }}
          vercel-project-id: ${{ secrets.PROJECT_ID }}
          vercel-args: '--prod'
```

## Troubleshooting

### Build Failures
```bash
# Clear cache and rebuild
rm -rf .next node_modules
npm install
npm run build
```

### Performance Issues
- Check Lighthouse scores
- Analyze bundle size: `npm run analyze`
- Review Core Web Vitals

### Deployment Errors
- Check environment variables
- Verify Node.js version compatibility
- Review deployment logs

## Support & Maintenance

- Monitor error rates daily
- Review performance metrics weekly
- Update dependencies monthly
- Security audits quarterly

---

**Production URL:** https://ditto-app.com
**Status Page:** https://status.ditto-app.com (setup recommended)
**Documentation:** https://docs.ditto-app.com (when available)
