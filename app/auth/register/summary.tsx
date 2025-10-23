import { Colors, Spacing } from '@/src/constants';
import { useLocalSearchParams } from 'expo-router';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function RegisterSummary() {
    const params = useLocalSearchParams<{ data?: string }>();
    const decoded = params.data ? JSON.parse(params.data as string) : {};
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: Colors.lightGray }}>
            <ScrollView contentContainerStyle={{ padding: Spacing.lg }}>
                <Text style={styles.title}>Resumen</Text>
                <View style={styles.card}>
                    <Text style={{ color: '#333' }}>{JSON.stringify(decoded, null, 2)}</Text>
                </View>
                <Text style={{ color: Colors.gray, marginTop: Spacing.md }}>
                    Aquí continúa el flujo: redirigir a #34 (Comprador) o #36 (Vendedor) según el rol.
                </Text>
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    title: { fontSize: 22, fontWeight: '800', color: '#333', marginBottom: Spacing.md },
    card: { backgroundColor: '#fff', borderRadius: 12, padding: Spacing.md, borderWidth: 1, borderColor: Colors.gray },
});
