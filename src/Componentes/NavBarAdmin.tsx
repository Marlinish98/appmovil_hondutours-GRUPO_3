import { View, Text } from 'react-native'
import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import Perfil from '../Page/Perfil'
import Admin from '../Page/Admin'
import { MaterialIcons } from '@expo/vector-icons'
export default function NavBarAdmin() {

  const tab = createBottomTabNavigator()


  return (

        <tab.Navigator id="NavBar">
          <tab.Screen 
  name="Admin" 
  component={Admin} 
  options={{
    title: "Administrar",
    tabBarIcon: ({ size }) => (

      <MaterialIcons name="settings" size={size} color="#40D3D3" />
    ),
  }}
/>

<tab.Screen 
  name="Perfil" 
  component={Perfil} 
  options={{
    title: "Mi Perfil",
    tabBarIcon: ({size }) => (
      <MaterialIcons 
        name="person"  
        size={size} 
        color="#40D3D3"
      />
    ),
  }}
/>
             
        </tab.Navigator>

  )
}