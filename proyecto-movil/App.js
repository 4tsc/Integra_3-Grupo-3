import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, Button } from 'react-native';

export default function App() {
  const [citas, setCitas] = useState([]);

  const [textoCita, setTextoCita] = useState('');

  const agregarCita = () => {
    setCitas([...citas, textoCita]);
    setTextoCita('');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Administrador de Citas</Text>

      <TextInput
        style={styles.input}
        placeholder="Nombre de la cita"
        onChangeText={(texto) => setTextoCita(texto)}
        value={textoCita}
      />

      <Button title="Agregar cita" onPress={() => agregarCita()} />

      <Text style={styles.titulo}>Citas Agendadas</Text>
      <View>
        {citas.map((cita, index) => (
          <Text key={index}>{cita}</Text>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    flex: 1,
  },
  titulo: {
    marginTop: 40,
    marginBottom: 20,
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  input: {
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 3,
    marginBottom: 10,
    fontSize: 18,
  },
});
