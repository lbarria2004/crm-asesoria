// src/components/Sidebar.js (ACTUALIZADO)
import React from 'react';
import { NavLink } from 'react-router-dom';
import LogoutButton from './LogoutButton'; // NUEVA IMPORTACIÓN

function Sidebar() {
  return (
    <div className="sidebar">
      <nav className="sidebar-nav">
        {/* NavLinks existentes */}
        <NavLink to="/" end>Gestión de llamadas</NavLink>
        <NavLink to="/prospectos">Prospectos</NavLink>
        <NavLink to="/asesoria">Clientes en Asesoría</NavLink>
        <NavLink to="/pensionados">Pensionados</NavLink>
        <NavLink to="/estadisticas">Estadísticas</NavLink>
      </nav>
      {/* Botón de Logout al final */}
      <LogoutButton /> 
    </div>
  );
}

export default Sidebar;