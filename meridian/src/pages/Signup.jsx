import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import '../styles/Auth.css'

const Signup = () => {
  const [formData, setFormData] = useState({ name: '', email: '', password: '', confirm: '' })
  const [error, setError] = useState('')
  const navigate = useNavigate()

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSignup = (e) => {
    e.preventDefault()
    
    if (!formData.name || !formData.email || !formData.password) {
      setError('Please fill in all fields')
      return
    }
    
    if (formData.password !== formData.confirm) {
      setError('Passwords do not match')
      return
    }
    
    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters')
      return
    }
    
    const userData = { name: formData.name, email: formData.email }
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
        
        <form onSubmit={handleSignup} className="auth-form">
          <h2>Create Account</h2>
          
          {error && <div className="error-message">{error}</div>}
          
          <div className="form-group">
            <label htmlFor="name">Full Name</label>
            <input
              id="name"
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Your Name"
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="email">Email Address</label>
            <input
              id="email"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="your@email.com"
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              id="password"
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="••••••••"
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="confirm">Confirm Password</label>
            <input
              id="confirm"
              type="password"
              name="confirm"
              value={formData.confirm}
              onChange={handleChange}
              placeholder="••••••••"
            />
          </div>
          
          <button type="submit" className="auth-button">Create Account</button>
        </form>
        
        <div className="auth-footer">
          <p>Already have an account? <Link to="/">Login here</Link></p>
        </div>
      </div>
      
      <div className="auth-sidebar">
        <div className="sidebar-content">
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
  )
}

export default Signup
