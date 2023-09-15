import React, { useState } from "react";
import { View, Text, useColorScheme, StyleSheet } from "react-native";
import Colors from "../constants/Colors";
import i18n from "../i18n/i18n";

export default function CalendarTable() {
    const colorScheme = useColorScheme() ?? "light";
    const makeStyle = styles(Colors[colorScheme]);

    const weekdayNames = [
        i18n.t("widgets.calendar.weekdaysInitials.monday"),
        i18n.t("widgets.calendar.weekdaysInitials.tuesday"),
        i18n.t("widgets.calendar.weekdaysInitials.wednesday"),
        i18n.t("widgets.calendar.weekdaysInitials.thursday"),
        i18n.t("widgets.calendar.weekdaysInitials.friday"),
        i18n.t("widgets.calendar.weekdaysInitials.saturday"),
        i18n.t("widgets.calendar.weekdaysInitials.sunday"),
    ];

    // Get the current date
    const currentDate = new Date();

    // Get the month name
    const currentMonth = Intl.DateTimeFormat(i18n.locale, {
        month: "long",
    }).format(currentDate).toUpperCase();

    // Get the current year
    const currentYear = currentDate.getFullYear();

    // Create a date for the first day of the month
    const firstDayOfMonth = new Date(currentYear, currentDate.getMonth(), 1);

    // Find the day of the week for the first day of the month (0 = Sunday, 1 = Monday, ..., 6 = Saturday)
    let startingDay = firstDayOfMonth.getDay(); // 0-indexed

    // Adjust starting day to start from Monday (0 = Monday, 1 = Tuesday, ..., 6 = Sunday)
    startingDay = (startingDay + 6) % 7;

    // Get the number of days in the current month
    const daysInMonth = new Date(currentYear, currentDate.getMonth() + 1, 0).getDate();

    // Create an array of date objects for the current month
    const datesArray = [];
    // Add empty cells for the days before the first day of the month
    for (let i = 0; i < startingDay; i++) {
        datesArray.push(null);
    }
    // Add date objects for the days of the month
    for (let day = 1; day <= daysInMonth; day++) {
        datesArray.push(new Date(currentYear, currentDate.getMonth(), day));
    }

    return (
        <View style={makeStyle.calendarTableContainer}>
            {/* Display the current month */}
            <Text style={makeStyle.currentMonthText}>{currentMonth}</Text>
            <View style={makeStyle.weekdaysRow}>
                {weekdayNames.map((day, index) => (
                    <View key={index} style={makeStyle.weekdayCell}>
                        <Text style={makeStyle.weekdayCellText}>{day}</Text>
                    </View>
                ))}
            </View>
            <View style={makeStyle.datesGrid}>
                {datesArray.map((date, index) => {
                    const isWeekend =
                        date && (date.getDay() === 0 || date.getDay() === 6); // 0 = Sunday, 6 = Saturday
                    return (
                        <View
                            key={index}
                            style={[
                                makeStyle.dateCell,
                                date &&
                                date.getDate() === currentDate.getDate()
                                    ? {
                                        backgroundColor:
                                            colorScheme === "light"
                                                ? Colors.light.primaryColor
                                                : Colors.dark.primaryColor,
                                    }
                                    : null,
                                isWeekend ? { opacity: 0.5 } : null,
                            ]}
                        >
                            {date && (
                                <Text style={makeStyle.dateCellText}>
                                    {date.getDate()}
                                </Text>
                            )}
                        </View>
                    );
                })}
            </View>
        </View>
    );
}

const styles = (color: any) =>
    StyleSheet.create({
        calendarTableContainer: {
            backgroundColor: "transparent",
        },
        currentMonthText: {
            textAlign: "right",
            fontSize: 12,
            fontWeight: "bold",
            color: color.primaryColor,
            marginBottom: 10,
        },
        weekdaysRow: {
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
        },
        weekdayCell: {
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            height: 30,
            backgroundColor: "transparent",
        },
        weekdayCellText: {
            fontSize: 12,
            color: color.tintDark,
        },
        datesGrid: {
            flexDirection: "row",
            flexWrap: "wrap",
        },
        dateCell: {
            display: "flex",
            width: "14.2857%", // 1/7th of the screen width for each day (7 days in a week)
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "transparent",
            borderRadius: 100,
            flexWrap: "nowrap",
        },
        dateCellText: {
            fontSize: 12,
            color: color.tintDark,
            padding: 5,
        },
    });
