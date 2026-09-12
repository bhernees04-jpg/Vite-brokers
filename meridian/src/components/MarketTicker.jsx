import { useState, useEffect } from 'react'
import './MarketTicker.css'

const MarketTicker = () => {
  const [tickers, setTickers] = useState([
    { symbol: 'EUR/USD', price: 1.0825, change: 0.45 },
    { symbol: 'GBP/USD', price: 1.2745, change: -0.23 },
    { symbol: 'USD/JPY', price: 149.87, change: 1.12 },
    { symbol: 'AUD/USD', price: 0.6542, change: 0.67 },
    { symbol: 'GOLD', price: 2087.50, change: 2.34 },
    { symbol: 'BTC/USD', price: 42350, change: 3.45 },
  ])

  useEffect(() => {
    const interval = setInterval(() => {
      setTickers(prev => prev.map(t => ({
        ...t,
        price: t.price * (1 + (Math.random() - 0.5) * 0.002),
        change: t.change + (Math.random() - 0.5) * 0.5
      })))
    }, 2000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="market-ticker">
      <div className="ticker-header">LIVE MARKETS</div>
      <div className="ticker-scroll">
        {tickers.map((ticker, idx) => (
          <div key={idx} className="ticker-item">
            <span className="ticker-symbol">{ticker.symbol}</span>
            <span className="ticker-price">{ticker.price.toFixed(2)}</span>
            <span className={`ticker-change ${ticker.change >= 0 ? 'positive' : 'negative'}`}>
              {ticker.change >= 0 ? '▲' : '▼'} {Math.abs(ticker.change).toFixed(2)}%
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}

export default MarketTicker
