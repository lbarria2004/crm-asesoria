// src/App.js (VERSION CON SEGURIDAD)
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { auth } from './firebase'; // Importamos el servicio de autenticación
import { onAuthStateChanged } from "firebase/auth"; // Para escuchar cambios de estado

import Sidebar from './components/Sidebar';
import GestionLlamadas from './pages/GestionLlamadas';
import Estadisticas from './pages/Estadisticas';
import Login from './pages/Login'; // Importamos la nueva pantalla de Login
import './App.css';

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Suscripción al estado de autenticación
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });

    return () => unsubscribe(); // Limpiar la suscripción al desmontar
  }, []);

  if (loading) {
    // Muestra una pantalla de carga mientras Firebase verifica el estado del usuario
    return <div className="loading-screen">Verificando sesión...</div>; 
  }

  // El componente principal del layout (Sidebar + Contenido)
  const MainLayout = (
    <div className="app-container">
      <Sidebar />
      <div className="main-content">
        <Routes>
          {/* Rutas Protegidas */}
          <Route path="/" element={<GestionLlamadas />} />
          <Route path="/prospectos" element={<GestionLlamadas key="prospectos" estado="Prospecto" />} />
          <Route path="/asesoria" element={<GestionLlamadas key="asesoria" estado="Asesoría" />} />
          <Route path="/pensionados" element={<GestionLlamadas key="pensionados" estado="Pensionado" />} />
          <Route path="/estadisticas" element={<Estadisticas />} />
          {/* Si el usuario escribe una ruta incorrecta, lo enviamos a la principal */}
          <Route path="*" element={<Navigate to="/" />} /> 
        </Routes>
      </div>
    </div>
  );

  return (
    <Router>
      <Routes>
        {/* Ruta de Login (Pública) */}
        <Route path="/login" element={<Login />} />

        {/* Si el usuario está logueado, ve el MainLayout. Si no, va al Login. */}
        <Route path="/*" element={user ? MainLayout : <Navigate to="/login" replace />} />
      </Routes>
    </Router>
  );
}

export default App;