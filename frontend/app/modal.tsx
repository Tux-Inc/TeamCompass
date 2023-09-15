import { StatusBar } from 'expo-status-bar';
import {Platform, StyleSheet, useColorScheme} from 'react-native';

import EditScreenInfo from '../components/EditScreenInfo';
import { Text, View } from '../components/Themed';
import {Link} from "expo-router";
import {Ionicons} from "@expo/vector-icons";
import Colors from "../constants/Colors";

export default function ModalScreen() {

    const colorScheme = useColorScheme() ?? "light";
    const makeStyle = styles(Colors[colorScheme]);

  return (
    <View style={makeStyle.container}>
      <View style={makeStyle.pageHeader}>
        <Text style={makeStyle.title}>Paramètres</Text>
      </View>

      {/* Use a light status bar on iOS to account for the black space above the modal */}
      <StatusBar style={Platform.OS === 'ios' ? 'light' : 'auto'} />
    </View>
  );
}

const styles = (color: any) => StyleSheet.create({
    container: {
      height: '100%',
      display: 'flex',
      paddingTop: 80,
      paddingHorizontal: 20,
    },
    pageHeader: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
        gap: 10,
    },
    title: {
      fontSize: 32,
      fontWeight: 'bold',
      color: color.primaryColor,
    },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});
