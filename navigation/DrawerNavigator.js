// Importa os módulos necessários do React e do React Navigation
import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import StackNavigator from "./StackNavigator"; // Importa um componente de navegador de pilha
import Profile from "../screens/Profile"; // Importa o componente de perfil

// Cria um componente de navegador de gaveta usando a função createDrawerNavigator do React Navigation
const Drawer = createDrawerNavigator();

// Define o componente DrawerNavigator
const DrawerNavigator = () => {
    return (
        // Renderiza o componente Drawer.Navigator com duas telas (Screens)
        <Drawer.Navigator>
            {/* Configuração da primeira tela do navegador de gaveta */}
            <Drawer.Screen name="Tela Inicial" component={StackNavigator} />
            
            {/* Configuração da segunda tela do navegador de gaveta */}
            <Drawer.Screen name="Perfil" component={Profile} /> 
        </Drawer.Navigator>
    );
}

// Exporta o componente DrawerNavigator para ser usado em outras partes do aplicativo
export default DrawerNavigator;




//`<Drawer.Navigator>` para definir as telas disponíveis na gaveta. 

// `<Drawer.Screen>` representa uma tela específica na gaveta. 

// A propriedade `name` define o nome da tela 










// a propriedade `component` define o componente React associado a essa tela.
