import { Box } from '@mui/system'
import { Navigate, Outlet } from 'react-router-dom'
import { useAuthContext } from '../contexts/AuthContext'

const AuthLayout = ({ children }) => {
  const auth = useAuthContext()

  if (auth.token) return <Navigate replace to="/app/dashboard" />

  return <Box>{children ? children : <Outlet />}</Box>
}

export default AuthLayout
