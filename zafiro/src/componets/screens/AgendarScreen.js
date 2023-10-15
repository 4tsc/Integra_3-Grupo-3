import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Button } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import { styles_Agendar } from "../styles/styles";
import * as WebBrowser from "expo-web-browser";
import * as Google from "expo-auth-session/providers/google";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native"; // Importar useNavigation

WebBrowser.maybeCompleteAuthSession();

const Agendar = () => {
  const genericTime = new Date();
  genericTime.setHours(0, 0, 0, 0); // Hora genérica a las 00:00:00
  const today = new Date();

  const [selectedDate, setSelectedDate] = useState(today);
  const [selectedTime, setSelectedTime] = useState(genericTime);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);
  const [selectedAdvisor, setSelectedAdvisor] = useState(null);

  const [token, setToken] = useState("");
  const [userInfo, setUserInfo] = useState(null);

  const advisors = [
    {
      name: "Advisor CJP",
      location: "CJP",
      schedule: "9:00 AM - 5:00 PM",
    },
    {
      name: "Advisor CSF",
      location: "CSF",
      schedule: "10:00 AM - 6:00 PM",
    },
  ];

  const navigation = useNavigation(); // Usar useNavigation para acceder a la navegación

  const handleDateChange = (event, date) => {
    if (date !== undefined) {
      setSelectedDate(date);
    }
    setShowDatePicker(false);
  };

  const handleTimeChange = (event, time) => {
    if (time !== undefined) {
      // Mantener la fecha seleccionada, pero actualizar la hora
      const newSelectedTime = new Date(selectedDate);
      newSelectedTime.setHours(time.getHours(), time.getMinutes(), 0, 0);
      setSelectedTime(newSelectedTime);
    }
    setShowTimePicker(false);
  };

  const [request, response, promptAsync] = Google.useAuthRequest({
    androidClientId: "1076295499568-o3589h9gkneom947qt5t71o0vme0uqep.apps.googleusercontent.com",
    webClientId: "1076295499568-o3589h9gkneom947qt5t71o0vme0uqep.apps.googleusercontent.com",
  });

  useEffect(() => {
    handleEffect();
  }, [response, token]);

  async function handleEffect() {
    const user = await getLocalUser();
    console.log("user", user);
    if (!user) {
      if (response?.type === "success") {
        // setToken(response.authentication.accessToken);
        getUserInfo(response.authentication.accessToken);
      }
    } else {
      setUserInfo(user);
      console.log("loaded locally");
    }
  }

  const getLocalUser = async () => {
    const data = await AsyncStorage.getItem("@user");
    if (!data) return null;
    return JSON.parse(data);
  };

  const getUserInfo = async (token) => {
    if (!token) return;
    try {
      const response = await fetch(
        "https://www.googleapis.com/userinfo/v2/me",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      const user = await response.json();
      await AsyncStorage.setItem("@user", JSON.stringify(user));
      setUserInfo(user);
    } catch (error) {
      // Add your own error handler here
    }
  };

  return (
    <View style={styles.container}>
      {!userInfo ? (
        <Button
          title="Sign in with Google"
          disabled={!request}
          onPress={() => {
            promptAsync();
          }}
        />
      ) : (
        <View style={styles_Agendar.container}>
          <TouchableOpacity onPress={() => setShowDatePicker(true)} style={styles_Agendar.pickerBox}>
            <Text>Selecciona la fecha</Text>
            {showDatePicker && (
              <DateTimePicker
                value={selectedDate}
                mode="date"
                is24Hour={true}
                display="default"
                onChange={handleDateChange}
              />
            )}
            {selectedDate.getTime() !== today.getTime() && (
              <Text style={styles_Agendar.selectedDateTime}>
                Fecha seleccionada: {selectedDate.toLocaleDateString()}
              </Text>
            )}
          </TouchableOpacity>

          <TouchableOpacity onPress={() => setShowTimePicker(true)} style={styles_Agendar.pickerBox}>
            <Text>Selecciona la hora</Text>
            {showTimePicker && (
              <DateTimePicker
                value={selectedTime}
                mode="time"
                is24Hour={true}
                display="default"
                onChange={handleTimeChange}
              />
            )}
            {selectedTime.getTime() !== genericTime.getTime() && (
              <Text style={styles_Agendar.selectedDateTime}>
                Hora seleccionada: {selectedTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </Text>
            )}
          </TouchableOpacity>

          <View style={styles_Agendar.advisorPicker}>
            <Text>Selecciona un asesor</Text>
            <View style={styles_Agendar.advisorButtons}>
              {advisors.map((advisor, index) => (
                <Button
                  key={index}
                  title={advisor.name}
                  onPress={() => setSelectedAdvisor(advisor)}
                />
              ))}
            </View>
            {selectedAdvisor && (
              <Text style={styles_Agendar.selectedDateTime}>
                Asesor seleccionado: {selectedAdvisor.name}
                {"\n"}Ubicación: {selectedAdvisor.location}
                {"\n"}Horario: {selectedAdvisor.schedule}
              </Text>
            )}
          </View>

          <Button
            title="Enviar"
            onPress={() => {
              // Acciones con las fechas, horas y asesor seleccionados
              if (selectedAdvisor) {
                console.log("Fecha:", selectedDate.toLocaleDateString());
                console.log("Hora:", selectedTime.toLocaleTimeString());
                console.log("Asesor:", selectedAdvisor.name);
                navigation.navigate("EliminarScreen");
              }
            }}
          />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    fontSize: 20,
    fontWeight: "bold",
  },
  card: {
    borderWidth: 1,
    borderRadius: 15,
    padding: 15,
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
});

export default Agendar;
