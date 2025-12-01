// src/components/ModalClienteDetalle.js (VERSIÓN CON BORRADO)
import React, { useState, useEffect } from 'react';
import { db } from '../firebase';
// Importamos deleteDoc para la función de borrado
import { doc, getDoc, updateDoc, deleteDoc } from "firebase/firestore"; 

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
                setFormData(data); 
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
            await updateDoc(clienteRef, formData); 
            alert("Datos del cliente actualizados con éxito!");
            onUpdate();
            onClose(); 
        } catch (error) {
            console.error("Error al actualizar:", error);
            alert("Hubo un error al guardar los cambios.");
        }
    };
    
    // --- FUNCIÓN DE BORRADO ---
    const handleDelete = async () => {
        const confirmDelete = window.confirm(`¿Estás seguro de que deseas ELIMINAR permanentemente a ${cliente.nombre} ${cliente.apellido}? Esta acción no se puede deshacer.`);
        
        if (!confirmDelete) return;

        try {
            const clienteRef = doc(db, "clientes", clienteId);
            await deleteDoc(clienteRef); // EJECUTA EL BORRADO
            
            alert("Cliente eliminado con éxito.");
            onUpdate(); // Refresca la lista de clientes (aunque onSnapshot ya lo hace)
            onClose(); // Cierra el modal
        } catch (error) {
            console.error("Error al eliminar:", error);
            alert("Hubo un error al intentar eliminar el cliente.");
        }
    };
    // -------------------------

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
                <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '20px' }}>
                    <button type="submit">Guardar Cambios</button>
                    
                    {/* BOTÓN DE BORRADO: Llama a la nueva función handleDelete */}
                    <button 
                        type="button" 
                        onClick={handleDelete} 
                        style={{backgroundColor: '#dc3545', marginLeft: '10px'}} 
                    >
                        🗑️ Borrar Cliente
                    </button>
                    
                    <button type="button" onClick={onClose} style={{backgroundColor: '#6c757d', marginLeft: '10px'}}>Cerrar</button>
                </div>
            </form>
        </div>
    );
}

export default ModalClienteDetalle;