import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Button } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { styles_Principal } from '../styles/styles';
import { useNavigation } from '@react-navigation/native';


const PrincipalScreen = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const navigation = useNavigation();
  const handlePress = () => {
    navigation.navigate('Agendar');
  };

  const handleDateChange = (event, date) => {
    if (date !== undefined) {
      setSelectedDate(date);
    }
    setShowDatePicker(false);
  };

  return (
    <View style={styles_Principal.container}>
      <TouchableOpacity onPress={() => setShowDatePicker(true)} style={styles_Principal.pickerBox}>
        <Text>Selecciona la fecha</Text>
      </TouchableOpacity>

      {showDatePicker && (
        <DateTimePicker
          value={selectedDate}
          mode="date"
          is24Hour={true}
          display="default"
          onChange={handleDateChange}
        />
      )}

      {selectedDate && (
        <Text style={styles_Principal.selectedDate}>
          Fecha seleccionada: {selectedDate.toLocaleDateString()}
        </Text>
      )}

      <Button
        title="Enviar"
        onPress={handlePress}
      />
    </View>
  );
};

export default PrincipalScreen;
