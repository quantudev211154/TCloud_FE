import { createContext, useContext } from 'react'
import { ReactNode, useState, useCallback } from 'react'
import { UserType } from '../types/user.type'
import JwtManager from '../utils/jwt.util'

type AuthContextType = {
  isLoading: boolean
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>
  isAuth: boolean
  setIsAuth: React.Dispatch<React.SetStateAction<boolean>>
  currentUser: UserType | null
  setCurrentUser: React.Dispatch<React.SetStateAction<UserType | null>>
  checkAuth: () => Promise<void>
  logout: () => void
}

const initValue: AuthContextType = {
  isLoading: true,
  setIsLoading: () => {},
  isAuth: false,
  setIsAuth: () => {},
  currentUser: null,
  setCurrentUser: () => {},
  checkAuth: () => Promise.resolve(),
  logout: () => {},
}

const AuthContext = createContext<AuthContextType>(initValue)

export const useAuthContext = () => useContext(AuthContext)

const AuthContextProvider = ({ children }: { children: ReactNode }) => {
  const [isLoading, setIsLoading] = useState(true)
  const [isAuth, setIsAuth] = useState(false)
  const [currentUser, setCurrentUser] = useState<UserType | null>(null)

  const checkAuth = useCallback(async () => {
    const data = await JwtManager.getNewAccessToken()

    if (data) {
      setIsAuth(true)
      setCurrentUser(data)
    }

    setIsLoading(false)
  }, [])

  const logout = () => {
    JwtManager.killAllToken()
    setIsAuth(false)
  }

  const authContextData = {
    isLoading,
    setIsLoading,
    isAuth,
    setIsAuth,
    currentUser,
    setCurrentUser,
    checkAuth,
    logout,
  }

  return (
    <AuthContext.Provider value={authContextData}>
      {children}
    </AuthContext.Provider>
  )
}

export default AuthContextProvider
