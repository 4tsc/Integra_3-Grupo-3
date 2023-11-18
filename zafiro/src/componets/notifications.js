import React, { useEffect, useState } from 'react';
import { Platform, Button, View } from 'react-native';
import * as Notifications from 'expo-notifications';

export default function PushNotifications() {
  const [expoPushToken, setExpoPushToken] = useState('');

  useEffect(() => {
    // Solicitar permisos y obtener el token del dispositivo
    const registerForPushNotificationsAsync = async () => {
      const { status: existingStatus } = await Notifications.getPermissionsAsync();
      let finalStatus = existingStatus;

      if (existingStatus !== 'granted') {
        const { status } = await Notifications.requestPermissionsAsync();
        finalStatus = status;
      }

      if (finalStatus !== 'granted') {
        console.log('Failed to get push token for push notification!');
        return;
      }

      if (Platform.OS === 'android') {
        Notifications.setNotificationChannelAsync('default', {
          name: 'default',
          importance: Notifications.AndroidImportance.MAX,
          vibrationPattern: [0, 250, 250, 250],
          lightColor: '#FF231F7C',
        });
      }

      const token = (await Notifications.getExpoPushTokenAsync()).data;
      console.log(token);
      setExpoPushToken(token);
    };

    registerForPushNotificationsAsync();

    // Limpieza al desmontar el componente
    return () => {
      // Realizar limpieza si es necesario
    };
  }, []);

  const handleNotificationPress = async () => {
    const message = {
      to: expoPushToken,
      sound: 'default',
      title: '¡Nueva notificación!',
      body: 'Recuerda que tienes una hora agendada para mañana a las 10:00',
    };

    await Notifications.scheduleNotificationAsync({
      content: message,
      trigger: null,
    });
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Button title="Enviar Notificación" onPress={handleNotificationPress} />
    </View>
  );
}
