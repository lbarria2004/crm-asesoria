// src/pages/Login.js - VERSIÓN FINAL CON REDIRECCIÓN EXPLÍCITA
import React, { useState } from 'react';
import { auth } from '../firebase'; 
import { signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from 'react-router-dom'; // <--- ¡Importación Clave!

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate(); // <--- Hook para la navegación

    const handleLogin = async (e) => {
        e.preventDefault();
        setError(''); 
        try {
            await signInWithEmailAndPassword(auth, email, password);
            
            // ÉXITO: Forzamos la navegación a la ruta principal ("/")
            navigate('/'); 

        } catch (error) {
            // Manejo de errores que sigue funcionando
            setError('Credenciales inválidas o usuario no encontrado.');
            console.error("Login Error:", error.code, error.message);
        }
    };

    return (
        <div className="login-background">
            <form onSubmit={handleLogin} className="login-form-box">
                <h2 style={{color: '#ff5722'}}>Gemini Asesoría</h2>
                <p style={{color: '#e0e0e0', marginBottom: '20px'}}>Inicia sesión para acceder al CRM</p>

                <input
                    type="email"
                    placeholder="Correo Electrónico"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <input
                    type="password"
                    placeholder="Contraseña"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />

                {error && <p style={{ color: 'red', marginTop: '10px' }}>{error}</p>}
                
                <button type="submit" style={{ width: '100%', padding: '12px' }}>
                    Ingresar
                </button>
            </form>
        </div>
    );
}
export default Login;