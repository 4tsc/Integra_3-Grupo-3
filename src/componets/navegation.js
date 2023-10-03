import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Button, TextInput } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import Modal from 'react-native-modal';
import Log_in from './screens/LoginScreen.js';
import Agendar from './screens/AgendarScreen.js';
import PrincipalScreen from './screens/PrincipalScreen.js';
import EliminarScreen from './screens/EliminarScreen.js';
import { FlatList } from 'react-native-web';

const Stack = createStackNavigator();

const frasesAleatorias = [
  'Hola, ¿en qué puedo ayudarte hoy?',
  '¿Cómo estás? ¿Hay algo específico de lo que te gustaría hablar?',
  '¡Hola! ¿En qué puedo asistirte?',
  'Estoy aquí para ayudarte. ¿Tienes alguna pregunta?',
  // Agrega más frases según sea necesario
];
//a
const ChatbotModal = ({ isVisible, toggleModal }) => {
  const fraseAleatoria = frasesAleatorias[Math.floor(Math.random() * frasesAleatorias.length)];

  return (
    <Modal isVisible={isVisible}>
      <View style={{ flex: 1, backgroundColor: 'white', justifyContent: 'center', alignItems: 'center' }}>
        <Text>CoipoUCT</Text>
        <FlatList
          style={{ flex: 1 }}
          data={frasesAleatorias}
          renderItem={({ item }) => <Text>{item}</Text>}
          keyExtractor={(item) => item}
        />
        <TextInput placeholder="Escribe tu mensaje aquí" />
        <Button title="Enviar" />
        <Button title="Cerrar" onPress={toggleModal} />
      </View>
    </Modal>
  );
};

const Navegador = () => {
  const [isModalVisible, setModalVisible] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  const handleLogin = () => {
    // Lógica de inicio de sesión aquí

    // Después de una autenticación exitosa, llama a la función setIsLoggedIn para actualizar el estado
    setIsLoggedIn(true);
  };

  return (
    <View style={{ flex: 1 }}>
      <Stack.Navigator initialRouteName="LogInScreen">
        <Stack.Screen name="LogInScreen" options={{ title: 'Inicio de sesión', headerStyle: { backgroundColor: '#01568e' }, headerTintColor: 'white' }}>
          {(props) => <Log_in {...props} onLogin={handleLogin} />}
        </Stack.Screen>
        <Stack.Screen name="PrincipalScreen" options={{ headerShown: false }}>
          {() => <PrincipalScreen isLoggedIn={isLoggedIn} />}
        </Stack.Screen>
        <Stack.Screen name="Agendar" options={{ title: 'Agendar Hora', headerStyle: { backgroundColor: '#01568e' }, headerTintColor: 'white' }} component={Agendar} />
        <Stack.Screen name="EliminarScreen" options={{ title: 'Eliminar Hora', headerStyle: { backgroundColor: 'blue' }, headerTintColor: 'white' }} component={EliminarScreen} />
      </Stack.Navigator>

      {/* Botón de chat solo visible después de iniciar sesión */}
      {isLoggedIn && (
        <TouchableOpacity style={styles.floatingButton} onPress={toggleModal}>
          <Text style={styles.buttonText}>Chat</Text>
        </TouchableOpacity>
      )}

      <ChatbotModal isVisible={isModalVisible} toggleModal={toggleModal} />
    </View>
  );
};

const styles = StyleSheet.create({
  floatingButton: {
    position: 'absolute',
    bottom: 60,
    right: 20,
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#01568e',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: 'white',
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

