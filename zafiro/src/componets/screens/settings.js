import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, Image, TouchableOpacity, StyleSheet } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { styles_settings } from '../styles/styles.js';

function ProfileScreen({ userId }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');

  useEffect(() => {
    // Definir la función para obtener los datos del usuario
    const fetchUserData = async () => {
      try {
        const response = await fetch(`http://192.168.1.101:8080/users/${userId}`);
        const userData = await response.json();
        setName(userData.nombre);
        setEmail(userData.correo);
        setPass(userData.pass);
      } catch (error) {
        console.error('Error al cargar los datos del usuario', error);
      }
    };

    // Llamar a la función para cargar los datos del usuario al abrir la ventana
    fetchUserData();
  }, [userId]); // Asegurarse de que el efecto se ejecute cuando cambia el userId

  const handleSaveChanges = async () => {
    // Envía los datos editados del usuario de vuelta a la base de datos
    try {
      const response = await fetch(`http://192.168.1.101:8080/users/${userId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ nombre: name, correo: email, contraseña: pass }),
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
        placeholder="Contraseña"
        value={pass}
        onChangeText={setPass}
      />

      <Button title="Guardar Cambios" onPress={handleSaveChanges} />
    </View>
  );
}

export default ProfileScreen;

