// Importa os módulos necessários do React e do React Navigation
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import TabNavigator from './TabNavigator'; // Importa um componente de navegador de abas
import StoryScreen from '../screens/StoryScreen'; // Importa o componente de tela de histórias

// Cria um componente de navegador de pilha usando a função createStackNavigator do React Navigation
const Stack = createStackNavigator();

// Define o componente StackNavigator
const StackNavigator = () => {
    return (
        // Renderiza o componente Stack.Navigator com duas telas (Screens)
        <Stack.Navigator initialRouteName="Home" screenOptions={{ headerShown: false }}>
            {/* Configuração da primeira tela do navegador de pilha */}
            <Stack.Screen name="Tela inicial" component={TabNavigator} />
            
            {/* Configuração da segunda tela do navegador de pilha */}
            <Stack.Screen name="Tela de histórias" component={StoryScreen} />
        </Stack.Navigator>
    );
}

// Exporta o componente StackNavigator para ser usado em outras partes do aplicativo
export default StackNavigator;