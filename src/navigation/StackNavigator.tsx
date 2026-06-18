
import React, { useContext } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { usuarioContext } from '../Context/UsuarioContext';

import Login from '../Page/Login';
import NavBar from '../Componentes/NavBar';
import DetalleLugar from '../Page/DetalleLugar'; 
import Registro from '../Page/Registro';
import Admin from '../Page/Admin';
import { StackScreen } from 'react-native-screens';
import NavBarAdmin from '../Componentes/NavBarAdmin';

const Stack = createNativeStackNavigator();

export default function StackNavigator() {
  const { usuario } = useContext(usuarioContext);

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {usuario == null ? (
        <>
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="Registro" component={Registro} />
        </>
      ) : usuario.rol === 'ADMIN' ? (
        <>
          <Stack.Screen name="NavBarAdmin" component={NavBarAdmin}/>
        </>
      ) : (
        <>
          <Stack.Screen name="Main" component={NavBar} />
          <Stack.Screen name="DetalleLugar" component={DetalleLugar} />
        </>
      )}
    </Stack.Navigator>
  );
}