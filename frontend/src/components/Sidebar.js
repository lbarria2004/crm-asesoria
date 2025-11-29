// src/components/Sidebar.js
import React from 'react';
import { NavLink } from 'react-router-dom';

function Sidebar() {
  return (
    // CORRECCIÓN: 'Sidebar' a 'sidebar' para que coincida con App.css
    <div className="sidebar"> 
      <nav className="sidebar-nav">
        {/* NavLink se usa para añadir la clase 'active' automáticamente */}
        <NavLink to="/" end>Gestión de llamadas</NavLink>
        <NavLink to="/prospectos">Prospectos</NavLink>
        <NavLink to="/asesoria">Clientes en Asesoría</NavLink>
        <NavLink to="/pensionados">Pensionados</NavLink>
        <NavLink to="/estadisticas">Estadísticas</NavLink>
      </nav>
    </div>
  );
}

export default Sidebar;