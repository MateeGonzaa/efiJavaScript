import axios from 'axios';

const API_URL = 'http://127.0.0.1:5000'; 

/**
 * Petición para registrar un nuevo usuario.
 * @param {object} userData - { name, email, password, rol }
 */
export const registerRequest = (userData) => {
  return axios.post(`${API_URL}/register`, userData);
};

/**
 * Petición para iniciar sesión.
 * @param {object} credentials - { email, password }
 */
export const loginRequest = (credentials) => {
  return axios.post(`${API_URL}/login`, credentials);
};

/**
 * Configuración de un interceptor de Axios
 * Esto adjuntará automáticamente el token JWT a *todas* las
 * peticiones a tu API después de que el usuario inicie sesión.
 */
export const setupAxiosInterceptors = (token) => {
  axios.interceptors.request.use(
    (config) => {
      if (token) {
        config.headers['Authorization'] = `Bearer ${token}`;
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );
};