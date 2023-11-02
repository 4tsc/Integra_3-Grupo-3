import React from 'react';
import { View, Text, FlatList } from 'react-native';
import { useEventContext } from '../EventContext';

const EventosScreen = () => {
  const { state } = useEventContext();

  return (
    <View>
      <Text>Eventos Programados:</Text>
      <FlatList
        data={state.events}
        keyExtractor={(item) => (item && item.id ? item.id.toString() : '')}
        renderItem={({ item }) => (
        <View>
          <Text>Titulo: {item.title}</Text>
          <Text>Fecha: {item.startDate ? new Date(item.startDate).toDateString() : 'N/A'}</Text>
          <Text>Modo de Reunión: {item.modoReunion}</Text>
          {/* Puedes mostrar más detalles de tus eventos aquí */}
       </View>
      )}
    />
    </View>
  );
};

export default EventosScreen;
