import React, { useContext } from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import { useRouter, usePathname } from 'expo-router';
import { Colors, Spacing } from '@/src/constants';
import { AuthContext } from '@/src/contexts/AuthContext';

interface NavItem {
    id: string;
    label: string;
    icon: string;
    route: string;
}

const generatorNavItems: NavItem[] = [
    { id: 'home', label: 'Inicio', icon: '🏠', route: '/(dashboard)' },
    { id: 'publish', label: 'Publicar', icon: '➕', route: '/(dashboard)/publish' },
    { id: 'offers', label: 'Ofertas', icon: '🤝', route: '/(dashboard)/offers' },
    { id: 'transactions', label: 'Transacciones', icon: '💰', route: '/(dashboard)/transactions' },
    { id: 'profile', label: 'Perfil', icon: '👤', route: '/(dashboard)/profile' },
];

const recyclerNavItems: NavItem[] = [
    { id: 'home', label: 'Inicio', icon: '🏠', route: '/(dashboard)' },
    { id: 'search', label: 'Buscar', icon: '🔍', route: '/(dashboard)/search' },
    { id: 'offers', label: 'Ofertas', icon: '📋', route: '/(dashboard)/offers' },
    { id: 'transactions', label: 'Transacciones', icon: '🔄', route: '/(dashboard)/transactions' },
    { id: 'profile', label: 'Perfil', icon: '👤', route: '/(dashboard)/profile' },
];

export default function BottomNav() {
    const router = useRouter();
    const pathname = usePathname();
    const { user } = useContext(AuthContext);

    const navItems = user?.userType === 'GENERATOR' ? generatorNavItems : recyclerNavItems;

    return (
        <View style={styles.container}>
            {navItems.map((item) => {
                const isActive = pathname === item.route ||
                    (pathname.startsWith('/(dashboard)') && item.route === '/(dashboard)' && pathname === '/(dashboard)/');

                return (
                    <Pressable
                        key={item.id}
                        style={styles.navItem}
                        onPress={() => router.push(item.route as any)}
                    >
                        <Text style={[styles.icon, isActive && styles.iconActive]}>
                            {item.icon}
                        </Text>
                        <Text style={[styles.label, isActive && styles.labelActive]}>
                            {item.label}
                        </Text>
                    </Pressable>
                );
            })}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        backgroundColor: '#f6f8f6',
        borderTopWidth: 1,
        borderTopColor: '#20df2633',
        paddingBottom: 8,
        paddingTop: 8,
    },
    navItem: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        gap: 4,
    },
    icon: {
        fontSize: 20,
        opacity: 0.5,
    },
    iconActive: {
        opacity: 1,
    },
    label: {
        fontSize: 12,
        fontWeight: '500',
        color: '#999',
    },
    labelActive: {
        color: Colors.ecoGreen,
        fontWeight: '600',
    },
});