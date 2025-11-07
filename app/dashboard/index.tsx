import { Colors, FontSize, Spacing } from '@constants';
import { useRouter } from 'expo-router';
import { Image, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function DashboardScreen() {
    const router = useRouter();

    const menuItems = [
        { id: 1, title: 'Productos', icon: '📦', route: '/dashboard/products', color: '#4CAF50' },
        { id: 2, title: 'Mis Pedidos', icon: '🛒', route: '/dashboard/orders', color: '#2196F3' },
        { id: 3, title: 'Centro de Reciclaje', icon: '♻️', route: '/dashboard/recycling', color: '#FF9800' },
        { id: 4, title: 'Chat EcoBot', icon: '🤖', route: '/chat', color: '#9C27B0' },
    ];

    const stats = [
        { label: 'Compras', value: '12', icon: '🛍️' },
        { label: 'Ahorrado', value: '$45k', icon: '💰' },
        { label: 'CO₂ Reducido', value: '28kg', icon: '🌱' },
    ];

    return (
        <SafeAreaView style={styles.container} edges={['top']}>
            {/* Header */}
            <View style={styles.header}>
                <View style={styles.headerContent}>
                    <View>
                        <Text style={styles.greeting}>¡Hola! 👋</Text>
                        <Text style={styles.userName}>Juan Pablo</Text>
                    </View>
                    <Pressable onPress={() => router.push('/profile')} style={styles.profileButton}>
                        <Image source={require('@assets/images/icon.png')} style={styles.avatar} resizeMode='contain' />
                    </Pressable>
                </View>
            </View>

            <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
                {/* Stats Cards */}
                <View style={styles.statsContainer}>
                    {stats.map((stat, index) => (
                        <View key={index} style={styles.statCard}>
                            <Text style={styles.statIcon}>{stat.icon}</Text>
                            <Text style={styles.statValue}>{stat.value}</Text>
                            <Text style={styles.statLabel}>{stat.label}</Text>
                        </View>
                    ))}
                </View>

                {/* Menu Grid */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Servicios</Text>
                    <View style={styles.menuGrid}>
                        {menuItems.map((item) => (
                            <Pressable
                                key={item.id}
                                style={[styles.menuCard, { backgroundColor: item.color }]}
                                onPress={() => router.push(item.route as any)}
                            >
                                <Text style={styles.menuIcon}>{item.icon}</Text>
                                <Text style={styles.menuTitle}>{item.title}</Text>
                            </Pressable>
                        ))}
                    </View>
                </View>

                {/* Quick Actions */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Acciones Rápidas</Text>
                    <View style={styles.actionsContainer}>
                        <Pressable style={styles.actionButton} onPress={() => router.push('/dashboard/search')}>
                            <Text style={styles.actionIcon}>🔍</Text>
                            <Text style={styles.actionText}>Buscar Productos</Text>
                        </Pressable>
                        <Pressable style={styles.actionButton} onPress={() => router.push('/dashboard/recycling')}>
                            <Text style={styles.actionIcon}>📍</Text>
                            <Text style={styles.actionText}>Puntos de Reciclaje</Text>
                        </Pressable>
                    </View>
                </View>

                {/* Footer */}
                <View style={styles.footer}>
                    <Text style={styles.footerText}>Contribuyendo al planeta 🌍</Text>
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
        backgroundColor: Colors.ecoGreen,
        paddingHorizontal: Spacing.lg,
        paddingVertical: Spacing.lg,
        borderBottomLeftRadius: 24,
        borderBottomRightRadius: 24,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    headerContent: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    greeting: {
        fontSize: 16,
        color: '#E0F2E9',
        marginBottom: 4,
    },
    userName: {
        fontSize: 24,
        fontWeight: '700',
        color: '#fff',
    },
    profileButton: {
        width: 56,
        height: 56,
        borderRadius: 28,
        backgroundColor: '#fff',
        overflow: 'hidden',
        borderWidth: 3,
        borderColor: 'rgba(255,255,255,0.3)',
    },
    avatar: {
        width: '100%',
        height: '100%',
    },
    content: {
        flex: 1,
    },
    statsContainer: {
        flexDirection: 'row',
        paddingHorizontal: Spacing.lg,
        paddingVertical: Spacing.lg,
        gap: Spacing.md,
    },
    statCard: {
        flex: 1,
        backgroundColor: '#fff',
        borderRadius: 16,
        padding: Spacing.md,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.05,
        shadowRadius: 2,
        elevation: 1,
    },
    statIcon: {
        fontSize: 32,
        marginBottom: 8,
    },
    statValue: {
        fontSize: 20,
        fontWeight: '700',
        color: '#333',
        marginBottom: 4,
    },
    statLabel: {
        fontSize: 12,
        color: Colors.gray,
    },
    section: {
        paddingHorizontal: Spacing.lg,
        marginBottom: Spacing.lg,
    },
    sectionTitle: {
        fontSize: 20,
        fontWeight: '700',
        color: '#333',
        marginBottom: Spacing.md,
    },
    menuGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: Spacing.md,
    },
    menuCard: {
        width: '48%',
        aspectRatio: 1.2,
        borderRadius: 16,
        padding: Spacing.lg,
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 2,
    },
    menuIcon: {
        fontSize: 48,
        marginBottom: Spacing.sm,
    },
    menuTitle: {
        fontSize: 16,
        fontWeight: '700',
        color: '#fff',
        textAlign: 'center',
    },
    actionsContainer: {
        gap: Spacing.md,
    },
    actionButton: {
        backgroundColor: '#fff',
        flexDirection: 'row',
        alignItems: 'center',
        padding: Spacing.lg,
        borderRadius: 12,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.05,
        shadowRadius: 2,
        elevation: 1,
    },
    actionIcon: {
        fontSize: 24,
        marginRight: Spacing.md,
    },
    actionText: {
        fontSize: FontSize.medium,
        fontWeight: '600',
        color: '#333',
    },
    footer: {
        alignItems: 'center',
        paddingVertical: Spacing.xl,
    },
    footerText: {
        fontSize: 14,
        color: Colors.gray,
        fontStyle: 'italic',
    },
});
