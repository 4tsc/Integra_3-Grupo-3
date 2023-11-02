// EventContext.js
import React, { createContext, useContext, useReducer } from 'react';

const EventContext = createContext();

export const EventProvider = ({ children }) => {
  const initialState = {
    events: [], // Aquí guardarás los eventos
    // Otras informaciones que desees guardar
  };

  const [state, dispatch] = useReducer(eventReducer, initialState);

  return (
    <EventContext.Provider value={{ state, dispatch }}>
      {children}
    </EventContext.Provider>
  );
};

export const useEventContext = () => {
  return useContext(EventContext);
};

function eventReducer(state, action) {
  switch (action.type) {
    case 'ADD_EVENT':
      return {
        ...state,
        events: [...state.events, action.payload],
      };
    // Agregar otros casos para actualizar o eliminar eventos si es necesario
    default:
      return state;
  }
}
