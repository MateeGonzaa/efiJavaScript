import React, { useState, useRef } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

// Componentes PrimeReact
import { InputText } from 'primereact/inputtext';
import { Password } from 'primereact/password';
import { Button } from 'primereact/button';
import { Card } from 'primereact/card';
import { Toast } from 'primereact/toast';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { loginUser } = useAuth(); // 1. Consumir el contexto
  const navigate = useNavigate();
  const toast = useRef(null); // Para las alertas [cite: 35]

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // 2. Llamar a la función del contexto
      await loginUser({ email, password });

      // 3. Mostrar éxito y redirigir
      toast.current.show({ 
        severity: 'success', 
        summary: 'Éxito', 
        detail: 'Inicio de sesión correcto' 
      });
      
      // Pequeña espera para que se vea el toast antes de redirigir
      setTimeout(() => {
        navigate('/posts'); // Redirigir al listado de posts
      }, 1500);

    } catch (error) {
      // 4. Mostrar error (gracias al 'throw' en el contexto)
      toast.current.show({ 
        severity: 'error', 
        summary: 'Error', 
        detail: 'Email o contraseña incorrectos' 
      });
    }
  };

  return (
    <div className="p-d-flex p-jc-center p-ai-center" style={{ minHeight: '80vh' }}>
      <Toast ref={toast} /> {/* No olvidar el componente Toast */}
      <Card title="Iniciar Sesión" style={{ width: '25rem' }}>
        <form onSubmit={handleSubmit} className="p-fluid">
          <div className="p-field">
            <label htmlFor="email">Email</label>
            <InputText 
              id="email" 
              value={email} 
              onChange={(e) => setEmail(e.target.value)} 
            />
          </div>
          <div className="p-field">
            <label htmlFor="password">Contraseña</label>
            <Password 
              id="password" 
              value={password} 
              onChange={(e) => setPassword(e.target.value)} 
              feedback={false} 
            />
          </div>
          <Button label="Login" type="submit" className="p-mt-2" />
        </form>
      </Card>
    </div>
  );
};

export default LoginPage;