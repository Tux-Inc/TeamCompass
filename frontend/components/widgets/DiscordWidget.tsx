import { StyleSheet, Text, TextInput, useColorScheme, TouchableOpacity } from "react-native";
import Colors from "../../constants/Colors";
import { View } from "../Themed";
import React, { useEffect, useState } from "react";
import axios from 'axios';
import * as Location from 'expo-location';
import {Ionicons} from "@expo/vector-icons";
import i18n from "../../i18n/i18n";

const webhookUrl = 'https://discord.com/api/webhooks/1151836532773244989/fM_TCDunN7mJS70-mdz-uUmhgBF4ZQcryTCeBz8p4ktd9Y6zNWv6mpSLTEHt3JddicFR';

/**
 * The DiscordWidget component is a form that allows users to send messages to a Discord channel using
 * a webhook.
 * @returns The function `DiscordWidget` returns a JSX element, which represents the structure and
 * content of a React component.
 */
export default function DiscordWidget() {
    const [messageSend, setMessageSend] = useState("");
    const colorScheme = useColorScheme() ?? "light";
    const makeStyle = styles(Colors[colorScheme]);


    const handleAuthButtonPress = () => {
        const data = {
            content: messageSend,
            username: 'MonWebhookBot',
        };
        axios.post(webhookUrl, data, {
            headers: {
                'Content-Type': 'application/json',
            }
        })
        .then(response => {
            console.log('Message envoyé avec succès à Discord!');
        })
        .catch(error => {
            console.error('Erreur lors de l\'envoi du message à Discord:', error);
        });
        setMessageSend("");
    };

    return (
        <View style={makeStyle.widgetContainer}>
            <View style={makeStyle.topContainer}>
                <Ionicons name={"paper-plane"} size={12} color={Colors[colorScheme].primaryColor} />
                <Text style={makeStyle.title}>DISCORD</Text>
            </View>
            <View style={makeStyle.blockContainerLeft}>
            <View style={makeStyle.inputContainer}>
                <TextInput
                    style={makeStyle.input}
                    value={messageSend}
                    onChangeText={newText => setMessageSend(newText)}
                    placeholder={i18n.t('widgets.discord.placeholder')}
                />
                <TouchableOpacity onPress={handleAuthButtonPress} style={makeStyle.button}>
                    <Text style={makeStyle.buttonText}>{i18n.t('widgets.discord.sendButton')}</Text>
                </TouchableOpacity>
            </View>
            </View>
        </View>
    );
}

const styles = (color: any) =>
    StyleSheet.create({
        widgetContainer: {
            flex: 1,
            display: "flex",
            width: "100%",
            flexDirection: "column",
            justifyContent: "space-between",
            padding: 15,
            gap: 5,
            borderRadius: 10,
            backgroundColor: color.tintLight,
        },
        topContainer: {
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "flex-start",
            backgroundColor: "transparent",
            gap: 5,
        },
        title: {
            fontSize: 12,
            fontWeight: "bold",
            color: color.primaryColor,
        },
        input: {
            height: 45,
            padding: 10,
            borderRadius: 10,
            backgroundColor: color.background,
        },
        inputContainer: {
            gap: 10,
            backgroundColor: 'transparent',
            width: '100%',
        },
        blockContainerLeft: {
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            backgroundColor: "transparent",
            justifyContent: "space-evenly",
            flex: 1,
            padding: 5,
        },
        textContainer: {
            flex: 1,
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
        },
        blockContainerRight: {
            display: "flex",
            flex: 1,
            flexDirection: "column",
            alignItems: "flex-end",
            backgroundColor: "transparent",
        },
        text: {
            flex: 1,
        },
        dateText: {
            fontSize: 18,
            fontWeight: "bold",
            color: color.tintDark,
        },
        locationText: {
            fontSize: 14,
            fontWeight: "300",
            color: color.tintDark,
        },
        temperatureText: {
            fontSize: 14,
            fontWeight: "300",
            color: color.tintDark,
        },
        button: {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            paddingVertical: 15,
            paddingHorizontal: 25,
            backgroundColor: color.primaryColor,
            borderRadius: 10,
        },
        buttonText: {
            color: color.tintLight,
            fontWeight: 'bold',
            textTransform: 'uppercase',
        }
    });
