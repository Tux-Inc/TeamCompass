import React, {useState, useEffect, useRef} from "react";
import {Animated, Easing, StyleSheet, Text, TouchableOpacity, useColorScheme} from "react-native";
import Colors from "../constants/Colors";
import { View } from "./Themed";
import {IStatusMessage} from "../types/StatusMessage";
import {Ionicons} from "@expo/vector-icons";

interface StatusMessageProps {
    statusMessage: IStatusMessage;
    callback?: () => void;
    buttonText?: string;
}

/**
 * The `StatusMessage` component is a TypeScript React component that displays a status message with an
 * icon, text, and an optional button.
 * @param {StatusMessageProps}  - - `statusMessage`: An object that contains the message and type of
 * the status message.
 * @returns a React component that renders a status message with an icon, text, and an optional button.
 */
export default function StatusMessage({ statusMessage, callback, buttonText }: StatusMessageProps) {
    type IoniconsName = React.ComponentProps<typeof Ionicons>['name'];
    const colorScheme = useColorScheme() ?? "light";
    const makeStyle = styles(Colors[colorScheme], statusMessage.type);

    const [icon, setIcon] = useState<IoniconsName>('information-circle');

    const iconMap: any = {
        "info": 'information-circle',
        "success": 'checkmark-circle',
        "warning": 'alert-circle',
        "error": 'close-circle',
    };

    useEffect(() => {
        if (iconMap[statusMessage.type])
            setIcon(iconMap[statusMessage.type]);
        else
            setIcon(iconMap['info']);
    });

    return (
        <View style={makeStyle.statusMessageContainer}>
            <Ionicons name={icon} size={32} color={Colors[colorScheme][statusMessage.type]} />
            <Text style={makeStyle.statusMessageText}>{statusMessage.message}</Text>
            {callback && buttonText &&
                <TouchableOpacity style={makeStyle.button} onPress={callback}>
                    <Text style={makeStyle.buttonText}>{buttonText}</Text>
                </TouchableOpacity>
            }
        </View>
    );
}

const styles = (color: any, type: string) =>
    StyleSheet.create({
        statusMessageContainer: {
            flex: 1,
            display: "flex",
            flexDirection: "column",
            gap: 5,
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "transparent",
            width: "100%",
            height: "100%",
        },
        statusMessageText: {
            color: color[type],
            fontSize: 16,
            fontWeight: "bold",
            textAlign: "center",
        },
        button: {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            paddingVertical: 15,
            paddingHorizontal: 25,
            backgroundColor: color[type],
            borderRadius: 10,
            marginTop: 20,
        },
        buttonText: {
            color: color.tintLight,
            fontWeight: 'bold',
            textTransform: 'uppercase',
        }
    });
