import { Colors, FontSize, Spacing } from '@constants';
import { useRouter } from 'expo-router';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

interface Order {
    id: string;
    date: string;
    status: 'pending' | 'delivered' | 'in_transit';
    total: number;
    items: number;
}

const MOCK_ORDERS: Order[] = [
    { id: '1234', date: '2025-10-28', status: 'delivered', total: 75000, items: 3 },
    { id: '1235', date: '2025-10-25', status: 'in_transit', total: 45000, items: 2 },
    { id: '1236', date: '2025-10-20', status: 'delivered', total: 125000, items: 5 },
    { id: '1237', date: '2025-10-15', status: 'delivered', total: 32000, items: 1 },
];

export default function OrdersScreen() {
    const router = useRouter();

    const getStatusInfo = (status: Order['status']) => {
        switch (status) {
            case 'delivered':
                return { label: 'Entregado', color: Colors.ecoGreen, icon: '✅' };
            case 'in_transit':
                return { label: 'En camino', color: '#2196F3', icon: '🚚' };
            case 'pending':
                return { label: 'Pendiente', color: '#FF9800', icon: '⏳' };
        }
    };

    return (
        <SafeAreaView style={styles.container} edges={['top']}>
            {/* Header */}
            <View style={styles.header}>
                <Pressable onPress={() => router.back()} style={styles.backButton}>
                    <Text style={styles.backIcon}>←</Text>
                </Pressable>
                <Text style={styles.headerTitle}>Mis Pedidos</Text>
                <View style={styles.placeholder} />
            </View>

            <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
                {/* Stats */}
                <View style={styles.statsContainer}>
                    <View style={styles.statCard}>
                        <Text style={styles.statValue}>{MOCK_ORDERS.length}</Text>
                        <Text style={styles.statLabel}>Total Pedidos</Text>
                    </View>
                    <View style={styles.statCard}>
                        <Text style={styles.statValue}>
                            {MOCK_ORDERS.filter((o) => o.status === 'delivered').length}
                        </Text>
                        <Text style={styles.statLabel}>Entregados</Text>
                    </View>
                    <View style={styles.statCard}>
                        <Text style={styles.statValue}>
                            {MOCK_ORDERS.filter((o) => o.status === 'in_transit').length}
                        </Text>
                        <Text style={styles.statLabel}>En Tránsito</Text>
                    </View>
                </View>

                {/* Orders List */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Historial</Text>
                    {MOCK_ORDERS.map((order) => {
                        const statusInfo = getStatusInfo(order.status);
                        return (
                            <Pressable key={order.id} style={styles.orderCard}>
                                <View style={styles.orderHeader}>
                                    <View>
                                        <Text style={styles.orderId}>Pedido #{order.id}</Text>
                                        <Text style={styles.orderDate}>
                                            {new Date(order.date).toLocaleDateString('es-CO', {
                                                day: 'numeric',
                                                month: 'long',
                                                year: 'numeric',
                                            })}
                                        </Text>
                                    </View>
                                    <View style={[styles.statusBadge, { backgroundColor: statusInfo.color }]}>
                                        <Text style={styles.statusText}>
                                            {statusInfo.icon} {statusInfo.label}
                                        </Text>
                                    </View>
                                </View>

                                <View style={styles.divider} />

                                <View style={styles.orderDetails}>
                                    <View style={styles.orderDetailRow}>
                                        <Text style={styles.orderDetailLabel}>Artículos:</Text>
                                        <Text style={styles.orderDetailValue}>{order.items}</Text>
                                    </View>
                                    <View style={styles.orderDetailRow}>
                                        <Text style={styles.orderDetailLabel}>Total:</Text>
                                        <Text style={styles.orderTotal}>${order.total.toLocaleString('es-CO')}</Text>
                                    </View>
                                </View>

                                <Pressable style={styles.viewButton}>
                                    <Text style={styles.viewButtonText}>Ver Detalles →</Text>
                                </Pressable>
                            </Pressable>
                        );
                    })}
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
    statsContainer: {
        flexDirection: 'row',
        paddingHorizontal: Spacing.lg,
        paddingVertical: Spacing.lg,
        gap: Spacing.md,
    },
    statCard: {
        flex: 1,
        backgroundColor: '#fff',
        borderRadius: 12,
        padding: Spacing.md,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.05,
        shadowRadius: 2,
        elevation: 1,
    },
    statValue: {
        fontSize: 24,
        fontWeight: '700',
        color: Colors.ecoGreen,
        marginBottom: 4,
    },
    statLabel: {
        fontSize: 12,
        color: Colors.gray,
        textAlign: 'center',
    },
    section: {
        paddingHorizontal: Spacing.lg,
        paddingBottom: Spacing.lg,
    },
    sectionTitle: {
        fontSize: 20,
        fontWeight: '700',
        color: '#333',
        marginBottom: Spacing.md,
    },
    orderCard: {
        backgroundColor: '#fff',
        borderRadius: 16,
        padding: Spacing.lg,
        marginBottom: Spacing.md,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 2,
    },
    orderHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        marginBottom: Spacing.md,
    },
    orderId: {
        fontSize: 16,
        fontWeight: '700',
        color: '#333',
        marginBottom: 4,
    },
    orderDate: {
        fontSize: 13,
        color: Colors.gray,
    },
    statusBadge: {
        paddingHorizontal: Spacing.md,
        paddingVertical: 6,
        borderRadius: 12,
    },
    statusText: {
        fontSize: 12,
        fontWeight: '700',
        color: '#fff',
    },
    divider: {
        height: 1,
        backgroundColor: '#F0F0F0',
        marginBottom: Spacing.md,
    },
    orderDetails: {
        marginBottom: Spacing.md,
    },
    orderDetailRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 8,
    },
    orderDetailLabel: {
        fontSize: FontSize.medium,
        color: Colors.gray,
    },
    orderDetailValue: {
        fontSize: FontSize.medium,
        fontWeight: '600',
        color: '#333',
    },
    orderTotal: {
        fontSize: FontSize.medium,
        fontWeight: '700',
        color: Colors.ecoGreen,
    },
    viewButton: {
        alignItems: 'center',
        paddingVertical: Spacing.sm,
    },
    viewButtonText: {
        fontSize: FontSize.medium,
        fontWeight: '600',
        color: Colors.ecoGreen,
    },
});
