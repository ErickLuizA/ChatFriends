import React from 'react'
import { createContext, useEffect, useState, useCallback } from 'react'
import { auth } from '../firebase/config'

interface AuthProps {
  signed: boolean
  user: any
  signOut(): void
}

const AuthContext = createContext({} as AuthProps)

const AuthProvider: React.FC = ({ children }) => {
  const [user, setUser] = useState<any>(false)

  const signOut = useCallback(async () => {
    await auth.signOut()
  }, [])

  useEffect(() => {
    auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        setUser(authUser)
      } else {
        setUser(null)
      }
    })
  }, [signOut])

  return (
    <AuthContext.Provider value={{ signed: Boolean(user), user, signOut }}>
      {children}
    </AuthContext.Provider>
  )
}

export { AuthProvider, AuthContext }
