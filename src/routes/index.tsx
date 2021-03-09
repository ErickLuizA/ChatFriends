import React, { useContext } from 'react'
import { AuthContext } from '../context/AuthContext'

import AuthRoutes from './Auth.routes'
import AppRoutes from './App.routes'
import { ActivityIndicator, View, StyleSheet } from 'react-native'

const Routes: React.FC = () => {
  const { signed, user } = useContext(AuthContext)
  if (user === false) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" />
      </View>
    )
  }
  return signed ? <AppRoutes /> : <AuthRoutes />
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#111',
  },
})

export default Routes
