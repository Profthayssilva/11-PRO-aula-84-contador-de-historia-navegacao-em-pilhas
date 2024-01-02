// Importa os módulos necessários do React, React Native e do React Navigation
import React, { Component } from "react";
import { StyleSheet } from "react-native";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import { RFValue } from "react-native-responsive-fontsize";
import Ionicons from "react-native-vector-icons/Ionicons";

import Feed from "../screens/Feed";
import CreateStory from "../screens/CreateStory";

// Cria um componente de navegação de abas inferiores usando o React Navigation
const Tab = createMaterialBottomTabNavigator();

// Define o componente BottomTabNavigator como uma classe que estende o componente React
export default class BottomTabNavigator extends Component {
  render() {
    return (
      // Renderiza o componente Tab.Navigator para a navegação de abas inferiores
      <Tab.Navigator
        labeled={false}
        barStyle={styles.bottomTabStyle}
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            // Lógica para determinar qual ícone exibir com base na rota
            let iconName;
            if (route.name === "Feed") {
              iconName = focused ? "home" : "home-outline";
            } else if (route.name === "CreateStory") {
              iconName = focused ? "add-circle" : "add-circle-outline";
            }
            // Retorna o componente Ionicons com o ícone apropriado, tamanho e cor
            return (
              <Ionicons
                name={iconName}
                size={RFValue(25)}
                color={color}
                style={styles.icons}
              />
            );
          },
        })}
        activeColor={"#ee8249"} // Cor da aba ativa
        inactiveColor={"gray"}  // Cor da aba inativa
      >
        {/* Configuração da primeira aba */}
        <Tab.Screen name="Feed" component={Feed} />
        
        {/* Configuração da segunda aba */}
        <Tab.Screen name="CreateStory" component={CreateStory} />
      </Tab.Navigator>
    );
  }
}

// Estilos do componente
const styles = StyleSheet.create({
  bottomTabStyle: {
    backgroundColor: "#2f345d",
    height: "8%",
    borderTopLeftRadius: RFValue(30),
    borderTopRightRadius: RFValue(30),
    overflow: "hidden",
    position: "absolute",
  },
  icons: {
    width: RFValue(30),
    height: RFValue(30),
  },
});