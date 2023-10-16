import React, { useState } from 'react';
import { View, Text, Button } from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage'; // Importa AsyncStorage
import DatePicker from 'react-datepicker';
import TimePicker from 'react-time-picker'; // Importa TimePicker
import 'react-datepicker/dist/react-datepicker.css';
import 'react-time-picker/dist/TimePicker.css'; // Importa los estilos de TimePicker

function Calendario() {

  const apiKey = 'AIzaSyDN8p0Lk-lR0Bj5tOYhtmz2GGdl9HZx1QQ';
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState('12:00'); // Estado para la hora

  const [selectedTime2, setSelectedTime2] = useState('12:00');

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const handleTimeChange = (time) => {
    setSelectedTime(time);
  };

  const handleTimeChange2 = (time) => {
    setSelectedTime2(time);
  };
  
  // Función para crear un evento
  const createEventInGoogleCalendar = async () => {
    try {
      // Recupera el token de acceso de AsyncStorage
      const accessToken = await AsyncStorage.getItem('@access_token');

      if (!accessToken) {
        console.error('Token de acceso no encontrado');
        return;
      }

      // Cambia 'YOUR_CALENDAR_ID' por el ID de tu calendario de Google
      const calendarId = 'c_de0a95d708a690a8a10f2061b6179ea557641c39a7bc5a20e3abbc39dab10fab@group.calendar.google.com';

      // URL de la API de Google Calendar
      const apiUrl = `https://www.googleapis.com/calendar/v3/calendars/${calendarId}/events`;

      const headers = {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      };

      const formattedDate = selectedDate.toISOString();
      const formattedTime = `${selectedTime}:00`; // Agregar segundos
      const formattedDateTime = `${formattedDate.split('T')[0]}T${formattedTime}`;

      const formattedTime2 = `${selectedTime2}:00`; // Agregar segundos
      const formattedDateTime2 = `${formattedDate.split('T')[0]}T${formattedTime2}`;

      // Datos del evento
      const event = {
        summary: 'Reunion Asesor X',
        location: 'Campus Norte',
        start: {
          dateTime: formattedDateTime,
          timeZone: 'GMT-03:00',
        },
        end: {
          dateTime: formattedDateTime2,
          timeZone: 'GMT-03:00',
        },
      };

      // Realiza una solicitud POST para crear el evento
      const response = await axios.post(`${apiUrl}?key=${apiKey}`, event, { headers });
      console.log(formattedDate);
      console.log('Evento creado:', response.data);
    } catch (error) {
      console.error('Error al crear el evento:', error);
    }
  };

  const getCalendarMetadata = async () => {
    try {
      // Recupera el token de acceso de AsyncStorage
      const accessToken = await AsyncStorage.getItem('@access_token');

      if (!accessToken) {
        console.error('Token de acceso no encontrado');
        return;
      }
      const calendarId = 'c_de0a95d708a690a8a10f2061b6179ea557641c39a7bc5a20e3abbc39dab10fab@group.calendar.google.com';
      // URL de la API de Google Calendar para obtener metadatos del calendario
      const apiUrl2 = `https://www.googleapis.com/calendar/v3/calendars/${calendarId}`;

      const headers = {
        Authorization: `Bearer ${accessToken}`,
      };

      // Realiza una solicitud GET para obtener metadatos del calendario
      const response = await axios.get(apiUrl2, { headers });

      console.log('Metadatos del calendario:', response.data);
    } catch (error) {
      console.error('Error al obtener metadatos del calendario:', error);
    }
  };

  return (
    <View>
      <Text>Horia inicio</Text>
      <TimePicker
        onChange={handleTimeChange}
        value={selectedTime}
      />
      <Text>Horia termino</Text>
      <TimePicker
        onChange={handleTimeChange2}
        value={selectedTime2}
      />
      <Text>Seleccionar Fecha</Text>
      <DatePicker selected={selectedDate} onChange={handleDateChange} />
      <Text>Crear Evento en Google Calendar</Text>
      <Button title="Crear Evento" onPress={createEventInGoogleCalendar} />
      <Text>Obtener Metadatos del Calendario</Text>
      <Button title="Obtener Metadatos" onPress={getCalendarMetadata} />
    </View>
  );
}

export default Calendario;
