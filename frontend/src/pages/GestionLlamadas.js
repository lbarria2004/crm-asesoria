// src/pages/GestionLlamadas.js
import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { db } from '../firebase';

// ¡CAMBIO CLAVE AQUÍ! Importamos onSnapshot para la conexión en tiempo real
import { collection, query, where, onSnapshot } from "firebase/firestore"; 

import TarjetaCliente from '../components/TarjetaCliente';
import FormularioNuevoContacto from '../components/FormularioNuevoContacto';

function GestionLlamadas() {
  const [clientes, setClientes] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const location = useLocation();

  // Función para determinar el estado actual basado en la URL
  const getEstadoFromPath = () => {
    if (location.pathname === '/') return 'Gestión de Llamadas';
    if (location.pathname === '/prospectos') return 'Prospecto';
    if (location.pathname === '/asesoria') return 'Asesoría';
    if (location.pathname === '/pensionados') return 'Pensionado';
    return 'Gestión de Llamadas';
  };

  // La lógica de lectura se mueve aquí para manejar la suscripción
  useEffect(() => {
    const currentEstado = getEstadoFromPath();
    const clientesRef = collection(db, "clientes");
    
    // 1. Definimos la consulta filtrada por estado
    const q = query(clientesRef, where("estado", "==", currentEstado));

    // 2. onSnapshot: Abre una conexión en tiempo real. 
    //    Cualquier cambio en la base de datos (guardar o mover) actualizará esta lista.
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const clientesData = querySnapshot.docs.map(doc => ({
        id_cliente: doc.id, // ID del documento de Firebase
        ...doc.data()
      }));
      setClientes(clientesData);
      
    }, (error) => {
      console.error('Error en la suscripción de datos:', error);
      // Solo mostramos error en consola para no interrumpir el flujo del usuario
    });

    // 3. Función de limpieza: Es crucial que esto se ejecute al salir del componente 
    //    para cerrar la conexión y evitar fugas de memoria.
    return () => unsubscribe(); 

  }, [location.pathname]); // La dependencia [location.pathname] asegura que la suscripción cambie cuando cambias de vista (ej. de Prospectos a Asesoría).

  const titulo = getEstadoFromPath();

  return (
    <div>
      <h2>{titulo}</h2>
      {titulo === 'Gestión de Llamadas' && (
        <button onClick={() => setShowForm(true)}>+ Nuevo Contacto</button>
      )}
      {showForm && (
        <div className="modal-background">
          <FormularioNuevoContacto onHide={() => { setShowForm(false); }} />
        </div>
      )}
      <div className="clientes-list">
        {clientes.length > 0 ? (
          clientes.map(cliente => (
            <TarjetaCliente
              key={cliente.id_cliente}
              cliente={cliente}
              // Ya no necesitamos onMove para refrescar, la suscripción lo hace automáticamente
              onMove={() => {}} 
            />
          ))
        ) : (
          <p>No hay clientes en esta etapa.</p>
        )}
      </div>
    </div>
  );
}

export default GestionLlamadas;