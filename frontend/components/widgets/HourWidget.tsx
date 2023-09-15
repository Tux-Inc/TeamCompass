import { StyleSheet, Text, useColorScheme } from "react-native";
import Colors from "../../constants/Colors";
import { View } from "../Themed";
import React, { useEffect, useState } from "react";
import * as Location from 'expo-location';
import { DateTime } from 'luxon';

/**
 * The HourWidget component displays the current time in the user's location, as well as the time in
 * New York and London.
 * @returns The function `HourWidget` returns a JSX element, specifically a `View` component with three
 * nested `View` components inside. Each nested `View` component contains a `Text` component displaying
 * the current time, location, and offset for a specific location (Here, New York, and London).
 */
export default function HourWidget() {
    const colorScheme = useColorScheme() ?? "light";
    const makeStyle = styles(Colors[colorScheme]);

    const [location, setLocation] = useState<Location.LocationObject | null>(null);
    const [errorMsg, setErrorMsg] = useState<string>("");

    const [currentHour, setCurrentHour] = useState<string>("Chargement...");
    const [Offset, setOffset] = useState<string>("");

    const [newYorkHour, setNewYorkHour] = useState<string>("Chargement...");
    const [newYorkOffset, setNewYorkOffset] = useState<string>("");

    const [londonHour, setLondonHour] = useState<string>("Chargement...");
    const [londonOffset, setLondonOffset] = useState<string>("");

    useEffect(() => {
        const updateCurrentTime = async () => {
            let { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
                setErrorMsg('Permission to access location was denied');
                return;
            }
            const date = new Date();

            const formattedTime = date.toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit', hour12: false });
            let off = '(UTC-00:00)';
            let newYorkTime = "Chargement...";
            let newYorkOffset = "";
            try {
                newYorkTime = DateTime.now().setZone('America/New_York').toLocaleString(DateTime.TIME_SIMPLE);
                newYorkOffset = getTimeDifference('America/New_York');
            } catch (error) {
                // Gérer l'erreur ici, par exemple en mettant newYorkTime et newYorkOffset à des valeurs par défaut
                console.error("Erreur lors de la récupération de l'heure de New York :", error);
            }
            // Récupérer l'heure de Londres
            let londonTime = "Chargement...";
            let londonOffset = "";
            try {
                londonTime = DateTime.now().setZone('Europe/London').toLocaleString(DateTime.TIME_SIMPLE);
                londonOffset = getTimeDifference('Europe/London');
            } catch (error) {
                // Gérer l'erreur ici, par exemple en mettant londonTime et londonOffset à des valeurs par défaut
                console.error("Erreur lors de la récupération de l'heure de Londres :", error);
            }
            setCurrentHour(`${formattedTime}`);
            setOffset(` ${off}`);
            setNewYorkHour(`${newYorkTime}`);
            setNewYorkOffset(` (${newYorkOffset})`);
            setLondonHour(`${londonTime}`);
            setLondonOffset(` (${londonOffset})`);
        };
        const getTimeDifference = (timeZone: string) => {
            const userTime = DateTime.now();
            const zoneTime = DateTime.now().setZone(timeZone);
            const diff = zoneTime.offset - userTime.offset;

            const hoursDifference = Math.abs(Math.floor(diff / 60));
            const offsetSign = diff < 0 ? '-' : '+';

            return `UTC${offsetSign}${hoursDifference.toString().padStart(2, '0')}:00`;
        };

        // Actualisation de l'heure toutes les secondes
        const intervalId = setInterval(updateCurrentTime, 1000);

        return () => {
            clearInterval(intervalId);
        };
    }, []);

    return (
        <View style={makeStyle.widgetContainer}>
            <View style={makeStyle.blockContainerLeft}>
            <View style={makeStyle.textContainer}>
            <Text style={makeStyle.dateText}>{currentHour}</Text>
                <Text style={makeStyle.locationText}>Here</Text>
                <Text style={makeStyle.locationText}>{Offset}</Text>
            </View>
            </View>
            <View style={makeStyle.blockContainerLeft}>
                <View style={makeStyle.textContainer}>
                <Text style={makeStyle.dateText}>{newYorkHour}</Text>
                <Text style={makeStyle.locationText}>New York</Text>
                <Text style={makeStyle.locationText}>{newYorkOffset}</Text>
                </View>
            </View>
            <View style={makeStyle.blockContainerLeft}>
                <View style={makeStyle.textContainer}>
                <Text style={makeStyle.dateText}>{londonHour}</Text>
                <Text style={makeStyle.locationText}>London</Text>
                <Text style={makeStyle.locationText}>{londonOffset}</Text>
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
            alignItems: "center",
            justifyContent: "space-between",
            padding: 15,
            gap: 5,
            borderRadius: 10,
            backgroundColor: color.tintLight,
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
            backgroundColor: "transparent",
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
        title: {
            fontSize: 14,
            fontWeight: "bold",
            color: color.tintDark,
        },
    });
