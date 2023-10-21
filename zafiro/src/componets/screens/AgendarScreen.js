import React, { useState } from 'react';
import { View, Text, Button, Alert } from 'react-native';
import DatePicker from '@react-native-community/datetimepicker'; // Importa DatePicker desde @react-native-community/datetimepicker
import TimePicker from '@react-native-community/datetimepicker'; // Importa TimePicker desde @react-native-community/datetimepicker
import { Picker } from '@react-native-picker/picker';
import * as Calendar from 'expo-calendar';

const AgendarScreen = () => {
  const [calendars, setCalendars] = useState([]);
  const [selectedCalendarId, setSelectedCalendarId] = useState(null);
  const [eventDate, setEventDate] = useState(null);
  const [eventTime, setEventTime] = useState(null);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);

  const getCalendars = async () => {
    try {
      const { status } = await Calendar.requestCalendarPermissionsAsync();

      if (status === 'granted') {
        const calendarList = await Calendar.getCalendarsAsync();
        setCalendars(calendarList);
      } else {
        Alert.alert('Permisos no otorgados', 'Debes otorgar permisos de calendario.');
      }
    } catch (error) {
      console.error('Error al obtener calendarios: ' + error.message);
      Alert.alert('Error', 'No se pudieron obtener los calendarios.');
    }
  };

  const getCalendarNameById = (calendarId) => {
    const selectedCalendar = calendars.find((calendar) => calendar.id === calendarId);
    return selectedCalendar ? selectedCalendar.title : 'Desconocido';
  };

  const addEventToCalendar = async () => {
    if (selectedCalendarId && eventDate && eventTime) {
      try {
        const selectedDateTime = new Date(eventDate);
        selectedDateTime.setHours(eventTime.getHours());
        selectedDateTime.setMinutes(eventTime.getMinutes());

        const now = new Date(); // Hora actual
        const maxEndTime = new Date(selectedDateTime.getTime() + 30 * 60 * 1000); // Evento de 30 minutos

        if (
          selectedDateTime.getDay() !== 0 && // No es Domingo
          selectedDateTime.getDay() !== 6 && // No es Sábado
          selectedDateTime.getHours() >= 14 &&
          selectedDateTime.getHours() < 16 &&
          maxEndTime <= new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000) // Dentro de una semana
        ) {
          const event = {
            title: 'Mi Evento',
            startDate: selectedDateTime,
            endDate: maxEndTime,
            timeZone: 'America/Santiago',
          };

          const eventId = await Calendar.createEventAsync(selectedCalendarId, event);
          const calendarName = getCalendarNameById(selectedCalendarId);
          console.log('Evento creado en el calendario:', calendarName);
          console.log('Evento creado con éxito. ID del evento:', eventId);
        } else {
          Alert.alert(
            'Error',
            'No puedes crear un evento en este horario o fecha. Verifica las restricciones.'
          );
        }
      } catch (error) {
        console.error('Error al crear evento: ' + error.message);
        Alert.alert('Error', 'No se pudo crear el evento.');
      }
    } else {
      Alert.alert('Calendario no seleccionado', 'Debes seleccionar un calendario, fecha y hora primero.');
    }
  };

  const showDatePickerModal = () => {
    setShowDatePicker(true);
  };

  const hideDatePickerModal = () => {
    setShowDatePicker(false);
  };

  const showTimePickerModal = () => {
    setShowTimePicker(true);
  };

  const hideTimePickerModal = () => {
    setShowTimePicker(false);
  };

  const onDateChange = (event, selectedDate) => {
    hideDatePickerModal();
    if (selectedDate) {
      // Valida que el día seleccionado sea de lunes a viernes
      if (selectedDate.getDay() >= 1 && selectedDate.getDay() <= 5) {
        setEventDate(selectedDate);
      } else {
        Alert.alert('Error', 'Debes seleccionar un día de lunes a viernes.');
      }
    }
  };

  const onTimeChange = (event, selectedTime) => {
    hideTimePickerModal();
    if (selectedTime) {
      // Obtiene las horas de la hora seleccionada
      const selectedHours = selectedTime.getHours();
  
      // Valida que la hora seleccionada esté entre las 14:00 y las 15:59
      if (selectedHours >= 14 && selectedHours < 16) {
        setEventTime(selectedTime);
      } else {
        Alert.alert('Error', 'Debes seleccionar un horario entre las 14:00 y las 15:59.');
      }
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

      <Button title="Seleccionar Fecha" onPress={showDatePickerModal} />
      {showDatePicker && (
        <DatePicker
          value={eventDate || new Date()}
          mode="date"
          display="default"
          onChange={onDateChange}
          minimumDate={new Date()} // Restringe a fechas futuras
          maximumDate={new Date(new Date().getTime() + 7 * 24 * 60 * 60 * 1000)} // Hasta una semana en el futuro
        />
      )}

      <Button title="Seleccionar Hora" onPress={showTimePickerModal} />
      {showTimePicker && (
        <TimePicker
          value={eventTime || new Date()}
          mode="time"
          display="default"
          onChange={onTimeChange}
        />
      )}

      <Button title="Obtener Calendarios" onPress={getCalendars} />
      <Button title="Agregar Evento" onPress={addEventToCalendar} />
    </View>
  );
};

export default AgendarScreen;
