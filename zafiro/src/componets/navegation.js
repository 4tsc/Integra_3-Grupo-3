import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Button,
  Image,
} from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import Modal from "react-native-modal";
import Log_in from "./screens/LoginScreen.js";
import Agendar from "./screens/AgendarScreen.js";
import PrincipalScreen from "./screens/PrincipalScreen.js";
import EliminarScreen from "./screens/EliminarScreen.js";
import { ChatScreen } from "./screens/ChatScreen.js";
import Swiper from 'react-native-swiper';

const Stack = createStackNavigator();

const Navegador = () => {
  const [isModalVisible, setModalVisible] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  return (
    <View style={{ flex: 1 }}>
      <Swiper
        style={{ height: '70%' }} // Establece la altura del Swiper
        loop={false}
        autoplay={true}
        autoplayTimeout={5}
      >
        <View style={styles.slide}>
          <Image
            source={require("../componets/images/UCT_logo.png")}
            style={styles.image}
          />
        </View>
        <View style={styles.slide}>
          <Image
            source={require("../componets/images/prueba_2.jpg")}
            style={styles.image}
          />
        </View>
        <View style={styles.slide}>
          <Image
            source={require("../componets/images/prueba_3.jpg")}
            style={styles.image}
          />
        </View>
      </Swiper>

      <Stack.Navigator initialRouteName="LogInScreen">
        <Stack.Screen
          name="LogInScreen"
          options={{
            title: "Inicio de sesión",
            headerStyle: { backgroundColor: "#01568e" },
            headerTintColor: "white",
          }}
        >
          {(props) => <Log_in {...props} onLogin={handleLogin} />}
        </Stack.Screen>
        <Stack.Screen
          name="PrincipalScreen"
          options={{ headerShown: false }}
        >
          {() => <PrincipalScreen isLoggedIn={isLoggedIn} />}
        </Stack.Screen>
        <Stack.Screen
          name="Agendar"
          options={{
            title: "Agendar Hora",
            headerStyle: { backgroundColor: "#01568e" },
            headerTintColor: "white",
          }}
          component={Agendar}
        />
        <Stack.Screen
          name="EliminarScreen"
          options={{
            title: "Eliminar Hora",
            headerStyle: { backgroundColor: "blue" },
            headerTintColor: "white",
          }}
          component={EliminarScreen}
        />
        <Stack.Screen
          name="ChatScreen"
          options={{
            title: "Chat",
            headerStyle: { backgroundColor: "blue" },
            headerTintColor: "white",
          }}
          component={ChatScreen}
        />
      </Stack.Navigator>

      {isLoggedIn && !isModalVisible && (
        <TouchableOpacity style={styles.floatingButton} onPress={toggleModal}>
          <Text style={styles.buttonText}>Chat</Text>
        </TouchableOpacity>
      )}

      <Modal isVisible={isModalVisible}>
        <Button title="Cerrar" onPress={toggleModal} />
        <ChatScreen />
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  slide: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    width: '100%', // Establece el ancho de la imagen
    height: '100%', // Establece la altura de la imagen
    resizeMode: "contain", // Ajusta la imagen sin distorsionarla
  },
  floatingButton: {
    position: "absolute",
    bottom: 60,
    right: 20,
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: "#01568e",
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: {
    color: "white",
    fontSize: 18,
  },
});

export default Navegador;
