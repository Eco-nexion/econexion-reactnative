import { Colors, FontSize, Spacing } from '@constants';
import { useRouter } from 'expo-router';
import { useEffect, useRef, useState } from 'react';
import {
    Image,
    KeyboardAvoidingView,
    Platform,
    Pressable,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

interface Message {
    id: string;
    text: string;
    sender: 'user' | 'ai';
    timestamp: Date;
}

const MOCK_MESSAGES: Message[] = [
    {
        id: '1',
        text: 'Hola Juan Pablo 👋 Soy EcoBot, tu asistente ecológico. ¿En qué puedo ayudarte hoy?',
        sender: 'ai',
        timestamp: new Date(Date.now() - 120000),
    },
    {
        id: '2',
        text: 'Tengo un celular roto y no sé qué hacer con él. ¿Me puedes ayudar?',
        sender: 'user',
        timestamp: new Date(Date.now() - 60000),
    },
    {
        id: '3',
        text: '¡Excelente pregunta! 📱♻️ Es muy importante desechar correctamente los dispositivos electrónicos. Aquí te doy algunas opciones en tu zona:\n\n1️⃣ **Puntos de reciclaje certificados**:\n• Centro de Reciclaje TecnoVerde (Calle 85 #15-20)\n• EcoTech Bogotá (Av. El Dorado #68-55)\n\n2️⃣ **Tiendas que reciben electrónicos**:\n• Apple Store - Programa de reciclaje\n• Samsung Service Center\n\n3️⃣ **ONGs especializadas**:\n• Computadores para Educar\n• Fundación GAIA\n\n💡 **Consejo**: Antes de llevarlo, borra todos tus datos personales y retira la tarjeta SIM.\n\n¿Te gustaría que te muestre un mapa con el punto más cercano?',
        sender: 'ai',
        timestamp: new Date(Date.now() - 30000),
    },
    {
        id: '4',
        text: '¡Perfecto! Me queda cerca el Centro de Reciclaje TecnoVerde. ¿Qué horarios tienen?',
        sender: 'user',
        timestamp: new Date(Date.now() - 15000),
    },
    {
        id: '5',
        text: 'El Centro de Reciclaje TecnoVerde está abierto:\n\n🕐 Lunes a Viernes: 8:00 AM - 6:00 PM\n🕐 Sábados: 9:00 AM - 2:00 PM\n❌ Domingos: Cerrado\n\n📍 Dirección: Calle 85 #15-20, Bogotá\n📞 Teléfono: (601) 234-5678\n\n✅ Aceptan: Celulares, tablets, laptops, baterías y accesorios.\n\n¿Necesitas que te ayude con algo más?',
        sender: 'ai',
        timestamp: new Date(),
    },
];

export default function ChatScreen() {
    const router = useRouter();
    const [messages, setMessages] = useState<Message[]>(MOCK_MESSAGES);
    const [inputText, setInputText] = useState('');
    const scrollViewRef = useRef<ScrollView>(null);
    const messagesLength = messages.length;

    useEffect(() => {
        setTimeout(() => {
            scrollViewRef.current?.scrollToEnd({ animated: true });
        }, 100);
    }, [messagesLength]);

    const handleSend = () => {
        if (inputText.trim().length === 0) {
            return;
        }

        const newUserMessage: Message = {
            id: Date.now().toString(),
            text: inputText,
            sender: 'user',
            timestamp: new Date(),
        };

        setMessages((prev) => [...prev, newUserMessage]);
        setInputText('');

        // Simular respuesta del bot después de 1 segundo
        setTimeout(() => {
            const botResponse: Message = {
                id: (Date.now() + 1).toString(),
                text: '¡Gracias por tu mensaje! 🌱 Estoy aquí para ayudarte con cualquier duda sobre reciclaje y sostenibilidad.',
                sender: 'ai',
                timestamp: new Date(),
            };
            setMessages((prev) => [...prev, botResponse]);
        }, 1000);
    };

    return (
        <SafeAreaView style={styles.container} edges={['top']}>
            {/* Header */}
            <View style={styles.header}>
                <View style={styles.headerContent}>
                    <Image source={require('@assets/images/icon.png')} style={styles.avatar} resizeMode='contain' />
                    <View style={styles.headerText}>
                        <Text style={styles.headerTitle}>EcoBot IA 🤖</Text>
                        <Text style={styles.headerSubtitle}>Tu asistente ecológico</Text>
                    </View>
                </View>
                <Pressable onPress={() => router.push('/profile')} style={styles.settingsButton}>
                    <Text style={styles.settingsIcon}>⚙️</Text>
                </Pressable>
            </View>

            {/* User Info */}
            <View style={styles.userInfoBar}>
                <Text style={styles.userName}>Juan Pablo</Text>
                <Text style={styles.userEmail}>juanpablocamargo9@gmail.com</Text>
            </View>

            {/* Messages */}
            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                style={styles.chatContainer}
                keyboardVerticalOffset={90}
            >
                <ScrollView
                    ref={scrollViewRef}
                    style={styles.messagesContainer}
                    contentContainerStyle={styles.messagesContent}
                    showsVerticalScrollIndicator={false}
                >
                    {messages.map((message) => (
                        <View
                            key={message.id}
                            style={[
                                styles.messageBubble,
                                message.sender === 'user' ? styles.userBubble : styles.aiBubble,
                            ]}
                        >
                            <Text
                                style={[
                                    styles.messageText,
                                    message.sender === 'user' ? styles.userText : styles.aiText,
                                ]}
                            >
                                {message.text}
                            </Text>
                            <Text
                                style={[
                                    styles.timestamp,
                                    message.sender === 'user' ? styles.userTimestamp : styles.aiTimestamp,
                                ]}
                            >
                                {message.timestamp.toLocaleTimeString('es-CO', {
                                    hour: '2-digit',
                                    minute: '2-digit',
                                })}
                            </Text>
                        </View>
                    ))}
                </ScrollView>

                {/* Input */}
                <View style={styles.inputContainer}>
                    <TextInput
                        style={styles.input}
                        value={inputText}
                        onChangeText={setInputText}
                        placeholder='Escribe tu pregunta...'
                        placeholderTextColor={Colors.gray}
                        multiline
                        maxLength={500}
                    />
                    <Pressable
                        style={[styles.sendButton, inputText.trim().length === 0 && styles.sendButtonDisabled]}
                        onPress={handleSend}
                        disabled={inputText.trim().length === 0}
                    >
                        <Text style={styles.sendButtonText}>📤</Text>
                    </Pressable>
                </View>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F5F5F5',
    },
    header: {
        backgroundColor: Colors.ecoGreen,
        paddingHorizontal: Spacing.lg,
        paddingVertical: Spacing.md,
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    headerContent: {
        flexDirection: 'row',
        alignItems: 'center',
        flex: 1,
    },
    avatar: {
        width: 48,
        height: 48,
        borderRadius: 24,
        backgroundColor: '#fff',
        marginRight: Spacing.md,
    },
    headerText: {
        flex: 1,
    },
    headerTitle: {
        fontSize: 20,
        fontWeight: '700',
        color: '#fff',
    },
    headerSubtitle: {
        fontSize: 14,
        color: '#E0F2E9',
        marginTop: 2,
    },
    settingsButton: {
        width: 44,
        height: 44,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgba(255,255,255,0.2)',
        borderRadius: 22,
    },
    settingsIcon: {
        fontSize: 24,
    },
    userInfoBar: {
        backgroundColor: '#fff',
        paddingHorizontal: Spacing.lg,
        paddingVertical: Spacing.sm,
        borderBottomWidth: 1,
        borderBottomColor: '#E5E5E5',
    },
    userName: {
        fontSize: 14,
        fontWeight: '600',
        color: '#333',
    },
    userEmail: {
        fontSize: 12,
        color: Colors.gray,
        marginTop: 2,
    },
    chatContainer: {
        flex: 1,
    },
    messagesContainer: {
        flex: 1,
    },
    messagesContent: {
        padding: Spacing.lg,
        paddingBottom: Spacing.xl,
    },
    messageBubble: {
        maxWidth: '80%',
        paddingHorizontal: Spacing.md,
        paddingVertical: Spacing.sm,
        borderRadius: 16,
        marginBottom: Spacing.md,
    },
    userBubble: {
        alignSelf: 'flex-end',
        backgroundColor: Colors.ecoGreen,
        borderBottomRightRadius: 4,
    },
    aiBubble: {
        alignSelf: 'flex-start',
        backgroundColor: '#fff',
        borderBottomLeftRadius: 4,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.05,
        shadowRadius: 2,
        elevation: 1,
    },
    messageText: {
        fontSize: FontSize.medium,
        lineHeight: 22,
    },
    userText: {
        color: '#fff',
    },
    aiText: {
        color: '#333',
    },
    timestamp: {
        fontSize: 11,
        marginTop: 4,
    },
    userTimestamp: {
        color: 'rgba(255,255,255,0.8)',
        textAlign: 'right',
    },
    aiTimestamp: {
        color: Colors.gray,
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'flex-end',
        paddingHorizontal: Spacing.lg,
        paddingVertical: Spacing.md,
        backgroundColor: '#fff',
        borderTopWidth: 1,
        borderTopColor: '#E5E5E5',
    },
    input: {
        flex: 1,
        maxHeight: 100,
        backgroundColor: '#F5F5F5',
        borderRadius: 20,
        paddingHorizontal: Spacing.lg,
        paddingVertical: Spacing.sm,
        fontSize: FontSize.medium,
        marginRight: Spacing.sm,
    },
    sendButton: {
        width: 44,
        height: 44,
        borderRadius: 22,
        backgroundColor: Colors.ecoGreen,
        alignItems: 'center',
        justifyContent: 'center',
    },
    sendButtonDisabled: {
        backgroundColor: Colors.gray,
        opacity: 0.5,
    },
    sendButtonText: {
        fontSize: 20,
    },
});
