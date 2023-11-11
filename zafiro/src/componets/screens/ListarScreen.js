import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ListarScreen = ({ userId }) => {
  const [horas, setHoras] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://192.168.0.5:8080/horas/${userId}`);
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
        {horas.map(hora => (
          <li key={hora.fecha}>
            <p>Fecha: {hora.fecha}</p>
            <p>Hora: {hora.hora}</p>
            <p>Descripción: {hora.descripcion}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ListarScreen;
