import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';

// Importaciones de PrimeReact
// 1. Tema
import "primereact/resources/themes/lara-light-indigo/theme.css";     
// 2. Core PrimeReact
import "primereact/resources/primereact.min.css";     
// 3. Iconos
import "primeicons/primeicons.css";                                 
// 4. Utilidades de Flexbox (para responsive)
import "primeflex/primeflex.css";       
                            

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>,
);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
