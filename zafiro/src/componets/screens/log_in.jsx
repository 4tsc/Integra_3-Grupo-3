import React, { useState } from 'react';
import { View, TextInput, Text, Pressable, Image } from 'react-native';
import {styles_log} from '../styles/styles.js';

const Log_in = () => {
    const [text, setText] = useState('');
    const [text2, setText2] = useState('');

  return (
    <View style={styles_log.container}>
      <View style={styles_log.container2}>
        {/* Logo UCT debemos mejorar esto */}
        <Image
          source={require('../images/Logo_UCT.png')}
          style={styles_log.image}
        />
      </View>


        {/* Input de  Correo Institucional que debe pasar por BD*/}
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
        

        {/* Input de  Contraseña que debe pasar por BD*/}
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
        {/* Boton de iniciar sesion */}
      <View style={styles_log.container5}>
        <Pressable style={styles_log.btn}>
          <Text style={styles_log.btnText}>Iniciar Sesión</Text>
        </Pressable>
      </View>
      <View style={styles_log.texto3}>
        {/* Al hacer click aqui se debe redireccionar al sitio de la u para cambiar Contraseña */}
        <Pressable>
          <Text style={styles_log.testo}>¿Olvidaste tu contraseña?</Text>
        </Pressable>
      </View>

    </View>
  );}

  export default Log_in;