import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Log_in from './screens/LoginScreen.js'; 
import Agendar from './screens/AgendarScreen.js'; 
import PrincipalScreen from './screens/PrincipalScreen.js';
import EliminarScreen from './screens/EliminarScreen.js';

const Stack = createStackNavigator();

const Navegador = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="LogInScreen">
        <Stack.Screen name="PrincipalScreen" options={{title: 'Menu',headerStyle: {backgroundColor: 'blue',},headerTintColor: 'white',}}component={PrincipalScreen} />
        <Stack.Screen name="LogInScreen" options={{title: 'Inicio de sesión',headerStyle: {backgroundColor: 'blue',},headerTintColor: 'white',}}component={Log_in} />
        <Stack.Screen name="Agendar" options={{title: 'Agendar Hora',headerStyle: {backgroundColor: 'blue',},headerTintColor: 'white',}} component={Agendar} />
        <Stack.Screen name="EliminarScreen" options={{title: 'Eliminar Hora',headerStyle: {backgroundColor: 'blue',},headerTintColor: 'white',}} component={EliminarScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navegador;
