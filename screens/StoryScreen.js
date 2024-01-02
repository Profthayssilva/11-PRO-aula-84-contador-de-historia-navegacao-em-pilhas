// Importa os módulos necessários do React, React Native e outras bibliotecas
import React, { Component } from "react";
import Ionicons from "react-native-vector-icons/Ionicons";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  Platform,
  StatusBar,
  Image,
  ScrollView,
  Alert
} from "react-native";
import { RFValue } from "react-native-responsive-fontsize";
import { TouchableOpacity } from "react-native-gesture-handler";
import * as Speech from "expo-speech";
import * as Font from "expo-font";
import * as SplashScreen from 'expo-splash-screen';

// Impede o auto ocultar da tela de abertura automática do Expo
SplashScreen.preventAutoHideAsync();

// Carrega a fonte personalizada necessária
let customFonts = {
  "Bubblegum-Sans": require("../assets/fonts/BubblegumSans-Regular.ttf")
};

// Componente de tela de histórias
export default class StoryScreen extends Component {
  constructor(props) {
    super(props);
    // Estado inicial do componente
    this.state = {
      fontsLoaded: false,
      speakerColor: "gray",
      speakerIcon: "volume-high-outline"
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

  // Função para iniciar a leitura em voz alta (Text-to-Speech)
  async initiateTTS(title, author, story, moral) {
    const current_color = this.state.speakerColor;
    this.setState({
      speakerColor: current_color === "gray" ? "#ee8249" : "gray"
    });

    if (current_color === "gray") {
      Speech.speak(`${title} por ${author}`);
      Speech.speak(story);
      Speech.speak("A moral da história é!");
      Speech.speak(moral);
    } else {
      Speech.stop();
    }
  }

  render() {
    // Verifica se os parâmetros necessários estão disponíveis
    if (!this.props.route.params) {
      // Navega de volta para a tela inicial se os parâmetros não estiverem presentes
      this.props.navigation.navigate("Home");
    } else if (this.state.fontsLoaded) {
      // Oculta a tela de abertura do Expo
      SplashScreen.hideAsync();
      // Renderiza a interface da tela de histórias
      return (
        <View style={styles.container}>
          <SafeAreaView style={styles.droidSafeArea} />
          <View style={styles.appTitle}>
            <View style={styles.appIcon}>
              <Image
                source={require("../assets/logo.png")}
                style={styles.iconImage}
              ></Image>
            </View>
            <View style={styles.appTitleTextContainer}>
              <Text style={styles.appTitleText}>App Narração de Histórias</Text>
            </View>
          </View>
          <View style={styles.storyContainer}>
            <ScrollView style={styles.storyCard}>
              <Image
                source={require("../assets/story_image_1.png")}
                style={styles.image}
              ></Image>
              <View style={styles.dataContainer}>
                <View style={styles.titleTextContainer}>
                  <Text style={styles.storyTitleText}>
                    {this.props.route.params.story.title}
                  </Text>
                  <Text style={styles.storyAuthorText}>
                    {this.props.route.params.story.author}
                  </Text>
                  <Text style={styles.storyAuthorText}>
                    {this.props.route.params.story.created_on}
                  </Text>
                </View>
                <View style={styles.iconContainer}>
                  {/* Ícone do alto-falante para iniciar/parar a leitura em voz alta */}
                  <TouchableOpacity
                   // Ao pressionar o botão, a função initiateTTS é chamada para iniciar ou parar a leitura em voz alta.
                    onPress={() =>
                      this.initiateTTS(
                        this.props.route.params.story.title,    // Título da história
                        this.props.route.params.story.author,   // Autor da história
                        this.props.route.params.story.story,    // Conteúdo da história
                        this.props.route.params.story.moral     // Moral da história
                      )
                    }
                  >
                    {/* 
    O componente TouchableOpacity envolve o ícone Ionicons e responde ao evento onPress, 
    que é acionado quando o botão é pressionado.
  */}
                    <Ionicons
                        name={this.state.speakerIcon}             // Nome do ícone com base no estado do alto-falante
                        size={RFValue(30)}                         // Tamanho do ícone responsivo
                        color={this.state.speakerColor}           // Cor do ícone com base no estado do alto-falante
                        style={{ margin: RFValue(15) }}            // Estilo do ícone com uma margem responsiva
                    />
                  </TouchableOpacity>
                </View>
              </View>
              <View style={styles.storyTextContainer}>
                {/* Texto da história */}
                <Text style={styles.storyText}>
                  {this.props.route.params.story.story}
                </Text>
                {/* Moral da história */}
                <Text style={styles.moralText}>
                  Moral - {this.props.route.params.story.moral}
                </Text>
              </View>
              <View style={styles.actionContainer}>
                {/* Botão de "curtir" com contagem */}
                <View style={styles.likeButton}>
                  <Ionicons name={"heart"} size={RFValue(30)} color={"white"} />
                  <Text style={styles.likeText}>12k</Text>
                </View>
              </View>
            </ScrollView>
          </View>
        </View>
      );
    } else {
      // Se as fontes não foram carregadas, exibe um indicador de carregamento
      return <Text> Carregando... </Text>;
    }
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#15193c",
    height: "100%"
  },
  droidSafeArea: {
    marginTop: Platform.OS === "android" ? StatusBar.currentHeight : RFValue(35)
  },
  appTitle: {
    height: "15%",
    display: 'flex',
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row"
  },
  appIcon: {
    width: 50,
    height: 50
  },
  iconImage: {
    width: "100%",
    height: "100%",
    resizeMode: "contain"
  },
  appTitleTextContainer: {
    marginLeft: 20
  },
  appTitleText: {
    color: "white",
    fontSize: RFValue(25),
    fontFamily: "Bubblegum-Sans",
  },
  storyContainer: {
    flex: 1
  },
  storyCard: {
    margin: RFValue(20),
    backgroundColor: "#2f345d",
    borderRadius: RFValue(20)
  },
  image: {
    width: "100%",
    alignSelf: "center",
    height: RFValue(200),
    borderTopLeftRadius: RFValue(20),
    borderTopRightRadius: RFValue(20),
    resizeMode: "contain"
  },
  dataContainer: {
    flexDirection: "row",
    padding: RFValue(20)
  },
  titleTextContainer: {
    flex: 0.8
  },
  storyTitleText: {
    fontFamily: "Bubblegum-Sans",
    fontSize: RFValue(25),
    color: "white"
  },
  storyAuthorText: {
    fontFamily: "Bubblegum-Sans",
    fontSize: RFValue(18),
    color: "white"
  },
  iconContainer: {
    flex: 0.2
  },
  storyTextContainer: {
    padding: RFValue(20)
  },
  storyText: {
    fontFamily: "Bubblegum-Sans",
    fontSize: RFValue(15),
    color: "white"
  },
  moralText: {
    fontFamily: "Bubblegum-Sans",
    fontSize: RFValue(20),
    color: "white"
  },
  actionContainer: {
    justifyContent: "center",
    alignItems: "center",
    margin: RFValue(10)
  },
  likeButton: {
    width: RFValue(160),
    height: RFValue(40),
    flexDirection: "row",
    backgroundColor: "#eb3948",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: RFValue(30)
  },
  likeText: {
    color: "white",
    fontFamily: "Bubblegum-Sans",
    fontSize: RFValue(25),
    marginLeft: RFValue(5)
  }
});