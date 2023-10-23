import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, Image, TouchableOpacity, StyleSheet } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { styles_settings } from '../styles/styles.js';

function ProfileScreen() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [rut, setRut] = useState('');
  const [pass, setPass] = useState('');

  useEffect(() => {
    // Aquí debes llamar a una función que obtenga los datos del usuario desde la base de datos y los establezca en el estado.
    // Por ejemplo:
    const fetchUserData = async () => {
      try {
        const response = await fetch('http://192.168.0.5:8080//users/:id');
        const userData = await response.json();
        setName(userData.nombre);
        setEmail(userData.correo);
        setRut(userData.rut);
        setPass(userData.pass);
      } catch (error) {
        console.error('Error al cargar los datos del usuario', error);
      }
    };

    fetchUserData();
  }, []);

  const handleSaveChanges = async () => {
    // Aquí debes enviar los datos editados del usuario de vuelta a la base de datos.
    // Por ejemplo:
    try {
      const response = await fetch('http://192.168.0.5:8080//users/:id', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ nombre, correo, rut, pass }),
      });

      if (response.ok) {
        console.log('Datos del usuario actualizados con éxito.');
      } else {
        console.error('Error al actualizar los datos del usuario');
      }
    } catch (error) {
      console.error('Error al actualizar los datos del usuario', error);
    }
  };

  return (
    <View style={styles_settings.container1}>
      <Text>Editar Usuario</Text>
      <TextInput
        style={styles_settings.input}
        placeholder="Nombre"
        value={name}
        onChangeText={setName}
      />
      <TextInput
        style={styles_settings.input}
        placeholder="Correo Electrónico"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        style={styles_settings.input}
        placeholder="Rut"
        value={rut}
        onChangeText={setRut}
      />
      <TextInput
        style={styles_settings.input}
        placeholder="Contraseña"
        value={pass}
        onChangeText={setPass}
      />

      <Button title="Guardar Cambios" onPress={handleSaveChanges} />
    </View>
  );
}

export default ProfileScreen;
