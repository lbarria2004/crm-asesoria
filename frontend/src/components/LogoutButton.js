// src/components/LogoutButton.js
import React from 'react';
import { auth } from '../firebase';
import { signOut } from "firebase/auth";

function LogoutButton() {
    const handleLogout = async () => {
        try {
            await signOut(auth);
        } catch (error) {
            console.error("Logout Error:", error);
            alert("No se pudo cerrar la sesión.");
        }
    };

    return (
        <button 
            onClick={handleLogout} 
            style={{ 
                backgroundColor: '#dc3545', // Rojo
                color: 'white', 
                padding: '8px 15px', 
                border: 'none',
                borderRadius: '5px',
                cursor: 'pointer',
                fontSize: '0.8em',
                width: '100%',
                marginTop: '30px'
            }}
        >
            Cerrar Sesión
        </button>
    );
}
export default LogoutButton;