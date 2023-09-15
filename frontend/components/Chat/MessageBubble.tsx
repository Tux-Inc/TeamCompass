import {StyleSheet, Text, TouchableOpacity, useColorScheme, View} from "react-native";
import Colors from "../../constants/Colors";
import { Ionicons } from "@expo/vector-icons";
import {useAuth} from "../../context/AuthProvider";
import UserAvatar from "../UserAvatar";

interface MessageBubbleProps {
    message: string;
    status: number;
    userId: string;
}


/* The `export default function MessageBubble({ message, status, userId }: MessageBubbleProps)` is a
React component that represents a message bubble in a chat interface. */
export default function MessageBubble({ message, status, userId }: MessageBubbleProps) {
    const colorScheme = useColorScheme() ?? "light";
    const makeStyle = styles(Colors[colorScheme]);

    const me = useAuth().user;
    const isMe: boolean = me?.id.toString() === userId.toString();

    const statusIconMap: any = {
        // Sending
        0: 'md-sync',
        // Sent
        1: 'checkmark',
        // Received
        2: 'checkmark-done',
        // Modified
        3: 'pencil',
        // Deleted
        4: 'trash',
    };

    return (
        <View style={makeStyle.messageBubbleContainer}>
            <View style={[makeStyle.rowContainer, isMe ? makeStyle.rowContainerSent : makeStyle.rowContainerReceived]}>
                {!isMe && <UserAvatar userId={userId} size={32} />}
            <TouchableOpacity
                style={[
                    makeStyle.bubbleMain,
                    isMe ? makeStyle.bubbleSent : makeStyle.bubbleReceived,
                ]}
            >
                <View style={isMe ? makeStyle.tailSent : makeStyle.tailReceived} />
                <Text
                    style={[
                        makeStyle.content,
                        isMe ? makeStyle.contentSent : makeStyle.contentReceived,
                    ]}
                >
                    {message}
                </Text>
                <Ionicons
                    name={statusIconMap[status]}
                    size={12}
                    color={Colors[colorScheme].tint}
                    style={{ alignSelf: 'flex-end' }}
                />
            </TouchableOpacity>
            {isMe && <UserAvatar userId={userId} size={32} />}
        </View>
        </View>
    );
}

const styles = (color: any) =>
    StyleSheet.create({
        messageBubbleContainer: {
            backgroundColor: "transparent",
            width: '100%',
        },
        rowContainer: {
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'flex-end',
            justifyContent: 'flex-start',
            maxWidth: '80%',
        },
        rowContainerSent: {
            alignSelf: 'flex-end',
        },
        rowContainerReceived: {
            alignSelf: 'flex-start',
        },
        bubbleMain: {
            padding: 10,
            borderRadius: 20,
            maxWidth: '80%',
            position: 'relative', // Add relative positioning
        },
        bubbleSent: {
            backgroundColor: color.primaryColor,
            marginRight: 10,
        },
        bubbleReceived: {
            backgroundColor: color.tintLight,
            marginLeft: 10,
        },
        content: {
            fontSize: 14,
        },
        contentSent: {
            color: color.tintLight,
        },
        contentReceived: {
            color: color.tintDark,
        },
        tailSent: {
            position: 'absolute',
            bottom: 2,
            right: -5, // Adjust the position of the tail
            width: 0,
            height: 0,
            borderLeftWidth: 20, // Width of the tail
            borderBottomWidth: 20, // Height of the tail
            borderLeftColor: 'transparent',
            borderBottomColor: color.primaryColor, // Match the bubble color
            transform: [{ rotate: '90deg' }], // Rotate the tail
        },
        tailReceived: {
            position: 'absolute',
            bottom: 2,
            left: -5, // Adjust the position of the tail
            width: 0,
            height: 0,
            borderRightWidth: 20, // Width of the tail
            borderBottomWidth: 20, // Height of the tail
            borderRightColor: 'transparent',
            borderBottomColor: color.tintLight, // Match the bubble color
            transform: [{ rotate: '-90deg' }], // Rotate the tail
        }
    });
