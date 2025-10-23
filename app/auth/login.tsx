import { Colors, FontSize, Spacing } from '@/src/constants';
import { isEmailValid } from '@/src/types/forms';
import { Link, useRouter } from 'expo-router';
import { useState, useContext } from 'react';
import { Image, Pressable, StyleSheet, Text, TextInput, View, ActivityIndicator, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { AuthContext } from '@/src/contexts/AuthContext';

export default function Login() {
    const router = useRouter();
    const { signIn } = useContext(AuthContext);

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);

    const disabled = !isEmailValid(email) || password.trim().length === 0;

    const onSubmit = async () => {
        setError(null);
        if (disabled) {
            setError('Revisa tus datos e inténtalo de nuevo.');
            return;
        }

        setIsLoading(true);
        try {
            await signIn({ email, password });
            // Redirigir al dashboard después del login exitoso
            router.replace('/dashboard');
        } catch (err: any) {
            setError(err.message || 'Error al iniciar sesión. Verifica tus credenciales.');
            Alert.alert('Error', err.message || 'No se pudo iniciar sesión');
        } finally {
            setIsLoading(false);
        }

        router.replace('/');
    };

    return (
        <SafeAreaView style={styles.safeArea}>
            <View style={styles.container}>
                <View style={styles.header}>
                    <Image
                        source={require('@/src/assets/images/icon.png')}
                        style={styles.logo}
                        resizeMode='contain'
                        accessibilityLabel='Logo de Econexion'
                    />
                    <Text style={styles.title}>Inicia sesión</Text>
                    <Text style={styles.subtitle}>Bienvenido de nuevo a Econexion</Text>
                </View>

                <View style={styles.card}>
                    <View style={{ gap: Spacing.md }}>
                        <View>
                            <Text style={styles.label}>Correo</Text>
                            <TextInput
                                style={styles.input}
                                value={email}
                                onChangeText={(text) => {
                                    setEmail(text);
                                    setError(null);
                                }}
                                placeholder='correo@dominio.com'
                                keyboardType='email-address'
                                autoCapitalize='none'
                                autoComplete='email'
                                editable={!isLoading}
                            />
                        </View>

                        <View>
                            <Text style={styles.label}>Contraseña</Text>
                            <View style={styles.passwordRow}>
                                <TextInput
                                    style={[styles.input, { flex: 1 }]}
                                    value={password}
                                    onChangeText={(text) => {
                                        setPassword(text);
                                        setError(null);
                                    }}
                                    placeholder='Tu clave'
                                    secureTextEntry={!showPassword}
                                    autoComplete='password'
                                    editable={!isLoading}
                                />
                                <Pressable onPress={() => setShowPassword((s) => !s)} style={styles.showBtn} disabled={isLoading}>
                                    <Text style={styles.showBtnText}>{showPassword ? 'Ocultar' : 'Mostrar'}</Text>
                                </Pressable>
                            </View>
                        </View>

                        {error ? (
                            <View style={styles.errorBox}>
                                <Text style={styles.errorText}>{error}</Text>
                            </View>
                        ) : null}

                        <Pressable
                            style={[styles.submit, (disabled || isLoading) && styles.submitDisabled]}
                            disabled={disabled || isLoading}
                            onPress={onSubmit}
                            accessibilityRole='button'
                            accessibilityLabel='Confirmar inicio de sesión'
                        >
                            {isLoading ? (
                                <ActivityIndicator color='#fff' />
                            ) : (
                                <Text style={styles.submitText}>Entrar</Text>
                            )}
                        </Pressable>

                        <View style={styles.rowBetween}>
                            <Link href='/auth/register' style={styles.link}>
                                Crear cuenta
                            </Link>
                            <Pressable accessibilityRole='button'>
                                <Text style={styles.linkMuted}>¿Olvidaste tu clave?</Text>
                            </Pressable>
                        </View>
                    </View>
                </View>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    safeArea: { flex: 1, backgroundColor: Colors.lightGray },
    container: { flex: 1, padding: Spacing.lg },
    header: { alignItems: 'center', marginTop: Spacing.lg, marginBottom: Spacing.lg },
    logo: { width: 96, height: 96, marginBottom: Spacing.md },
    title: { fontSize: 28, fontWeight: '800', color: Colors.ecoGreen },
    subtitle: { marginTop: 4, color: Colors.gray },
    card: {
        backgroundColor: '#fff',
        borderRadius: 16,
        padding: Spacing.lg,
        borderWidth: 1,
        borderColor: Colors.gray,
    },
    label: { fontSize: FontSize.medium, color: Colors.gray, marginBottom: Spacing.xs },
    input: {
        borderWidth: 1,
        borderColor: Colors.gray,
        borderRadius: 10,
        backgroundColor: '#fff',
        paddingHorizontal: Spacing.md,
        paddingVertical: Spacing.sm,
        fontSize: FontSize.medium,
    },
    passwordRow: { flexDirection: 'row', alignItems: 'center', gap: Spacing.sm },
    showBtn: {
        paddingHorizontal: Spacing.md,
        paddingVertical: Spacing.sm,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: Colors.ecoGreen,
        backgroundColor: '#fff',
    },
    showBtnText: { color: Colors.ecoGreen, fontWeight: '600' },
    errorBox: {
        backgroundColor: '#FFE8E8',
        borderColor: '#FFBABA',
        borderWidth: 1,
        borderRadius: 10,
        padding: Spacing.sm,
    },
    errorText: { color: '#C00' },
    submit: {
        marginTop: Spacing.sm,
        backgroundColor: Colors.ecoGreen,
        padding: Spacing.md,
        borderRadius: 10,
        alignItems: 'center',
    },
    submitDisabled: { backgroundColor: Colors.gray },
    submitText: { color: '#fff', fontWeight: '700', fontSize: FontSize.medium },
    rowBetween: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: Spacing.md },
    link: { color: Colors.cyan, fontWeight: '600' },
    linkMuted: { color: Colors.gray },
});
