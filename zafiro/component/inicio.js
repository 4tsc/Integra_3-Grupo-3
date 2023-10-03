<<<<<<< HEAD
import React, { useEffect } from 'react';
import { View, Text, Button, Alert } from 'react-native';
import { AsyncStorage } from 'react-native';
import { google } from 'googleapis';
import * as AppAuth from 'react-native-app-auth';

const SCOPES = ['https://www.googleapis.com/auth/calendar.readonly'];
const TOKEN_KEY = 'AIzaSyBWF5-TLDsab_VhT-96PapRe_sba0xzIpw';
const CREDENTIALS_PATH = require('./credentials.json');

const CalendarScreen = () => {
  const loadSavedCredentialsIfExist = async () => {
    try {
      const token = await AsyncStorage.getItem(TOKEN_KEY);
      if (token) {
        const credentials = JSON.parse(token);
        return new google.auth.OAuth2(credentials.installed);
      }
      return null;
    } catch (err) {
      return null;
    }
  };

  const saveCredentials = async (client) => {
    const payload = JSON.stringify(client.credentials);
    await AsyncStorage.setItem(TOKEN_KEY, payload);
  };

  const authorize = async () => {
    let client = await loadSavedCredentialsIfExist();
    if (client) {
      return client;
    }

    // Realiza la autenticación en React Native aquí utilizando react-native-app-auth.
    // Asegúrate de seguir la documentación de react-native-app-auth para configurar la autenticación correctamente.

    if (client.credentials) {
      await saveCredentials(client);
    }
    return client;
  };

  const listEvents = async (auth) => {
    const calendar = google.calendar({ version: 'v3', auth });
    try {
      const res = await calendar.events.list({
        calendarId: 'primary',
        timeMin: new Date().toISOString(),
        maxResults: 10,
        singleEvents: true,
        orderBy: 'startTime',
      });
      const events = res.data.items;
      if (!events || events.length === 0) {
        Alert.alert('No upcoming events found.');
      } else {
        const upcomingEvents = events.map((event, i) => {
          const start = event.start.dateTime || event.start.date;
          return `${start} - ${event.summary}`;
        });
        Alert.alert('Upcoming 10 events:', upcomingEvents.join('\n'));
      }
    } catch (error) {
      Alert.alert('Error fetching events:', error.message);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const auth = await authorize();
        await listEvents(auth);
      } catch (error) {
        Alert.alert('Error:', error.message);
      }
    };
    fetchData();
  }, []);

  return (
    <View>
      <Text>Calendar Screen</Text>
      {/* Puedes agregar más elementos aquí, como botones o información adicional */}
=======
import * as React from 'react';
import { View, Text } from 'react-native';
import App_button from './button';

function HomeScreen() {
  return (
    <View>
      
      <App_button></App_button>
>>>>>>> avalenzuela
    </View>
  );
};

export default CalendarScreen;
