// Importa os módulos necessários do React e do React Native
import React, { Component } from "react";
import { View, Text, StyleSheet, SafeAreaView, Platform, StatusBar, Image } from "react-native";
import { RFValue } from "react-native-responsive-fontsize";
import StoryCard from "./StoryCard"; // Importa o componente StoryCard

// Importa módulos do Expo
import * as Font from "expo-font";
import { FlatList } from "react-native-gesture-handler";
import * as SplashScreen from "expo-splash-screen";

// Impede o auto ocultar da tela de abertura automática do Expo
SplashScreen.preventAutoHideAsync();

// Carrega a fonte personalizada necessária
let customFonts = {
  "Bubblegum-Sans": require("../assets/fonts/BubblegumSans-Regular.ttf"),
};

// Carrega dados temporários de histórias a partir de um arquivo JSON
let stories = require("./temp_stories.json");

// Componente Feed
export default class Feed extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fontsLoaded: false,
    };
  }

  // Função assíncrona para carregar a fonte personalizada
  async _loadFontsAsync() {
    await Font.loadAsync(customFonts);
    this.setState({ fontsLoaded: true });
  }

  // Função chamada quando o componente é montado
  componentDidMount() {
    this._loadFontsAsync();
  }

  // Função para renderizar cada item da lista (StoryCard)
  renderItem = ({ item: story }) => {
    return <StoryCard story={story} navigation={this.props.navigation} />;
  };

  // Função para extrair a chave única de cada item para a FlatList
  keyExtractor = (item, index) => index.toString();

  render() {
    // Verifica se as fontes foram carregadas
    if (this.state.fontsLoaded) {
      // Oculta a tela de abertura do Expo
      SplashScreen.hideAsync();
      // Renderiza a interface do Feed
      return (
        <View style={styles.container}>
          <SafeAreaView style={styles.droidSafeArea} />

          {/* Cabeçalho do aplicativo */}
          <View style={styles.appTitle}>
            <View style={styles.appIcon}>
              <Image
                source={require("../assets/logo.png")}
                style={styles.iconImage}
              ></Image>
            </View>
            <View style={styles.appTitleTextContainer}>
              <Text style={styles.appTitleText}> App Narração de Histórias </Text>
            </View>
          </View>

          {/* Lista de histórias (FlatList) */}
          <View style={styles.cardContainer}>
            <FlatList
              keyExtractor={this.keyExtractor}
              data={stories}
              renderItem={this.renderItem}
            />
          </View>

          <View style={{ flex: 0.08 }} />
        </View>
      );
    }
  }
}

// Estilos do componente
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#15193c",
  },
  containerLight: {
    flex: 1,
    backgroundColor: "white",
  },
  droidSafeArea: {
    marginTop:
      Platform.OS === "android" ? StatusBar.currentHeight : RFValue(35),
  },
  appTitle: {
    flex: 0.07,
    flexDirection: "row",
  },
  appIcon: {
    flex: 0.3,
    justifyContent: "center",
    alignItems: "center",
  },
  iconImage: {
    width: "100%",
    height: "100%",
    resizeMode: "contain",
  },
  appTitleTextContainer: {
    flex: 1,
    justifyContent: "center",
  },
  appTitleText: {
    color: "white",
    fontSize: RFValue(28),
    fontFamily: "Bubblegum-Sans",
  },
  appTitleTextLight: {
    color: "black",
    fontSize: RFValue(28),
    fontFamily: "Bubblegum-Sans",
  },
  cardContainer: {
    flex: 0.85,
  },
  noStories: {
    flex: 0.85,
    justifyContent: "center",
    alignItems: "center",
  },
  noStoriesTextLight: {
    fontSize: RFValue(40),
    fontFamily: "Bubblegum-Sans",
  },
  noStoriesText: {
    color: "white",
    fontSize: RFValue(40),
    fontFamily: "Bubblegum-Sans",
  },
});