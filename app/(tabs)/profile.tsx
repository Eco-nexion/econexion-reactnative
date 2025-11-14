import { Colors, Spacing, STORAGE_KEYS } from '@constants';
import { storage } from '@utils';
import { useRouter } from 'expo-router';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function ProfileTab() {
	const router = useRouter();

	const handleLogout = async () => {
		await storage.removeItem(STORAGE_KEYS.token);
		await storage.removeItem(STORAGE_KEYS.user_name);
		await storage.removeItem(STORAGE_KEYS.user_email);
		await storage.removeItem(STORAGE_KEYS.user_type);
		router.replace('/');
	};

	return (
		<SafeAreaView style={styles.safeArea} edges={['bottom']}>
			<View style={styles.container}>
				<Text style={styles.title}>Perfil</Text>
				<Text style={styles.subtitle}>Gestiona tu cuenta y preferencias</Text>

				<Pressable style={styles.logoutButton} onPress={handleLogout}>
					<Text style={styles.logoutText}>Cerrar Sesión</Text>
				</Pressable>
			</View>
		</SafeAreaView>
	);
}

const styles = StyleSheet.create({
	safeArea: {
		flex: 1,
		backgroundColor: Colors.lightGray,
	},
	container: {
		flex: 1,
		padding: Spacing.lg,
		justifyContent: 'center',
		alignItems: 'center',
		gap: Spacing.md,
	},
	title: {
		fontSize: 24,
		fontWeight: '700',
		color: Colors.ecoGreen,
		textAlign: 'center',
	},
	subtitle: {
		fontSize: 16,
		color: Colors.gray,
		textAlign: 'center',
	},
	logoutButton: {
		marginTop: Spacing.lg,
		backgroundColor: '#DC2626',
		paddingHorizontal: Spacing.lg,
		paddingVertical: Spacing.md,
		borderRadius: 10,
	},
	logoutText: {
		color: '#fff',
		fontWeight: '600',
		fontSize: 16,
	},
});
