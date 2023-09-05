import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Log_in from './screens/LoginScreen.js'; 
import Agendar from './screens/AgendarScreen.js'; 
import PrincipalScreen from './screens/PrincipalScreen.js';
//probando

const Stack = createStackNavigator();

const Navegador = () => {
  return (
    <Stack.Navigator initialRouteName="LogInScreen">
      <Stack.Screen name="LogInScreen" options={{ title: 'Inicio de sesión', headerStyle: { backgroundColor: '#01568e' }, headerTintColor: 'white' }} component={Log_in} />
      <Stack.Screen name="PrincipalScreen" options={{ headerShown: false }} component={PrincipalScreen} />
      <Stack.Screen name="Agendar" options={{ title: 'Agendar Hora', headerStyle: { backgroundColor: '#01568e' }, headerTintColor: 'white' }} component={Agendar} />
    </Stack.Navigator>
  );
};

export default Navegador;










// import React from 'react';
// import { NavigationContainer } from '@react-navigation/native';
// import { createStackNavigator } from '@react-navigation/stack';
// import Log_in from './screens/LoginScreen.js'; 
// import Agendar from './screens/AgendarScreen.js'; 
// import PrincipalScreen from './screens/PrincipalScreen.js';

// const Stack = createStackNavigator();

// const Navegador = () => {
//   return (
//     <NavigationContainer>
//       <Stack.Navigator initialRouteName="PrincipalScreen">
//         <Stack.Screen name="PrincipalScreen" options={{title: 'Menu',headerStyle: {backgroundColor: 'blue',},headerTintColor: 'white',}}component={PrincipalScreen} />
//         <Stack.Screen name="LogInScreen" options={{title: 'Inicio de sesión',headerStyle: {backgroundColor: 'blue',},headerTintColor: 'white',}}component={Log_in} />
//         <Stack.Screen name="Agendar" options={{title: 'Agendar Hora',headerStyle: {backgroundColor: 'blue',},headerTintColor: 'white',}} component={Agendar} />
//       </Stack.Navigator>
//     </NavigationContainer>
//   );
// };

// export default Navegador;

