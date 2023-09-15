import React from "react";
import {Animated, KeyboardAvoidingView, Platform, StyleSheet, useColorScheme} from 'react-native';
import { Text, View } from '../../components/Themed';
import TrombinoscopeWidget from "../../components/widgets/TrombinoscopeWidget";
import Colors from "../../constants/Colors";
import { useAuth } from "../../context/AuthProvider";
import WeatherWidget from "../../components/widgets/WeatherWidget";
import CalendarWidget from "../../components/widgets/CalendarWidget";
import EmailWidget from "../../components/widgets/EmailWidget";
import i18n from "../../i18n/i18n";
import DiscordWidget from "../../components/widgets/DiscordWidget";
import BirthdayWidget from "../../components/widgets/BirthdayWidget";
import HourWidget from "../../components/widgets/HourWidget";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 80,
        paddingHorizontal: 20,
    },
    scrollView: {
        flex: 1,
    },
    headtitle: {
        fontSize: 12,
        fontWeight: '300',
        textTransform: 'uppercase',
        fontStyle: 'italic',
    },
    title: {
        fontSize: 32,
        fontWeight: 'bold',
    },
    widgetsContainer: {
        display: 'flex',
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center',
        gap: 10,
        marginTop: 30,
    },
});

export default function App() {
    const colorScheme = useColorScheme() || "light";
    const makeStyle = styles;

    const { user } = useAuth();

    return (
        <KeyboardAvoidingView
            style={{flex: 1}}
            behavior={Platform.OS === 'ios' ? 'padding' : undefined}
            keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : -500}
        >
        <View style={makeStyle.container}>
            <Animated.ScrollView style={makeStyle.scrollView} showsVerticalScrollIndicator={false}>
                <Text style={[makeStyle.headtitle, { color: Colors[colorScheme].tint }]}>Super company name</Text>
                <Text style={[makeStyle.title, { color: Colors[colorScheme].primaryColor }]}>
                    {i18n.t('homepage.welcome')} {user.name},
                </Text>
                <View style={makeStyle.widgetsContainer}>
                    <WeatherWidget />
                    <TrombinoscopeWidget />
                    <CalendarWidget />
                    <BirthdayWidget />
                    <EmailWidget />
                    <HourWidget />
                    <DiscordWidget />
                </View>
            </Animated.ScrollView>
        </View>
        </KeyboardAvoidingView>
    );
}
