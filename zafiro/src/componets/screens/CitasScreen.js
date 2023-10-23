import React from 'react';
import { View, Text, FlatList } from 'react-native';
import { useRoute } from '@react-navigation/native';

const EventListScreen = () => {
  const route = useRoute();
  const { events } = route.params;

  return (
    <View>
      <Text>Próximos Eventos</Text>
      <FlatList
        data={events}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View>
            <Text>{item.title}</Text>
            <Text>Fecha de inicio: {item.startDate.toDateString()}</Text>
            <Text>Fecha de fin: {item.endDate.toDateString()}</Text>
          </View>
        )}
      />
    </View>
  );
};

export default EventListScreen;
