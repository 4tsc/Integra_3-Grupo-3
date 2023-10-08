import React, { useState, useEffect } from "react";
import { Button, Text, View } from "react-native";
import ApiCalendar from "react-google-calendar-api";

const App = () => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    if (ApiCalendar.sign) {
      ApiCalendar.listUpcomingEvents(10)
        .then(({ result }) => {
          setEvents(result.items);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, []);

  const handleAuthClick = () => {
    if (ApiCalendar.sign) {
      ApiCalendar.signOut();
      setEvents([]);
    } else {
      ApiCalendar.handleAuthClick();
    }
  };

  const createEvent = () => {
    const eventFromNow = {
      summary: "Nuevo evento",
      time: 480,
    };

    ApiCalendar.createEventFromNow(eventFromNow)
      .then((result) => {
        console.log(result);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <View>
      <Button onPress={handleAuthClick} title={ApiCalendar.sign ? "Cerrar sesión" : "Iniciar sesión"} />
      <Button onPress={createEvent} title="Crear evento" />
      {events.map((event, i) => (
        <Text key={i}>{event.summary}</Text>
      ))}
    </View>
  );
};

export default App;
