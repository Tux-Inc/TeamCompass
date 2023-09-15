import React, {useEffect, useState} from 'react';
import {
    StyleSheet,
    useColorScheme,
    View,
    Text,
    Pressable,
    ScrollView, RefreshControl,
} from 'react-native';
import {Ionicons} from '@expo/vector-icons';
import Colors from '../../constants/Colors';
import {Link} from 'expo-router';
import ChatConversationPreview from '../../components/Chat/ChatConversationPreview';
import {getConversations} from '../../hooks/useChat';
import {IConversation} from '../../types/Conversation';
import Loader from '../../components/Loader';
import i18n from '../../i18n/i18n';
import StatusMessage from '../../components/StatusMessage';

export default function ChatScreen() {
    const colorScheme = useColorScheme() ?? 'light';
    const makeStyle = styles(Colors[colorScheme]);

    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [isError, setIsError] = useState<boolean>(false);
    const [errorMessage, setErrorMessage] = useState<string>('');
    const [isRefreshing, setIsRefreshing] = useState<boolean>(false);

    const [conversations, setConversations] = useState([] as IConversation[]);

    const fetchConversations = async () => {
        try {
            const fetchedConversations = await getConversations();
            if (fetchedConversations.length === 0) {
                setIsLoading(false);
                return;
            }
            fetchedConversations.sort((a, b) => {
                if (a.chats.length === 0) return 1;
                if (b.chats.length === 0) return -1;
                return (
                    new Date(b.chats[0].updated_at).getTime() -
                    new Date(a.chats[0].updated_at).getTime()
                );
            });
            setConversations(fetchedConversations);
            setIsLoading(false);
            setIsError(false);
            return;
        } catch (e) {
            setIsLoading(false);
            setErrorMessage(i18n.t('errors.default'));
            setIsError(true);
            console.error(e);
        }
    };

    const handleRefresh = async () => {
        setIsRefreshing(true); // Set refreshing state to true
        await fetchConversations(); // Fetch new data
        setIsRefreshing(false); // Set refreshing state back to false
    };

    useEffect(() => {
        fetchConversations();
    }, []);

    return (
        <View style={makeStyle.container}>
            <View style={makeStyle.header}>
                <View style={makeStyle.headerContent}>
                    <Text style={makeStyle.title}>{i18n.t('layout.chat')}</Text>
                    <Link href="/convModal" asChild>
                        <Pressable disabled={isError}>
                            <Ionicons
                                name="create-outline"
                                size={32}
                                color={Colors[colorScheme].primaryColor}
                            />
                        </Pressable>
                    </Link>
                </View>
            </View>

            {isLoading ? (
                <View style={makeStyle.loadingContainer}>
                    <Loader loader="default" width={100} height={100}/>
                </View>
            ) : isError ? (
                <StatusMessage
                    statusMessage={{type: 'error', message: errorMessage}}
                    buttonText={i18n.t('errors.retryButton')}
                    callback={fetchConversations}
                />
            ) : (
                <View style={{marginTop: 20}}>
                    <ScrollView contentContainerStyle={makeStyle.conversationLayout} refreshControl={
                        <RefreshControl
                            refreshing={isRefreshing}
                            onRefresh={handleRefresh}
                        />
                    }>
                        {conversations.map((conversation) => (
                            <ChatConversationPreview
                                title={conversation.title}
                                image={'https://i.imgur.com/0y8Ftya.png'}
                                lastMessage={conversation.chats.length === 0 ? '' : conversation.chats[0].message}
                                lastMessageDate={conversation.chats.length === 0 ? conversation.updated_at : conversation.chats[0].updated_at}
                                path={conversation.id}
                                key={conversation.id}
                            />
                        ))}
                    </ScrollView>
                </View>
            )}
        </View>
    );
}
const styles = (color: any) =>
    StyleSheet.create({
        container: {
            flex: 1,
            alignItems: 'flex-start',
            justifyContent: 'flex-start',
            paddingTop: 80,
            paddingHorizontal: 20,
            backgroundColor: color.background,
            width: '100%',
        },
        header: {
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
        },
        headerContent: {
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            flex: 1,
        },
        title: {
            fontSize: 32,
            fontWeight: 'bold',
            color: color.primaryColor,
        },
        conversationButton: {
            flexDirection: 'row',
            alignItems: 'center',
            marginTop: 20,
        },
        selectedConversationButton: {
            backgroundColor: color.primaryColor,
            borderColor: color.primaryColor,
        },
        profileImage: {
            width: 50,
            height: 50,
            borderRadius: 25,
            marginRight: 10,
        },
        conversationInfo: {
            flex: 1,
            flexDirection: 'column',
            justifyContent: 'flex-start',
        },
        conversationName: {
            fontSize: 16,
            fontWeight: 'bold',
            color: color.primaryColor,
        },
        conversationPreview: {
            fontSize: 14,
            color: 'gray',
        },
        conversationLayout: {
            flexDirection: 'column',
            alignItems: 'flex-start',
            justifyContent: 'flex-start',
            width: '100%',
            gap: 15,
        },
        loadingContainer: {
            width: '100%',
            height: '100%',
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
        },
    });
