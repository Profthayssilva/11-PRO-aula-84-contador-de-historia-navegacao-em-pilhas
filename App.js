import 'react-native-gesture-handler';
import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import DrawerNavigator from "./navigation/DrawerNavigator";

export default function App() {
  return (
    <NavigationContainer>
      <DrawerNavigator />
    </NavigationContainer>
  );
}




// NavigationContainer envolve toda a estrutura de navegação do seu aplicativo. 
// Drawer Navigator é um tipo de navegação que fornece um menu lateral deslizante.
