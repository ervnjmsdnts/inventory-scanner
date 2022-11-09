import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState
} from 'react'

const AuthContext = createContext()

const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem('token'))

  const login = useCallback(() => {
    setToken(localStorage.getItem('token'))
  }, [])

  const logout = useCallback(() => {
    localStorage.removeItem('token')
    setToken(null)
    window.location.reload()
  }, [])

  const value = useMemo(
    () => ({ login, token, logout }),
    [token, login, logout]
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export const useAuthContext = () => useContext(AuthContext)

export default AuthProvider
