import {StyleSheet, Text, useColorScheme} from "react-native";
import Colors from "../../constants/Colors";
import { View } from "../Themed";
import React, {useEffect, useState} from "react";
import {Ionicons} from "@expo/vector-icons";
import EmailFeatured from "../EmailFeatured";
import i18n from "../../i18n/i18n";

/**
 * The above function is a TypeScript React component that renders an email widget with a title, icon,
 * and email content.
 * @returns The EmailWidget component is being returned.
 */
export default function EmailWidget() {
    const colorScheme = useColorScheme() ?? "light";
    const makeStyle = styles(Colors[colorScheme]);

    const date = new Date();


    return (
        <View style={makeStyle.widgetContainer}>
            <View style={makeStyle.blockContainer}>
                <View style={makeStyle.topContainer}>
                    <Ionicons name={"mail"} size={12} color={Colors[colorScheme].primaryColor} />
                    <Text style={makeStyle.title}>{i18n.t('widgets.emails.allInBoxes').toUpperCase()}</Text>
                </View>
                <View style={makeStyle.bottomContainer}>
                    <EmailFeatured object={"DEVIS PROJET WAWAN"} sender={"gwenaelhubler@gmail.com"} date={date} path={"mailto:gwenaelhubler@gmail.com"} content={"Bonjour, je vous contacte pour vous proposer un devis pour le projet WAWAN."}/>
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
            flexDirection: "row",
            alignItems: "flex-start",
            justifyContent: "space-between",
            padding: 15,
            gap: 5,
            borderRadius: 10,
            backgroundColor: color.tintLight,
        },
        blockContainer: {
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            justifyContent: "space-between",
            backgroundColor: "transparent",
            flexWrap: "nowrap",
            height: "100%",
            width: "100%",
        },
        topContainer: {
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "flex-start",
            backgroundColor: "transparent",
            gap: 5,
        },
        bottomContainer: {
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "transparent",
            flexGrow: 1,
            width: "100%",
            height: "100%",
        },
        basicText: {
            fontSize: 14,
            fontWeight: "300",
            color: color.tintDark,
        },
        title: {
            fontSize: 12,
            fontWeight: "bold",
            color: color.primaryColor,
        },
    });
