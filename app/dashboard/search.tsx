import React, { useEffect, useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    Image,
    Pressable,
    TextInput,
    ActivityIndicator,
    RefreshControl,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Colors, Spacing, FontSize } from '@/src/constants';
import PostsService, { Post } from '@/src/services/postsService';
import OffersService, { Offer } from '@/src/services/offersService';
import { useRouter } from 'expo-router';
import { useAuth } from '@/src/contexts/AuthContext';  // Nuevo: Import para signOut

export default function RecyclerDashboard() {
    const router = useRouter();
    const { signOut } = useAuth();  // Nuevo: Hook para logout
    const [posts, setPosts] = useState<Post[]>([]);
    const [pendingOffers, setPendingOffers] = useState<Offer[]>([]);
    const [completedOffers, setCompletedOffers] = useState<Offer[]>([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [loading, setLoading] = useState(true);
    const [refreshing, setRefreshing] = useState(false);

    useEffect(() => {
        loadData();
    }, []);

    const loadData = async () => {
        try {
            const [allPosts, sentOffers] = await Promise.all([
                PostsService.getPosts(),
                OffersService.getSentOffers(),
            ]);

            setPosts(allPosts);
            const pending = sentOffers.filter(o => o.status === 'PENDING');
            const completed = sentOffers.filter(
                o => o.status === 'COMPLETED' || o.status === 'ACCEPTED' || o.status === 'REJECTED'
            );

            setPendingOffers(pending);
            setCompletedOffers(completed);
        } catch (error) {
            console.error('Error loading data:', error);
        } finally {
            setLoading(false);
            setRefreshing(false);
        }
    };

    const onRefresh = () => {
        setRefreshing(true);
        loadData();
    };

    const handleLogout = async () => {
        await signOut();
    };

    const filteredPosts = posts.filter(post =>
        post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.wasteType.toLowerCase().includes(searchQuery.toLowerCase())
    );

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
                <Pressable style={styles.menuBtn}>
                    <Text style={styles.menuIcon}>☰</Text>
                </Pressable>
                <Text style={styles.headerTitle}>Panel de Control</Text>
                <View style={styles.headerActions}>  {/* Nuevo: Contenedor para actions */}
                    <View style={{ width: 40 }} />  {/* Placeholder para balancear */}
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
                {/* Lotes Publicados */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Lotes Publicados</Text>

                    <View style={styles.searchContainer}>
                        <Text style={styles.searchIcon}></Text>
                        <TextInput
                            style={styles.searchInput}
                            placeholder="Buscar lotes"
                            value={searchQuery}
                            onChangeText={setSearchQuery}
                            placeholderTextColor="#999"
                        />
                    </View>

                    {filteredPosts.length === 0 ? (
                        <Text style={styles.emptyText}>No hay lotes disponibles</Text>
                    ) : (
                        filteredPosts.slice(0, 5).map((post) => (
                            <Pressable
                                key={post.id}
                                style={styles.postCard}
                                //onPress={() => router.push(`/(dashboard)/post-detail?id=${post.id}`)}
                            >
                                <Image
                                    source={{ uri: post.imageUrl || 'https://via.placeholder.com/64' }}
                                    style={styles.postImage}
                                />
                                <View style={styles.postInfo}>
                                    <Text style={styles.postTitle}>Lote #{post.id.slice(0, 8)}</Text>
                                    <Text style={styles.postSubtitle}>{post.wasteType}</Text>
                                </View>
                                <Text style={styles.chevron}>›</Text>
                            </Pressable>
                        ))
                    )}
                </View>

                {/* Ofertas Pendientes */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Ofertas Pendientes</Text>
                    {pendingOffers.length === 0 ? (
                        <Text style={styles.emptyText}>No tienes ofertas pendientes</Text>
                    ) : (
                        pendingOffers.map((offer) => (
                            <View key={offer.id} style={styles.offerCard}>
                                <Image
                                    source={{ uri: offer.post?.imageUrl || 'https://via.placeholder.com/64' }}
                                    style={styles.postImage}
                                />
                                <View style={styles.postInfo}>
                                    <Text style={styles.postTitle}>Lote #{offer.postId.slice(0, 8)}</Text>
                                    <Text style={styles.postSubtitle}>Oferta #{offer.id.slice(0, 8)}</Text>
                                </View>
                                <Pressable style={styles.actionBtn}>
                                    <Text style={styles.actionBtnText}>Renegociar</Text>
                                </Pressable>
                            </View>
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
                                style={styles.postCard}
                                //onPress={() => router.push(`/(dashboard)/offer-detail?id=${offer.id}`)}
                            >
                                <Image
                                    source={{ uri: offer.post?.imageUrl || 'https://via.placeholder.com/64' }}
                                    style={styles.postImage}
                                />
                                <View style={styles.postInfo}>
                                    <Text style={styles.postTitle}>Lote #{offer.postId.slice(0, 8)}</Text>
                                    <Text style={styles.postSubtitle}>Oferta #{offer.id.slice(0, 8)}</Text>
                                </View>
                                <Text style={styles.chevron}>›</Text>
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
    },
    menuBtn: {
        padding: 8,
    },
    menuIcon: {
        fontSize: 24,
        color: '#111',
    },
    headerTitle: {
        fontSize: 20,
        fontWeight: '700',
        color: '#111',
    },
    headerActions: {  // Nuevo: Para alinear actions
        flexDirection: 'row',
        gap: Spacing.sm,
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
    section: {
        marginBottom: Spacing.xl,
    },
    sectionTitle: {
        fontSize: 24,
        fontWeight: '700',
        color: '#111',
        marginBottom: Spacing.md,
    },
    searchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#f6f8f6',
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 8,
        paddingHorizontal: Spacing.md,
        marginBottom: Spacing.md,
    },
    searchIcon: {
        fontSize: 20,
        marginRight: 8,
    },
    searchInput: {
        flex: 1,
        paddingVertical: 12,
        fontSize: FontSize.medium,
        color: '#111',
    },
    emptyText: {
        color: '#999',
        textAlign: 'center',
        paddingVertical: Spacing.lg,
    },
    postCard: {
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
    postImage: {
        width: 64,
        height: 64,
        borderRadius: 8,
        marginRight: Spacing.md,
    },
    postInfo: {
        flex: 1,
    },
    postTitle: {
        fontSize: 16,
        fontWeight: '600',
        color: '#111',
        marginBottom: 2,
    },
    postSubtitle: {
        fontSize: 14,
        color: Colors.ecoGreen,
    },
    chevron: {
        fontSize: 24,
        color: '#999',
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
    actionBtn: {
        backgroundColor: '#20df2633',
        paddingHorizontal: Spacing.md,
        paddingVertical: Spacing.sm,
        borderRadius: 20,
    },
    actionBtnText: {
        color: Colors.ecoGreen,
        fontWeight: '600',
        fontSize: 14,
    },
});