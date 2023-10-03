import * as React from 'react';
import { Ionicons } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from './inicio';
import SettingsScreen from './settings';
import LogOut from './Logout';
import UploadScreen from './Upload';
const Tab = createBottomTabNavigator();
//probando
function PrincipalScreen() {
  return (
    <Tab.Navigator>
      {/* Navigator de recurso */}
      <Tab.Screen name="Recursos" options={{ title: 'Recursos', headerStyle: { backgroundColor: '#01568e' }, headerTintColor: 'white', tabBarIcon: ({ color, size }) => (
      <Ionicons name="document"  size={size} color={color} />) }} component={HomeScreen} />

      {/* Navigator de Horas */}
      <Tab.Screen name="Horas" options={{ title: 'Horas', headerStyle: { backgroundColor: '#01568e' }, headerTintColor: 'white', tabBarIcon: ({ color, size }) => (
      <Ionicons name="calendar"  size={size} color={color} />) }}  component={SettingsScreen} />

      {/* Navigator de Subida */}
      <Tab.Screen name="Subida" options={{ title: 'Subida', headerStyle: { backgroundColor: '#01568e' }, headerTintColor: 'white', tabBarIcon: ({ color, size }) => (
      <Ionicons name="cloud-upload-outline"  size={size} color={color} />) }} component={UploadScreen} />

      {/* Navigator de cerrar sesión */}
      <Tab.Screen name= "Cerrar sesión'" options={{ title: 'Cerrar sesión', headerStyle: { backgroundColor: '#01568e' }, headerTintColor: 'white', tabBarIcon: ({ color, size }) => (
      <Ionicons name="log-out-outline"  size={size} color={color} />) }} component={LogOut}/>
    </Tab.Navigator>
  );
}

export default PrincipalScreen;
