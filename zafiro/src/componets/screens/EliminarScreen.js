import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, TouchableOpacity, FlatList, Button, Modal } from "react-native";
//test

const EliminarScreen = () => {
  const [appointments, setAppointments] = useState([
    { id: "1", time: "9:00 AM - 10:00 AM", advisor: "Advisor CJP" },
    { id: "2", time: "11:00 AM - 12:00 PM", advisor: "Advisor CSF" },
    // Agregar aquí más horas agendadas si es necesario
  ]);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [showRescheduleModal, setShowRescheduleModal] = useState(false);
  const [availableTimes, setAvailableTimes] = useState([]);

  // Supongamos que aquí obtienes las horas disponibles de alguna fuente de datos.
  // Para este ejemplo, simplemente generamos algunas horas disponibles ficticias.
  useEffect(() => {
    const availableHours = generateAvailableHours();
    setAvailableTimes(availableHours);
  }, []);

  const generateAvailableHours = () => {
    const availableHours = [];

    // Simplemente generamos horas disponibles ficticias para los próximos 7 días.
    const currentDate = new Date();
    for (let i = 0; i < 7; i++) {
      const date = new Date(currentDate);
      date.setDate(currentDate.getDate() + i);
      const formattedDate = date.toLocaleDateString();
      availableHours.push(
        { id: i.toString(), time: `9:00 AM - 10:00 AM (${formattedDate})` },
        { id: (i + 7).toString(), time: `10:00 AM - 11:00 AM (${formattedDate})` },
        // Agregar más horas disponibles si es necesario
      );
    }

    return availableHours;
  };

  const handleDelete = () => {
    if (selectedAppointment) {
      const updatedAppointments = appointments.filter((appointment) => appointment.id !== selectedAppointment.id);
      setAppointments(updatedAppointments);
      setSelectedAppointment(null);
      setShowDeleteModal(false);
    }
  };

  return (
    <View style={styles_Eliminar.container}>
      <Text style={styles_Eliminar.title}>Horas Agendadas</Text>
      <FlatList
        data={appointments}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => {
              setSelectedAppointment(item);
              setShowDeleteModal(true);
            }}
            style={styles_Eliminar.appointmentItem}
          >
            <Text>{item.time}</Text>
            <Text>Asesor: {item.advisor}</Text>
          </TouchableOpacity>
        )}
      />

      <Modal visible={showDeleteModal} animationType="slide" transparent={true}>
        <View style={styles_Eliminar.modalContainer}>
          <View style={styles_Eliminar.modalContent}>
            <Text>¿Deseas eliminar esta hora agendada?</Text>
            <Button title="Eliminar" onPress={handleDelete} />
            <Button
              title="Cancelar"
              onPress={() => {
                setSelectedAppointment(null);
                setShowDeleteModal(false);
              }}
            />
          </View>
        </View>
      </Modal>

      {/* Agregar un botón para reagendar */}
      <Button
        title="Reagendar Hora"
        onPress={() => setShowRescheduleModal(true)}
      />

      {/* Modal para mostrar horas disponibles */}
      <Modal visible={showRescheduleModal} animationType="slide" transparent={true}>
        <View style={styles_Eliminar.modalContainer}>
          <View style={styles_Eliminar.modalContent}>
            <Text>Selecciona una hora disponible:</Text>
            <FlatList
              data={availableTimes}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => (
                <Button
                  title={item.time}
                  onPress={() => {
                    // Aquí puedes agregar la lógica para reagendar la hora
                    console.log("Hora reagendada:", item.time);
                    setShowRescheduleModal(false);
                  }}
                />
              )}
            />
            <Button
              title="Cancelar"
              onPress={() => {
                setShowRescheduleModal(false);
              }}
            />
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default EliminarScreen;
