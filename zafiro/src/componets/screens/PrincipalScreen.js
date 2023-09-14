import * as React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from './inicio';
import SettingsScreen from './settings';
import LogOut from './Logout';
const Tab = createBottomTabNavigator();
//probando
function PrincipalScreen() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Inicio" options={{ title: 'Inicio', headerStyle: { backgroundColor: '#01568e' }, headerTintColor: 'white' }} component={HomeScreen} />
      <Tab.Screen name="Perfil" options={{ title: 'Perfil', headerStyle: { backgroundColor: '#01568e' }, headerTintColor: 'white' }}  component={SettingsScreen} />
      <Tab.Screen name= "Cerrar sesión'" options={{ title: 'Cerrar sesión', headerStyle: { backgroundColor: '#01568e' }, headerTintColor: 'white' }} component={LogOut}/>
    </Tab.Navigator>
  );
}

export default PrincipalScreen;
