# Deployment Guide - Knowledge Camp Global

## Prerequisites

- Node.js 18+ and npm
- PostgreSQL 14+ database
- Domain name with SSL certificate
- Stripe account
- Builder.io account
- (Optional) Xero account
- (Optional) WhatsApp Business API
- (Optional) OpenAI API key

## Deployment Options

### Option 1: Vercel (Recommended)

1. Push your code to GitHub
2. Import project in Vercel
3. Configure environment variables in Vercel dashboard
4. Set up PostgreSQL database (Vercel Postgres or external)
5. Deploy

```bash
npm install -g vercel
vercel
```

### Option 2: Docker

1. Build the Docker image:
```bash
docker build -t knowledge-camp-global .
```

2. Run with Docker Compose:
```bash
docker-compose up -d
```

3. Run database migrations:
```bash
docker-compose exec app npx prisma migrate deploy
```

### Option 3: Traditional Server

1. Clone repository on server:
```bash
git clone https://github.com/benedictmukalula-stack/dge-camp-lms.git
cd dge-camp-lms
```

2. Install dependencies:
```bash
npm ci --production
```

3. Set up environment variables:
```bash
cp .env.example .env
# Edit .env with production values
```

4. Run database migrations:
```bash
npx prisma migrate deploy
```

5. Build application:
```bash
npm run build
```

6. Start with PM2:
```bash
npm install -g pm2
pm2 start npm --name "knowledge-camp" -- start
pm2 save
pm2 startup
```

## Environment Variables Configuration

### Required Variables

```env
DATABASE_URL="postgresql://user:password@host:5432/knowledge_camp"
NEXTAUTH_SECRET="your-secret-key-min-32-chars"
NEXTAUTH_URL="https://your-domain.com"
STRIPE_SECRET_KEY="sk_live_..."
STRIPE_PUBLIC_KEY="pk_live_..."
STRIPE_WEBHOOK_SECRET="whsec_..."
BUILDER_PUBLIC_KEY="your-builder-public-key"
```

### Optional Variables

```env
XERO_CLIENT_ID="your-xero-client-id"
XERO_CLIENT_SECRET="your-xero-client-secret"
WHATSAPP_API_TOKEN="your-whatsapp-token"
WHATSAPP_PHONE_NUMBER_ID="your-phone-number-id"
OPENAI_API_KEY="sk-..."
SMTP_HOST="smtp.gmail.com"
SMTP_PORT="587"
SMTP_USER="your-email@gmail.com"
SMTP_PASSWORD="your-app-password"
EMAIL_FROM="noreply@knowledgecamp.com"
```

## Database Setup

### Create Database

```sql
CREATE DATABASE knowledge_camp;
```

### Run Migrations

```bash
npx prisma migrate deploy
```

### Seed Initial Data (Optional)

```bash
npx prisma db seed
```

## Stripe Configuration

1. Create a Stripe account at https://stripe.com
2. Get your API keys from the Dashboard
3. Set up webhook endpoint:
   - URL: `https://your-domain.com/api/webhooks/stripe`
   - Events to listen: `payment_intent.succeeded`, `payment_intent.payment_failed`
4. Copy webhook signing secret to `STRIPE_WEBHOOK_SECRET`

## Builder.io Setup

1. Create account at https://builder.io
2. Create a new space
3. Set up page models:
   - `page` - For marketing pages
   - `course-page` - For course landing pages
4. Copy your Public API Key to `BUILDER_PUBLIC_KEY`

## SSL/HTTPS Setup

### With Nginx

```nginx
server {
    listen 80;
    server_name your-domain.com;
    return 301 https://$server_name$request_uri;
}

server {
    listen 443 ssl http2;
    server_name your-domain.com;

    ssl_certificate /path/to/cert.pem;
    ssl_certificate_key /path/to/key.pem;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

## Monitoring and Logging

### PM2 Logs

```bash
pm2 logs knowledge-camp
pm2 monit
```

### Docker Logs

```bash
docker-compose logs -f app
```

## Backup Strategy

### Database Backup

```bash
pg_dump -h localhost -U postgres knowledge_camp > backup_$(date +%Y%m%d).sql
```

### Automated Backups

```bash
# Add to crontab
0 2 * * * /path/to/backup-script.sh
```

## Scaling Considerations

1. **Database**: Use managed PostgreSQL (AWS RDS, Azure Database, etc.)
2. **File Storage**: Use S3 or similar for certificates and media
3. **Caching**: Add Redis for session management and caching
4. **CDN**: Use Cloudflare or similar for static assets
5. **Load Balancing**: Use multiple app instances behind a load balancer

## Security Checklist

- [ ] Use HTTPS everywhere
- [ ] Set strong `NEXTAUTH_SECRET` (32+ characters)
- [ ] Enable CSRF protection
- [ ] Set up rate limiting
- [ ] Use environment variables for all secrets
- [ ] Enable database SSL connections
- [ ] Set up regular security updates
- [ ] Configure CORS properly
- [ ] Enable security headers
- [ ] Set up monitoring and alerts

## Troubleshooting

### Build Issues

```bash
# Clear Next.js cache
rm -rf .next

# Reinstall dependencies
rm -rf node_modules package-lock.json
npm install
```

### Database Connection Issues

```bash
# Test connection
psql -h hostname -U username -d knowledge_camp

# Check Prisma connection
npx prisma db push
```

### Performance Issues

- Check database query performance
- Enable Next.js caching
- Use CDN for static assets
- Monitor server resources

## Support

For deployment support:
- Documentation: https://nextjs.org/docs/deployment
- Community: https://github.com/benedictmukalula-stack/dge-camp-lms/discussions
- Email: support@knowledgecamp.com
