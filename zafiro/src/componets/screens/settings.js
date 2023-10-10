import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, Image, TouchableOpacity, StyleSheet } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { styles_settings } from '../styles/styles.js';

function ProfileScreen() {
  const [name, setName] = useState('John');
  const [lastName, setLastName] = useState('Doe');
  const [email, setEmail] = useState('johndoe@example.com');
  const [rut, setRut] = useState('123456789');
  const [phoneNumber, setPhoneNumber] = useState('123456789');
  const [image, setImage] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    // Solicitar permisos para acceder a la galería de imágenes
    (async () => {
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== 'granted') {
        alert('Se necesita permiso para acceder a la galería de imágenes.');
      }
    })();
  }, []);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.cancelled) {
      setImage(result.uri);
    }
  };

  return (
    <View style={styles_settings.container1}>
      <TouchableOpacity onPress={pickImage} style={styles_settings.frame}>
        {image ? (
          <Image source={{ uri: image }} style={styles_settings.profileImage} />
        ) : (
          <Text>Editar Foto de Usuario</Text>
        )}
      </TouchableOpacity>

      {isEditing ? (
        <>
          <TextInput
            style={styles_settings.input}
            placeholder="Nombre"
            value={name}
            onChangeText={setName}
          />
          <TextInput
            style={styles_settings.input}
            placeholder="Apellido"
            value={lastName}
            onChangeText={setLastName}
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
            placeholder="Número Telefónico"
            keyboardType="numeric"
            maxLength={9}
            value={phoneNumber}
            onChangeText={setPhoneNumber}
          />
          <Button title="Guardar Cambios" onPress={() => setIsEditing(false)} />
        </>
      ) : (
        <Button title="Editar Cambios" onPress={() => setIsEditing(true)} />
      )}
    </View>
  );
}



export default ProfileScreen;
