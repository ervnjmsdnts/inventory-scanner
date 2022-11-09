import { Navigate, Outlet } from 'react-router-dom'
import Sidebar from '../components/Sidebar'
import { useAuthContext } from '../contexts/AuthContext'

const ApplicationLayout = ({ children }) => {
  const auth = useAuthContext()

  if (!auth.token) return <Navigate replace to="/" />

  return <Sidebar>{children ? children : <Outlet />}</Sidebar>
}

export default ApplicationLayout
