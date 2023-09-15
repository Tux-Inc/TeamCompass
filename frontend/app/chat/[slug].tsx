import React, {useEffect, useRef, useState} from 'react';
import {
    ScrollView,
    StyleSheet,
    TextInput,
    TouchableOpacity,
    useColorScheme,
    KeyboardAvoidingView,
    Platform,
} from 'react-native';
import {View} from '../../components/Themed';
import Colors from '../../constants/Colors';
import {Ionicons} from '@expo/vector-icons';
import MessageBubble from '../../components/Chat/MessageBubble';
import {getConversation} from '../../hooks/useChat';
import {useLocalSearchParams, useNavigation} from 'expo-router';
import {Chat} from '../../types/Chat';
import Loader from '../../components/Loader';
import {io} from 'socket.io-client';
import {useAuth} from '../../context/AuthProvider';

export default function ConversationView() {
    const colorScheme = useColorScheme() ?? 'light';
    const makeStyle = styles(Colors[colorScheme]);
    const navigation = useNavigation()  ;

    const {slug} = useLocalSearchParams<{ slug: string }>();

    const me = useAuth().user;

    const [userMessage, setUserMessage] = useState<string>('');
    const [messages, setMessages] = useState<Chat[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [isInputFocused, setIsInputFocused] = useState<boolean>(false);
    const [sendMessage, setSendMessage] = useState<(message: string) => void>(() => () => {
    });

    const scrollViewRef = useRef<ScrollView>(null);

    const {accessToken} = useAuth();

    useEffect(() => {
        const socket = io(process.env.EXPO_PUBLIC_TC_API_URL as string, {
            extraHeaders: {
                "authorization": accessToken === null ? '' : accessToken,
            },
        });

        const fetchMessages = async () => {
            try {
                const conversation = await getConversation(slug);
                setMessages(conversation.chats);
                setIsLoading(false);
                navigation.setOptions({
                    headerTitle: conversation.title,
                });
            } catch (error) {
                // Handle error
                console.error('Error fetching messages:', error);
            }
        };

        fetchMessages();

        socket.on('connect', () => {
            console.log('Connected to socket');
        });

        socket.on('recvMessage', (message: Chat) => {
            setMessages((prevMessages) => [...prevMessages, message]);
        });

        function send(msg: string, conversationId: string) {
            socket.emit('newMessage', {
                message: msg,
                conversation_id: conversationId,
            });
        }

        setSendMessage(() => (msg: string) => send(msg, slug));

        return () => {
            socket.disconnect();
            socket.off('connect');
            socket.off('recvMessage');
        };
    }, [accessToken, slug]);

    const handleSendMessage = () => {
        if (userMessage.length > 0) {
            sendMessage(userMessage);
            setUserMessage('');
        }
    };

    return (
        <KeyboardAvoidingView
            style={{flex: 1}}
            behavior={Platform.OS === 'ios' ? 'padding' : undefined}
            keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : -500}
        >
            <View style={makeStyle.container}>
                {isLoading ? (
                    <View style={makeStyle.loadingContainer}>
                        <Loader loader={'default'} width={100} height={100}/>
                    </View>
                ) : (
                    <ScrollView
                        style={{flex: 1}}
                        contentContainerStyle={makeStyle.messagesScrollView}
                        showsVerticalScrollIndicator={true}
                        ref={scrollViewRef}
                        onContentSizeChange={() => {
                            if (scrollViewRef.current) {
                                scrollViewRef.current.scrollToEnd({animated: true});
                            }
                        }}
                    >
                        {messages.map((message: Chat, index: number) => (
                            <MessageBubble
                                message={message.message}
                                status={message.status}
                                userId={message.user.distant_id.toString()}
                                key={index}
                            />
                        ))}
                    </ScrollView>
                )}
                <View style={[makeStyle.userControlsContainer, isInputFocused ? {paddingBottom: 10} : {paddingBottom: 40}]}>
                    <TextInput
                        style={makeStyle.input}
                        placeholder={'Message...'}
                        onChangeText={setUserMessage}
                        value={userMessage}
                        autoFocus={true}
                        onFocus={() => {
                            setIsInputFocused(true);
                            setTimeout(() => {
                                    if (scrollViewRef.current) {
                                        scrollViewRef.current.scrollToEnd({animated: true});
                                    }
                            }, 100);
                        }}
                        onBlur={() => setIsInputFocused(false)}
                    />
                    <TouchableOpacity
                        onPress={handleSendMessage}
                        disabled={userMessage.length === 0}
                    >
                        <Ionicons
                            name={'send'}
                            size={24}
                            color={Colors[colorScheme].tint}
                        />
                    </TouchableOpacity>
                </View>
            </View>
        </KeyboardAvoidingView>
    );
}

const styles = (color: any) =>
    StyleSheet.create({
        container: {
            height: '100%',
            flex: 1,
            backgroundColor: color.background,
        },
        messagesScrollView: {
            paddingTop: 80,
            paddingHorizontal: 20,
            paddingBottom: 150,
            marginTop: 20,
            marginBottom: 20,
            gap: 10,
        },
        userControlsContainer: {
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            position: 'absolute',
            gap: 10,
            bottom: 0,
            left: 0,
            right: 0,
            backgroundColor: color.tintLight,
            paddingHorizontal: 20,
            paddingTop: 10,
        },
        input: {
            flex: 1,
            height: 45,
            padding: 10,
            borderRadius: 10,
            backgroundColor: color.background,
            color: color.tint,
        },
        loadingContainer: {
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
        },
    });
