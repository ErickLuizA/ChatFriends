import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import Home from '../screens/Home'
import Signup from '../screens/Signup'
import Signin from '../screens/Signin'

const { Navigator, Screen } = createStackNavigator()

const AuthRoutes: React.FC = () => {
  return (
    <Navigator>
      <Screen name="Home" component={Home} options={{ headerShown: false }} />
      <Screen
        name="Signin"
        component={Signin}
        options={{ headerShown: false }}
      />
      <Screen
        name="Signup"
        component={Signup}
        options={{ headerShown: false }}
      />
    </Navigator>
  )
}

export default AuthRoutes
