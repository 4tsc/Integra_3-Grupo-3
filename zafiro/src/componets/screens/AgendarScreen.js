import React, { useState, useEffect } from 'react';
import { View, Text, Button, Alert, TextInput, FlatList } from 'react-native';
import DatePicker from '@react-native-community/datetimepicker';
import TimePicker from '@react-native-community/datetimepicker';
import { Picker } from '@react-native-picker/picker';
import * as Calendar from 'expo-calendar';
import axios from 'axios';
import { styles_Horas } from '../styles/styles';

const AgendarScreen = ({ userId }) => {
  const [selectedAsesor, setSelectedAsesor] = useState({ id_asesor: null, nombre: null });
  const [asesores, setAsesores] = useState([]);
  const [calendars, setCalendars] = useState([]);
  const [selectedCalendarId, setSelectedCalendarId] = useState(null);
  const [eventDate, setEventDate] = useState(null);
  const [eventTime, setEventTime] = useState(null);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);
  const [motivoConsulta, setMotivoConsulta] = useState('');
  const [modoReunion, setModoReunion] = useState('Presencial');
  const [selectedModoReunion, setSelectedModoReunion] = useState('Presencial');

  const motivoConsultaOptions = [
    'Virtualización',
    'Asesoría Docente',
    'Comunidad de Aprendizaje',
    'Formación Docente',
    'Realidades Extendidas',
    'Diseño de Recursos Multimedia',
    'Seguimiento y Estudio',
    'Guías de Aprendizaje',
  ];

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
    if (selectedCalendarId && eventDate && eventTime && selectedAsesor.id_asesor) {
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
            title: 'Asesoría con ' + selectedAsesor.nombre,
            startDate: selectedDateTime,
            endDate: maxEndTime,
            timeZone: 'America/Santiago',
            modoReunion: selectedModoReunion,
          };

          const eventId = await Calendar.createEventAsync(selectedCalendarId, event);
          const calendarName = getCalendarNameById(selectedCalendarId);
          console.log('Evento creado en el calendario:', calendarName);
          console.log('Evento creado con éxito. ID del evento:', eventId);
          console.log("id asesor: ", selectedAsesor.id_asesor);
          console.log("id usuarioL:", userId);

          try {
            const response = await axios.post('http://192.168.64.155:8080/crear-hora', {
              idUsuario: userId,
              idAsesor: selectedAsesor.id_asesor,
              fecha: eventDate,
              hora: eventTime.toLocaleTimeString(),
              descripcion: motivoConsulta,
            });
            console.log('Solicitud al servidor para crear hora exitosa:', response.data);
            // Mostrar alerta después de la respuesta exitosa del endpoint crear-hora
            Alert.alert('Hora Agendada', 'La hora ha sido agendada correctamente.');
            // Agregar lógica de notificación aquí
            const notificationContent = {
              title: '¡Cita Agendada!',
              body: 'Se ha agendado correctamente tu cita con el asesor.',
            };

            const { data: token } = await axios.post('http://192.168.100.7:8080/get-notification-token', {
              userId: userID,
            });

            if (token) {
              const trigger = new Date(selectedDateTime.getTime() + 5 * 60 * 1000);
              await Notifications.scheduleNotificationAsync({
                content: notificationContent,
                trigger,
              });
              console.log('Notificación programada para 5 minutos después del evento.');
            } else {
              console.warn('Token de notificación no disponible.');
            }
            
          } catch (error) {
            console.error('Error al realizar la solicitud para crear hora:', error);
            Alert.alert('Error', 'No se pudo crear la hora en la base de datos.');
          }

          try {
            const response = await axios.post('http://192.168.64.155:8080/enviar-correo', {
              motivoConsulta,
              modoReunion: selectedModoReunion,
            });
            console.log('Solicitud al servidor para enviar correo electrónico exitosa:', response.data);
          } catch (error) {
            console.error('Error al realizar la solicitud para enviar correo electrónico:', error);
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

  const obtenerAsesores = async () => {
    try {
      console.log('Obtener asesores se llamó.');
      console.log('Motivo de consulta a enviar:', motivoConsulta);
      const response = await axios.post('http://192.168.64.155:8080/obtener-asesores', {
        motivoConsulta,
      });

      console.log('Respuesta del servidor:', response.data);

      if (response.status === 200) {
        const asesoresObtenidos = response.data.map((asesor) => ({
          id_asesor: asesor.id_asesor,
          nombre: asesor.nombre,
        }));
        setAsesores(asesoresObtenidos);
        console.log('Asesores obtenidos:', asesoresObtenidos);
      } else {
        console.error('Error al obtener asesores');
        Alert.alert('Error', 'No se pudieron obtener los asesores.');
      }
    } catch (error) {
      console.error('Error de red:', error);
      Alert.alert('Error', 'No se pudo realizar la solicitud.');
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

      <Text>Modo de Reunión:</Text>
      <Picker
        selectedValue={selectedModoReunion}
        onValueChange={(value) => setSelectedModoReunion(value)}
      >
        <Picker.Item label="Presencial" value="Presencial" />
        <Picker.Item label="Virtual" value="Virtual" />
      </Picker>

      <Text>Motivo de Consulta:</Text>
      <Picker
        selectedValue={motivoConsulta}
        onValueChange={(value) => {
          console.log('Motivo de consulta seleccionado:', value);
          setMotivoConsulta(value);
        }}
      >
        {motivoConsultaOptions.map((option) => (
          <Picker.Item key={option} label={option} value={option} />
        ))}
      </Picker>

      <Button title="Obtener Asesores" onPress={obtenerAsesores} />

      <Text>Lista de Asesores:</Text>
      {asesores.length > 0 && (
        <FlatList
          data={asesores}
          keyExtractor={(item) => item.id_asesor.toString()}
          renderItem={({ item }) => (
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 16, marginVertical: 8 }}>
              <Text>{item.nombre}</Text>
              <Button title="Elegir" onPress={() => setSelectedAsesor({ id_asesor: item.id_asesor, nombre: item.nombre })} />
            </View>
          )}
        />
      )}
      <Button title="Agregar Evento" onPress={addEventToCalendar} />
    </View>
  );
};

export default AgendarScreen;
