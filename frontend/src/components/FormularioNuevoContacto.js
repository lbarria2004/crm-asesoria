// src/components/FormularioNuevoContacto.js
import React, { useState } from 'react';
import { db } from '../firebase'; // Importa la conexión a Firebase
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

function FormularioNuevoContacto({ onHide }) {
  const [formData, setFormData] = useState({
    nombre: '',
    apellido: '',
    rut: '',
    afp: '',
    tipo_pension: '', // Nuevo campo para guardar el tipo de pensión
    detalleLlamadas: '',
  });

  const afps = ['Capital', 'Cuprum', 'Habitat', 'Modelo', 'Planvital', 'Provida', 'Uno'];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = async (e, estadoInicial) => {
    e.preventDefault();
    
    // Verificación básica
    if (!formData.nombre || !formData.rut) {
        alert("El nombre y el RUT son obligatorios.");
        return;
    }

    try {
      // Guarda los datos en la colección "clientes"
      await addDoc(collection(db, "clientes"), {
        ...formData,
        estado: estadoInicial,
        fecha_creacion: serverTimestamp() // Usa la marca de tiempo del servidor de Firebase
      });
      
      alert(`Contacto guardado en ${estadoInicial} con éxito!`);
      onHide(); // Cierra el modal y refresca la lista
    } catch (error) {
      console.error('Error al guardar el contacto:', error);
      alert('Hubo un error al guardar. Revisa la consola.');
    }
  };

  return (
    <div className="modal-form">
      <h3>Nuevo Contacto</h3>
      <form>
        <input type="text" name="nombre" placeholder="Nombre del Cliente" onChange={handleChange} value={formData.nombre} required />
        <input type="text" name="apellido" placeholder="Apellido del Cliente" onChange={handleChange} value={formData.apellido} />
        <input type="text" name="rut" placeholder="RUT" onChange={handleChange} value={formData.rut} required />
        
        <select name="afp" onChange={handleChange} value={formData.afp} style={{marginTop: '10px', padding: '8px', width: '100%'}}>
          <option value="">Seleccione AFP</option>
          {afps.map(afp => <option key={afp} value={afp}>{afp}</option>)}
        </select>

        <select name="tipo_pension" onChange={handleChange} value={formData.tipo_pension} style={{marginTop: '10px', padding: '8px', width: '100%'}}>
            <option value="">Tipo de Pensión</option>
            <option value="Vejez">Vejez</option>
            <option value="Invalidez">Invalidez</option>
            <option value="Sobrevivencia">Sobrevivencia</option>
        </select>

        <textarea name="detalleLlamadas" placeholder="Detalle de llamadas" onChange={handleChange} value={formData.detalleLlamadas}></textarea>
        
        <button type="button" onClick={() => onHide()}>Cancelar</button>
        <button type="button" onClick={(e) => handleSubmit(e, 'Gestión de Llamadas')}>Guardar</button>
        <button type="button" onClick={(e) => handleSubmit(e, 'Prospecto')}>Mover a Prospectos</button>
      </form>
    </div>
  );
}

export default FormularioNuevoContacto;