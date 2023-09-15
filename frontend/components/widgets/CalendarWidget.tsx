import {StyleSheet, Text, useColorScheme} from "react-native";
import Colors from "../../constants/Colors";
import { View } from "../Themed";
import React, {useEffect, useState} from "react";
import CalendarTable from "../CalendarTable";
import i18n from "../../i18n/i18n";

/**
 * The `CalendarWidget` component renders a calendar widget with the current date and a table for
 * displaying events.
 * @returns a JSX element, specifically a View component with nested child components.
 */
export default function CalendarWidget() {
    const colorScheme = useColorScheme() ?? "light";
    const makeStyle = styles(Colors[colorScheme]);

    const date = new Date();
    const translatedWeekday = new Intl.DateTimeFormat(i18n.locale, {
        weekday: 'long'
    }).format(date).toUpperCase();
    const translatedDate = new Intl.DateTimeFormat(i18n.locale, {
        day: 'numeric',
    }).format(date);

    let formattedDate = date.toLocaleDateString('fr-FR', {day: 'numeric'});

    return (
        <View style={makeStyle.widgetContainer}>
            <View style={makeStyle.blockContainerLeft}>
                <View style={makeStyle.topLeftContainer}>
                    <Text style={makeStyle.weekDayText}>{translatedWeekday}</Text>
                    <Text style={makeStyle.dateText}>{translatedDate}</Text>
                </View>
                <View style={makeStyle.bottomLeftContainer}>
                    <Text style={makeStyle.basicText}>{i18n.t('widgets.calendar.noEventsToday')}</Text>
                </View>
            </View>
            <View style={makeStyle.blockContainerRight}>
                <CalendarTable />
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
        blockContainerLeft: {
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            justifyContent: "space-between",
            backgroundColor: "transparent",
            flexWrap: "nowrap",
            height: "100%",
        },
        blockContainerRight: {
            display: "flex",
            flex: 1,
            flexGrow: 1,
            flexDirection: "column",
            alignItems: "flex-end",
            backgroundColor: "transparent",
            flexWrap: "nowrap",
        },
        topLeftContainer: {
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            backgroundColor: "transparent",
        },
        bottomLeftContainer: {
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "transparent",
            flexGrow: 1,
            maxWidth: 150,
        },
        weekDayText: {
            fontSize: 12,
            fontWeight: "bold",
            color: color.primaryColor,
        },
        dateText: {
            fontSize: 42,
            color: color.tintDark,
        },
        basicText: {
            fontSize: 14,
            fontWeight: "300",
            color: color.tintDark,
        },
        title: {
            fontSize: 18,
            fontWeight: "bold",
            color: color.tintDark,
        },
    });
