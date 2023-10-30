import * as React from 'react';
import { Ionicons } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from './inicio';
import SettingsScreen from './settings';
import LogOut from './Logout';

const Tab = createBottomTabNavigator();

function PrincipalScreen({ userId, onLogout }) {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Recursos"
        options={{
          title: 'Recursos',
          headerStyle: { backgroundColor: '#01568e' },
          headerTintColor: 'white',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="document" size={size} color={color} />
          ),
        }}
      >
        {() => <HomeScreen userId={userId} />}
      </Tab.Screen>
      <Tab.Screen
        name="Perfil"
        options={{
          title: 'Perfil',
          headerStyle: { backgroundColor: '#01568e' },
          headerTintColor: 'white',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="person-circle" size={size} color={color} />
          ),
        }}
      >
        {() => <SettingsScreen userId={userId} />}
      </Tab.Screen>
      <Tab.Screen
        name="Cerrar sesión"
        options={{
          title: 'Cerrar sesión',
          headerStyle: { backgroundColor: '#01568e' },
          headerTintColor: 'white',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="log-out-outline" size={size} color={color} />
          ),
        }}
      >
        {() => <LogOut onLogout={onLogout} />}
      </Tab.Screen>
    </Tab.Navigator>
  );
}

export default PrincipalScreen;
