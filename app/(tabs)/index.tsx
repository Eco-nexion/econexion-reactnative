import { Colors, Spacing } from '@constants';
import { StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function HomeTab() {
	return (
		<SafeAreaView style={styles.safeArea} edges={['bottom']}>
			<View style={styles.container}>
				<Text style={styles.title}>Bienvenido a Econexion</Text>
				<Text style={styles.subtitle}>Tu espacio para iniciativas ecológicas</Text>
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
});
