// src/App.js

import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import GestionLlamadas from './pages/GestionLlamadas';
import Estadisticas from './pages/Estadisticas';
import './App.css';

function App() {
  return (
    <Router>
      <div className="app-container">
        <Sidebar />
        <div className="main-content">
          <Routes>
            {/* Ruta Principal: Gestión de Llamadas */}
            <Route path="/" element={<GestionLlamadas />} />
            
            {/* Rutas del embudo de ventas, reutilizando el mismo componente */}
            <Route path="/prospectos" element={<GestionLlamadas key="prospectos" estado="Prospecto" />} />
            <Route path="/asesoria" element={<GestionLlamadas key="asesoria" estado="Asesoría" />} />
            <Route path="/pensionados" element={<GestionLlamadas key="pensionados" estado="Pensionado" />} />
            
            {/* Ruta para el Dashboard */}
            <Route path="/estadisticas" element={<Estadisticas />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;