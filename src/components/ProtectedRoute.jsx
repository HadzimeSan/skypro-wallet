import { Navigate, useLocation } from 'react-router-dom'
import { isAuthorized } from '../utils/authStorage.js'

export default function ProtectedRoute({ children }) {
  const location = useLocation()

  if (!isAuthorized()) {
    return <Navigate to="/login" replace state={{ from: location.pathname }} />
  }

  return children
}

