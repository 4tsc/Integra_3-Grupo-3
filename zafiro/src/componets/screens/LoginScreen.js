import React, { useState } from 'react';
import { View, Text, Pressable, TextInput, Image, StatusBar } from 'react-native';
import { styles_log } from '../styles/styles.js';
import { useNavigation } from '@react-navigation/native';

const Log_in = ({ onLogin }) => { // Recibe la función onLogin como prop
  const [text, setText] = useState('');
  const [text2, setText2] = useState('');
  const navigation = useNavigation();

  const handlePress = async () => {
    try {
      const data = {
        correo: text,
        contraseña: text2,
      };

      const responseAsesor = await fetch('http://192.168.100.7:8080/auth_asesor', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (responseAsesor.status === 200) {
        try {
          const responseData = await responseAsesor.json();
          const userId = responseData.userId; // Cambiado de responseData.id a responseData.tipoUsuario
          var userType = responseData.tipoUsuario;

          console.log(userType, 'login');
          console.log('Autenticación exitosa. ID de asesor:', userId);

          onLogin({ userId, userType });
          navigation.navigate('PrincipalScreen');
        } catch (jsonError) {
          console.error('Error al parsear respuesta JSON del asesor:', jsonError);
        }
      } else {
        const responseUsuario = await fetch('http://192.168.100.7:8080/auth_usuario', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data),
        });

        if (responseUsuario.status === 200) {
          const responseData = await responseUsuario.json();
          const userId = responseData.userId; // Cambiado de responseData.id a responseData.tipoUsuario
          const userType = responseData.tipoUsuario;

          console.log('Autenticación exitosa. ID de Usuario:', userId);

          onLogin({ userId, userType }); // Puedes pasar información específica del usuario si es necesario
          console.log(userType);
          navigation.navigate('PrincipalScreen');
        } else {
          const errorData = await responseUsuario.json();
          console.error('Error de autenticación:', errorData.mensaje);
        }
      }
    } catch (error) {
      console.error('Error de red u otros errores:', error.message);
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
    </View>
  );
}

export default Log_in;