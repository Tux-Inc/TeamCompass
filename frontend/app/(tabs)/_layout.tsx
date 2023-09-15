import { Ionicons } from "@expo/vector-icons";
import { Link, Tabs } from 'expo-router';
import { Pressable, useColorScheme } from 'react-native';

import Colors from '../../constants/Colors';
import React from "react";
import i18n from "../../i18n/i18n";

function TabBarIcon(props: {
    name: React.ComponentProps<typeof Ionicons>['name'];
    color: string;
}) {
    return <Ionicons size={28} style={{ marginBottom: -3 }} {...props} />;
}

export default function TabLayout() {
    const colorScheme = useColorScheme() ?? 'light';

    return (
        <Tabs
            screenOptions={{
                tabBarActiveTintColor: Colors[colorScheme].tabIconSelected,
            }}
        >
            <Tabs.Screen
                name="index"
                options={{
                    title: i18n.t('layout.home'),
                    headerShown: false,
                    tabBarIcon: ({ color }) => <TabBarIcon name="home-outline" color={color} />,
                }}
            />
            <Tabs.Screen
                name="news"
                options={{
                    title: i18n.t('layout.news'),
                    headerShown: false,
                    tabBarIcon: ({ color }) => <TabBarIcon name="ios-earth" color={color} />,
                }}
            />
            <Tabs.Screen
                name="chat"
                options={{
                    title: i18n.t('layout.chat'),
                    headerShown: false,
                    tabBarIcon: ({ color }) => <TabBarIcon name="md-chatbubble-outline" color={color} />
                }}
            />
            <Tabs.Screen
                name="profile"
                options={{
                    title: i18n.t('layout.profile'),
                    tabBarIcon: ({ color }) => <TabBarIcon name="person-circle-outline" color={color} />,
                    headerRight: () => (
                        <Link href="/modal" asChild>
                            <Pressable
                                style={({ pressed }) => ({
                                    opacity: pressed ? 0.5 : 1,
                                })}
                            >
                                <Ionicons
                                    name="settings-outline"
                                    size={25}
                                    color={Colors[colorScheme].text}
                                    style={{ marginRight: 15 }}
                                />
                            </Pressable>
                        </Link>
                    ),
                }}
            />
        </Tabs>
    );
}
