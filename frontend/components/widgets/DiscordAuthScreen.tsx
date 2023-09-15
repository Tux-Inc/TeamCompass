import React, { useEffect } from 'react';
import { View, Text, Button } from 'react-native';
import { WebView } from 'react-native-webview';
import axios from 'axios';
import Colors from "../../constants/Colors";
import {Animated, StyleSheet, useColorScheme} from 'react-native';

const DiscordAuthScreen = ({ navigation }: any) => {
    const colorScheme = useColorScheme() ?? "light";
    const makeStyle = styles(Colors[colorScheme]);
    const discordClientId = '1151158819024535624'; // ID client Discord
    const redirectUri = 'http://localhost:8081/auth/callback'; // URL de redirection
    const discordAuthUrl = `https://discord.com/api/oauth2/authorize?client_id=1151158819024535624&redirect_uri=http%3A%2F%2Flocalhost%3A8081%2Fauth%2Fcallback&response_type=code&scope=identify`;

    const handleWebViewNavigationStateChange = async (newNavState: any) => {
        const { url } = newNavState;
        console.log('URL de navigation :', url); // Ajoutez ce message de débogage

        // Interceptez l'URL lorsque celle-ci correspond à redirectUri
        // const test = url.split('uri=');
        // console.log(test)
        // const code2 = url.split('uri=')[1];
        const code = url.split('code=')[1];

        console.log(`code = ${code}`); // Ajoutez ce message de débogage
        if (code) {
            // Échangez le code contre un jeton d'accès
            try {
            const response = await axios.post('https://discord.com/api/oauth2/token', null, {
                params: {
                    client_id: discordClientId,
                    client_secret: 'pxAQlA3aU4QRzbUri8n60a0QfSgC-m-B', // Remplacez par votre secret client Discord
                    grant_type: 'authorization_code',
                    code,
                    redirect_uri: redirectUri,
                },
            });

            const { access_token } = response.data;

            // Vous avez maintenant le jeton d'accès pour effectuer des requêtes vers l'API Discord au nom de l'utilisateur
            console.log('Access Token:', access_token);

            // Stockez le jeton d'accès dans AsyncStorage ou dans un autre endroit sécurisé si nécessaire
            // AsyncStorage.setItem('access_token', access_token);

            // Vous pouvez maintenant naviguer vers l'écran principal de votre application
            // navigation.navigate('MainAppScreen');
            } catch (error) {
            console.error('Erreur lors de léchange du code contre le jeton :', error);
            }
        }

        // Naviguez de nouveau vers l'écran principal de votre application
        // navigation.goBack();
    };

    const handleAuthButtonPress = () => {
        // Lorsque le bouton est pressé, naviguez vers l'écran d'authentification Discord
        navigation.navigate('DiscordAuthScreen');
    };

    useEffect(() => {
        // vérifier si l'utilisateur est déjà authentifié et sauter le processus d'authentification.
        // Vous pouvez le faire en vérifiant si vous avez un jeton d'accès valide stocké.
        // const storedAccessToken = AsyncStorage.getItem('access_token');
        // if (storedAccessToken) {
        //   navigation.navigate('MainAppScreen');
        // }
    }, []);

    return (
        <View style={makeStyle.widgetContainer}>
            <View style={{ flex: 1 }}>
            <WebView
                source={{ uri: discordAuthUrl }}
                onNavigationStateChange={handleWebViewNavigationStateChange}
            />
            </View>
        </View>
    );
};

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

export default DiscordAuthScreen;