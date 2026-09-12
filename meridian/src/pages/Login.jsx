import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import '../styles/Auth.css'

const Login = () => {
  const [email, setEmail] = useState('investor@meridian.com')
  const [password, setPassword] = useState('demo123')
  const [error, setError] = useState('')
  const navigate = useNavigate()

  const handleLogin = (e) => {
    e.preventDefault()
    if (!email || !password) {
      setError('Please fill in all fields')
      return
    }
    
    const userData = { email, name: email.split('@')[0] }
    localStorage.setItem('meridianAuth', JSON.stringify(userData))
    navigate('/dashboard')
  }

  return (
    <div className="auth-container">
      <div className="auth-card">
        <div className="auth-logo">
          <h1>MERIDIAN</h1>
          <p>Global Trading Platform</p>
        </div>
        
        <form onSubmit={handleLogin} className="auth-form">
          <h2>Investor Login</h2>
          
          {error && <div className="error-message">{error}</div>}
          
          <div className="form-group">
            <label htmlFor="email">Email Address</label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your@email.com"
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
            />
          </div>
          
          <button type="submit" className="auth-button">Login</button>
        </form>
        
        <div className="auth-footer">
          <p>Don't have an account? <Link to="/signup">Sign up here</Link></p>
        </div>
      </div>
      
      <div className="auth-sidebar">
        <div className="sidebar-content">
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
  )
}

export default Login
