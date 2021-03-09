import React from 'react'
import { StatusBar } from 'react-native'
import { NavigationContainer } from '@react-navigation/native'

import { AuthProvider } from './context/AuthContext'
import Routes from './routes'

export default function App() {
  return (
    <NavigationContainer>
      <AuthProvider>
        <StatusBar backgroundColor="#111" />
        <Routes />
      </AuthProvider>
    </NavigationContainer>
  )
}
