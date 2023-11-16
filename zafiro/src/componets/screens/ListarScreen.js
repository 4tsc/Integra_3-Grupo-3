import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ListarScreen = ({ userId }) => {
  const [horas, setHoras] = useState([]);

  const handleEliminar = async (horaId) => {
    try {
      // Realiza la solicitud para eliminar la entrada con el id específico
      await axios.delete(`http://192.168.100.7:8080/horas/${userId}/${horaId}`);
      
      // Actualiza el estado eliminando la entrada con el id correspondiente
      setHoras(prevHoras => prevHoras.filter(hora => hora.id !== horaId));
    } catch (error) {
      console.error('Error al eliminar la entrada:', error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://192.168.100.7:8080/horas/${userId}`);
        setHoras(response.data.rows);
        console.log('Datos recibidos:', response.data);
      } catch (error) {
        console.error('Error al realizar la solicitud:', error);
      }
    };

    fetchData();
  }, [userId]);

  return (
    <div>
      <h1>Horas del Usuario</h1>
      <ul>
        {horas.map((hora) => (
          <li key={hora.id}>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <div>
                <p>Fecha: {hora.fecha}</p>
                <p>Hora: {hora.hora}</p>
                <p>Descripción: {hora.descripcion}</p>
              </div>
              <button onClick={() => handleEliminar(hora.id)}>Eliminar</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ListarScreen;
