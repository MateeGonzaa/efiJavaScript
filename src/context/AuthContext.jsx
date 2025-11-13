import React, { createContext, useState, useContext, useEffect } from 'react';
import { loginRequest } from '../services/authService'; // El servicio que creamos
import { jwtDecode } from 'jwt-decode'; // La librería para decodificar [cite: 14]

// 1. Crear el Contexto
export const AuthContext = createContext();

// 2. Hook personalizado para consumir el contexto
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth debe ser usado dentro de un AuthProvider');
  }
  return context;
};

// 3. Crear el Proveedor del Contexto
export const AuthProvider = ({ children }) => {
  // Estado para el usuario, token y estado de autenticación
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('token')); // [cite: 13]
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true); // Para saber si ya revisó el token inicial

  // Efecto para verificar el token en localStorage al cargar la app
  useEffect(() => {
    const checkToken = () => {
      const storedToken = localStorage.getItem('token');
      if (storedToken) {
        try {
          // Decodificar el token para obtener info y fecha de expiración [cite: 14]
          const decodedToken = jwtDecode(storedToken);

          // Verificar si el token ha expirado
          const isExpired = decodedToken.exp * 1000 < Date.now();

          if (!isExpired) {
            // Si el token es válido, configuramos el estado
            setUser(decodedToken); // decodedToken tendrá { name, email, rol, exp, ... }
            setToken(storedToken);
            setIsAuthenticated(true);
          } else {
            // Si expiró, lo limpiamos
            logoutUser();
          }
        } catch (error) {
          console.error("Error al decodificar el token:", error);
          logoutUser(); // Limpiar si el token está corrupto
        }
      }
      setLoading(false); // Terminamos de cargar
    };

    checkToken();
  }, []); // El array vacío asegura que se ejecute solo una vez al montar

  // --- Función de Login ---
  const loginUser = async (credentials) => {
    try {
      // 1. Llamar al servicio de API (axios)
      const response = await loginRequest(credentials);
      
      // 2. Obtener el token de la respuesta
      // (Ajusta 'response.data.access_token' según la respuesta de tu API Flask)
      const jwtToken = response.data.access_token; 

      // 3. Guardar el token en localStorage [cite: 13]
      localStorage.setItem('token', jwtToken);

      // 4. Decodificar el token [cite: 14]
      const decodedUser = jwtDecode(jwtToken);

      // 5. Actualizar el estado global
      setToken(jwtToken);
      setUser(decodedUser);
      setIsAuthenticated(true);

      // (Opcional) Retornar éxito o datos del usuario
      return decodedUser;

    } catch (error) {
      console.error("Error en el login:", error);
      // Limpiar estado en caso de error
      logoutUser();
      // Relanzar el error para que el componente de Login lo maneje (y muestre un Toast)
      throw error;
    }
  };

  // --- Función de Logout ---
  const logoutUser = () => {
    // 1. Limpiar localStorage [cite: 16]
    localStorage.removeItem('token');

    // 2. Resetear el estado global [cite: 16]
    setToken(null);
    setUser(null);
    setIsAuthenticated(false);
  };
  
  // (Aquí también iría la función registerUser)

  // 4. Valores que proveerá el contexto
  const providerValue = {
    user,
    token,
    isAuthenticated,
    loading, // Importante para no redirigir mientras se valida el token
    loginUser,
    logoutUser,
    // registerUser,
  };

  return (
    <AuthContext.Provider value={providerValue}>
      {children}
    </AuthContext.Provider>
  );
};