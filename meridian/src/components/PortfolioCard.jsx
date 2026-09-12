import '../styles/PortfolioCard.css'

const PortfolioCard = ({ label, value, change, prefix = '$', isTeal = true }) => {
  const isPositive = change >= 0

  return (
    <div className="portfolio-card">
      <div className="card-label">{label}</div>
      <div className="card-value">{prefix}{value.toLocaleString('en-US', { minimumFractionDigits: 2 })}</div>
      <div className={`card-change ${isPositive ? 'positive' : 'negative'}`}>
        <span className="change-indicator">{isPositive ? '▲' : '▼'}</span>
        <span>{Math.abs(change).toFixed(2)}%</span>
      </div>
    </div>
  )
}

export default PortfolioCard
