import React from "react";
import {Image, StyleSheet, TouchableOpacity, useColorScheme} from "react-native";
import Colors from "../../constants/Colors";
import {Text, View} from "../Themed";
import {Link} from "@react-navigation/native";
import {router, useLocalSearchParams} from "expo-router";
import UserAvatar from "../UserAvatar";
import {Ionicons} from "@expo/vector-icons";
import i18n from "../../i18n/i18n";

interface ChatConversationPreviewProps {
    title: string;
    image: string;
    lastMessage: string;
    lastMessageDate: Date;
    path: number;
}

/**
 * This is a TypeScript React component that renders a preview of a chat conversation with a title,
 * image, last message, last message date, and a path to redirect to when clicked.
 * @param {ChatConversationPreviewProps}  - - `title`: The title of the chat conversation.
 * @returns a React component that renders a chat conversation preview.
 */
export default function ChatConversationPreview({title, image, lastMessage, lastMessageDate, path}: ChatConversationPreviewProps) {
    const colorScheme = useColorScheme() ?? "light";
    const makeStyle = styles(Colors[colorScheme]);

    const currentDate = new Date();
    const isToday =
        lastMessageDate.getDate() === currentDate.getDate() &&
        lastMessageDate.getMonth() === currentDate.getMonth() &&
        lastMessageDate.getFullYear() === currentDate.getFullYear();

    const redirectToPath = () => {
        router.push(`/chat/${path.toString()}`);
    };

    const formattedLastMessageDate = isToday
        ? Intl.DateTimeFormat(i18n.locale, {
            hour: "numeric",
            minute: "numeric",
        }).format(lastMessageDate)
        : Intl.DateTimeFormat(i18n.locale, {
            day: "numeric",
            month: "numeric",
            year: "numeric",
        }).format(lastMessageDate);

    return (
        <TouchableOpacity style={makeStyle.chatConversationPreviewContainer} onPress={redirectToPath}>
            <View style={makeStyle.rightContainer}>
                <Image source={{uri: image}} style={makeStyle.image}/>
                <View style={makeStyle.conversationInfosContainer}>
                    <Text style={makeStyle.conversationName}>{title}</Text>
                    <Text style={makeStyle.conversationPreview}>{lastMessage}</Text>
                </View>
            </View>
            <View style={makeStyle.endContainer}>
                <Text style={makeStyle.conversationPreview}>{formattedLastMessageDate}</Text>
                <Ionicons name={"chevron-forward-outline"} size={24} color={Colors[colorScheme].tint}/>
            </View>
        </TouchableOpacity>
    );
}

const styles = (color: any) =>
    StyleSheet.create({
        chatConversationPreviewContainer: {
            backgroundColor: "transparent",
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            width: "100%",
            borderBottomWidth: 1,
            borderBottomColor: color.tintLight,
            paddingBottom: 15,
        },
        rightContainer: {
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            gap: 10,
        },
        conversationInfosContainer: {
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
        },
        conversationName: {
            fontSize: 16,
            fontWeight: "bold",
            color: color.primaryColor,
        },
        conversationPreview: {
            fontSize: 14,
            color: "gray",
        },
        image: {
            width: 50,
            height: 50,
            borderRadius: 50,
        },
        endContainer: {
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            gap: 10,
        },
    });
