import React, { useState, useEffect } from 'react';
import { View, Text, Button, Alert, TextInput } from 'react-native';
import DatePicker from '@react-native-community/datetimepicker';
import TimePicker from '@react-native-community/datetimepicker';
import { Picker } from '@react-native-picker/picker';
import * as Calendar from 'expo-calendar';
import axios from 'axios';
import { styles_Horas } from '../styles/styles';

const AgendarScreen = () => {
  const [calendars, setCalendars] = useState([]);
  const [selectedCalendarId, setSelectedCalendarId] = useState(null);
  const [eventDate, setEventDate] = useState(null);
  const [eventTime, setEventTime] = useState(null);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);
  const [motivoConsulta, setMotivoConsulta] = useState('');
  const [modoReunion, setModoReunion] = useState('Presencial'); // Establecer el valor predeterminado en 'Presencial'
  const [selectedModoReunion, setSelectedModoReunion] = useState('Presencial'); // Nuevo estado para el Picker

  useEffect(() => {
    getCalendars();
  }, []);

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

        const now = new Date();
        const maxEndTime = new Date(selectedDateTime.getTime() + 30 * 60 * 1000);

        if (
          selectedDateTime.getDay() !== 0 &&
          selectedDateTime.getDay() !== 6 &&
          selectedDateTime.getHours() >= 14 &&
          selectedDateTime.getHours() < 16 &&
          maxEndTime <= new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000)
        ) {
          const event = {
            title: 'Mi Evento',
            startDate: selectedDateTime,
            endDate: maxEndTime,
            timeZone: 'America/Santiago',
            modoReunion: selectedModoReunion, // Agregar el modo de reunión seleccionado
          };

          const eventId = await Calendar.createEventAsync(selectedCalendarId, event);
          const calendarName = getCalendarNameById(selectedCalendarId);
          console.log('Evento creado en el calendario:', calendarName);
          console.log('Evento creado con éxito. ID del evento:', eventId);

          try {
            const response = await axios.post('http://192.168.0.2:3000/enviar-correo', {
              motivoConsulta,
              modoReunion: selectedModoReunion, // Agregar el modo de reunión seleccionado
            });
            console.log('Solicitud al servidor exitosa:', response.data);
          } catch (error) {
            console.error('Error al realizar la solicitud al servidor:', error);
            Alert.alert('Error', 'No se pudo enviar el correo electrónico.');
          }
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
      if (selectedDate.getDay() >= 1 && selectedDate.getDay() <= 5) {
        setEventDate(selectedDate);
      } else {
        Alert.alert('Error', 'Debes seleccionar un día de lunes a viernes.');
      }
    }
  };

  // Agrega una función para seleccionar una hora específica
  const selectSpecificTime = (hours, minutes) => {
    const selectedTime = new Date();
    selectedTime.setHours(hours);
    selectedTime.setMinutes(minutes);
    setEventTime(selectedTime);
    hideTimePickerModal();
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
          minimumDate={new Date()}
          maximumDate={new Date(new Date().getTime() + 7 * 24 * 60 * 60 * 1000)}
        />)
      }

      <Button title="Seleccionar Hora" onPress={showTimePickerModal}  />
      {showTimePicker && (
          <View>
            <Button title="14:00" onPress={() => selectSpecificTime(14, 0)} />
            <Button title="14:30" onPress={() => selectSpecificTime(14, 30)} />
            <Button title="15:00" onPress={() => selectSpecificTime(15, 0)} />
            <Button title="15:30" onPress={() => selectSpecificTime(15, 30)} />
          </View>
      )}

      <Button title="Obtener Calendarios" onPress={getCalendars} />
      <Text>Motivo de Consulta:</Text>
      <TextInput
        placeholder="Escribe el motivo de consulta"
        onChangeText={(text) => setMotivoConsulta(text)}
      />

      <Text>Modo de Reunión:</Text>
      <Picker
        selectedValue={selectedModoReunion}
        onValueChange={(value) => setSelectedModoReunion(value)}
      >
        <Picker.Item label="Presencial" value="Presencial" />
        <Picker.Item label="Virtual" value="Virtual" />
      </Picker>

      <Button title="Agregar Evento" onPress={addEventToCalendar} />
    </View>
  );
};

export default AgendarScreen;
