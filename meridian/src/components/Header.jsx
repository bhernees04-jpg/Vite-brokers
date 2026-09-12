import { useNavigate } from 'react-router-dom'
import '../styles/Header.css'

const Header = () => {
  const navigate = useNavigate()
  const user = JSON.parse(localStorage.getItem('meridianAuth') || '{}')

  const handleLogout = () => {
    localStorage.removeItem('meridianAuth')
    navigate('/')
  }

  return (
    <header className="header">
      <div className="header-left">
        <div className="logo">
          <span className="logo-meridian">MERIDIAN</span>
          <span className="logo-tagline">Global Trading</span>
        </div>
      </div>
      <div className="header-right">
        <div className="user-info">
          <span className="user-name">{user.name}</span>
          <span className="user-email">{user.email}</span>
        </div>
        <button onClick={handleLogout} className="logout-btn">Logout</button>
      </div>
    </header>
  )
}

export default Header
