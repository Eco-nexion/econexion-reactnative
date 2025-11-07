import { Colors, FontSize, Spacing } from '@constants';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

interface Product {
    id: string;
    name: string;
    price: number;
    category: string;
    eco_score: number;
    image: string;
}

const MOCK_PRODUCTS: Product[] = [
    { id: '1', name: 'Botella Reutilizable', price: 25000, category: 'Eco-Hogar', eco_score: 95, image: '♻️' },
    { id: '2', name: 'Bolsa de Tela Orgánica', price: 15000, category: 'Accesorios', eco_score: 90, image: '🛍️' },
    { id: '3', name: 'Cargador Solar', price: 85000, category: 'Tecnología', eco_score: 88, image: '🔋' },
    { id: '4', name: 'Kit de Cubiertos Bambú', price: 32000, category: 'Eco-Hogar', eco_score: 92, image: '🍴' },
    { id: '5', name: 'Jabón Artesanal', price: 18000, category: 'Cuidado Personal', eco_score: 85, image: '🧼' },
    { id: '6', name: 'Termo Acero Inoxidable', price: 45000, category: 'Eco-Hogar', eco_score: 94, image: '🥤' },
];

export default function ProductsScreen() {
    const router = useRouter();
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedCategory, setSelectedCategory] = useState<string>('Todos');

    const categories = ['Todos', 'Eco-Hogar', 'Tecnología', 'Accesorios', 'Cuidado Personal'];

    const filteredProducts = MOCK_PRODUCTS.filter((product) => {
        const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesCategory = selectedCategory === 'Todos' || product.category === selectedCategory;
        return matchesSearch && matchesCategory;
    });

    return (
        <SafeAreaView style={styles.container} edges={['top']}>
            {/* Header */}
            <View style={styles.header}>
                <Pressable onPress={() => router.back()} style={styles.backButton}>
                    <Text style={styles.backIcon}>←</Text>
                </Pressable>
                <Text style={styles.headerTitle}>Productos Ecológicos</Text>
                <View style={styles.placeholder} />
            </View>

            {/* Search Bar */}
            <View style={styles.searchContainer}>
                <Text style={styles.searchIcon}>🔍</Text>
                <TextInput
                    style={styles.searchInput}
                    placeholder='Buscar productos...'
                    value={searchQuery}
                    onChangeText={setSearchQuery}
                    placeholderTextColor={Colors.gray}
                />
            </View>

            {/* Categories */}
            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.categoriesScroll}>
                <View style={styles.categoriesContainer}>
                    {categories.map((category) => (
                        <Pressable
                            key={category}
                            style={[styles.categoryChip, selectedCategory === category && styles.categoryChipActive]}
                            onPress={() => setSelectedCategory(category)}
                        >
                            <Text
                                style={[
                                    styles.categoryText,
                                    selectedCategory === category && styles.categoryTextActive,
                                ]}
                            >
                                {category}
                            </Text>
                        </Pressable>
                    ))}
                </View>
            </ScrollView>

            {/* Products Grid */}
            <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
                <View style={styles.productsGrid}>
                    {filteredProducts.map((product) => (
                        <View key={product.id} style={styles.productCard}>
                            <View style={styles.productImageContainer}>
                                <Text style={styles.productEmoji}>{product.image}</Text>
                                <View style={styles.ecoScoreBadge}>
                                    <Text style={styles.ecoScoreText}>🌱 {product.eco_score}</Text>
                                </View>
                            </View>
                            <View style={styles.productInfo}>
                                <Text style={styles.productCategory}>{product.category}</Text>
                                <Text style={styles.productName} numberOfLines={2}>
                                    {product.name}
                                </Text>
                                <Text style={styles.productPrice}>${product.price.toLocaleString('es-CO')}</Text>
                                <Pressable style={styles.addButton}>
                                    <Text style={styles.addButtonText}>Agregar</Text>
                                </Pressable>
                            </View>
                        </View>
                    ))}
                </View>

                {filteredProducts.length === 0 && (
                    <View style={styles.emptyState}>
                        <Text style={styles.emptyIcon}>📦</Text>
                        <Text style={styles.emptyText}>No se encontraron productos</Text>
                    </View>
                )}
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
    searchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#fff',
        marginHorizontal: Spacing.lg,
        marginTop: Spacing.md,
        paddingHorizontal: Spacing.md,
        borderRadius: 12,
        borderWidth: 1,
        borderColor: '#E5E5E5',
    },
    searchIcon: {
        fontSize: 20,
        marginRight: Spacing.sm,
    },
    searchInput: {
        flex: 1,
        paddingVertical: Spacing.md,
        fontSize: FontSize.medium,
        color: '#333',
    },
    categoriesScroll: {
        maxHeight: 60,
    },
    categoriesContainer: {
        flexDirection: 'row',
        paddingHorizontal: Spacing.lg,
        paddingVertical: Spacing.md,
        gap: Spacing.sm,
    },
    categoryChip: {
        paddingHorizontal: Spacing.lg,
        paddingVertical: Spacing.sm,
        borderRadius: 20,
        backgroundColor: '#fff',
        borderWidth: 1,
        borderColor: '#E5E5E5',
    },
    categoryChipActive: {
        backgroundColor: Colors.ecoGreen,
        borderColor: Colors.ecoGreen,
    },
    categoryText: {
        fontSize: 14,
        fontWeight: '600',
        color: Colors.gray,
    },
    categoryTextActive: {
        color: '#fff',
    },
    content: {
        flex: 1,
    },
    productsGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        paddingHorizontal: Spacing.lg,
        paddingVertical: Spacing.md,
        gap: Spacing.md,
    },
    productCard: {
        width: '48%',
        backgroundColor: '#fff',
        borderRadius: 16,
        overflow: 'hidden',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 2,
    },
    productImageContainer: {
        backgroundColor: '#F5F5F5',
        aspectRatio: 1,
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
    },
    productEmoji: {
        fontSize: 64,
    },
    ecoScoreBadge: {
        position: 'absolute',
        top: 8,
        right: 8,
        backgroundColor: Colors.ecoGreen,
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 12,
    },
    ecoScoreText: {
        fontSize: 12,
        fontWeight: '700',
        color: '#fff',
    },
    productInfo: {
        padding: Spacing.md,
    },
    productCategory: {
        fontSize: 11,
        color: Colors.gray,
        marginBottom: 4,
        textTransform: 'uppercase',
    },
    productName: {
        fontSize: 14,
        fontWeight: '600',
        color: '#333',
        marginBottom: 8,
        minHeight: 36,
    },
    productPrice: {
        fontSize: 16,
        fontWeight: '700',
        color: Colors.ecoGreen,
        marginBottom: Spacing.sm,
    },
    addButton: {
        backgroundColor: Colors.ecoGreen,
        paddingVertical: 8,
        borderRadius: 8,
        alignItems: 'center',
    },
    addButtonText: {
        fontSize: 14,
        fontWeight: '700',
        color: '#fff',
    },
    emptyState: {
        alignItems: 'center',
        paddingVertical: Spacing.xl * 2,
    },
    emptyIcon: {
        fontSize: 64,
        marginBottom: Spacing.md,
    },
    emptyText: {
        fontSize: FontSize.medium,
        color: Colors.gray,
    },
});
