import React, { useState } from 'react';
import { View, Text, Button } from 'react-native';
import { Picker } from '@react-native-picker/picker'; // Importa Picker de @react-native-picker/picker
import * as Calendar from 'expo-calendar';

const Agendar = () => {
  // Estado local para almacenar la lista de calendarios y el calendario seleccionado.
  const [calendars, setCalendars] = useState([]);
  const [selectedCalendarId, setSelectedCalendarId] = useState(null);

  // Función para obtener la lista de calendarios del dispositivo.
  const getCalendars = async () => {
    // Solicita permisos para acceder al calendario del dispositivo.
    const { status } = await Calendar.requestCalendarPermissionsAsync();

    if (status === 'granted') {
      // Si se otorgan permisos, obtén la lista de calendarios disponibles.
      const calendarList = await Calendar.getCalendarsAsync();
      setCalendars(calendarList);
    } else {
      // Manejar el caso en que el usuario no otorga permiso.
    }
  };

  // Función para agregar un evento al calendario seleccionado.
  const addEventToCalendar = async () => {
    if (selectedCalendarId) {
      // Crea un objeto de evento con título, fecha de inicio, fecha de fin y zona horaria.
      const event = {
        title: 'Mi Evento',
        startDate: new Date(2023, 9, 16, 10, 0), // Año, Mes (0-11), Día, Hora, Minuto
        endDate: new Date(2023, 9, 16, 10, 30), // Hora de finalización
        timeZone: 'America/New_York', // Ajusta la zona horaria según tus necesidades
      };
      

      // Utiliza la API de Expo Calendar para crear un evento en el calendario seleccionado.
      await Calendar.createEventAsync(selectedCalendarId, event);
      // Manejar el resultado, como confirmar que el evento se agregó correctamente.
    }
  };

  return (
    <View>
      <Text>Selecciona un calendario:</Text>
      <Picker
        selectedValue={selectedCalendarId}
        onValueChange={(value) => setSelectedCalendarId(value)}
      >
        {calendars.map((calendar) => (
          <Picker.Item key={calendar.id} label={calendar.title} value={calendar.id} />
        ))}
      </Picker>

      <Button title="Obtener Calendarios" onPress={getCalendars} />
      <Button title="Agregar Evento" onPress={addEventToCalendar} />
    </View>
  );
};

export default Agendar;
