import { STORAGE_KEYS } from '@constants';
import { storage } from '@utils';
import { Stack, useRouter, useSegments } from 'expo-router';
import { useEffect, useState } from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';

export default function RootLayout() {
    const segments = useSegments();
    const { replace } = useRouter();
    const [isChecking, setIsChecking] = useState(true);
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        // Verificar si hay token guardado
        const checkAuth = async () => {
            try {
                const token = await storage.getItem(STORAGE_KEYS.token);
                setIsAuthenticated(!!token);
            } catch (error) {
                console.error('Error checking auth:', error);
                setIsAuthenticated(false);
            } finally {
                setIsChecking(false);
            }
        };

        checkAuth();
    }, []);

    useEffect(() => {
        if (isChecking) {
            return;
        }

        const currentSegment = segments[0] as string;
        const inAuthGroup = currentSegment === '(tabs)' || currentSegment === 'dashboard';

        if (!isAuthenticated && inAuthGroup) {
            // Usuario no autenticado intentando acceder a área protegida
            replace('/');
        }
    }, [isAuthenticated, segments, isChecking, replace]);

    if (isChecking) {
        // Mostrar splash/loading mientras verifica auth
        return null;
    }

    return (
        <SafeAreaProvider>
            <Stack>
                <Stack.Screen
                    name='index'
                    options={{
                        headerShown: false,
                        title: 'Econexion',
                    }}
                />
                <Stack.Screen
                    name='login'
                    options={{
                        headerShown: false,
                        title: 'Iniciar Sesión',
                    }}
                />
                <Stack.Screen
                    name='register'
                    options={{
                        headerShown: false,
                        title: 'Registro',
                    }}
                />
                <Stack.Screen
                    name='(tabs)'
                    options={{
                        headerShown: false,
                    }}
                />
                <Stack.Screen name='auth' />
                <Stack.Screen name='dashboard' />
                <Stack.Screen name='home' />
            </Stack>
        </SafeAreaProvider>
    );
}
