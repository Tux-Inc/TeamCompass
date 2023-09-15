import React, {useEffect, useState} from 'react';
import {
    StyleSheet,
    TextInput,
    useColorScheme,
    View,
    ScrollView,
} from 'react-native';
import {Text} from '../../components/Themed';
import Colors from '../../constants/Colors';
import {Link, router} from 'expo-router';
import {Ionicons} from '@expo/vector-icons';
import {IUser} from '../../types/User';
import UserCard from '../../components/UserCard';
import {getEmployees} from "../../hooks/useEmployees";
import Loader from "../../components/Loader";
import i18n from "../../i18n/i18n";

export default function EmployeesScreen() {
    const colorScheme = useColorScheme() ?? 'light';
    const makeStyle = styles(Colors[colorScheme]);

    const [users, setUsers] = useState<IUser[]>([]);
    const [searchInput, setSearchInput] = useState('');
    const [filteredUsers, setFilteredUsers] = useState<IUser[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    const redirectToProfile = (userId: string) => {
        const path = `employees/${userId}`;
        router.push(`/${path}`);
    };

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const fetchedUsers: IUser[] = await getEmployees();
                setUsers(fetchedUsers);
                setFilteredUsers(fetchedUsers); // Initialize filteredUsers with all users
                setIsLoading(false);
            } catch (e) {
                console.error(e);
            }
        };
        fetchUsers();
    }, []); // Run the fetchUsers function only once when the component mounts.

    const handleSearch = (text: string) => {
        const filtered = users.filter((user) => {
            const fullName = `${user.name} ${user.surname}`.toLowerCase();
            return fullName.includes(text.toLowerCase());
        });
        setFilteredUsers(filtered);
        setSearchInput(text);
    };

    return (
        <View style={makeStyle.container}>
            <View>
                <View style={makeStyle.pageHeader}>
                    <Link href={'/'}>
                        <Ionicons name={'arrow-back'} style={makeStyle.backArrow}/>
                    </Link>
                    <Text style={makeStyle.title}>{i18n.t('employees.title')}</Text>
                </View>
                <View style={makeStyle.searchBar}>
                    <Ionicons name="search" style={makeStyle.searchIcon}/>
                    <TextInput style={makeStyle.searchInput} placeholder={i18n.t('employees.search')} onChangeText={handleSearch} value={searchInput}/>
                </View>
            </View>
            {isLoading ? (
                <View style={makeStyle.loadingContainer}>
                    <Loader loader={"default"} width={100} height={100} />
                </View>
            ) : (
            <ScrollView contentContainerStyle={makeStyle.gridContainer} showsVerticalScrollIndicator={false}>
                {filteredUsers.map((user, index) => (
                    <UserCard
                        key={index}
                        title={user.name}
                        subtitle={user.surname}
                        callback={() => redirectToProfile(user.id)}
                        userId={user.id}
                    />
                ))}
            </ScrollView>
            )}
        </View>
    );
}

const styles = (color: any) =>
    StyleSheet.create({
        container: {
            flex: 1,
            paddingTop: 80,
            paddingHorizontal: 20,
            backgroundColor: color.background,
        },
        pageHeader: {
            flexDirection: 'row',
            alignItems: 'center',
            marginBottom: 20,
            gap: 10,
        },
        title: {
            fontSize: 32,
            fontWeight: 'bold',
            color: color.primaryColor,
        },
        backArrow: {
            fontSize: 32,
            fontWeight: 'bold',
            color: color.primaryColor,
        },
        searchBar: {
            flexDirection: 'row',
            alignItems: 'center',
            backgroundColor: color.tintLight,
            borderRadius: 10,
            paddingHorizontal: 10,
        },
        searchIcon: {
            fontSize: 12,
            color: color.tint,
            marginRight: 10,
        },
        searchInput: {
            flex: 1,
            height: 45,
            paddingVertical: 10,
            color: color.tint,
        },
        gridContainer: {
            flexDirection: 'row',
            flexWrap: 'wrap',
            justifyContent: 'space-between',
            marginTop: 20,
        },
        loadingIndicator: {
            alignItems: 'center',
            paddingVertical: 20,
        },
        loadingContainer: {
            width: '100%',
            height: '100%',
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
        },
    });
