import {Linking, StyleSheet, TouchableOpacity, useColorScheme} from "react-native";

import Colors from "../constants/Colors";
import { Text, View } from "./Themed";
import {Link} from "@react-navigation/native";

interface EmailFeaturedProps {
    object: string;
    sender: string;
    date: Date;
    path: string;
    content: string;
}

export default function EmailFeatured({ object, sender, date, path, content }: EmailFeaturedProps) {
    const colorScheme = useColorScheme() ?? "light";
    const makeStyle = styles(Colors[colorScheme]);

    const sendEmail = () => {
        Linking.openURL(path);
    }

    return (
        <View style={{ backgroundColor: "transparent", width:"100%" }}>
            <TouchableOpacity onPress={sendEmail}>
                <View style={makeStyle.emailFeatureContainer}>
                    <View style={makeStyle.headerContainer}>
                        <View style={{ backgroundColor: "transparent" }}>
                            <Text style={makeStyle.title}>{object}</Text>
                            <Text style={makeStyle.subtitle}>{sender}</Text>
                        </View>
                        <Text style={makeStyle.subtitle}>{date.toLocaleDateString()}</Text>
                    </View>
                    <Text style={makeStyle.contentText}>{content}</Text>
                </View>
            </TouchableOpacity>
        </View>
    );
}

const styles = (color: any) => StyleSheet.create({
    emailFeatureContainer: {
        backgroundColor: "transparent",
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
        width: "100%",
    },
    headerContainer: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: 'transparent',
        width: '100%',
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
    },
    contentText: {
        color: color.tint,
        fontSize: 12,
        fontWeight: '300',
        marginTop: 5,
    }
});