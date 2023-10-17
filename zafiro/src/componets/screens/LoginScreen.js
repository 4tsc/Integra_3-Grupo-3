import React, { useState } from 'react';
import { View, Text, Pressable, TextInput, Image, StatusBar } from 'react-native';
import { styles_log } from '../styles/styles.js';
import { useNavigation } from '@react-navigation/native';
import * as Crypto from 'expo-crypto';

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
      const hashedPassword = await Crypto.digestStringAsync(
        Crypto.CryptoDigestAlgorithm.SHA256,
        text2
      );

      // Usar la contraseña encriptada en lugar de la original
      data.contraseña = hashedPassword;

      const response = await fetch('http://192.168.0.5:8080/auth', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json', // Indicar que se está enviando JSON
        },
        body: JSON.stringify(data), // Convertir el objeto a JSON
      });

      if (response.status === 200) {
        // Autenticación exitosa, llama a la función onLogin para notificar
        onLogin(); // Llama a la función onLogin para indicar que el usuario ha iniciado sesión
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
        <Pressable style={styles_log.btn} onPress={handlePress1}>
          <Text style={styles_log.btnText}>Iniciar Sesión</Text>
        </Pressable>
      </View>

      <View style={styles_log.texto3}>
        <Pressable>
          {/* Para saltarse el inicio de sesión con la BD agregar un handlePress1 en la siguiente línea */}
          <Text style={styles_log.testo}>¿Olvidaste tu contraseña?</Text>
        </Pressable>
      </View>
    </View>
  );
}

export default Log_in;
