import { Colors, Spacing } from '@/constants';
import { StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function Login() {
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: Colors.lightGray }}>
            <View style={styles.container}>
                <Text style={styles.title}>Login</Text>
                <Text style={{ color: Colors.gray }}>Esta pantalla es un placeholder (#30).</Text>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, alignItems: 'center', justifyContent: 'center', padding: Spacing.lg },
    title: { fontSize: 24, fontWeight: '800' },
});
