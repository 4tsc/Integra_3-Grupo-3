import * as React from 'react';
import { Ionicons } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from './inicio';
import SettingsScreen from './settings';
import LogOut from './Logout';
import EventosScreen from './EventosScreen';

const Tab = createBottomTabNavigator();
//test

function PrincipalScreen() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Recursos" options={{ title: 'Recursos', headerStyle: { backgroundColor: '#01568e' }, headerTintColor: 'white', tabBarIcon: ({ color, size }) => (
      <Ionicons name="document"  size={size} color={color} />) }} component={HomeScreen} />
      <Tab.Screen name="Perfil" options={{ title: 'Perfil', headerStyle: { backgroundColor: '#01568e' }, headerTintColor: 'white', tabBarIcon: ({ color, size }) => (
      <Ionicons name="person-circle"  size={size} color={color} />) }}  component={SettingsScreen} />
      <Tab.Screen name= "Reservas" options={{ title: 'Citas', headerStyle: { backgroundColor: '#01568e' }, headerTintColor: 'white', tabBarIcon: ({ color, size }) => (
      <Ionicons name="calendar"  size={size} color={color} />) }} component={EventosScreen}/>
      <Tab.Screen name= "Cerrar sesión'" options={{ title: 'Cerrar sesión', headerStyle: { backgroundColor: '#01568e' }, headerTintColor: 'white', tabBarIcon: ({ color, size }) => (
      <Ionicons name="log-out-outline"  size={size} color={color} />) }} component={LogOut}/>
      
    </Tab.Navigator>
  );
}

export default PrincipalScreen;
