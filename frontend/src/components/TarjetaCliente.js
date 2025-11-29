// src/components/TarjetaCliente.js (Actualizado para usar Modal)
import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { db } from '../firebase';
import { doc, updateDoc } from "firebase/firestore";

// Importamos el nuevo componente de Modal
import ModalClienteDetalle from './ModalClienteDetalle'; 

function TarjetaCliente({ cliente, onMove }) {
    const location = useLocation();
    const [showModal, setShowModal] = useState(false); // Estado para mostrar/ocultar el modal

    const handleMove = async (nuevoEstado) => {
        try {
            const clienteRef = doc(db, "clientes", cliente.id_cliente); 
            await updateDoc(clienteRef, {
                estado: nuevoEstado
            });
            alert(`Cliente movido a ${nuevoEstado}`);
            // onSnapshot en GestionLlamadas se encargará de refrescar la lista automáticamente
        } catch (error) {
            console.error('Error al mover el cliente:', error);
            alert('Hubo un error al actualizar el estado.');
        }
    };

    const renderBoton = () => {
        switch(location.pathname) {
            case '/':
                return (
                    <button onClick={() => handleMove('Prospecto')}>Mover a Prospectos</button>
                );
            case '/prospectos':
                return (
                    <button onClick={() => handleMove('Asesoría')}>Mover a Asesoría</button>
                );
            case '/asesoria':
                return (
                    <button onClick={() => handleMove('Pensionado')}>Mover a Pensionados</button>
                );
            default:
                return null;
        }
    };

    return (
        <>
            <div className="cliente-card">
                <h3>{cliente.nombre} {cliente.apellido}</h3>
                <p>RUT: {cliente.rut}</p>
                <p>AFP: {cliente.afp || 'N/A'}</p>
                <p>Pensión: {cliente.tipo_pension || 'N/A'}</p>
                <p>Estado: **{cliente.estado}**</p>
                
                {/* BOTÓN PARA ABRIR EL MODAL */}
                <button onClick={() => setShowModal(true)}>Ver cliente</button> 
                {renderBoton()}
            </div>

            {/* Renderizar el modal si showModal es true */}
            {showModal && (
                <ModalClienteDetalle
                    clienteId={cliente.id_cliente}
                    onClose={() => setShowModal(false)}
                    // onUpdate no es necesario por onSnapshot, pero lo pasamos por si acaso
                    onUpdate={() => {}} 
                />
            )}
        </>
    );
}

export default TarjetaCliente;