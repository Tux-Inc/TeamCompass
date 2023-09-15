import {Image, Linking, ScrollView, StyleSheet, TouchableOpacity, useColorScheme} from 'react-native';

import {Text, View} from '../../components/Themed';
import Colors from "../../constants/Colors";
import {useEffect, useState} from "react";
import {IFullUser} from "../../types/FullUser";
import {Link, useLocalSearchParams} from "expo-router";
import {Ionicons} from "@expo/vector-icons";
import {getEmployee, getEmployeeImage} from "../../hooks/useEmployees";
import UserAvatar from "../../components/UserAvatar";
import Loader from "../../components/Loader";
import i18n from "../../i18n/i18n";

export default function EmployeeScreen() {

    const colorScheme = useColorScheme() ?? "light";
    const makeStyle = styles(Colors[colorScheme]);

    const {slug} = useLocalSearchParams<{ slug: string }>();
    const [user, setUser] = useState<IFullUser>({
        id: '0',
        name: '',
        surname: '',
        email: '',
        birth_date: '',
        work: '',
        gender: '',
        subordinates: [],
        image: '',
    } as IFullUser);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchUser = async () => {
            const user = await getEmployee(slug);
            setUser(user);
            setIsLoading(false);
        }
        fetchUser();
    });

    const sendEmail = () => {
        Linking.openURL('mailto:' + user.email);
    }


    return (
        <ScrollView style={makeStyle.container} contentContainerStyle={makeStyle.scrollView}>
            <View style={makeStyle.pageHeader}>
                <Link href={"/"}>
                    <Ionicons name={"arrow-back"} style={makeStyle.backArrow}/>
                </Link>
                <Text style={makeStyle.title}>{i18n.t('layout.profile')}</Text>
            </View>
            {/* Show loading animation if isLoading is true */}
            {isLoading ? (
                <View style={makeStyle.loadingContainer}>
                    <Loader loader={"default"} width={100} height={100}/>
                </View>
            ) : (
            <>
            <View style={makeStyle.containerUserHeader}>
                <UserAvatar userId={user.id} size={200} />
                <Text style={makeStyle.titleUser}>{user.name + " " + user.surname}</Text>
                <Text style={makeStyle.subtitleUser}>{user.email}</Text>
            </View>
            <View style={makeStyle.containerUserInfos}>
                <View>
                    <Text style={makeStyle.label}>{i18n.t('profile.lastName')}</Text>
                    <Text style={makeStyle.userInfoText}>{user.name}</Text>
                </View>
                <View>
                    <Text style={makeStyle.label}>{i18n.t('profile.firstName')}</Text>
                    <Text style={makeStyle.userInfoText}>{user.surname}</Text>
                </View>
                <View>
                    <Text style={makeStyle.label}>{i18n.t('profile.email')}</Text>
                    <Text style={makeStyle.userInfoText}>{user.email}</Text>
                </View>
                <View>
                    <Text style={makeStyle.label}>{i18n.t('profile.birthday')}</Text>
                    <Text style={makeStyle.userInfoText}>{user.birth_date}</Text>
                </View>
                <View>
                    <Text style={makeStyle.label}>{i18n.t('profile.job')}</Text>
                    <Text style={makeStyle.userInfoText}>{user.work}</Text>
                </View>
            </View>
            <View style={makeStyle.containerUserActions}>
                <TouchableOpacity style={makeStyle.chatButton}>
                    <Text style={makeStyle.chatButtonText}>{i18n.t('profile.sendMessage')}</Text>
                </TouchableOpacity>
                <TouchableOpacity style={makeStyle.emailButton} onPress={sendEmail}>
                    <Text style={makeStyle.emailButtonText}>{i18n.t('profile.sendEmail')}</Text>
                </TouchableOpacity>
            </View>
            </>
            )}
        </ScrollView>
    );
}

const styles = (color: any) => StyleSheet.create({
    container: {
        height: '100%',
        display: 'flex',
        backgroundColor: color.background,
        flex: 1,
    },
    scrollView: {
        paddingTop: 80,
        paddingHorizontal: 20,
    },
    pageHeader: {
        display: 'flex',
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
    label: {
        fontSize: 14,
        textTransform: 'uppercase',
        color: color.tint,
        fontWeight: 'bold',
        marginBottom: 5,
    },
    containerUserHeader: {
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 15,
        backgroundColor: 'transparent',
        shadowColor: color.primaryColor,
        shadowOffset: {
            width: 0,
            height: 0,
        },
        shadowOpacity: 0.5,
        shadowRadius: 90,
    },
    containerUserInfos: {
        backgroundColor: 'transparent',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
        gap: 10,
    },
    userInfoText: {
        fontSize: 14,
        fontWeight: '300',
        color: color.tint,
    },
    titleUser: {
        marginTop: 20,
        fontSize: 24,
        fontWeight: 'bold',
        color: color.tintDark,
    },
    subtitleUser: {
        fontSize: 14,
        fontWeight: '300',
        color: color.tint,
    },
    containerUserActions: {
        marginTop: 30,
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-end',
        gap: 10,
    },
    chatButton: {
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 15,
        paddingHorizontal: 25,
        backgroundColor: color.primaryColor,
        borderRadius: 10,
    },
    emailButton: {
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 15,
        paddingHorizontal: 25,
        backgroundColor: color.tintLight,
        borderRadius: 10,
    },
    chatButtonText: {
        color: color.tintLight,
        fontWeight: 'bold',
        textTransform: 'uppercase',
    },
    emailButtonText: {
        color: color.tintDark,
        fontWeight: 'bold',
        textTransform: 'uppercase',
    },
    separator: {
        marginVertical: 30,
        height: 1,
        width: '80%',
    },
    loadingContainer: {
        width: '100%',
        height: '100%',
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
});
