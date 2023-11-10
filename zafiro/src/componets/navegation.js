import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Button,
} from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import Modal from "react-native-modal";
import Log_in from "./screens/LoginScreen.js";
import Agendar from "./screens/AgendarScreen.js";
import PrincipalScreen from "./screens/PrincipalScreen.js";
import EliminarScreen from "./screens/EliminarScreen.js";
import { ChatScreen } from "./screens/ChatScreen.js";

const Stack = createStackNavigator();

const Navegador = () => {
  const [isModalVisible, setModalVisible] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userId, setUserId] = useState(null);

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  const handleLogin = (userId) => {
    // Lógica de inicio de sesión aquí

    // Después de una autenticación exitosa, llama a la función setIsLoggedIn para actualizar el estado
    setIsLoggedIn(true);
    setUserId(userId); // Almacena el ID del usuario en el estado
  };

  const handleLogout = () => {
    // Lógica de cierre de sesión aquí
    setIsLoggedIn(false); // Restablece el estado de autenticación a no autenticado
    setUserId(null); // Restablece el ID del usuario a null
  };

  return (
    <View style={{ flex: 1 }}>
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
          {() => <PrincipalScreen isLoggedIn={isLoggedIn} userId={userId} onLogout={handleLogout} />}
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
      </Stack.Navigator>

      {/* Botón de chat solo visible después de iniciar sesión */
      isLoggedIn && userId && !isModalVisible && (
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


// import React from 'react';
// import { NavigationContainer } from '@react-navigation/native';
// import { createStackNavigator } from '@react-navigation/stack';
// import Log_in from './screens/LoginScreen.js';
// import Agendar from './screens/AgendarScreen.js';
// import PrincipalScreen from './screens/PrincipalScreen.js';

// const Stack = createStackNavigator();

// const Navegador = () => {
//   return (
//     <NavigationContainer>
//       <Stack.Navigator initialRouteName="PrincipalScreen">
//         <Stack.Screen name="PrincipalScreen" options={{title: 'Menu',headerStyle: {backgroundColor: 'blue',},headerTintColor: 'white',}}component={PrincipalScreen} />
//         <Stack.Screen name="LogInScreen" options={{title: 'Inicio de sesión',headerStyle: {backgroundColor: 'blue',},headerTintColor: 'white',}}component={Log_in} />
//         <Stack.Screen name="Agendar" options={{title: 'Agendar Hora',headerStyle: {backgroundColor: 'blue',},headerTintColor: 'white',}} component={Agendar} />
//       </Stack.Navigator>
//     </NavigationContainer>
//   );
// };

// export default Navegador;
