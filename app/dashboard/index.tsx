import React, { useContext, useEffect, useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    Image,
    Pressable,
    ActivityIndicator,
    RefreshControl,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Colors, Spacing, FontSize } from '@/src/constants';
import OffersService, { Offer } from '@/src/services/offersService';
import { useRouter } from 'expo-router';
import { useAuth } from '@/src/contexts/AuthContext';  // Nuevo: Import para signOut

export default function GeneratorDashboard() {
    const router = useRouter();
    const { signOut } = useAuth();  // Nuevo: Hook para logout
    const [receivedOffers, setReceivedOffers] = useState<Offer[]>([]);
    const [completedOffers, setCompletedOffers] = useState<Offer[]>([]);
    const [loading, setLoading] = useState(true);
    const [refreshing, setRefreshing] = useState(false);

    useEffect(() => {
        loadOffers();
    }, []);

    const loadOffers = async () => {
        try {
            const offers = await OffersService.getReceivedOffers();
            const pending = offers.filter(o => o.status === 'PENDING' || o.status === 'ACCEPTED');
            const completed = offers.filter(o => o.status === 'COMPLETED' || o.status === 'REJECTED');

            setReceivedOffers(pending);
            setCompletedOffers(completed);
        } catch (error) {
            console.error('Error loading offers:', error);
        } finally {
            setLoading(false);
            setRefreshing(false);
        }
    };

    const onRefresh = () => {
        setRefreshing(true);
        loadOffers();
    };

    const handleLogout = async () => {
        await signOut();
    };

    if (loading) {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color={Colors.ecoGreen} />
            </View>
        );
    }

    return (
        <SafeAreaView style={styles.safeArea} edges={['top']}>
            <View style={styles.header}>
                <Text style={styles.headerTitle}>Econexión</Text>
                <View style={styles.headerActions}>  {/* Nuevo: Contenedor para actions */}
                    <Pressable style={styles.notificationBtn}>
                        <Text style={styles.notificationIcon}></Text>
                    </Pressable>
                    <Pressable onPress={handleLogout} style={styles.logoutBtn}>  {/* Nuevo: Botón logout */}
                        <Text style={styles.logoutText}>Logout</Text>
                    </Pressable>
                </View>
            </View>

            <ScrollView
                style={styles.container}
                refreshControl={
                    <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
                }
            >
                <Text style={styles.mainTitle}>Panel de Control</Text>

                {/* Crear Publicación Card */}
                <View style={styles.createPostCard}>
                    <Image
                        source={{ uri: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB2LCO_sG-Pmu9Z7ew20FLtWYIawbEgIr9s_rb2JOWGkLp09BtnwdLpHtR-GM4wbpWPml5ZXJ9FleW6dvTGFrgmYrsIwUK9ML-v-jf5h9QFqlPGXVMcUCHDEJr8bCOXIE5v_l-2T6PAoH8b9GqmNaty9BoTZo9bU_5Y1lk0KjUrx-mU5jA1nPuVc2wQzsm47hO7oSMNJlkN2TqT_CSq8UfJKn0vGX4Lg7Z95ZDEKDqeznGFOGCOVVjTLKM10qkB_y9-FnYBCJ1XBbFh' }}
                        style={styles.createPostImage}
                        resizeMode="cover"
                    />
                    <View style={styles.createPostContent}>
                        <Text style={styles.createPostTitle}>Publicar Lote</Text>
                        <Text style={styles.createPostSubtitle}>
                            Crea una nueva publicación para tus residuos y encuentra compradores.
                        </Text>
                        <Pressable
                            style={styles.createBtn}
                            //onPress={() => router.push('/dashboard/publish')}
                        >
                            <Text style={styles.createBtnText}>Crear</Text>
                        </Pressable>
                    </View>
                </View>

                {/* Ofertas Recibidas */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Ofertas Recibidas</Text>
                    {receivedOffers.length === 0 ? (
                        <Text style={styles.emptyText}>No tienes ofertas pendientes</Text>
                    ) : (
                        receivedOffers.map((offer) => (
                            <Pressable
                                key={offer.id}
                                style={styles.offerCard}
                                //onPress={() => router.push(`/dashboard/offers?id=${offer.id}`)}
                            >
                                <Image
                                    source={{ uri: offer.post?.imageUrl || 'https://via.placeholder.com/56' }}
                                    style={styles.offerImage}
                                />
                                <View style={styles.offerInfo}>
                                    <Text style={styles.offerTitle}>{offer.post?.title || 'Lote'}</Text>
                                    <Text style={styles.offerSubtitle}>{offer.user?.name || 'Comprador'}</Text>
                                </View>
                                <Text style={styles.offerPrice}>${offer.amount}</Text>
                            </Pressable>
                        ))
                    )}
                </View>

                {/* Ofertas Terminadas */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Ofertas Terminadas</Text>
                    {completedOffers.length === 0 ? (
                        <Text style={styles.emptyText}>No hay ofertas terminadas</Text>
                    ) : (
                        completedOffers.map((offer) => (
                            <Pressable
                                key={offer.id}
                                style={[styles.offerCard, styles.offerCardCompleted]}
                            >
                                <Image
                                    source={{ uri: offer.post?.imageUrl || 'https://via.placeholder.com/56' }}
                                    style={styles.offerImage}
                                />
                                <View style={styles.offerInfo}>
                                    <Text style={styles.offerTitle}>{offer.post?.title || 'Lote'}</Text>
                                    <Text style={styles.offerSubtitle}>{offer.user?.name || 'Comprador'}</Text>
                                </View>
                                <Text style={styles.offerPriceCompleted}>${offer.amount}</Text>
                            </Pressable>
                        ))
                    )}
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: '#f6f8f6',
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: Spacing.lg,
        paddingVertical: Spacing.md,
        backgroundColor: '#f6f8f6cc',
        borderBottomWidth: 1,
        borderBottomColor: '#20df2633',
    },
    headerTitle: {
        fontSize: 20,
        fontWeight: '700',
        color: '#111',
        flex: 1,
        textAlign: 'center',
    },
    headerActions: {  // Nuevo: Para alinear actions
        flexDirection: 'row',
        gap: Spacing.sm,
    },
    notificationBtn: {
        padding: 8,
        borderRadius: 20,
    },
    notificationIcon: {
        fontSize: 20,
    },
    logoutBtn: {  // Nuevo: Estilo para botón logout
        padding: 8,
        borderRadius: 20,
        backgroundColor: Colors.lightGray,
    },
    logoutText: {
        fontSize: FontSize.small,
        color: '#111',
        fontWeight: '600',
    },
    container: {
        flex: 1,
        padding: Spacing.lg,
    },
    mainTitle: {
        fontSize: 24,
        fontWeight: '700',
        color: '#111',
        marginBottom: Spacing.lg,
    },
    createPostCard: {
        backgroundColor: '#fff',
        borderRadius: 12,
        overflow: 'hidden',
        marginBottom: Spacing.lg,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    createPostImage: {
        width: '100%',
        height: 160,
    },
    createPostContent: {
        padding: Spacing.lg,
    },
    createPostTitle: {
        fontSize: 18,
        fontWeight: '700',
        color: '#111',
        marginBottom: 4,
    },
    createPostSubtitle: {
        fontSize: 14,
        color: '#666',
        marginBottom: Spacing.md,
    },
    createBtn: {
        backgroundColor: Colors.ecoGreen,
        paddingVertical: Spacing.sm,
        borderRadius: 8,
        alignItems: 'center',
    },
    createBtnText: {
        color: '#000',
        fontWeight: '700',
        fontSize: FontSize.medium,
    },
    section: {
        marginBottom: Spacing.xl,
    },
    sectionTitle: {
        fontSize: 20,
        fontWeight: '700',
        color: '#111',
        marginBottom: Spacing.md,
    },
    emptyText: {
        color: '#999',
        textAlign: 'center',
        paddingVertical: Spacing.lg,
    },
    offerCard: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#fff',
        padding: Spacing.md,
        borderRadius: 8,
        marginBottom: Spacing.sm,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.05,
        shadowRadius: 2,
        elevation: 2,
    },
    offerCardCompleted: {
        opacity: 0.7,
    },
    offerImage: {
        width: 56,
        height: 56,
        borderRadius: 8,
        marginRight: Spacing.md,
    },
    offerInfo: {
        flex: 1,
    },
    offerTitle: {
        fontSize: 16,
        fontWeight: '600',
        color: '#111',
        marginBottom: 2,
    },
    offerSubtitle: {
        fontSize: 14,
        color: '#666',
    },
    offerPrice: {
        fontSize: 18,
        fontWeight: '700',
        color: Colors.ecoGreen,
    },
    offerPriceCompleted: {
        fontSize: 18,
        fontWeight: '600',
        color: '#666',
    },
});