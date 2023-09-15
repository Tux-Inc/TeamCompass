import React, {useEffect, useState} from 'react';
import {
    Platform,
    StyleSheet,
    useColorScheme,
    TextInput,
} from 'react-native';
import {Text, View} from '../components/Themed';
import Colors from "../constants/Colors";
import {StatusBar} from "expo-status-bar";
import i18n from "../i18n/i18n";

export default function convSettingsModal() {
    const colorScheme = useColorScheme() ?? "light";
    const makeStyle = styles(Colors[colorScheme]);

    return (
        <View style={makeStyle.container}>
            <View style={makeStyle.pageHeader}>
                <Text style={makeStyle.label}>Conversation settings</Text>
            </View>
            <Text style={makeStyle.label}>Title</Text>
            <TextInput
                style={makeStyle.input}
                placeholder="Conversation name"
                placeholderTextColor={Colors[colorScheme].tint}
            />
            <Text style={makeStyle.label}>Participants</Text>
            <View style={makeStyle.gridContainer}>
                <Text style={makeStyle.label}>Add participants</Text>
                <TextInput
                    style={makeStyle.searchInput}
                    placeholder="Search"
                    placeholderTextColor={Colors[colorScheme].tint}
                />
            </View>
            <StatusBar style={Platform.OS === 'ios' ? 'light' : 'auto'}/>
        </View>
    );
}

const styles = (color: any) => StyleSheet.create({
    container: {
        height: '100%',
        display: 'flex',
        paddingTop: 20,
        paddingHorizontal: 20,
    },
    pageHeader: {
        display: 'flex',
        flexDirection: 'column', // Place children in a column layout
        alignItems: 'flex-start', // Center align the children horizontally
        marginBottom: 20,
        gap: 5,
    },
    label: {
        fontSize: 14,
        textTransform: 'uppercase',
        color: color.tint,
        fontWeight: 'bold',
        marginBottom: 5,
    },
    title: {
        fontSize: 32,
        fontWeight: 'bold',
        color: color.primaryColor,
    },
    input: {
        width: '100%',
        height: 45,
        padding: 10,
        borderRadius: 10,
        backgroundColor: color.tintLight,
        color: color.tint,
    },
    searchInput: {
        width: '100%', // Take up the full width
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        borderRadius: 5,
        paddingHorizontal: 10,
        fontSize: 16,
        marginTop: 10, // Add margin to separate it from the title
    },
    gridContainer: {
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        width: '100%',
    },
    separator: {
        marginVertical: 30,
        height: 1,
        width: '80%',
    },
});
