// ========== AUTH STATE ==========
let currentUser = null;
const DEMO_CREDENTIALS = {
  email: 'investor@meridian.com',
  password: 'demo123'
};

// ========== INIT ==========
document.addEventListener('DOMContentLoaded', () => {
  const savedUser = localStorage.getItem('meridianAuth');
  if (savedUser) {
    currentUser = JSON.parse(savedUser);
    showDashboard();
  } else {
    showLogin();
  }
});

// ========== RENDER LOGIN PAGE ==========
function showLogin() {
  currentUser = null;
  const app = document.getElementById('app');
  app.innerHTML = `
    <div class="auth-container">
      <div class="auth-card">
        <div class="auth-logo">
          <h1>MERIDIAN</h1>
          <p>Global Trading Platform</p>
        </div>
        
        <form id="loginForm" class="auth-form">
          <h2>Investor Login</h2>
          
          <div id="loginError" class="error-message"></div>
          
          <div class="form-group">
            <label for="email">Email Address</label>
            <input id="email" type="email" value="investor@meridian.com" placeholder="your@email.com" required>
          </div>
          
          <div class="form-group">
            <label for="password">Password</label>
            <input id="password" type="password" value="demo123" placeholder="••••••••" required>
          </div>
          
          <button type="submit" class="auth-button">Login</button>
        </form>
        
        <div class="auth-footer">
          <p>Don't have an account? <a onclick="showSignup()">Sign up here</a></p>
        </div>
      </div>
      
      <div class="auth-sidebar">
        <div class="sidebar-content">
          <h3>Trade Globally. 24/7</h3>
          <p>Connect Europe to Asia through the Americas. Your meridian line never closes.</p>
          <ul>
            <li>Real-time market data</li>
            <li>24-hour trading access</li>
            <li>Global asset coverage</li>
            <li>Institutional-grade tools</li>
          </ul>
        </div>
      </div>
    </div>
  `;

  document.getElementById('loginForm').addEventListener('submit', (e) => {
    e.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    
    if (!email || !password) {
      showError('loginError', 'Please fill in all fields');
      return;
    }
    
    // Demo auth
    if (email === DEMO_CREDENTIALS.email && password === DEMO_CREDENTIALS.password) {
      currentUser = { email, name: email.split('@')[0] };
      localStorage.setItem('meridianAuth', JSON.stringify(currentUser));
      showDashboard();
    } else {
      showError('loginError', 'Invalid credentials. Use demo@meridian.com / demo123');
    }
  });
}

// ========== RENDER SIGNUP PAGE ==========
function showSignup() {
  const app = document.getElementById('app');
  app.innerHTML = `
    <div class="auth-container">
      <div class="auth-card">
        <div class="auth-logo">
          <h1>MERIDIAN</h1>
          <p>Global Trading Platform</p>
        </div>
        
        <form id="signupForm" class="auth-form">
          <h2>Create Account</h2>
          
          <div id="signupError" class="error-message"></div>
          
          <div class="form-group">
            <label for="name">Full Name</label>
            <input id="name" type="text" placeholder="Your Name" required>
          </div>
          
          <div class="form-group">
            <label for="signupEmail">Email Address</label>
            <input id="signupEmail" type="email" placeholder="your@email.com" required>
          </div>
          
          <div class="form-group">
            <label for="signupPassword">Password</label>
            <input id="signupPassword" type="password" placeholder="••••••••" required>
          </div>
          
          <div class="form-group">
            <label for="confirmPassword">Confirm Password</label>
            <input id="confirmPassword" type="password" placeholder="••••••••" required>
          </div>
          
          <button type="submit" class="auth-button">Create Account</button>
        </form>
        
        <div class="auth-footer">
          <p>Already have an account? <a onclick="showLogin()">Login here</a></p>
        </div>
      </div>
      
      <div class="auth-sidebar">
        <div class="sidebar-content">
          <h3>Join Meridian Investors</h3>
          <p>Access world-class trading infrastructure and global markets.</p>
          <ul>
            <li>No minimum deposit</li>
            <li>Industry-leading spreads</li>
            <li>Advanced charting tools</li>
            <li>Expert support 24/7</li>
          </ul>
        </div>
      </div>
    </div>
  `;

  document.getElementById('signupForm').addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('name').value;
    const email = document.getElementById('signupEmail').value;
    const password = document.getElementById('signupPassword').value;
    const confirm = document.getElementById('confirmPassword').value;
    
    if (!name || !email || !password) {
      showError('signupError', 'Please fill in all fields');
      return;
    }
    
    if (password !== confirm) {
      showError('signupError', 'Passwords do not match');
      return;
    }
    
    if (password.length < 6) {
      showError('signupError', 'Password must be at least 6 characters');
      return;
    }
    
    currentUser = { name, email };
    localStorage.setItem('meridianAuth', JSON.stringify(currentUser));
    showDashboard();
  });
}

