import * as React from 'react';
import { Ionicons } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from './inicio';
import SettingsScreen from './settings';
import LogOut from './Logout';
import ListarScreen from './ListarScreen';

const Tab = createBottomTabNavigator();

function PrincipalScreen({ userId, onLogout }) {
  console.log(userId.userId, userId.userType )
  return (
    <Tab.Navigator>

      {userId.userType === 'usuario' && (
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
      )}
      <Tab.Screen
        name="Listar horas"
        options={{
          title: 'Listar horas',
          headerStyle: { backgroundColor: '#01568e' },
          headerTintColor: 'white',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="log-out-outline" size={size} color={color} />
          ),
        }}
      >
        {() => <ListarScreen userId={userId} />}
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
