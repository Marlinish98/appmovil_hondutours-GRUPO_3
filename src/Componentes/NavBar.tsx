import { View, Text } from 'react-native'
import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import MenuPrincipal from '../Page/PMenuPrincipal'
import Favoritos from '../Page/PFavoritos'
import Plan from '../Page/PPlan'
import Perfil from '../Page/Perfil'
import { MaterialIcons } from '@expo/vector-icons'
export default function NavBar() {

  const tab = createBottomTabNavigator()


  return (

    <tab.Navigator id="NavBar">
      <tab.Screen
        name="HonduTours"
        component={MenuPrincipal}
        options={{
          title: "Explorar",
          tabBarIcon: ({ size }) => (
            <MaterialIcons
              name="explore"
              size={size}
              color="#40D3D3"
            />
          ),
        }}
      />

      <tab.Screen
        name="Favoritos"
        component={Favoritos}
        options={{
          tabBarIcon: ({ size }) => (
            <MaterialIcons

              name="favorite"
              size={size}
              color="#40D3D3"
            />
          ),
        }}
      />

      <tab.Screen
        name="Crear Plan"
        component={Plan}
        options={{
          title: "Mi Plan",
          tabBarIcon: ({ size }) => (
            <MaterialIcons
              name="event"
              size={size}
              color="#40D3D3"
            />
          ),
        }}
      />

      <tab.Screen
        name="Perfil"
        component={Perfil}
        options={{
          tabBarIcon: ({color, size }) => (
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