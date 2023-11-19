import React, { useEffect, useState } from 'react';
import { View, Text, Button, FlatList, Image, StyleSheet } from 'react-native';
import axios from 'axios';

const ListarScreen = ({ userId }) => {
  const [horas, setHoras] = useState([]);
  const [asesorData, setAsesorData] = useState({});
  const [imageBlobs, setImageBlobs] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://192.168.1.101:8080/horas/${userId}`);
        setHoras(response.data.rows);
        console.log('Datos recibidos:', response.data);
      } catch (error) {
        console.error('Error al realizar la solicitud:', error);
      }
    };

    fetchData();
  }, [userId]);

  useEffect(() => {
    const fetchAsesorData = async (id_asesor) => {
      await fetchAsesorName(id_asesor);
    };

    horas.forEach((hora) => {
      if (!asesorData[hora.id_asesor]) {
        fetchAsesorData(hora.id_asesor);
      }
    });
  }, [horas, asesorData]);

  const fetchAsesorName = async (id_asesor) => {
    try {
      const response = await fetch(`http://192.168.1.101:8080/asesores/${id_asesor}`);
      const userData = await response.json();

      const idUsuario = userData.id_usuario; // Extract id_usuario from the response

      setAsesorData((prevData) => ({
        ...prevData,
        [id_asesor]: userData.nombre,
      }));

      // Call fetchImage with the extracted id_usuario
      fetchImage(idUsuario, id_asesor);
    } catch (error) {
      console.error('Error al cargar los datos del asesor', error);
    }
  };

  const fetchImage = async (idUsuario, idAsesor) => {
    try {
      const response = await axios.get(`http://192.168.1.101:8080/images/${idUsuario}`, {
        responseType: 'blob',
      });

      const blobToDataURL = (blob) => {
        return new Promise((resolve, reject) => {
          const reader = new FileReader();
          reader.onloadend = () => resolve(reader.result);
          reader.onerror = reject;
          reader.readAsDataURL(blob);
        });
      };

      const imageUrl = await blobToDataURL(response.data);

      setImageBlobs((prevImageBlobs) => ({
        ...prevImageBlobs,
        [idAsesor]: imageUrl,
      }));
    } catch (error) {
      console.error('Error fetching image:', error);
    }
  };

  const handleEliminar = async (horaId) => {
    try {
      await axios.delete(`http://192.168.1.101:8080/horas/${userId}/${horaId}`);
      setHoras((prevHoras) => prevHoras.filter((hora) => hora.id !== horaId));
    } catch (error) {
      console.error('Error al eliminar la entrada:', error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Horas del Usuario</Text>
      <FlatList
        data={horas}
        keyExtractor={(hora) => hora.id.toString()}
        renderItem={({ item: hora }) => (
          <View style={styles.itemContainer}>
            <Image source={{ uri: imageBlobs[hora.id_asesor] }} style={styles.image} />
            <Text style={styles.text}>Fecha: {hora.fecha}</Text>
            <Text style={styles.text}>Hora: {hora.hora}</Text>
            <Text style={styles.text}>
              Descripción: Asesoría de {hora.descripcion} con {asesorData[hora.id_asesor] || 'Nombre no disponible'}
            </Text>
            <Button title="Eliminar" onPress={() => handleEliminar(hora.id)} />
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#F5F5F5',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#333',
  },
  itemContainer: {
    backgroundColor: '#FFFFFF',
    marginBottom: 20,
    padding: 15,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 10,
    elevation: 3,
  },
  image: {
    width: 150,
    height: 150,
    borderRadius: 75,
    marginBottom: 10,
    alignSelf: 'center',
  },
  text: {
    fontSize: 16,
    marginBottom: 5,
    color: '#555',
  },
});

export default ListarScreen;
