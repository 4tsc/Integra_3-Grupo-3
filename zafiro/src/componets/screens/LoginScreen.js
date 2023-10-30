import React, { useState } from 'react';
import { View, Text, Pressable, TextInput, Image, StatusBar } from 'react-native';
import { styles_log } from '../styles/styles.js';
import { useNavigation } from '@react-navigation/native';

const Log_in = ({ onLogin }) => { // Recibe la función onLogin como prop
  const [text, setText] = useState('');
  const [text2, setText2] = useState('');
  const navigation = useNavigation();

  const handlePress1 = () => {
    onLogin(); // Llama a la función onLogin para indicar que el usuario ha iniciado sesión
    navigation.navigate('PrincipalScreen');
  };

  const handlePress = async () => {
    const data = {
      correo: text,
      contraseña: text2,
    };

    try {
      const response = await fetch('http://192.168.1.101:8080/auth', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (response.status === 200) {
        const responseData = await response.json(); // Parsea la respuesta JSON
        const userId = responseData.id; // Obtiene el ID del usuario

        // mensaje por consola con el ID del usuario
        console.log('Autenticación exitosa. ID del usuario:', userId);

        onLogin(userId); // Llama a onLogin con el ID del usuario
        navigation.navigate('PrincipalScreen');
      } else {
        // Manejar la respuesta de autenticación fallida aquí
        // Puedes mostrar un mensaje de error o realizar otras acciones
      }
    } catch (error) {
      // Manejar errores de red u otros errores aquí
    }
  };

  return (
    <View style={styles_log.container}>
      <StatusBar barStyle="content" backgroundColor="#5D5D5D" />
      <View style={styles_log.container2}>
        <Image
          source={require('../images/Logo_UCT.png')}
          style={styles_log.image}
        />
      </View>

      <View style={styles_log.container3}>
        <View style={styles_log.texto1}>
          <Text style={styles_log.testo}>Correo Institucional</Text>
        </View>
        <TextInput
          style={styles_log.input}
          placeholder='Ingrese su Correo Institucional'
          onChangeText={setText}
          value={text}
        />
      </View>

      <View style={styles_log.container4}>
        <View style={styles_log.texto2}>
          <Text style={styles_log.testo}>Contraseña</Text>
        </View>
        <TextInput
          style={styles_log.input}
          placeholder='Ingrese su Contraseña'
          secureTextEntry={true}
          onChangeText={setText2}
          value={text2}
        />
      </View>

      <View style={styles_log.container5}>
        <Pressable style={styles_log.btn} onPress={handlePress}>
          <Text style={styles_log.btnText}>Iniciar Sesión</Text>
        </Pressable>
      </View>

      <View style={styles_log.texto3}>
        <Pressable>
          <Text style={styles_log.testo}>¿Olvidaste tu contraseña?</Text>
        </Pressable>
      </View>
    </View>
  );
}

export default Log_in;