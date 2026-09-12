import { Navigate } from 'react-router-dom'

const ProtectedRoute = ({ component: Component }) => {
  const isAuthenticated = localStorage.getItem('meridianAuth')
  return isAuthenticated ? <Component /> : <Navigate to="/" />
}

export default ProtectedRoute
