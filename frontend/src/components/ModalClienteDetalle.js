// src/components/ModalClienteDetalle.js
import React, { useState, useEffect } from 'react';
import { db } from '../firebase';
import { doc, getDoc, updateDoc } from "firebase/firestore";

function ModalClienteDetalle({ clienteId, onClose, onUpdate }) {
    const [cliente, setCliente] = useState(null);
    const [formData, setFormData] = useState({});
    const [loading, setLoading] = useState(true);

    const afps = ['Capital', 'Cuprum', 'Habitat', 'Modelo', 'Planvital', 'Provida', 'Uno'];
    const tiposPension = ['Vejez', 'Invalidez', 'Sobrevivencia'];

    // Lógica para obtener los datos del cliente al cargar
    useEffect(() => {
        const fetchCliente = async () => {
            if (!clienteId) return;

            const docRef = doc(db, "clientes", clienteId);
            const docSnap = await getDoc(docRef);

            if (docSnap.exists()) {
                const data = docSnap.data();
                setCliente(data);
                setFormData(data); // Inicializa el formulario con los datos actuales
            } else {
                console.error("No se encontró el cliente con ID:", clienteId);
            }
            setLoading(false);
        };
        fetchCliente();
    }, [clienteId]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSave = async (e) => {
        e.preventDefault();
        try {
            const clienteRef = doc(db, "clientes", clienteId);
            
            // Actualiza solo los campos cambiados
            await updateDoc(clienteRef, formData); 
            
            alert("Datos del cliente actualizados con éxito!");
            onUpdate(); // Función para refrescar la lista si es necesario
            onClose(); 
        } catch (error) {
            console.error("Error al actualizar:", error);
            alert("Hubo un error al guardar los cambios.");
        }
    };

    if (loading) {
        return <div className="modal-background"><div className="modal-form">Cargando detalles...</div></div>;
    }

    if (!cliente) return null;

    return (
        <div className="modal-background">
            <form onSubmit={handleSave} className="modal-form">
                <h3 style={{color: '#00BCD4'}}>Detalles de {cliente.nombre} {cliente.apellido}</h3>
                
                {/* --- CAMPOS DE EDICIÓN --- */}
                
                <label>RUT:</label>
                <input type="text" value={cliente.rut} disabled style={{opacity: 0.6}} /> 
                
                <label>AFP:</label>
                <select name="afp" onChange={handleChange} value={formData.afp || ''}>
                    {afps.map(a => <option key={a} value={a}>{a}</option>)}
                </select>

                <label>Tipo de Pensión:</label>
                <select name="tipo_pension" onChange={handleChange} value={formData.tipo_pension || ''}>
                    {tiposPension.map(t => <option key={t} value={t}>{t}</option>)}
                </select>

                <label>Detalle de Llamadas:</label>
                <textarea name="detalleLlamadas" onChange={handleChange} value={formData.detalleLlamadas || ''} rows="3"></textarea>
                
                {/* --- BOTONES --- */}
                <button type="submit">Guardar Cambios</button>
                <button type="button" onClick={onClose} style={{backgroundColor: '#6c757d'}}>Cerrar</button>
            </form>
        </div>
    );
}

export default ModalClienteDetalle;