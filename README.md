# Ditto - Beauty & Wellness Booking App

A modern, full-featured salon and spa booking application built with Next.js 14, TypeScript, and Tailwind CSS.

## 🚀 Features

- **Authentication**: Phone + OTP login system
- **Location Selection**: Multi-city support with GPS integration
- **Store Discovery**: Browse salons with filters (Nearest, Top Rated, Most Popular)
- **Bill Payment**: Seamless bill payment with multiple offer selection
- **Wallet Integration**: Digital wallet for transactions
- **Responsive Design**: Mobile-first, works on all devices
- **Dark Mode**: Beautiful dark theme optimized for OLED displays
- **PWA Ready**: Installable as a progressive web app

## 🛠️ Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS + CSS Variables
- **Fonts**: Geist Sans & Geist Mono
- **Images**: Next.js Image Optimization
- **Analytics**: Vercel Analytics
- **Deployment**: Vercel (recommended)

## 📦 Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/ditto-app.git

# Navigate to the project directory
cd ditto-app

# Install dependencies
npm install
# or
pnpm install
# or
bun install

# Copy environment variables
cp .env.example .env.local

# Run the development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the app.

## 🔧 Environment Variables

Create a `.env.local` file in the root directory:

```env
NEXT_PUBLIC_APP_URL=http://localhost:3000
NEXT_PUBLIC_APP_NAME=Ditto
NEXT_PUBLIC_ENABLE_ANALYTICS=true
NEXT_PUBLIC_ENABLE_PWA=true
```

## 📁 Project Structure

```
ditto-app/
├── app/                    # Next.js app directory
│   ├── (auth)/            # Authentication pages
│   │   ├── page.tsx       # Login page
│   │   └── register/      # Registration page
│   ├── home/              # Main feed (FOR YOU)
│   ├── stores/            # Store listing and details
│   │   ├── [slug]/        # Individual store pages
│   │   │   ├── page.tsx   # Store details
│   │   │   ├── pay/       # Bill payment
│   │   │   └── checkout/  # Payment checkout
│   │   └── page.tsx       # All stores
│   ├── location/          # Location selector
│   ├── layout.tsx         # Root layout
│   ├── loading.tsx        # Global loading state
│   ├── error.tsx          # Error boundary
│   └── not-found.tsx      # 404 page
├── components/            # Reusable components
│   ├── app-header.tsx     # Common header
│   └── ui/                # UI components
├── lib/                   # Utilities and data
│   ├── data.ts            # Mock store data
│   ├── salon-data.ts      # Salon data
│   └── utils.ts           # Utility functions
├── public/                # Static assets
└── styles/                # Global styles
```

## 🎨 Design System

### Colors
- **Primary/Brand**: #E85A5A (Ditto Red)
- **Background**: Dark theme optimized
- **Typography**: Geist Sans for UI, Geist Mono for code

### Components
- Cards with elevation and hover effects
- Smooth animations and transitions
- Consistent spacing and typography
- Accessible color contrast

## 🚦 Page Routes

- `/` - Login page
- `/register` - Registration page
- `/home` - Main feed (FOR YOU tab)
- `/stores` - Store listing (STORES tab)
- `/stores/[slug]` - Store details
- `/stores/[slug]/pay` - Bill payment
- `/stores/[slug]/checkout` - Payment checkout
- `/location` - Location selector

## 🔐 Features in Detail

### Authentication
- Phone number + OTP verification
- Mock OTP: `1234` for testing
- Redirects to home after successful login

### Location Services
- 90+ cities supported
- Current location detection (GPS)
- Popular cities quick access
- Search functionality
- Persistent storage (localStorage)

### Store Features
- Real-time search and filtering
- Distance-based sorting
- Offer badges and discounts
- High-quality salon images
- Rating and reviews display

### Payment Flow
1. User selects store
2. Enters bill amount on pay page
3. Selects from multiple offers
4. Reviews bill summary on checkout
5. Accepts terms and conditions
6. Proceeds to payment gateway

### Wallet Integration
- Fixed ₹25 wallet amount
- Auto-applied on checkout
- Clear savings display

## 🔨 Development

```bash
# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Run type checking
npm run type-check

# Lint code
npm run lint
```

## 🚀 Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Import project in Vercel
3. Configure environment variables
4. Deploy

### Other Platforms

```bash
# Build the application
npm run build

# The output will be in the .next folder
# Serve it with any Node.js hosting provider
```

## 📱 PWA Configuration

The app is PWA-ready with:
- Manifest file (`/public/manifest.json`)
- Service worker support
- Offline capabilities
- Install prompt

## 🔒 Security

- Secure headers configured
- XSS protection enabled
- CSRF protection
- Content Security Policy ready
- Environment variable validation

## 🎯 Performance Optimizations

- Image optimization with Next.js Image
- Code splitting and lazy loading
- Efficient bundle size
- CDN integration for static assets
- Caching strategies

## 🐛 Known Issues & Limitations

- Payment gateway integration pending
- Backend API integration needed
- Real authentication system required
- Booking system to be implemented

## 🗺️ Roadmap

- [ ] Real backend API integration
- [ ] Payment gateway (Razorpay/Stripe)
- [ ] User profiles and history
- [ ] Booking system
- [ ] Review and rating system
- [ ] Push notifications
- [ ] Social login (Google, Facebook)
- [ ] Referral program
- [ ] Advanced search filters

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is licensed under the MIT License.

## 👥 Team

Built with ❤️ by the Ditto Team

## 📞 Support

For support, email support@ditto-app.com or join our Slack channel.

---

**Note**: This is a production-ready frontend. Backend integration and payment gateway setup are required for full functionality.
