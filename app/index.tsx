import { Colors, FontSize, Spacing } from '@/constants';
import { Link } from 'expo-router';
import { Image, Pressable, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function Home() {
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
                    <Text style={styles.placeholderText}>
                        Próximamente: botones de inicio de sesión con Google y Microsoft
                    </Text>
                    <Link href='/register' asChild>
                        <Pressable
                            style={styles.ctaButton}
                            accessibilityRole='button'
                            accessibilityLabel='Ir al formulario de registro'
                        >
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
    },
    placeholderText: {
        textAlign: 'center',
        fontSize: FontSize.medium,
        color: Colors.gray,
        paddingHorizontal: Spacing.md,
    },
    ctaButton: {
        marginTop: Spacing.md,
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
