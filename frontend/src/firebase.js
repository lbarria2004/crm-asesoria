// src/firebase.js - CÓDIGO FINAL DE CONEXIÓN

import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth"; // Importamos el servicio de Autenticación

// --- TU OBJETO DE CONFIGURACIÓN DE FIREBASE ---
const firebaseConfig = {
  // Asegúrate de que las 6 claves estén aquí
  apiKey: "AIzaSyBGqHYXpk__2LPHQ-dAix3fGEpmYJvxi3g",
  authDomain: "asesoria-previsional.firebaseapp.com",
  projectId: "asesoria-previsional",
  storageBucket: "asesoria-previsional.firebasestorage.app",
  messagingSenderId: "847602175324",
  appId: "1:847602175324:web:f4290292aff01b99620599",
};
// ---------------------------------------------------

// Inicializamos la aplicación
const app = initializeApp(firebaseConfig);

// Exportamos los servicios que usaremos en toda la aplicación:

// 1. Base de Datos (Firestore) - Conectada a la instancia "asesoria-db"
export const db = getFirestore(app, "asesoria-db");

// 2. Autenticación (Login/Usuarios) - ¡Nueva conexión!
export const auth = getAuth(app);