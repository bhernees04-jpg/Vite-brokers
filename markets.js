// Serverless functions have no persistent memory between invocations, so
// prices can't be mutated in-place like the original setInterval loop.
// Instead each price is a deterministic function of wall-clock time and a
// per-symbol seed, so it looks like it's moving smoothly and gives the same
// answer no matter which server instance handles the request.

export const MARKETS = {
  crypto: [
    { symbol: 'BTC-USD', name: 'Bitcoin', price: 63250, region: 'Global' },
    { symbol: 'ETH-USD', name: 'Ethereum', price: 3120, region: 'Global' },
    { symbol: 'SOL-USD', name: 'Solana', price: 148, region: 'Global' },
    { symbol: 'XRP-USD', name: 'XRP', price: 0.62, region: 'Global' },
    { symbol: 'BNB-USD', name: 'BNB', price: 578, region: 'Global' },
  ],
  fx: [
    { symbol: 'EUR/USD', name: 'Euro / US Dollar', price: 1.0864, region: 'Europe' },
    { symbol: 'GBP/USD', name: 'British Pound / US Dollar', price: 1.2731, region: 'Europe' },
    { symbol: 'USD/JPY', name: 'US Dollar / Japanese Yen', price: 149.82, region: 'Asia' },
    { symbol: 'USD/CNH', name: 'US Dollar / Chinese Yuan', price: 7.128, region: 'Asia' },
    { symbol: 'USD/BRL', name: 'US Dollar / Brazilian Real', price: 5.412, region: 'South America' },
    { symbol: 'USD/MXN', name: 'US Dollar / Mexican Peso', price: 17.05, region: 'South America' },
    { symbol: 'USD/CAD', name: 'US Dollar / Canadian Dollar', price: 1.362, region: 'Americas' },
    { symbol: 'AUD/USD', name: 'Australian Dollar / US Dollar', price: 0.658, region: 'Asia' },
  ],
  stocks: [
    { symbol: 'AAPL', name: 'Apple Inc.', price: 227.5, region: 'Americas' },
    { symbol: 'MSFT', name: 'Microsoft Corp.', price: 421.1, region: 'Americas' },
    { symbol: 'TSLA', name: 'Tesla Inc.', price: 248.3, region: 'Americas' },
    { symbol: 'SAP', name: 'SAP SE', price: 198.4, region: 'Europe' },
    { symbol: 'ASML', name: 'ASML Holding', price: 812.6, region: 'Europe' },
    { symbol: 'VALE', name: 'Vale S.A.', price: 11.85, region: 'South America' },
    { symbol: 'PBR', name: 'Petrobras', price: 14.92, region: 'South America' },
    { symbol: '9984.T', name: 'SoftBank Group', price: 9840, region: 'Asia' },
    { symbol: '0700.HK', name: 'Tencent Holdings', price: 372.4, region: 'Asia' },
    { symbol: '005930.KS', name: 'Samsung Electronics', price: 71400, region: 'Asia' },
  ],
  commodities: [
    { symbol: 'XAU/USD', name: 'Gold', price: 2612.4, region: 'Global' },
    { symbol: 'XAG/USD', name: 'Silver', price: 30.85, region: 'Global' },
    { symbol: 'WTI', name: 'Crude Oil (WTI)', price: 71.2, region: 'Americas' },
    { symbol: 'BRENT', name: 'Crude Oil (Brent)', price: 74.85, region: 'Europe' },
    { symbol: 'NATGAS', name: 'Natural Gas', price: 2.68, region: 'Americas' },
    { symbol: 'COPPER', name: 'Copper', price: 4.32, region: 'South America' },
  ],
};

export const USD_RATES = { USD: 1, EUR: 0.92, BRL: 5.41, JPY: 149.8 };

function seedFor(symbol) {
  let h = 0;
  for (let i = 0; i < symbol.length; i++) h = (h * 31 + symbol.charCodeAt(i)) % 10000;
  return h / 10000; // 0..1
}

export function priceNow(symbol, basePrice) {
  const seed = seedFor(symbol) * Math.PI * 2;
  const t = Date.now() / 1000;
  const wave = Math.sin(t / 47 + seed) * 0.004 + Math.sin(t / 181 + seed * 1.7) * 0.006;
  return Math.max(basePrice * (1 + wave), 0.0001);
}

export function marketSnapshot(category) {
  const cats = category ? [category] : Object.keys(MARKETS);
  const out = [];
  for (const cat of cats) {
    if (!MARKETS[cat]) continue;
    for (const m of MARKETS[cat]) {
      const current = priceNow(m.symbol, m.price);
      const changePct = ((current - m.price) / m.price) * 100;
      out.push({ symbol: m.symbol, name: m.name, region: m.region, category: cat, price: current, changePct });
    }
  }
  return out;
}

export function findMarket(symbol) {
  for (const cat of Object.keys(MARKETS)) {
    const found = MARKETS[cat].find((m) => m.symbol === symbol);
    if (found) return { ...found, category: cat, price: priceNow(symbol, found.price) };
  }
  return null;
}
