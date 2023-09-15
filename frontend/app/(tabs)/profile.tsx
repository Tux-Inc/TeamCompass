import React from "react";
import { ScrollView, StyleSheet, TouchableOpacity, useColorScheme } from 'react-native';
import { Text, View } from '../../components/Themed';
import { useAuth } from "../../context/AuthProvider";
import Colors from "../../constants/Colors";
import UserAvatar from "../../components/UserAvatar";
import i18n from "../../i18n/i18n";

export default function ProfileScreen() {
    const colorScheme = useColorScheme() || "light";
    const makeStyle = styles(Colors[colorScheme]);

    const { logout, user } = useAuth();

    return (
        <ScrollView style={makeStyle.container} contentContainerStyle={makeStyle.scrollView}>
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
                <TouchableOpacity style={makeStyle.logoutButton} onPress={logout}>
                    <Text style={makeStyle.logoutButtonText}>{i18n.t('profile.signOut')}</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    );
}

const styles = (color: any) => StyleSheet.create({
    container: {
        flex: 1,
        display: 'flex',
        backgroundColor: color.background,
    },
    scrollView: {
        paddingHorizontal: 20,
    },
    label: {
        fontSize: 14,
        textTransform: 'uppercase',
        fontWeight: 'bold',
        marginBottom: 5,
        color: color.tint, // Apply color based on the color scheme
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
    containerUserHeader: {
        marginTop: 80,
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
    containerUserActions: {
        marginTop: 30,
        width: '100%',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'flex-end',
    },
    logoutButton: {
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 15,
        paddingHorizontal: 25,
        backgroundColor: "red",
        borderRadius: 10,
    },
    logoutButtonText: {
        color: color.tintDark,
        fontWeight: 'bold',
        textTransform: 'uppercase',
    },
});
