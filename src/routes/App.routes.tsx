import * as React from 'react'
import { createDrawerNavigator } from '@react-navigation/drawer'
import Dashboard from '../screens/Dashboard'
import RoomStack from './RoomStack'

const Drawer = createDrawerNavigator()

export default function AppRoutes() {
  return (
    <Drawer.Navigator initialRouteName="Dashboard">
      <Drawer.Screen name="Dashboard" component={Dashboard} />
      <Drawer.Screen name="Rooms" component={RoomStack} />
    </Drawer.Navigator>
  )
}