// ========== RENDER DASHBOARD ==========
function showDashboard() {
  const app = document.getElementById('app');
  
  const portfolioData = {
    balance: 125840.50,
    gainLoss: 8250.75,
    gainLossPercent: 6.56,
    portfolioValue: 134091.25,
    portfolioChangePercent: 4.23,
    dayTradeCount: 12,
    dayTradePercent: 2.45
  };

  app.innerHTML = `
    <div class="dashboard">
      <header class="header">
        <div class="header-left">
          <div class="logo">
            <span class="logo-meridian">MERIDIAN</span>
            <span class="logo-tagline">Global Trading</span>
          </div>
        </div>
        <div class="header-right">
          <div class="user-info">
            <span class="user-name">${currentUser.name}</span>
            <span class="user-email">${currentUser.email}</span>
          </div>
          <button onclick="logout()" class="logout-btn">Logout</button>
        </div>
      </header>
      
      <main class="dashboard-main">
        <section class="dashboard-header">
          <h1>Portfolio Overview</h1>
          <p class="time-zones">Europe • South America • Asia • Americas — Trading 24/7</p>
        </section>

        <section class="portfolio-grid">
          ${renderPortfolioCard('Account Balance', portfolioData.balance, 1.23, '$')}
          ${renderPortfolioCard('Portfolio Value', portfolioData.portfolioValue, portfolioData.portfolioChangePercent, '$')}
          ${renderPortfolioCard('Total Gain/Loss', portfolioData.gainLoss, portfolioData.gainLossPercent, '$')}
          ${renderPortfolioCard('Today\'s Trades', portfolioData.dayTradeCount, portfolioData.dayTradePercent, '')}
        </section>

        <section class="market-ticker">
          <div class="ticker-header">LIVE MARKETS</div>
          <div class="ticker-scroll" id="tickerScroll"></div>
        </section>

        <section class="chart-section">
          <div class="chart-header">
            <h2>7-Day Performance</h2>
            <div class="chart-controls">
              <button class="chart-btn active" onclick="updateChart('7d')">7D</button>
              <button class="chart-btn" onclick="updateChart('1m')">1M</button>
              <button class="chart-btn" onclick="updateChart('3m')">3M</button>
              <button class="chart-btn" onclick="updateChart('1y')">1Y</button>
            </div>
          </div>
          <div class="chart-container">
            <canvas id="performanceChart"></canvas>
          </div>
        </section>

        <section class="positions-section">
          <h2>Open Positions</h2>
          <table class="positions-table">
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
              <tr class="positive">
                <td class="symbol">EUR/USD</td>
                <td>1.0750</td>
                <td>1.0825</td>
                <td>10 Lots</td>
                <td>$7,500</td>
                <td class="percent">+0.70%</td>
              </tr>
              <tr class="positive">
                <td class="symbol">GOLD</td>
                <td>2045.00</td>
                <td>2087.50</td>
                <td>5 oz</td>
                <td>$212.50</td>
                <td class="percent">+2.08%</td>
              </tr>
              <tr class="negative">
                <td class="symbol">USD/JPY</td>
                <td>151.50</td>
                <td>149.87</td>
                <td>8 Lots</td>
                <td>-$13,040</td>
                <td class="percent">-1.08%</td>
              </tr>
              <tr class="positive">
                <td class="symbol">BTC/USD</td>
                <td>38500</td>
                <td>42350</td>
                <td>0.5 BTC</td>
                <td>$1,925</td>
                <td class="percent">+10.10%</td>
              </tr>
            </tbody>
          </table>
        </section>
      </main>
    </div>
  `;

  // Initialize market ticker with live updates
  initMarketTicker();
  
  // Draw chart
  drawChart();
}

// ========== PORTFOLIO CARD RENDER ==========
function renderPortfolioCard(label, value, change, prefix = '$') {
  const isPositive = change >= 0;
  const changeClass = isPositive ? 'positive' : 'negative';
  const arrow = isPositive ? '▲' : '▼';
  const formattedValue = typeof value === 'number' ? value.toLocaleString('en-US', { minimumFractionDigits: 2 }) : value;
  
  return `
    <div class="portfolio-card">
      <div class="card-label">${label}</div>
      <div class="card-value">${prefix}${formattedValue}</div>
      <div class="card-change ${changeClass}">
        <span class="change-indicator">${arrow}</span>
        <span>${Math.abs(change).toFixed(2)}%</span>
      </div>
    </div>
  `;
}

