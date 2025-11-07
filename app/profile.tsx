import { Colors, FontSize, Spacing, STORAGE_KEYS } from '@constants';
import { storage } from '@utils';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { Alert, Image, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function ProfileScreen() {
    const router = useRouter();
    const [userData] = useState({
        name: 'Juan Pablo Camargo',
        email: 'juanpablocamargo9@gmail.com',
        userType: 'Comprador',
        phone: '+57 312 456 7890',
        address: 'Calle 85 #15-32, Bogotá',
        memberSince: 'Octubre 2025',
    });

    const handleLogout = () => {
        Alert.alert('Cerrar sesión', '¿Estás seguro de que deseas salir?', [
            { text: 'Cancelar', style: 'cancel' },
            {
                text: 'Salir',
                style: 'destructive',
                onPress: async () => {
                    await storage.removeItem(STORAGE_KEYS.token);
                    await storage.removeItem(STORAGE_KEYS.user_name);
                    await storage.removeItem(STORAGE_KEYS.user_email);
                    await storage.removeItem(STORAGE_KEYS.user_type);
                    router.replace('/');
                },
            },
        ]);
    };

    return (
        <SafeAreaView style={styles.container} edges={['top']}>
            {/* Header */}
            <View style={styles.header}>
                <Pressable onPress={() => router.back()} style={styles.backButton}>
                    <Text style={styles.backIcon}>←</Text>
                </Pressable>
                <Text style={styles.headerTitle}>Mi Perfil</Text>
                <View style={styles.placeholder} />
            </View>

            <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
                {/* Profile Card */}
                <View style={styles.profileCard}>
                    <View style={styles.avatarContainer}>
                        <Image source={require('@assets/images/icon.png')} style={styles.avatar} resizeMode='contain' />
                        <View style={styles.badge}>
                            <Text style={styles.badgeText}>♻️</Text>
                        </View>
                    </View>
                    <Text style={styles.name}>{userData.name}</Text>
                    <Text style={styles.userType}>{userData.userType}</Text>
                    <Text style={styles.memberSince}>Miembro desde {userData.memberSince}</Text>
                </View>

                {/* Info Section */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Información Personal</Text>

                    <View style={styles.infoCard}>
                        <View style={styles.infoRow}>
                            <Text style={styles.infoLabel}>📧 Correo</Text>
                            <Text style={styles.infoValue}>{userData.email}</Text>
                        </View>

                        <View style={styles.divider} />

                        <View style={styles.infoRow}>
                            <Text style={styles.infoLabel}>📱 Teléfono</Text>
                            <Text style={styles.infoValue}>{userData.phone}</Text>
                        </View>

                        <View style={styles.divider} />

                        <View style={styles.infoRow}>
                            <Text style={styles.infoLabel}>📍 Dirección</Text>
                            <Text style={styles.infoValue}>{userData.address}</Text>
                        </View>
                    </View>
                </View>

                {/* Navigation Section */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Navegación</Text>

                    <View style={styles.infoCard}>
                        <Pressable style={styles.settingRow} onPress={() => router.push('/dashboard')}>
                            <Text style={styles.settingLabel}>🏠 Dashboard Principal</Text>
                            <Text style={styles.settingValue}>→</Text>
                        </Pressable>

                        <View style={styles.divider} />

                        <Pressable style={styles.settingRow} onPress={() => router.push('/dashboard/products')}>
                            <Text style={styles.settingLabel}>📦 Productos</Text>
                            <Text style={styles.settingValue}>→</Text>
                        </Pressable>

                        <View style={styles.divider} />

                        <Pressable style={styles.settingRow} onPress={() => router.push('/dashboard/orders')}>
                            <Text style={styles.settingLabel}>🛒 Mis Pedidos</Text>
                            <Text style={styles.settingValue}>→</Text>
                        </Pressable>

                        <View style={styles.divider} />

                        <Pressable style={styles.settingRow} onPress={() => router.push('/dashboard/recycling')}>
                            <Text style={styles.settingLabel}>♻️ Centro de Reciclaje</Text>
                            <Text style={styles.settingValue}>→</Text>
                        </Pressable>
                    </View>
                </View>

                {/* Settings Section */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Configuración</Text>

                    <View style={styles.infoCard}>
                        <Pressable style={styles.settingRow}>
                            <Text style={styles.settingLabel}>🔔 Notificaciones</Text>
                            <Text style={styles.settingValue}>Activadas</Text>
                        </Pressable>

                        <View style={styles.divider} />

                        <Pressable style={styles.settingRow}>
                            <Text style={styles.settingLabel}>🌍 Idioma</Text>
                            <Text style={styles.settingValue}>Español</Text>
                        </Pressable>

                        <View style={styles.divider} />

                        <Pressable style={styles.settingRow}>
                            <Text style={styles.settingLabel}>🌙 Modo oscuro</Text>
                            <Text style={styles.settingValue}>Desactivado</Text>
                        </Pressable>
                    </View>
                </View>

                {/* Actions */}
                <View style={styles.actions}>
                    <Pressable style={styles.editButton}>
                        <Text style={styles.editButtonText}>✏️ Editar Perfil</Text>
                    </Pressable>

                    <Pressable style={styles.logoutButton} onPress={handleLogout}>
                        <Text style={styles.logoutButtonText}>🚪 Cerrar Sesión</Text>
                    </Pressable>
                </View>

                <View style={styles.footer}>
                    <Text style={styles.footerText}>Econexion v1.0.0</Text>
                    <Text style={styles.footerText}>Hecho con 💚 para el planeta</Text>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F5F5F5',
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: Spacing.lg,
        paddingVertical: Spacing.md,
        backgroundColor: '#fff',
        borderBottomWidth: 1,
        borderBottomColor: '#E5E5E5',
    },
    backButton: {
        width: 40,
        height: 40,
        alignItems: 'center',
        justifyContent: 'center',
    },
    backIcon: {
        fontSize: 24,
        color: Colors.ecoGreen,
    },
    headerTitle: {
        fontSize: 18,
        fontWeight: '700',
        color: '#333',
    },
    placeholder: {
        width: 40,
    },
    content: {
        flex: 1,
    },
    profileCard: {
        backgroundColor: '#fff',
        alignItems: 'center',
        paddingVertical: Spacing.xl,
        marginBottom: Spacing.lg,
        borderBottomWidth: 1,
        borderBottomColor: '#E5E5E5',
    },
    avatarContainer: {
        position: 'relative',
        marginBottom: Spacing.md,
    },
    avatar: {
        width: 100,
        height: 100,
        borderRadius: 50,
        backgroundColor: Colors.lightGray,
        borderWidth: 3,
        borderColor: Colors.ecoGreen,
    },
    badge: {
        position: 'absolute',
        bottom: 0,
        right: 0,
        width: 32,
        height: 32,
        borderRadius: 16,
        backgroundColor: Colors.ecoGreen,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 3,
        borderColor: '#fff',
    },
    badgeText: {
        fontSize: 16,
    },
    name: {
        fontSize: 24,
        fontWeight: '700',
        color: '#333',
        marginBottom: 4,
    },
    userType: {
        fontSize: 16,
        color: Colors.ecoGreen,
        fontWeight: '600',
        marginBottom: 4,
    },
    memberSince: {
        fontSize: 14,
        color: Colors.gray,
    },
    section: {
        paddingHorizontal: Spacing.lg,
        marginBottom: Spacing.lg,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: '700',
        color: '#333',
        marginBottom: Spacing.md,
    },
    infoCard: {
        backgroundColor: '#fff',
        borderRadius: 12,
        overflow: 'hidden',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.05,
        shadowRadius: 2,
        elevation: 1,
    },
    infoRow: {
        paddingHorizontal: Spacing.lg,
        paddingVertical: Spacing.md,
    },
    infoLabel: {
        fontSize: 14,
        color: Colors.gray,
        marginBottom: 4,
    },
    infoValue: {
        fontSize: FontSize.medium,
        color: '#333',
        fontWeight: '500',
    },
    divider: {
        height: 1,
        backgroundColor: '#F0F0F0',
        marginHorizontal: Spacing.lg,
    },
    settingRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: Spacing.lg,
        paddingVertical: Spacing.md,
    },
    settingLabel: {
        fontSize: FontSize.medium,
        color: '#333',
    },
    settingValue: {
        fontSize: FontSize.medium,
        color: Colors.gray,
    },
    actions: {
        paddingHorizontal: Spacing.lg,
        gap: Spacing.md,
        marginBottom: Spacing.xl,
    },
    editButton: {
        backgroundColor: Colors.ecoGreen,
        paddingVertical: Spacing.md,
        borderRadius: 12,
        alignItems: 'center',
    },
    editButtonText: {
        fontSize: FontSize.medium,
        fontWeight: '700',
        color: '#fff',
    },
    logoutButton: {
        backgroundColor: '#fff',
        paddingVertical: Spacing.md,
        borderRadius: 12,
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#FF4444',
    },
    logoutButtonText: {
        fontSize: FontSize.medium,
        fontWeight: '600',
        color: '#FF4444',
    },
    footer: {
        alignItems: 'center',
        paddingVertical: Spacing.xl,
    },
    footerText: {
        fontSize: 12,
        color: Colors.gray,
        marginBottom: 4,
    },
});
