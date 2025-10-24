import * as SecureStore from 'expo-secure-store';
import { Platform } from 'react-native';

/**
 * Storage wrapper que funciona en web, iOS y Android
 */
export const storage = {
    /**
     * Guarda un valor
     */
    setItem: async (key: string, value: string): Promise<void> => {
        if (Platform.OS === 'web') {
            localStorage.setItem(key, value);
        } else {
            await SecureStore.setItemAsync(key, value);
        }
    },

    /**
     * Obtiene un valor
     */
    getItem: async (key: string): Promise<string | null> => {
        if (Platform.OS === 'web') {
            return localStorage.getItem(key);
        }
        return await SecureStore.getItemAsync(key);
    },

    /**
     * Elimina un valor
     */
    removeItem: async (key: string): Promise<void> => {
        if (Platform.OS === 'web') {
            localStorage.removeItem(key);
        } else {
            await SecureStore.deleteItemAsync(key);
        }
    },

    /**
     * Limpia todo el storage
     */
    clear: (): void => {
        if (Platform.OS === 'web') {
            localStorage.clear();
        }
        // En SecureStore necesitas eliminar claves individualmente si es necesario
    },
};
