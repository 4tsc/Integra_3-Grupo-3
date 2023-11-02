import Navegador from './src/componets/navegation.js';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { EventProvider } from './src/componets/EventContext.js'; // Importa el EventProvider

export default function App() {
  return (
    <EventProvider>
      <NavigationContainer>
        <Navegador />
      </NavigationContainer>
    </EventProvider>
  );
}
