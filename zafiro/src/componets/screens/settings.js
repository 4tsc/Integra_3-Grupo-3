import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';

function ProfileScreen({ userId }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch(`http://192.168.100.7:8080/users/${userId}`);
        const userData = await response.json();
        setName(userData.nombre);
        setEmail(userData.correo);
      } catch (error) {
        console.error('Error al cargar los datos del usuario', error);
      }
    };

    fetchUserData();
  }, [userId]);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSaveChanges = async () => {
    // Send edited data to the server
    try {
      const response = await fetch(`http://192.168.100.7:8080/users/${userId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ nombre: name, correo: email }),
      });

      if (response.ok) {
        console.log('Datos del usuario actualizados con éxito.');
        setIsEditing(false); // Exit edit mode
      } else {
        console.error('Error al actualizar los datos del usuario');
      }
    } catch (error) {
      console.error('Error al actualizar los datos del usuario', error);
    }
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Perfil de Usuario</Text>
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
