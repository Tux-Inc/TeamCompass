import React from "react";
import {StyleSheet, TouchableOpacity, useColorScheme} from "react-native";

import Colors from "../constants/Colors";
import { Text, View } from "./Themed";
import {router, useLocalSearchParams} from "expo-router";
import UserAvatar from "./UserAvatar";

interface UserCardProps {
    title: string;
    subtitle: string;
    callback: () => void;
    userId: string;
}

export default function UserCard({ title, subtitle, callback, userId }: UserCardProps) {
    const colorScheme = useColorScheme() ?? "light";
    const makeStyle = styles(Colors[colorScheme]);

    const { id } = useLocalSearchParams();

    return (
        <TouchableOpacity style={{ backgroundColor: "transparent" }} onPress={callback}>
                <View style={makeStyle.cardContainer}>
                    <UserAvatar userId={userId} />
                    <Text style={makeStyle.title}>{title}</Text>
                    <Text style={makeStyle.subtitle}>{subtitle}</Text>
                </View>
        </TouchableOpacity>
    );
}

const styles = (color: any) => StyleSheet.create({
    cardContainer: {
        backgroundColor: "transparent",
        alignItems: 'center',
        justifyContent: 'center',
        padding: 5,
    },
    title: {
        color: color.tint,
        fontSize: 14,
        fontWeight: 'bold',
        marginTop: 5,
    },
    subtitle: {
        color: color.tint,
        fontSize: 12,
        fontStyle: 'italic',
        fontWeight: '300',
    }
});