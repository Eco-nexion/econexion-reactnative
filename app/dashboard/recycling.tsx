import { Colors, FontSize, Spacing } from '@constants';
import { useRouter } from 'expo-router';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

interface RecyclingPoint {
    id: string;
    name: string;
    address: string;
    distance: string;
    accepts: string[];
    schedule: string;
    rating: number;
}

const MOCK_POINTS: RecyclingPoint[] = [
    {
        id: '1',
        name: 'TecnoVerde',
        address: 'Calle 85 #15-20, Bogotá',
        distance: '1.2 km',
        accepts: ['Electrónicos', 'Baterías', 'Plásticos'],
        schedule: 'Lun-Vie: 8AM-6PM',
        rating: 4.8,
    },
    {
        id: '2',
        name: 'EcoTech Bogotá',
        address: 'Av. El Dorado #68-55',
        distance: '3.5 km',
        accepts: ['Electrónicos', 'Cartón', 'Vidrio'],
        schedule: 'Lun-Sab: 9AM-5PM',
        rating: 4.5,
    },
    {
        id: '3',
        name: 'Punto Verde Centro',
        address: 'Carrera 7 #45-12',
        distance: '2.8 km',
        accepts: ['Papel', 'Cartón', 'Vidrio', 'Latas'],
        schedule: 'Lun-Vie: 7AM-7PM',
        rating: 4.6,
    },
];

