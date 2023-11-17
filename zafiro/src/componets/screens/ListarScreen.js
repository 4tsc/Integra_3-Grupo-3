import React, { useEffect, useState } from 'react';
import { View, Text, Button, FlatList } from "react-native";
import axios from 'axios';

const ListarScreen = ({ userId }) => {
  const [horas, setHoras] = useState([]);
  console.log(userId.userId, 'listar');
  const handleEliminar = async (horaId) => {
    try {
      // Realiza la solicitud para eliminar la entrada con el id específico
      await axios.delete(`http://192.168.100.7:8080/horas/${userId.userId}/${horaId}`);
      
      // Actualiza el estado eliminando la entrada con el id correspondiente
      setHoras(prevHoras => prevHoras.filter(hora => hora.id !== horaId));
    } catch (error) {
      console.error('Error al eliminar la entrada:', error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://192.168.100.7:8080/horas/${userId.userId}`);
        setHoras(response.data.rows);
        console.log('Datos recibidos:', response.data);
      } catch (error) {
        console.error('Error al realizar la solicitud:', error);
      }
    };

    fetchData();
  }, [userId]);

  return (
    <View>
      <Text>Horas del Usuario</Text>
      <FlatList
        data={horas}
        keyExtractor={(hora) => hora.id.toString()}
        renderItem={({ item: hora }) => (
          <View>
            <Text>Fecha: {hora.fecha}</Text>
            <Text>Hora: {hora.hora}</Text>
            <Text>Descripción: {hora.descripcion}</Text>
            <Button title="Eliminar" onPress={() => handleEliminar(hora.id)} />
          </View>
        )}
      />
    </View>
  );
};

export default ListarScreen;
