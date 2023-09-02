<<<<<<< HEAD
import React, { useState } from 'react';
import { View, TextInput, Text, StyleSheet, Pressable, Image } from 'react-native';

const App = () => {
  const [text, setText] = useState('');
  const [text2, setText2] = useState('');

  return (
    <View style={styles.container}>
      <View style={styles.container2}>
        <Image
          source={require('./LO.png')}
          style={styles.image}
        />
      </View>



      <View style={styles.container3}>
        <View style={styles.texto1}>
          <Text style={styles.testo}>Correo Institucional</Text>
        </View>
        <TextInput
          style={styles.input}
          onChangeText={setText}
          value={text}
        />
      </View>
        


      <View style={styles.container4}>
        <View style={styles.texto2}>
          <Text style={styles.testo}>Contraseña</Text>
        </View>
        <TextInput
          style={styles.input}
          onChangeText={setText2}
          value={text2}
        />
      </View>

      <View style={styles.container5}>
        <Pressable style={styles.btn}>
          <Text style={styles.btnText}>Iniciar Sesión</Text>
        </Pressable>
      </View>

      <View style={styles.texto3}>
        <Pressable>
          <Text style={styles.testo}>¿Olvidaste tu contraseña?</Text>
        </Pressable>
      </View>

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0085FF',
  },
  container2: {
    flex: 1,
    alignItems: 'center',
    top: '10%',
  },
  container3: {
    alignItems: 'center',
    flex: 1,
    top: "5%",
  },
  container4:{
    alignItems: 'center',
    flex: 1,
    top: '-3%',
  },
  container5:{
    alignItems: 'center',
    flex: 1,
    bottom: '10%'
  },
  texto1:{

  },
  texto2:{

  },
  texto3:{
    alignItems: 'center',
    top: '-27%'
  },
  testo:{
    color: '#FFF',
    fontSize: 12
  },
  input: {
    width: 264,
    height: 49,
    borderColor: 'gray',
    borderWidth: 1,
    marginTop: 10,
    padding: 5,
    backgroundColor: '#D9D9D9',
    borderRadius: '70px',
  },
  btn: {
    backgroundColor:'#FAB700',
    borderRadius:'100px',
    height:'48px',
    width:'144px',
    alignItems: 'center',
    justifyContent: 'center',
  },
  btnText: {
    color: 'black',
    fontWeight: 'bold',
  },
  image: {
    width: '100px',
    height: '93px',
    resizeMode: 'contain',
  },
});

export default App;
=======
import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Button } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import Navegador from './src/componets/navegation.js';

export default function App() {
  return <Navegador/>
}


>>>>>>> 581c44503dd27e001b6272a18fff0ddf817b9c12
