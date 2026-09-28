import { createContext, useContext, useState } from 'react'

const AuthContext = createContext(null)

export const AuthProvider = ({ children }) => {
  const [accessToken, setAccessToken] = useState(null)
  const [user, setuser] = useState(null)

  const value = {
    accessToken,
    setAccessToken,
    user,
    setuser,
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}

export const useUser = () => {
  const context = useContext(AuthContext)

  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }

  return context
}


export default AuthContext
