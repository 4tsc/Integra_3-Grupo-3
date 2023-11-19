import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Image, TouchableOpacity } from 'react-native';
import axios from 'axios';
import * as ImagePicker from 'expo-image-picker';

function ProfileScreen({ userId }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [imageBlob, setImageBlob] = useState(null);
  const [editedImage, setEditedImage] = useState(null);
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [imageChanged, setImageChanged] = useState(false);

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
    try {
      const userUpdateData = { nombre: name, correo: email, pass: password };

      if (imageChanged) {
        const response = await fetch(`http://192.168.1.101:8080/users/${userId}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(userUpdateData),
        });

        if (response.ok) {
          console.log('Datos del usuario actualizados con éxito.');
          if (editedImage) {
            await handleSaveImage();
          }
        } else {
          console.error('Error al actualizar los datos del usuario');
        }
      } else {
        const response = await fetch(`http://192.168.1.101:8080/users/${userId}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(userUpdateData),
        });

        if (response.ok) {
          console.log('Datos del usuario actualizados con éxito.');
        } else {
          console.error('Error al actualizar los datos del usuario');
        }
      }

      setIsEditing(false);
      fetchUserData();
      fetchImage();
    } catch (error) {
      console.error('Error al actualizar los datos del usuario', error);
    }
  };

  const handleSaveImage = async () => {
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
    setEditedImage(imageBlob);
    setImageChanged(false);
  };

  const pickImage = async () => {
    try {
      let pickerResult = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [3, 3],
      });

      if (!pickerResult.canceled) {
        setEditedImage(pickerResult.assets[0].uri);
        setImageChanged(true);
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
      setEditedImage(imageUrl);
    } catch (error) {
      console.error('Error fetching image:', error);
    }
  };

  useEffect(() => {
    fetchImage();
  }, []);

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Perfil de Usuario</Text>
      <View style={styles.profileImageContainer}>
        <Image source={{ uri: isEditing ? editedImage : imageBlob }} style={styles.profileImage} />
        {isEditing && (
          <TouchableOpacity style={styles.changeImageOverlay} onPress={pickImage}>
            <Text style={styles.changeImageText}>Cambiar Imagen</Text>
          </TouchableOpacity>
        )}
      </View>
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
      <View style={styles.field}>
        <Text style={styles.fieldLabel}>Contraseña:</Text>
        {isEditing ? (
          <View>
            <TextInput
              style={styles.input}
              value={password}
              onChangeText={setPassword}
              secureTextEntry={!showPassword}
            />
            <TextInput
              style={styles.input}
              value={confirmPassword}
              onChangeText={setConfirmPassword}
              secureTextEntry={!showPassword}
              placeholder="Confirmar Contraseña"
            />
            <Button title={showPassword ? 'Ocultar Contraseña' : 'Mostrar Contraseña'} onPress={toggleShowPassword} />
          </View>
        ) : (
          <Text style={styles.fieldValue}>••••••••</Text>
        )}
      </View>
      {isEditing ? (
        <View style={styles.buttonContainer}>
          <Button title="Confirmar" onPress={handleSaveChanges} style={styles.saveButton} />
          <Button title="Cancelar" onPress={handleCancelEdit} style={styles.cancelButton} />
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
    backgroundColor: '#f4f4f4',
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  profileImageContainer: {
    position: 'relative',
    marginBottom: 20,
  },
  profileImage: {
    width: 150,
    height: 150,
    borderRadius: 75,
    marginBottom: 20,
    borderWidth: 3,
    borderColor: '#3498db',
  },
  changeImageOverlay: {
    position: 'absolute',
    width: 150,
    height: 150,
    borderRadius: 75,
    backgroundColor: 'rgba(52, 152, 219, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  changeImageText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  field: {
    marginBottom: 15,
    width: '100%',
  },
  fieldLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#333',
  },
  fieldValue: {
    fontSize: 16,
    color: '#555',
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    paddingLeft: 10,
    marginBottom: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 20,
  },
  saveButton: {
    backgroundColor: '#2ecc71',
  },
  cancelButton: {
    backgroundColor: '#e74c3c',
  },
  buttonText: {
    color: '#fff',
  },
});

export default ProfileScreen;
