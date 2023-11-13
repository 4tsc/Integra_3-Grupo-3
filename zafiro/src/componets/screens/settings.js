import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Image } from 'react-native';
import axios from 'axios';
import * as ImagePicker from 'expo-image-picker';

function ProfileScreen({ userId }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [imageBlob, setImageBlob] = useState(null);
  const [editedImage, setEditedImage] = useState(null);

  const fetchUserData = async () => {
    try {
      const response = await fetch(`http://192.168.1.101:8080/users/${userId}`);
      const userData = await response.json();
      setName(userData.nombre);
      setEmail(userData.correo);
    } catch (error) {
      console.error('Error al cargar los datos del usuario', error);
    }
  };

  useEffect(() => {
    fetchUserData();
  }, [userId]);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSaveChanges = async () => {
    // Send edited data to the server
    try {
      const response = await fetch(`http://192.168.1.101:8080/users/${userId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ nombre: name, correo: email }),
      });

      if (response.ok) {
        console.log('Datos del usuario actualizados con éxito.');

        // Si se ha seleccionado una nueva imagen, también guarda la imagen
        if (editedImage) {
          await handleSaveImage();
        }

        setIsEditing(false); // Exit edit mode

        // Recargar la pantalla después de confirmar los cambios
        fetchUserData();
        fetchImage();
      } else {
        console.error('Error al actualizar los datos del usuario');
      }
    } catch (error) {
      console.error('Error al actualizar los datos del usuario', error);
    }
  };

  const handleSaveImage = async () => {
    // Send edited image to the server
    try {
      const formData = new FormData();
      formData.append('image', {
        uri: editedImage,
        type: 'image/jpeg',
        name: 'profile.jpg',
      });

      const response = await fetch(`http://192.168.1.101:8080/images/upload/${userId}`, {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        console.log('Imagen de perfil actualizada con éxito.');
      }
    } catch (error) {
      console.error('Error al actualizar la imagen de perfil', error);
    }
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    // Reset editedImage to the original imageBlob
    setEditedImage(imageBlob);
  };

  const pickImage = async () => {
    try {
      let pickerResult = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [3, 3],
      });
  
      // Check for canceled and use assets array
      if (!pickerResult.canceled) {
        setEditedImage(pickerResult.assets[0].uri);
      }
    } catch (error) {
      console.error('Error al seleccionar la imagen:', error);
    }
  };
  

  const fetchImage = async () => {
    try {
      const response = await axios.get(`http://192.168.1.101:8080/images/${userId}`, {
        responseType: 'blob',
      });

      const blobToDataURL = (blob) => {
        return new Promise((resolve, reject) => {
          const reader = new FileReader();
          reader.onloadend = () => resolve(reader.result);
          reader.onerror = reject;
          reader.readAsDataURL(blob);
        });
      };

      const imageUrl = await blobToDataURL(response.data);

      setImageBlob(imageUrl);
      setEditedImage(imageUrl); // Initialize editedImage with the current image
    } catch (error) {
      console.error('Error fetching image:', error);
    }
  };

  useEffect(() => {
    fetchImage();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Perfil de Usuario</Text>
      <Image source={{ uri: isEditing ? editedImage : imageBlob }} style={{ width: 200, height: 200, borderRadius: 100 }} />
      {isEditing && (
        <View>
          <Button title="Cambiar Imagen" onPress={pickImage} />
        </View>
      )}
      <View style={styles.field}>
        <Text style={styles.fieldLabel}>Nombre:</Text>
        {isEditing ? (
          <TextInput
            style={styles.input}
            value={name}
            onChangeText={setName}
          />
        ) : (
          <Text style={styles.fieldValue}>{name}</Text>
        )}
      </View>
      <View style={styles.field}>
        <Text style={styles.fieldLabel}>Correo Electrónico:</Text>
        {isEditing ? (
          <TextInput
            style={styles.input}
            value={email}
            onChangeText={setEmail}
          />
        ) : (
          <Text style={styles.fieldValue}>{email}</Text>
        )}
      </View>

      {isEditing ? (
        <View style={styles.buttonContainer}>
          <Button title="Confirmar" onPress={handleSaveChanges} />
          <Button title="Cancelar" onPress={handleCancelEdit} />
        </View>
      ) : (
        <Button title="Editar" onPress={handleEdit} />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
  field: {
    marginBottom: 20,
    width: '100%',
  },
  fieldLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  fieldValue: {
    fontSize: 16,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    paddingLeft: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
});

export default ProfileScreen;
