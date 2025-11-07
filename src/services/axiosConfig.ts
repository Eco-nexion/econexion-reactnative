import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Base URL del backend
const API_BASE_URL = 'http://localhost:8080/api';

// Crear instancia de axios
const apiClient = axios.create({
    baseURL: API_BASE_URL,
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Interceptor para agregar el token a cada request
apiClient.interceptors.request.use(
    async (config) => {
        try {
            const token = await AsyncStorage.getItem('auth_token');
            if (token) {
                config.headers.Authorization = `Bearer ${token}`;
            }
        } catch (error) {
            console.error('Error getting token:', error);
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Interceptor para manejar respuestas y errores
apiClient.interceptors.response.use(
    (response) => {
        return response;
    },
    async (error) => {
        const originalRequest = error.config;

        // Si el token expiró (401) y no hemos reintentado
        if (error.response?.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;

            // Limpiar token y redirigir al login
            await AsyncStorage.removeItem('auth_token');
            // Aquí podrías usar un evento o context para redirigir al login

            return Promise.reject(error);
        }

        return Promise.reject(error);
    }
);

export default apiClient;