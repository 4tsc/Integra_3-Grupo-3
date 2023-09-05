import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, FlatList, Button, Modal } from "react-native";

const EliminarScreen = () => {
  const [appointments, setAppointments] = useState([
    { id: "1", time: "9:00 AM - 10:00 AM", advisor: "Advisor CJP" },
    { id: "2", time: "11:00 AM - 12:00 PM", advisor: "Advisor CSF" },
    // Agrega aquí más horas agendadas si es necesario
  ]);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedAppointment, setSelectedAppointment] = useState(null);

  const handleDelete = () => {
    if (selectedAppointment) {
      const updatedAppointments = appointments.filter((appointment) => appointment.id !== selectedAppointment.id);
      setAppointments(updatedAppointments);
      setSelectedAppointment(null);
      setShowDeleteModal(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Horas Agendadas</Text>
      <FlatList
        data={appointments}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => {
              setSelectedAppointment(item);
              setShowDeleteModal(true);
            }}
            style={styles.appointmentItem}
          >
            <Text>{item.time}</Text>
            <Text>Asesor: {item.advisor}</Text>
          </TouchableOpacity>
        )}
      />

      <Modal visible={showDeleteModal} animationType="slide" transparent={true}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
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
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
  },
  appointmentItem: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "flex-start",
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    width: 300,
    padding: 20,
    backgroundColor: "white",
    borderRadius: 10,
    alignItems: "center",
  },
});

export default EliminarScreen;
