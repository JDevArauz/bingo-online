import React from 'react';
// En main.tsx
import './index.css';
import ReactDOM from 'react-dom/client';
import App from './App';
import { SocketProvider } from './contexts/SocketContext'; // Asegúrate de que la ruta sea correcta
import { AuthProvider } from './Auth/AuthContext'; // Asumo que lo tienes así

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <AuthProvider> {/* Tu AuthProvider existente */}
      <SocketProvider> {/* Envuelve con SocketProvider */}
        <App />
      </SocketProvider>
    </AuthProvider>
  </React.StrictMode>,
);