import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native'; 
import UsuarioProvider from './src/Providers/UsuarioProvider';
import { LugarProvider } from './src/Providers/LugarProvider';
import { FavoritosProvider } from './src/Providers/FavoritosProvider';
import { PlanProvider } from './src/Providers/PlanProvider'; 
import StackNavigator from './src/navigation/StackNavigator';

export default function App() {
  return (
   <UsuarioProvider>
    <LugarProvider>
      <FavoritosProvider>
        <PlanProvider> 
          <NavigationContainer>
            <StackNavigator />
          </NavigationContainer>
        </PlanProvider>
      </FavoritosProvider>
    </LugarProvider>
  </UsuarioProvider>
  );
}