// ========== MARKET TICKER ==========
let tickers = [
  { symbol: 'EUR/USD', price: 1.0825, change: 0.45 },
  { symbol: 'GBP/USD', price: 1.2745, change: -0.23 },
  { symbol: 'USD/JPY', price: 149.87, change: 1.12 },
  { symbol: 'AUD/USD', price: 0.6542, change: 0.67 },
  { symbol: 'GOLD', price: 2087.50, change: 2.34 },
  { symbol: 'BTC/USD', price: 42350, change: 3.45 },
];

function initMarketTicker() {
  renderTickers();
  setInterval(updateTickers, 2000);
}

function renderTickers() {
  const tickerScroll = document.getElementById('tickerScroll');
  if (!tickerScroll) return;
  
  tickerScroll.innerHTML = tickers.map(ticker => `
    <div class="ticker-item">
      <span class="ticker-symbol">${ticker.symbol}</span>
      <span class="ticker-price">${ticker.price.toFixed(2)}</span>
      <span class="ticker-change ${ticker.change >= 0 ? 'positive' : 'negative'}">
        ${ticker.change >= 0 ? '▲' : '▼'} ${Math.abs(ticker.change).toFixed(2)}%
      </span>
    </div>
  `).join('');
}

function updateTickers() {
  tickers = tickers.map(t => ({
    ...t,
    price: t.price * (1 + (Math.random() - 0.5) * 0.002),
    change: t.change + (Math.random() - 0.5) * 0.5
  }));
  renderTickers();
}

// ========== CHART ==========
function drawChart() {
  const canvas = document.getElementById('performanceChart');
  if (!canvas) return;
  
  const ctx = canvas.getContext('2d');
  const width = canvas.parentElement.offsetWidth;
  const height = 300;
  canvas.width = width;
  canvas.height = height;

  const data = [
    { day: 'Mon', value: 24000 },
    { day: 'Tue', value: 26500 },
    { day: 'Wed', value: 28000 },
    { day: 'Thu', value: 27500 },
    { day: 'Fri', value: 31000 },
    { day: 'Sat', value: 32500 },
    { day: 'Sun', value: 35000 },
  ];

  const padding = 40;
  const chartWidth = width - padding * 2;
  const chartHeight = height - padding * 2;
  const maxValue = Math.max(...data.map(d => d.value));
  const minValue = Math.min(...data.map(d => d.value));
  const range = maxValue - minValue;

  // Draw background grid
  ctx.strokeStyle = '#333355';
  ctx.lineWidth = 1;
  for (let i = 0; i <= 4; i++) {
    const y = padding + (chartHeight / 4) * i;
    ctx.beginPath();
    ctx.moveTo(padding, y);
    ctx.lineTo(width - padding, y);
    ctx.stroke();
  }

  // Draw area
  ctx.fillStyle = 'rgba(212, 175, 55, 0.2)';
  ctx.strokeStyle = '#d4af37';
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(padding, padding + chartHeight);

  data.forEach((point, i) => {
    const x = padding + (chartWidth / (data.length - 1)) * i;
    const y = padding + chartHeight - ((point.value - minValue) / range) * chartHeight;
    if (i === 0) ctx.lineTo(x, y);
    else ctx.lineTo(x, y);
  });

  ctx.lineTo(width - padding, padding + chartHeight);
  ctx.fill();
  ctx.stroke();

  // Draw points
  ctx.fillStyle = '#d4af37';
  data.forEach((point, i) => {
    const x = padding + (chartWidth / (data.length - 1)) * i;
    const y = padding + chartHeight - ((point.value - minValue) / range) * chartHeight;
    ctx.beginPath();
    ctx.arc(x, y, 4, 0, Math.PI * 2);
    ctx.fill();
  });

  // Draw labels
  ctx.fillStyle = '#b0b0b0';
  ctx.font = '12px Georgia';
  ctx.textAlign = 'center';
  data.forEach((point, i) => {
    const x = padding + (chartWidth / (data.length - 1)) * i;
    ctx.fillText(point.day, x, height - 10);
  });
}

function updateChart(period) {
  // Update active button
  document.querySelectorAll('.chart-btn').forEach(btn => btn.classList.remove('active'));
  event.target.classList.add('active');
  
  // Redraw chart
  drawChart();
}

// ========== LOGOUT ==========
function logout() {
  localStorage.removeItem('meridianAuth');
  currentUser = null;
  showLogin();
}

// ========== ERROR HANDLING ==========
function showError(elementId, message) {
  const errorEl = document.getElementById(elementId);
  if (errorEl) {
    errorEl.textContent = message;
    errorEl.classList.add('show');
    setTimeout(() => errorEl.classList.remove('show'), 5000);
  }
}
