# Knowledge Camp Global Platform

A comprehensive Learning Management System (LMS) platform integrated with Builder.io for marketing, supporting course management, learner tracking, corporate training, and advanced reporting.

## ⚡ Quick Start

### Fastest Way to Run

```bash
# 1. Clone and navigate
git clone https://github.com/benedictmukalula-stack/dge-camp-lms.git
cd dge-camp-lms

# 2. Run the startup script
./start.sh
```

The script will:
- Create `.env` from `.env.example` if needed
- Install dependencies
- Generate Prisma client
- Start the development server at http://localhost:3000

### Health Check

Visit http://localhost:3000/api/health to verify the app is running.

### Manual Start

```bash
npm install                # Install dependencies
npx prisma generate        # Generate Prisma client
npm run dev                # Start dev server
```

## 🌟 Features

### Marketing & Discovery
- **Builder.io Integration**: Drag-and-drop marketing website builder
- **Course Discovery**: Browse and search available courses
- **Pricing Calculator**: Dynamic pricing for individual and corporate training
- **Landing Pages**: Customizable marketing pages

### LMS Core
- **Course Management**: Create, organize, and manage courses
- **Enrollment System**: Automated registration and enrollment
- **Progress Tracking**: Real-time learner progress monitoring
- **Certificate Generation**: Automated certificate issuance upon completion
- **Content Delivery**: Video, documents, quizzes, and assessments

### Payment & Billing
- **Stripe Integration**: Secure payment processing
- **Xero Integration**: Automated quote and invoice generation
- **Multiple Payment Options**: Credit card, bank transfer, corporate billing
- **Subscription Management**: Recurring payments for ongoing access

### Corporate Training
- **Bulk Enrollment**: Enroll multiple employees at once
- **Corporate Accounts**: Dedicated company portals
- **Team Management**: Organize learners by departments
- **Custom Reporting**: Track corporate training ROI
- **Dedicated Support**: Priority assistance for enterprise clients

### Multi-Role Dashboards
- **Learner Dashboard**: Course progress, certificates, recommendations
- **Corporate Dashboard**: Team overview, analytics, enrollment management
- **Trainer Dashboard**: Course creation, student progress, content management
- **Partner Dashboard**: Referral tracking, commission management
- **Admin Dashboard**: System-wide analytics, user management, content approval

### Support & Communication
- **AI-Assisted Support**: Intelligent chatbot for common queries
- **WhatsApp Routing**: Direct communication channel integration
- **Help Center**: Knowledge base and FAQs
- **Notification System**: Email and in-app notifications

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ and npm
- PostgreSQL database
- Stripe account
- Xero account (optional)
- Builder.io account

### Installation

1. Clone the repository:
```bash
git clone https://github.com/benedictmukalula-stack/dge-camp-lms.git
cd dge-camp-lms
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp .env.example .env
```

Edit `.env` with your configuration:
```env
# Database
DATABASE_URL="postgresql://user:password@localhost:5432/knowledge_camp"

# NextAuth
NEXTAUTH_SECRET="your-secret-key"
NEXTAUTH_URL="http://localhost:3000"

# Builder.io
BUILDER_PUBLIC_KEY="your-builder-public-key"
BUILDER_PRIVATE_KEY="your-builder-private-key"

# Stripe
STRIPE_SECRET_KEY="sk_test_..."
STRIPE_PUBLIC_KEY="pk_test_..."
STRIPE_WEBHOOK_SECRET="whsec_..."

# Xero
XERO_CLIENT_ID="your-xero-client-id"
XERO_CLIENT_SECRET="your-xero-client-secret"

# WhatsApp Business API
WHATSAPP_API_TOKEN="your-whatsapp-token"
WHATSAPP_PHONE_NUMBER_ID="your-phone-number-id"

# AI Support
OPENAI_API_KEY="sk-..."
```

4. Set up the database:
```bash
npm run db:generate
npm run db:push
```

5. Run the development server:
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📁 Project Structure

```
dge-camp-lms/
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── (auth)/            # Authentication pages
│   │   ├── (marketing)/       # Public marketing pages
│   │   ├── (dashboard)/       # Protected dashboard pages
│   │   ├── api/               # API routes
│   │   └── layout.tsx         # Root layout
│   ├── components/            # Reusable components
│   │   ├── ui/               # UI components
│   │   ├── dashboards/       # Dashboard components
│   │   ├── courses/          # Course components
│   │   └── marketing/        # Marketing components
│   ├── lib/                   # Utility functions and configs
│   │   ├── auth.ts           # NextAuth configuration
│   │   ├── db.ts             # Prisma client
│   │   ├── stripe.ts         # Stripe configuration
│   │   └── xero.ts           # Xero configuration
│   └── types/                 # TypeScript types
├── prisma/
│   └── schema.prisma          # Database schema
├── public/                    # Static assets
└── package.json
```

## 🔧 Configuration

### Builder.io Setup
1. Create a Builder.io account
2. Add your API keys to `.env`
3. Create page models in Builder.io dashboard
4. Start building marketing pages

### Stripe Setup
1. Create a Stripe account
2. Add webhook endpoint: `https://yourdomain.com/api/webhooks/stripe`
3. Configure products and prices
4. Test with Stripe test mode

### Xero Setup
1. Create a Xero developer account
2. Create an OAuth 2.0 app
3. Configure redirect URIs
4. Add credentials to `.env`

## 🧪 Testing

```bash
# Run all tests
npm test

# Run in watch mode
npm test -- --watch

# Run with coverage
npm test -- --coverage
```

## 🚢 Deployment

### Vercel (Recommended)
```bash
npm install -g vercel
vercel
```

### Docker
```bash
docker build -t knowledge-camp .
docker run -p 3000:3000 knowledge-camp
```

## 📊 Database Schema

The platform uses Prisma ORM with PostgreSQL. Key models include:
- User (learners, trainers, admins)
- Course
- Enrollment
- Progress
- Certificate
- Payment
- CorporateAccount
- Support Ticket

## 🔐 Security

- All routes are protected with NextAuth.js
- Role-based access control (RBAC)
- Secure payment processing via Stripe
- Data encryption at rest and in transit
- Regular security audits

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is proprietary software for Knowledge Camp Global.

## 📞 Support

For support, email support@knowledgecamp.com or use the in-app support system.

## 🙏 Acknowledgments

- Builder.io for the powerful content platform
- Stripe for secure payment processing
- Next.js and Vercel for the amazing framework
- All contributors and the Knowledge Camp team
