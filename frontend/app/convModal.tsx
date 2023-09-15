import React, {useEffect, useState} from 'react';
import {
    Platform,
    StyleSheet,
    useColorScheme,
    TextInput,
} from 'react-native';
import {Text, View} from '../components/Themed';
import Colors from "../constants/Colors";
import {StatusBar} from "expo-status-bar";
import i18n from "../i18n/i18n";
import {IUser} from "../types/User";
import {getEmployees} from "../hooks/useEmployees";
import UserCard from "../components/UserCard";
import {createConversation} from "../hooks/useChat";
import {IConversation} from "../types/Conversation";
import {router} from "expo-router";

export default function convModal() {
    const colorScheme = useColorScheme() ?? "light";
    const makeStyle = styles(Colors[colorScheme]);

    const [users, setUsers] = useState<IUser[]>([]);
    const [filteredUsers, setFilteredUsers] = useState<IUser[]>([]);

    const [searchQuery, setSearchQuery] = useState('');

    const startNewConversation = async (userId: string) => {
        const response: IConversation = await createConversation(userId);
        router.push(`/chat/${response.id}`);
    }

    const fetchUsers = async () => {
        try {
            const fetchedUsers: IUser[] = await getEmployees();
            setUsers(fetchedUsers);
            setFilteredUsers(fetchedUsers); // Initialize filteredUsers with all users
        } catch (e) {
            console.error(e);
        }
    }

    const handleSearch = (text: string) => {
        const filtered = users.filter((user) => {
            const fullName = `${user.name} ${user.surname}`.toLowerCase();
            return fullName.includes(text.toLowerCase());
        });
        setFilteredUsers(filtered);
        setSearchQuery(text);
    };

    useEffect(() => {
        fetchUsers();
    }, []); // Run the fetchUsers function only once when the component mounts.

    return (
        <View style={makeStyle.container}>
            <View style={makeStyle.pageHeader}>
                <Text style={makeStyle.label}>{i18n.t('convModal.searchEmployee')}</Text>
                <TextInput
                    style={makeStyle.input}
                    placeholder={i18n.t('convModal.search')}
                    value={searchQuery}
                    onChangeText={handleSearch}
                    autoFocus={true}
                />
            </View>
            <View style={makeStyle.gridContainer}>
                {searchQuery.length > 1 && (
                    filteredUsers.map((user) => (
                        <UserCard title={user.name} subtitle={user.surname} callback={() => startNewConversation(user.id)} userId={user.id} key={user.id}/>
                    ))
                )}
            </View>
            <StatusBar style={Platform.OS === 'ios' ? 'light' : 'auto'}/>
        </View>
    );
}

const styles = (color: any) => StyleSheet.create({
    container: {
        height: '100%',
        display: 'flex',
        paddingTop: 20,
        paddingHorizontal: 20,
    },
    pageHeader: {
        display: 'flex',
        flexDirection: 'column', // Place children in a column layout
        alignItems: 'flex-start', // Center align the children horizontally
        marginBottom: 20,
        gap: 5,
    },
    label: {
        fontSize: 14,
        textTransform: 'uppercase',
        color: color.tint,
        fontWeight: 'bold',
        marginBottom: 5,
    },
    title: {
        fontSize: 32,
        fontWeight: 'bold',
        color: color.primaryColor,
    },
    input: {
        width: '100%',
        height: 45,
        padding: 10,
        borderRadius: 10,
        backgroundColor: color.tintLight,
        color: color.tint,
    },
    searchInput: {
        width: '100%', // Take up the full width
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        borderRadius: 5,
        paddingHorizontal: 10,
        fontSize: 16,
        marginTop: 10, // Add margin to separate it from the title
    },
    gridContainer: {
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        width: '100%',
    },
    separator: {
        marginVertical: 30,
        height: 1,
        width: '80%',
    },
});
