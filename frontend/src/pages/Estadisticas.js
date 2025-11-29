// src/pages/Estadisticas.js
import React, { useState, useEffect } from 'react';
import { db } from '../firebase';
// ¡CAMBIO CLAVE AQUÍ! Usamos onSnapshot para la conexión constante
import { collection, query, onSnapshot } from "firebase/firestore"; 
import GraficoCircular from '../components/GraficoCircular'; 

// Esta función es necesaria para el registro de gráficos en Chart.js
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
ChartJS.register(ArcElement, Tooltip, Legend);

function Estadisticas() {
    const [stats, setStats] = useState(null);

    useEffect(() => {
        const clientesRef = collection(db, "clientes");
        const q = query(clientesRef); // Consulta que trae TODOS los clientes

        // onSnapshot: Abrimos la conexión en tiempo real
        const unsubscribe = onSnapshot(q, (querySnapshot) => {
            let totalClientes = 0;
            let prospectosConvertidos = 0;
            let tiposPension = {};

            querySnapshot.forEach(doc => {
                const cliente = doc.data();
                totalClientes++;

                // Lógica de Conteo
                if (cliente.estado !== 'Gestión de Llamadas') {
                    prospectosConvertidos++;
                }

                // Agrupación por Tipo de Pensión
                const tipo = cliente.tipo_pension || 'Sin Especificar';
                tiposPension[tipo] = (tiposPension[tipo] || 0) + 1;
            });

            const tasaConversion = totalClientes > 0 
                ? (prospectosConvertidos / totalClientes) * 100 
                : 0;

            // Formato de datos para el gráfico circular
            const distribucionPension = Object.keys(tiposPension).map(key => ({
                label: key,
                value: tiposPension[key]
            }));

            // Actualizamos el estado con los nuevos contadores
            setStats({
                clientesTotales: totalClientes,
                prospectosConvertidos: prospectosConvertidos,
                tasaConversion: tasaConversion.toFixed(1),
                distribucionPension: distribucionPension,
            });
            
        }, (error) => {
            console.error('Error en la suscripción de estadísticas:', error);
        });

        // Función de limpieza para cerrar la conexión cuando el usuario deja la página
        return () => unsubscribe(); 
    }, []);

    if (!stats) return <div>Cargando estadísticas...</div>;

    return (
        <div>
            <h2>Estadísticas de Rendimiento</h2>
            
            <div className="stats-grid" style={{ display: 'flex', gap: '20px', marginBottom: '40px' }}>
                <div className="stat-card" style={{ flex: 1, backgroundColor: '#1f1f1f', padding: '20px' }}>
                    <h3>Clientes Atendidos</h3>
                    <p style={{ fontSize: '2em', color: '#ff5722' }}>{stats.clientesTotales}</p>
                </div>
                <div className="stat-card" style={{ flex: 1, backgroundColor: '#1f1f1f', padding: '20px' }}>
                    <h3>Prospectos Convertidos</h3>
                    <p style={{ fontSize: '2em', color: '#00BCD4' }}>{stats.prospectosConvertidos}</p>
                </div>
                <div className="stat-card" style={{ flex: 1, backgroundColor: '#1f1f1f', padding: '20px' }}>
                    <h3>Tasa de Conversión</h3>
                    <p style={{ fontSize: '2em', color: '#00f757' }}>{stats.tasaConversion}%</p>
                </div>
            </div>

            <h3 style={{ marginTop: '40px', marginBottom: '20px' }}>Distribución por Tipo de Pensión</h3>
            <div style={{ maxWidth: '400px' }}>
                <GraficoCircular 
                    data={stats.distribucionPension} 
                    title="Distribución de Clientes por Tipo de Pensión"
                />
            </div>
        </div>
    );
}

export default Estadisticas;