import React, { useState } from 'react';
import { View, Button, Alert } from 'react-native';
import * as Google from 'expo-google-app-auth';
import axios from 'axios';

export default function App() {
  const [accessToken, setAccessToken] = useState(null);

  const googleSignIn = async () => {
    try {
      const result = await Google.logInAsync({
        androidClientId: 'TU_CLIENT_ID_DE_ANDROID', // Reemplaza con tu ID de cliente de Android
        iosClientId: 'TU_CLIENT_ID_DE_IOS', // Reemplaza con tu ID de cliente de iOS
        scopes: ['https://www.googleapis.com/auth/calendar'], // Escopos necesarios para acceder a Google Calendar
      });

      if (result.type === 'success') {
        const { accessToken } = result;
        setAccessToken(accessToken); // Almacenamos el token de acceso en el estado
      } else {
        // El usuario canceló el inicio de sesión o hubo un error
        Alert.alert('Inicio de sesión cancelado o error');
      }
    } catch (error) {
      console.error('Error de inicio de sesión:', error);
    }
  };

  const createEvent = async () => {
    try {
      // Verifica si tenemos un token de acceso
      if (!accessToken) {
        Alert.alert('Inicia sesión con Google primero');
        return;
      }

      // Configura la solicitud para crear un evento en Google Calendar
      const event = {
        summary: 'Mi evento de prueba',
        description: 'Descripción de mi evento de prueba',
        start: {
          dateTime: '2023-10-10T10:00:00',
          timeZone: 'America/New_York',
        },
        end: {
          dateTime: '2023-10-10T12:00:00',
          timeZone: 'America/New_York',
        },
      };

      // Realiza la solicitud POST para crear el evento
      const response = await axios.post(
        'https://www.googleapis.com/calendar/v3/calendars/primary/events',
        event,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      // Comprueba si la solicitud se completó correctamente
      if (response.status === 200) {
        Alert.alert('Evento creado exitosamente');
      } else {
        Alert.alert('Error al crear el evento');
      }
    } catch (error) {
      console.error('Error al crear el evento:', error);
    }
  };

  return (
    <View>
      <Button title="Iniciar sesión con Google" onPress={googleSignIn} />
      <Button title="Crear evento de prueba" onPress={createEvent} />
    </View>
  );
}