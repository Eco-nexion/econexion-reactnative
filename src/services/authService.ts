import type { RegisterForm } from '@/src/types/forms';
import apiClient from './axiosConfig';

interface LoginResponse {
    token: string;
    user: {
        id: string;
        name: string;
        email: string;
        userType: string;
    };
}

interface RegisterResponse {
    token: string;
    user: {
        id: string;
        name: string;
        email: string;
        userType: string;
    };
}

export const authService = {
    login: async (email: string, password: string): Promise<LoginResponse> => {
        const response = await apiClient.post<LoginResponse>('/auth/login', {
            email,
            password,
        });
        return response.data;
    },

    register: async (data: RegisterForm): Promise<RegisterResponse> => {
        const response = await apiClient.post<RegisterResponse>('/auth/register', data);
        return response.data;
    },

    // TODO: Backend no implementado - Endpoint no disponible actualmente
    // Cuando el backend implemente GET /users/profile, descomentar
    // getProfile: async () => {
    // 	const response = await apiClient.get('/users/profile');
    // 	return response.data;
    // },

    // TODO: Backend no implementado - Endpoint no disponible actualmente
    // Cuando el backend implemente POST /auth/logout, descomentar
    // Por ahora el logout se hace solo limpiando el token en AuthContext
    // logout: async () => {
    // 	await apiClient.post('/auth/logout');
    // },
};
