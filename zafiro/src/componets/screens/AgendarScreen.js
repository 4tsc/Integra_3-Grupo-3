import React, { useState, useEffect } from 'react';
import { View, Text, Button, Alert, TouchableOpacity, FlatList, SafeAreaView, ScrollView  } from 'react-native';
import DatePicker from '@react-native-community/datetimepicker';
import TimePicker from '@react-native-community/datetimepicker';
import { Picker } from '@react-native-picker/picker';
import * as Calendar from 'expo-calendar';
import axios from 'axios';
import { styles_Agendar } from '../styles/styles';

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
  const [showAgendarButton, setShowAgendarButton] = useState(false); // Nuevo estado para controlar la visibilidad del botón "Agendar Asesoría"
  const [selectedModoReunion, setSelectedModoReunion] = useState('Presencial');
  const [buttonColor, setButtonColor] = useState('#23c0eb'); // Estado para el color del botón
  const [timeButtonColor, setTimeButtonColor] = useState('#23c0eb'); // Estado para el color del botón de la hora
  const [modoReunionColor, setModoReunionColor] = useState('#23c0eb'); // Estado para el color del modo de reunión
  const [nombreUsuario, setNombreUsuario] = useState('');

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
    obtenerNombreUsuario();
    getCalendars();
  }, []);

  const obtenerNombreUsuario = async () => {
    try {
      const response = await axios.get(`http://192.168.0.4:8080/obtener-nombre-usuario/${userId}`);

      if (response.status === 200) {
        const nombreUsuario = response.data.nombre;
        setNombreUsuario(nombreUsuario);
      } else {
        console.error('Error al obtener el nombre del usuario');
        Alert.alert('Error', 'No se pudo obtener el nombre del usuario.');
      }
    } catch (error) {
      console.error('Error de red:', error);
      Alert.alert('Error', 'No se pudo realizar la solicitud.');
    }
  };

  const getCalendars = async () => {
    try {
      console.log('Autenticación exitosa. ID del usuario en agenda:', userId);
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
    if (!selectedCalendarId) {
      Alert.alert('Falta seleccionar el calendario', 'Por favor, selecciona un calendario.');
      return;
    }
  
    if (!eventDate) {
      Alert.alert('Falta seleccionar la fecha', 'Por favor, selecciona una fecha.');
      return;
    }
  
    if (!eventTime) {
      Alert.alert('Falta seleccionar la hora', 'Por favor, selecciona una hora.');
      return;
    }
  
    if (!selectedAsesor.id_asesor) {
      Alert.alert('Falta seleccionar un asesor', 'Por favor, selecciona un asesor.');
      return;
    }
  
    if (motivoConsulta === 'Seleccionar un motivo') {
      Alert.alert('Falta seleccionar el motivo de consulta', 'Por favor, selecciona un motivo de consulta.');
      return;
    }
    if (selectedCalendarId && eventDate && eventTime && selectedAsesor.id_asesor && motivoConsulta.trim() !== '') {
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
            const response = await axios.post('http://192.168.0.4:8080/crear-hora', {
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

            const { data: token } = await axios.post('http://192.168.0.4:8080/get-notification-token', {
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
            const response = await axios.post('http://192.168.0.4:8080/enviar-correo', {
              especialidad: motivoConsulta,
              nombreAsesor: selectedAsesor,
              nombreDocente: nombreUsuario,
              fecha: `${eventDate.getFullYear()}-${(eventDate.getMonth() + 1).toString().padStart(2, '0')}-${eventDate.getDate().toString().padStart(2, '0')}`,
              hora: `${eventTime.getHours().toString().padStart(2, '0')}:${eventTime.getMinutes().toString().padStart(2, '0')}`,
              correoDocente: 'c.a.ulloa.vera@gmail.com',//esto debe cambiarse por lo del Docente(quien inicia sesion)
              correoAsesor: selectedAsesor.correo,//esto debe cambiarse por el correo del Asesor seleccionado
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
      const response = await axios.post('http://192.168.0.4:8080/obtener-asesores', {
        motivoConsulta,
      });

      console.log('Respuesta del servidor:', response.data);

      if (response.status === 200) {
        const asesoresObtenidos = response.data.map((asesor) => ({
          id_asesor: asesor.id_asesor,
          nombre: asesor.nombre,
          correo: asesor.correo,
        }));
        setAsesores(asesoresObtenidos);
        console.log('Asesores obtenidos:', asesoresObtenidos);
        setShowAgendarButton(true);
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
    setButtonColor('#8e8c84'); // Cambiar el color del botón después de seleccionar la fecha
  };


  const showTimePickerModal = () => {
    setShowTimePicker(true);
    setTimeButtonColor('#'); // Cambiar el color del botón al mostrar el selector de hora
  };

  const hideTimePickerModal = () => {
    setShowTimePicker(false);
    setTimeButtonColor('#8e8c84'); // Restaurar el color del botón después de seleccionar la hora
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

      <View style={styles_Agendar.container2} >
        <TouchableOpacity onPress={showDatePickerModal} style={[styles_Agendar.button, { backgroundColor: buttonColor }]}>
          <Text>Seleccionar Fecha</Text>
        </TouchableOpacity>
      </View>
      
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
      <View style={styles_Agendar.container2}>
        <TouchableOpacity onPress={showTimePickerModal} style={[styles_Agendar.button, { backgroundColor: timeButtonColor }]}>
          <Text>Seleccionar Hora</Text>
        </TouchableOpacity>
      </View>
      {showTimePicker && (
          <View>
            <Button title="14:00" onPress={() => selectSpecificTime(14, 0)} />
            <Button title="14:30" onPress={() => selectSpecificTime(14, 30)} />
            <Button title="15:00" onPress={() => selectSpecificTime(15, 0)} />
            <Button title="15:30" onPress={() => selectSpecificTime(15, 30)} />
          </View>
      )}

      <View style={styles_Agendar.container2}>
          <TouchableOpacity onPress={getCalendars} style={[styles_Agendar.button, { backgroundColor: buttonColor }]}>
            <Text>Obtener Calendarios</Text>
          </TouchableOpacity>
      </View>

      <View style={[styles_Agendar.pickerContainer, { backgroundColor: modoReunionColor }]}>
      <Text style={styles_Agendar.label}>Modo de Reunión:</Text>
      <Picker
        selectedValue={selectedModoReunion}
        onValueChange={(value) => {
          setSelectedModoReunion(value);
          setModoReunionColor(value === 'Presencial' || value === 'Virtual' ? '#8e8c84' : '#23c0eb');
          // Cambia a #8e8c84 cuando se seleccione una opción (Presencial o Virtual), de lo contrario, mantiene el color verde
        }}
        style={styles_Agendar.picker}
      >
        <Picker.Item label="Presencial" value="Presencial" />
        <Picker.Item label="Virtual" value="Virtual" />
      </Picker>
      </View>

      <View style={[styles_Agendar.pickerContainer, { backgroundColor: motivoConsulta !== '' ? '#8e8c84' : '#23c0eb' }]}>
        <Text style={styles_Agendar.label}>Motivo de Consulta:</Text>
        <Picker
          selectedValue={motivoConsulta}
          onValueChange={(value) => {
            console.log('Motivo de consulta seleccionado:', value);
            setMotivoConsulta(value);
          }}
          style={styles_Agendar.picker} // Estilos para el Picker
          itemStyle={{ backgroundColor: motivoConsulta !== '' ? '#8e8c84' : '#23c0eb' }} // Cambia el color de los items del Picker
      >
        {motivoConsultaOptions.map((option) => (
          <Picker.Item key={option} label={option} value={option} />
        ))}
      </Picker>
      </View>

      <View style={styles_Agendar.container2}>
        <TouchableOpacity onPress={obtenerAsesores} style={[styles_Agendar.button, { backgroundColor: buttonColor }]}>
          <Text>Obtener Asesores</Text>
        </TouchableOpacity>
      </View>

      {showAgendarButton && (
        <View style={styles_Agendar.container2}>
          <TouchableOpacity onPress={addEventToCalendar} style={[styles_Agendar.button, { backgroundColor: buttonColor }]}>
            <Text>Agendar Asesoría</Text>
          </TouchableOpacity>
        </View>
      )}
      <View style={styles_Agendar.container3}>
      {/* Flatlist */}
      <Text style={styles_Agendar.TextA}>Lista de Asesores:</Text>
      {asesores.length > 0 && (
        <FlatList
          data={asesores}
          keyExtractor={(item) => item.id_asesor.toString()}
          renderItem={({ item }) => (
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: '15%', marginVertical: '4%'}}>
              <Text>{item.nombre}</Text>
              <Button title="Elegir" onPress={() => setSelectedAsesor({ id_asesor: item.id_asesor, nombre: item.nombre, correo: item.correo })} />
            </View>
          )}
        />
      )}
      </View>


    </View >
  );
};

export default AgendarScreen;