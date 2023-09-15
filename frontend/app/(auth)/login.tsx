import {StyleSheet, TextInput, TouchableOpacity, useColorScheme} from 'react-native';
import { Text, View } from '../../components/Themed';
import Colors from "../../constants/Colors";
import {useAuth} from "../../context/AuthProvider";
import {LinearGradient} from "expo-linear-gradient";
import {useState} from "react";
import i18n from "../../i18n/i18n";

export default function LoginScreen({ navigation }: { navigation: any }) {
    const colorScheme = useColorScheme() ?? "light";
    const makeStyle = styles(Colors[colorScheme]);
    const { login } = useAuth();

    const [email, setEmail] = useState("oliver.lewis@masurao.jp");
    const [password, setPassword] = useState("password");

    return (
        <LinearGradient colors={[(colorScheme == 'light' ? '#FFF' : '#1E1825'), (colorScheme == 'light' ? '#FFF' : '#1E1825'), (colorScheme == 'light' ? '#7945B6' : '#7945B6')]} style={makeStyle.background} locations={[0, 0.7, 1]} start={[0, 1]} end={[1, 0]}>
            <View style={makeStyle.container}>
                <View style={{ backgroundColor: 'transparent'}}>
                    <Text style={makeStyle.headtitle}>Super company name</Text>
                    <Text style={makeStyle.title}>{i18n.t('authpage.title')}</Text>
                    <View style={makeStyle.mainContainer}>
                        <View style={makeStyle.inputContainer}>
                            <Text style={makeStyle.label}>{i18n.t('authpage.email')}</Text>
                            <TextInput
                                style={makeStyle.input}
                                onChangeText={newText => setEmail(newText)}
                                value={email}
                                placeholder={"john.doe@email.com"}
                            />
                        </View>
                        <View style={makeStyle.inputContainer}>
                            <Text style={makeStyle.label}>{i18n.t('authpage.password')}</Text>
                            <TextInput
                                style={makeStyle.input}
                                onChangeText={newText => setPassword(newText)}
                                value={password}
                                secureTextEntry={true}
                                placeholder={"Mot de passe"}
                            />
                        </View>
                        <TouchableOpacity onPress={() => login(email, password)} style={makeStyle.button}>
                            <Text style={makeStyle.buttonText}>{i18n.t('authpage.signIn')}</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </LinearGradient>
    );
}

const styles = (color: any) => StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'transparent',
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        paddingBottom: 150,
        paddingHorizontal: 20,
    },
    background: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        height: '100%',
    },
    mainContainer: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-end',
        gap: 20,
        marginTop: 20,
        backgroundColor: 'transparent',
    },
    inputContainer: {
        backgroundColor: 'transparent',
        width: '100%',
    },
    headtitle: {
        fontSize: 14,
        fontWeight: '300',
        textTransform: 'uppercase',
        fontStyle: 'italic',
        color: color.tint,
    },
    title: {
        fontSize: 32,
        fontWeight: 'bold',
        color: color.primaryColor,
        shadowColor: color.primaryColor,
        shadowOffset: {
            width: 0,
            height: 0,
        },
        shadowOpacity: 0.5,
        shadowRadius: 20,
    },
    input: {
        height: 45,
        padding: 10,
        borderRadius: 10,
        backgroundColor: color.tintLight,
        color: color.tint,
    },
    label: {
        fontSize: 14,
        textTransform: 'uppercase',
        color: color.tint,
        fontWeight: 'bold',
        marginBottom: 5,
    },
    button: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 15,
        paddingHorizontal: 25,
        backgroundColor: color.primaryColor,
        borderRadius: 10,
    },
    buttonText: {
        color: color.tintLight,
        fontWeight: 'bold',
        textTransform: 'uppercase',
    }
});
