import { Colors, FontSize, Spacing } from '@/constants';
import { makeRedirectUri } from 'expo-auth-session';
import * as Google from 'expo-auth-session/providers/google';
import { Link } from 'expo-router';
import * as WebBrowser from 'expo-web-browser';
import { useEffect, useState } from 'react';
import { Image, Pressable, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

WebBrowser.maybeCompleteAuthSession();

interface GoogleAuthParams {
    access_token?: string;
    token_type?: string;
    expires_in?: string;
    scope?: string;
}

export default function Home() {
    const [authError, setAuthError] = useState<string | null>(null);
    const [isExchanging, setIsExchanging] = useState(false);

    const redirectUri = makeRedirectUri();
    const clientId = process.env.EXPO_PUBLIC_GOOGLE_WEB_CLIENT_ID;
    const iosClientId = process.env.EXPO_PUBLIC_GOOGLE_IOS_CLIENT_ID;
    const androidClientId = process.env.EXPO_PUBLIC_GOOGLE_ANDROID_CLIENT_ID;

    const [request, response, promptAsync] = Google.useAuthRequest({
        iosClientId: iosClientId,
        androidClientId: androidClientId,
        clientId: clientId,
        responseType: 'token',
        scopes: ['openid', 'email', 'profile'],
        redirectUri,
        // biome-ignore lint/style/useNamingConvention: <is PKCE>
        usePKCE: false,
        selectAccount: true,
    });

    useEffect(() => {
        if (!response) {
            return;
        }
        if (response.type === 'success') {
            setIsExchanging(false);
            setAuthError(null);

            const auth = response.authentication;
            const accessToken = auth?.accessToken ?? (response.params as GoogleAuthParams)?.access_token;

            if (!accessToken) {
                setAuthError('No se recibió access_token. Revisa la configuración de OAuth.');
                return;
            }

            console.log(accessToken);

            // mocking the exchange process
            const mockResponse = {
                user: {
                    id: 'mock-user-id-123',
                    email: 'usuario@example.com',
                    name: 'Usuario Mock',
                },
                token: 'mock-jwt-token-abc123xyz',
            };

            // Simular delay de red
            setTimeout(() => {
                console.log('Mock response:', mockResponse);
                // Aquí podrías guardar el token y datos del usuario
            }, 1000);

            console.log('Access token obtenido:', accessToken);
        } else if (response.type === 'error') {
            setIsExchanging(false);
            setAuthError('Error en la autorización con Google.');
        }
    }, [response]);

    return (
        <SafeAreaView style={styles.safeArea}>
            <View style={styles.container}>
                <View style={styles.brandSection}>
                    <Image
                        source={require('../assets/images/icon.png')}
                        style={styles.logo}
                        resizeMode='contain'
                        accessibilityLabel='Econexion logo'
                    />
                    <Text style={styles.title}>Econexion</Text>
                </View>

                <View style={styles.footerPlaceholder}>
                    <Pressable
                        style={[styles.googleButton, isExchanging || !request ? { opacity: 0.6 } : null]}
                        onPress={() => {
                            setAuthError(null);
                            setIsExchanging(true);
                            promptAsync({ showInRecents: true });
                        }}
                        disabled={isExchanging || !request}
                        accessibilityRole='button'
                        accessibilityLabel='Iniciar sesión con Google'
                    >
                        <Image
                            source={{
                                uri: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Google_%22G%22_Logo.svg/48px-Google_%22G%22_Logo.svg.png',
                            }}
                            style={styles.googleIcon}
                        />
                        <Text style={styles.googleText}>{isExchanging ? 'Conectando' : 'Continuar con Google'}</Text>
                    </Pressable>

                    {authError ? <Text style={{ color: '#C00' }}>{authError}</Text> : null}

                    <Link href='/register' asChild>
                        <Pressable style={styles.ctaButton}>
                            <Text style={styles.ctaButtonText}>Ir al registro</Text>
                        </Pressable>
                    </Link>
                </View>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: Colors.lightGray,
    },
    container: {
        flex: 1,
        padding: Spacing.lg,
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    brandSection: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        gap: Spacing.md,
    },
    logo: {
        width: 160,
        height: 160,
    },
    title: {
        fontSize: 36,
        fontWeight: '800',
        color: Colors.ecoGreen,
        letterSpacing: 0.5,
    },
    footerPlaceholder: {
        width: '100%',
        paddingVertical: Spacing.md,
        borderRadius: 12,
        borderWidth: 1,
        borderStyle: 'dashed',
        borderColor: Colors.gray,
        backgroundColor: '#FFFFFFAA',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: Spacing.sm,
        gap: Spacing.md,
    },
    googleButton: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#fff',
        borderWidth: 1,
        borderColor: Colors.gray,
        paddingHorizontal: Spacing.lg,
        paddingVertical: Spacing.sm,
        borderRadius: 8,
    },
    googleIcon: {
        width: 20,
        height: 20,
        marginRight: 10,
    },
    googleText: {
        color: '#000',
        fontSize: FontSize.medium,
        fontWeight: '500',
    },
    ctaButton: {
        backgroundColor: Colors.ecoGreen,
        paddingHorizontal: Spacing.lg,
        paddingVertical: Spacing.md,
        borderRadius: 10,
    },
    ctaButtonText: {
        color: '#fff',
        fontWeight: '600',
        fontSize: FontSize.medium,
    },
});
