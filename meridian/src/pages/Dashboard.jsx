import { useState, useEffect } from 'react'
import Header from '../components/Header'
import PortfolioCard from '../components/PortfolioCard'
import MarketTicker from '../components/MarketTicker'
import Chart from '../components/Chart'
import './Dashboard.css'

const Dashboard = () => {
  const [chartData, setChartData] = useState([
    { name: 'Mon', value: 24000 },
    { name: 'Tue', value: 26500 },
    { name: 'Wed', value: 28000 },
    { name: 'Thu', value: 27500 },
    { name: 'Fri', value: 31000 },
    { name: 'Sat', value: 32500 },
    { name: 'Sun', value: 35000 },
  ])

  const [portfolioData] = useState({
    balance: 125840.50,
    gainLoss: 8250.75,
    gainLossPercent: 6.56,
    portfolioValue: 134091.25,
    portfolioChangePercent: 4.23,
    dayTradeCount: 12,
    dayTradePercent: 2.45
  })

  return (
    <div className="dashboard">
      <Header />
      
      <main className="dashboard-main">
        <section className="dashboard-header">
          <h1>Portfolio Overview</h1>
          <p className="time-zones">Europe • South America • Asia • Americas — Trading 24/7</p>
        </section>

        <section className="portfolio-grid">
          <PortfolioCard 
            label="Account Balance" 
            value={portfolioData.balance}
            change={1.23}
          />
          <PortfolioCard 
            label="Portfolio Value" 
            value={portfolioData.portfolioValue}
            change={portfolioData.portfolioChangePercent}
          />
          <PortfolioCard 
            label="Total Gain/Loss" 
            value={portfolioData.gainLoss}
            change={portfolioData.gainLossPercent}
          />
          <PortfolioCard 
            label="Today's Trades" 
            value={portfolioData.dayTradeCount}
            change={portfolioData.dayTradePercent}
            prefix=""
          />
        </section>

        <section className="chart-section">
          <div className="chart-header">
            <h2>7-Day Performance</h2>
            <div className="chart-controls">
              <button className="chart-btn active">7D</button>
              <button className="chart-btn">1M</button>
              <button className="chart-btn">3M</button>
              <button className="chart-btn">1Y</button>
            </div>
          </div>
          <Chart type="area" data={chartData} />
        </section>

        <section className="ticker-section">
          <MarketTicker />
        </section>

        <section className="positions-section">
          <h2>Open Positions</h2>
          <table className="positions-table">
            <thead>
              <tr>
                <th>Instrument</th>
                <th>Entry Price</th>
                <th>Current Price</th>
                <th>Position Size</th>
                <th>P&L</th>
                <th>%</th>
              </tr>
            </thead>
            <tbody>
              <tr className="positive">
                <td className="symbol">EUR/USD</td>
                <td>1.0750</td>
                <td>1.0825</td>
                <td>10 Lots</td>
                <td>$7,500</td>
                <td className="percent">+0.70%</td>
              </tr>
              <tr className="positive">
                <td className="symbol">GOLD</td>
                <td>2045.00</td>
                <td>2087.50</td>
                <td>5 oz</td>
                <td>$212.50</td>
                <td className="percent">+2.08%</td>
              </tr>
              <tr className="negative">
                <td className="symbol">USD/JPY</td>
                <td>151.50</td>
                <td>149.87</td>
                <td>8 Lots</td>
                <td>-$13,040</td>
                <td className="percent">-1.08%</td>
              </tr>
              <tr className="positive">
                <td className="symbol">BTC/USD</td>
                <td>38500</td>
                <td>42350</td>
                <td>0.5 BTC</td>
                <td>$1,925</td>
                <td className="percent">+10.10%</td>
              </tr>
            </tbody>
          </table>
        </section>
      </main>
    </div>
  )
}

export default Dashboard
