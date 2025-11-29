// src/components/GraficoCircular.js
import React from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

function GraficoCircular({ data, title }) {
    if (!data || data.length === 0) return <p>No hay datos para mostrar.</p>;

    const chartData = {
        labels: data.map(item => item.label),
        datasets: [
            {
                label: 'Número de Clientes',
                data: data.map(item => item.value),
                backgroundColor: [
                    '#FF5722', // Naranja (Vejéz)
                    '#00BCD4', // Cian (Invalidez)
                    '#8BC34A', // Verde (Sobrevivencia)
                    '#FFC107', // Amarillo
                ],
                hoverOffset: 4,
            },
        ],
    };

    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'bottom',
                labels: {
                    color: '#e0e0e0'
                }
            },
            title: {
                display: true,
                text: title,
                color: '#e0e0e0'
            }
        },
    };

    return <div style={{height: '300px'}}><Pie data={chartData} options={options} /></div>;
}

export default GraficoCircular;