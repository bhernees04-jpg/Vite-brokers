# Meridian Broker — Global Trading Platform

## Design Concept

**Meridian** is a sophisticated trading broker whose identity is the line connecting your target regions: Europe → South America → Asia → the Americas, trading around the clock across time zones.

### Visual Identity

- **Primary Color**: Deep indigo (#1a1a3e) trading-floor palette
- **Accent**: Brass/gold (#d4af37) tying directly to gold commodity trading
- **Gains**: Muted teal (#2d9d9e) instead of stock red-green clichés
- **Losses**: Muted coral (#e07856)
- **Typography**: 
  - Display: Serif (Georgia) for brand voice
  - Data: Monospace (Courier New) for ticker data

## Features

✅ **Investor Authentication**
- Secure login/signup flow
- Demo credentials: `investor@meridian.com` / `demo123`

✅ **Interactive Dashboard**
- Real-time portfolio metrics
- 7-day performance chart with time range selection
- Live market ticker with auto-updating prices
- Open positions table with P&L tracking

✅ **Market Data**
- EUR/USD, GBP/USD, USD/JPY, AUD/USD forex pairs
- Gold (GOLD) commodity pricing
- Bitcoin (BTC/USD) crypto trading
- Simulated real-time updates every 2 seconds

✅ **Responsive Design**
- Mobile-optimized layout
- 24/7 trading floor aesthetic
- Institutional-grade UI

## Tech Stack

- **Frontend**: React 18 + Vite
- **Routing**: React Router
- **Charts**: Recharts
- **Animation**: Framer Motion
- **Styling**: CSS3 with CSS Variables
- **Auth**: LocalStorage (demo only)

## Getting Started

### Installation

```bash
cd meridian
npm install
```

### Development Server

```bash
npm run dev
```

The app will open at `http://localhost:3000`

### Demo Credentials

**Login Page**
- Email: `investor@meridian.com`
- Password: `demo123`

**Or Create New Account**
- Fill signup form and create your account instantly

### Build for Production

```bash
npm run build
```

## Project Structure

```
meridian/
├── src/
│   ├── pages/
│   │   ├── Login.jsx         # Login page with pre-filled demo
│   │   ├── Signup.jsx        # Account creation flow
│   │   ├── Dashboard.jsx     # Main portfolio dashboard
│   │   └── Auth.css          # Authentication styling
│   ├── components/
│   │   ├── Header.jsx        # Top navigation with logout
│   │   ├── PortfolioCard.jsx # KPI cards (balance, P&L, etc.)
│   │   ├── MarketTicker.jsx  # Live market data scroll
│   │   ├── Chart.jsx         # Area/line chart component
│   │   ├── ProtectedRoute.jsx# Auth guard for routes
│   │   └── *.css             # Component-specific styling
│   ├── main.jsx              # App entry point
│   └── index.css             # Global styles & variables
├── index.html                # HTML template
├── vite.config.js            # Vite configuration
├── package.json              # Dependencies
└── README.md
```

## Investor Demo Flow

1. **Landing** → Login with demo credentials or create account
2. **Authentication** → JWT token stored in localStorage (demo)
3. **Dashboard** → View portfolio overview, P&L, and open positions
4. **Live Data** → Market ticker updates every 2 seconds
5. **Charts** → 7-day performance with time-range controls
6. **Logout** → Clear session and return to login

## Design Features

- **Meridian Theme**: Deep indigo background with brass accents
- **Typography Hierarchy**: Serif headings, monospace data
- **Visual Feedback**: Hover effects, smooth transitions, color coding
- **Accessibility**: High contrast, readable fonts, semantic HTML
- **Institutional Feel**: Trading floor aesthetic, professional palette

## Future Enhancements

- Real API integration (WebSocket for live prices)
- Advanced charting (TradingView library)
- Order placement interface
- Transaction history & statements
- Risk management tools
- Mobile app (React Native)
- Multi-language support
- Dark/Light theme toggle

## License

MIT

---

**Meridian Broker** — Where Global Markets Meet Your Timeline ⏰🌍