export default function RecyclingScreen() {
    const router = useRouter();

    return (
        <SafeAreaView style={styles.container} edges={['top']}>
            {/* Header */}
            <View style={styles.header}>
                <Pressable onPress={() => router.back()} style={styles.backButton}>
                    <Text style={styles.backIcon}>←</Text>
                </Pressable>
                <Text style={styles.headerTitle}>Centro de Reciclaje</Text>
                <View style={styles.placeholder} />
            </View>

            <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
                {/* Info Banner */}
                <View style={styles.infoBanner}>
                    <Text style={styles.infoBannerIcon}>♻️</Text>
                    <View style={styles.infoBannerContent}>
                        <Text style={styles.infoBannerTitle}>¡Recicla con nosotros!</Text>
                        <Text style={styles.infoBannerText}>
                            Encuentra puntos de reciclaje cercanos y contribuye al cuidado del planeta
                        </Text>
                    </View>
                </View>

                {/* Stats */}
                <View style={styles.statsContainer}>
                    <View style={styles.statCard}>
                        <Text style={styles.statIcon}>🌱</Text>
                        <Text style={styles.statValue}>28kg</Text>
                        <Text style={styles.statLabel}>CO₂ Ahorrado</Text>
                    </View>
                    <View style={styles.statCard}>
                        <Text style={styles.statIcon}>📦</Text>
                        <Text style={styles.statValue}>15</Text>
                        <Text style={styles.statLabel}>Items Reciclados</Text>
                    </View>
                </View>

                {/* Recycling Points */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Puntos Cercanos</Text>

                    {MOCK_POINTS.map((point) => (
                        <Pressable key={point.id} style={styles.pointCard}>
                            <View style={styles.pointHeader}>
                                <View style={styles.pointIcon}>
                                    <Text style={styles.pointIconText}>📍</Text>
                                </View>
                                <View style={styles.pointInfo}>
                                    <Text style={styles.pointName}>{point.name}</Text>
                                    <Text style={styles.pointAddress}>{point.address}</Text>
                                    <View style={styles.pointMeta}>
                                        <Text style={styles.pointDistance}>📏 {point.distance}</Text>
                                        <Text style={styles.pointRating}>⭐ {point.rating}</Text>
                                    </View>
                                </View>
                            </View>

                            <View style={styles.divider} />

                            <View style={styles.pointDetails}>
                                <Text style={styles.detailLabel}>Acepta:</Text>
                                <View style={styles.acceptsContainer}>
                                    {point.accepts.map((item, index) => (
                                        <View key={index} style={styles.acceptChip}>
                                            <Text style={styles.acceptText}>{item}</Text>
                                        </View>
                                    ))}
                                </View>
                            </View>

                            <View style={styles.pointFooter}>
                                <Text style={styles.scheduleText}>🕐 {point.schedule}</Text>
                                <Pressable style={styles.directionButton}>
                                    <Text style={styles.directionButtonText}>Cómo llegar →</Text>
                                </Pressable>
                            </View>
                        </Pressable>
                    ))}
                </View>

                {/* Tips Section */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Consejos para Reciclar</Text>
                    <View style={styles.tipsCard}>
                        <View style={styles.tipItem}>
                            <Text style={styles.tipIcon}>💡</Text>
                            <Text style={styles.tipText}>Limpia los envases antes de reciclarlos</Text>
                        </View>
                        <View style={styles.tipItem}>
                            <Text style={styles.tipIcon}>🔋</Text>
                            <Text style={styles.tipText}>Las baterías nunca van con la basura común</Text>
                        </View>
                        <View style={styles.tipItem}>
                            <Text style={styles.tipIcon}>📱</Text>
                            <Text style={styles.tipText}>Borra tus datos antes de reciclar electrónicos</Text>
                        </View>
                    </View>
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
    infoBanner: {
        backgroundColor: Colors.ecoGreen,
        marginHorizontal: Spacing.lg,
        marginTop: Spacing.lg,
        padding: Spacing.lg,
        borderRadius: 16,
        flexDirection: 'row',
        alignItems: 'center',
    },
    infoBannerIcon: {
        fontSize: 48,
        marginRight: Spacing.md,
    },
    infoBannerContent: {
        flex: 1,
    },
    infoBannerTitle: {
        fontSize: 18,
        fontWeight: '700',
        color: '#fff',
        marginBottom: 4,
    },
    infoBannerText: {
        fontSize: 14,
        color: '#E0F2E9',
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
        padding: Spacing.lg,
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
        textAlign: 'center',
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
    pointCard: {
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
    pointHeader: {
        flexDirection: 'row',
        marginBottom: Spacing.md,
    },
    pointIcon: {
        width: 48,
        height: 48,
        borderRadius: 24,
        backgroundColor: Colors.lightGray,
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: Spacing.md,
    },
    pointIconText: {
        fontSize: 24,
    },
    pointInfo: {
        flex: 1,
    },
    pointName: {
        fontSize: 16,
        fontWeight: '700',
        color: '#333',
        marginBottom: 4,
    },
    pointAddress: {
        fontSize: 14,
        color: Colors.gray,
        marginBottom: 8,
    },
    pointMeta: {
        flexDirection: 'row',
        gap: Spacing.md,
    },
    pointDistance: {
        fontSize: 13,
        color: Colors.gray,
    },
    pointRating: {
        fontSize: 13,
        color: Colors.gray,
    },
    divider: {
        height: 1,
        backgroundColor: '#F0F0F0',
        marginBottom: Spacing.md,
    },
    pointDetails: {
        marginBottom: Spacing.md,
    },
    detailLabel: {
        fontSize: 14,
        fontWeight: '600',
        color: '#333',
        marginBottom: Spacing.sm,
    },
    acceptsContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: Spacing.sm,
    },
    acceptChip: {
        backgroundColor: Colors.lightGray,
        paddingHorizontal: Spacing.md,
        paddingVertical: 6,
        borderRadius: 12,
    },
    acceptText: {
        fontSize: 12,
        fontWeight: '600',
        color: Colors.ecoGreen,
    },
    pointFooter: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    scheduleText: {
        fontSize: 13,
        color: Colors.gray,
    },
    directionButton: {
        paddingVertical: 8,
        paddingHorizontal: Spacing.md,
    },
    directionButtonText: {
        fontSize: 14,
        fontWeight: '600',
        color: Colors.ecoGreen,
    },
    tipsCard: {
        backgroundColor: '#fff',
        borderRadius: 16,
        padding: Spacing.lg,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.05,
        shadowRadius: 2,
        elevation: 1,
    },
    tipItem: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: Spacing.md,
    },
    tipIcon: {
        fontSize: 24,
        marginRight: Spacing.md,
    },
    tipText: {
        flex: 1,
        fontSize: FontSize.medium,
        color: '#333',
        lineHeight: 20,
    },
});
