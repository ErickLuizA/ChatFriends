import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import Rooms from '../screens/Rooms'
import Chat from '../screens/Chat'

const { Navigator, Screen } = createStackNavigator()

const RoomStack: React.FC = () => {
  return (
    <Navigator>
      <Screen name="Rooms" component={Rooms} options={{ headerShown: false }} />
      <Screen
        name="Chat"
        component={Chat}
        options={{
          headerStyle: { backgroundColor: '#111' },
          headerTitle: '',
          headerTintColor: '#ddd',
        }}
      />
    </Navigator>
  )
}

export default RoomStack
