// Importa os módulos necessários do React e do React Native
import React, { Component } from "react";
import { View, Text, StyleSheet, SafeAreaView, Platform, StatusBar, Image, Dimensions, TouchableOpacity } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { RFValue } from "react-native-responsive-fontsize";

// Importa módulos do Expo
import * as SplashScreen from "expo-splash-screen";
import * as Font from "expo-font";

// Impede o auto ocultar da tela de abertura automática do Expo
SplashScreen.preventAutoHideAsync();

// Carrega a fonte personalizada necessária
let customFonts = {
  "Bubblegum-Sans": require("../assets/fonts/BubblegumSans-Regular.ttf"),
};

// Componente StoryCard
export default class StoryCard extends Component {
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

  render() {
    // Verifica se as fontes foram carregadas
    if (this.state.fontsLoaded) {
      // Oculta a tela de abertura do Expo
      SplashScreen.hideAsync();
      // Renderiza a interface do StoryCard
      return (
        <TouchableOpacity
          style={styles.container}
          onPress={() => this.props.navigation.navigate('Tela de histórias', { story: this.props.story })}
        >
          <View style={styles.cardContainer}>
            {/* Imagem da história */}
            <Image
              source={require("../assets/story_image_1.png")}
              style={styles.storyImage}
            ></Image>

            <View style={styles.titleContainer}>
              {/* Título da história */}
              <Text style={styles.storyTitleText}>
                {this.props.story.title}
              </Text>
              {/* Autor da história */}
              <Text style={styles.storyAuthorText}>
                {this.props.story.author}
              </Text>
              {/* Descrição da história */}
              <Text style={styles.descriptionText}>
                {this.props.story.description}
              </Text>
            </View>

            <View style={styles.actionContainer}>
              {/* Botão de "curtir" com contagem */}
              <View style={styles.likeButton}>
                <Ionicons name={"heart"} size={RFValue(30)} color={"white"} />
                <Text style={styles.likeText}>12k</Text>
              </View>
            </View>
          </View>
        </TouchableOpacity>
      );
    }
  }
}

// Estilos do componente
const styles = StyleSheet.create({
  droidSafeArea: {
    marginTop:
      Platform.OS === "android" ? StatusBar.currentHeight : RFValue(35),
  },
  cardContainer: {
    margin: RFValue(13),
    backgroundColor: "#2f345d",
    borderRadius: RFValue(20),
    shadowColor: "rgba(0,0,0,0.3)",
    shadowOffset: {
      width: 4,
      height: 4,
    },
    shadowOpacity: RFValue(0.5),
    shadowRadius: RFValue(5),
    elevation: RFValue(2),
  },
  cardContainerLight: {
    margin: RFValue(13),
    backgroundColor: "white",
    borderRadius: RFValue(20),
    shadowColor: "rgb(0, 0, 0)",
    shadowOffset: {
      width: 4,
      height: 4,
    },
    shadowOpacity: RFValue(0.5),
    shadowRadius: RFValue(5),
    elevation: RFValue(2),
  },
  storyImage: {
    resizeMode: "contain",
    width: "95%",
    alignSelf: "center",
    height: RFValue(250),
  },
  titleContainer: {
    paddingLeft: RFValue(20),
    justifyContent: "center",
  },
  titleTextContainer: {
    flex: 0.8,
  },
  iconContainer: {
    flex: 0.2,
  },
  storyTitleText: {
    fontFamily: "Bubblegum-Sans",
    fontSize: RFValue(25),
    color: "white",
  },
  storyTitleTextLight: {
    fontFamily: "Bubblegum-Sans",
    fontSize: RFValue(25),
    color: "black",
  },
  storyAuthorText: {
    fontFamily: "Bubblegum-Sans",
    fontSize: RFValue(18),
    color: "white",
  },
  storyAuthorTextLight: {
    fontFamily: "Bubblegum-Sans",
    fontSize: RFValue(18),
    color: "black",
  },
  descriptionContainer: {
    marginTop: RFValue(5),
  },
  descriptionText: {
    fontFamily: "Bubblegum-Sans",
    fontSize: RFValue(13),
    color: "white",
  },
  descriptionTextLight: {
    fontFamily: "Bubblegum-Sans",
    fontSize: RFValue(13),
    color: "black",
  },
  actionContainer: {
    justifyContent: "center",
    alignItems: "center",
    padding: RFValue(10),
  },
  likeButton: {
    width: RFValue(160),
    height: RFValue(40),
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    backgroundColor: "#eb3948",
    borderRadius: RFValue(30),
  },
  likeText: {
    color: "white",
    fontFamily: "Bubblegum-Sans",
    fontSize: RFValue(25),
    marginLeft: RFValue(5),
  },
  likeTextLight: {
    color: "white",
    fontFamily: "Bubblegum-Sans",
    fontSize: RFValue(25),
    marginLeft: RFValue(5),
  },
});