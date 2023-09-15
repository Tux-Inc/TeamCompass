import React, {useState, useEffect} from "react";
import {Animated, StyleSheet, TouchableOpacity, useColorScheme} from "react-native";
import Colors from "../../constants/Colors";
import {View} from "../Themed";
import {Link} from "@react-navigation/native";
import UserCard from "../UserCard";
import {Ionicons} from "@expo/vector-icons";
import {IUser} from "../../types/User";
import {axiosClient} from "../../services/client";
import ScrollView = Animated.ScrollView;
import {getEmployees} from "../../hooks/useEmployees";
import {router} from "expo-router";
import {LinearGradient} from "expo-linear-gradient";

export default function TombinoscopeWidget() {
    const colorScheme = useColorScheme() ?? "light";
    const makeStyle = styles(Colors[colorScheme]);

    const [users, setUsers] = useState<IUser[]>([]);

    const redirectToProfile = (userId: string) => {
        const path = `employees/${userId}`;
        router.push(`/${path}`);
    };

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                let users: IUser[] = await getEmployees();
                users = users.sort(() => Math.random() - 0.5).slice(0, 10);
                setUsers(users);
            } catch (e) {
                console.error(e);
            }
        };
        fetchUsers();
    }, []); // Run the fetchUsers function only once when the component mounts.


    return (
        <View>
            <View style={makeStyle.widgetContainer}>
                <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}
                            contentContainerStyle={makeStyle.scrollContainer}>
                    {users.map((user, index) => (
                        <UserCard
                            key={index}
                            title={user.name}
                            subtitle={user.surname}
                            callback={() => redirectToProfile(user.id)}
                            userId={user.id}
                        />
                    ))}
                </ScrollView>
                <LinearGradient
                    colors={[(colorScheme == 'light' ? '#FFF' : 'rgba(30, 24, 37, 1)'), (colorScheme == 'light' ? '#FFF' : 'rgba(30, 24, 37, 0.9)'), (colorScheme == 'light' ? 'rgba(241, 236, 255, 0)' : 'rgba(30, 24, 37, 0)')]}
                    style={makeStyle.linkContainer} locations={[0, 0.5, 1]} start={[1, 1]} end={[0, 1]}>
                    <View style={makeStyle.link}>
                        <Link to="/employees">
                            <Ionicons name={"chevron-forward"} size={32} color={Colors[colorScheme].tint}/>
                        </Link>
                    </View>
                </LinearGradient>
            </View>
        </View>
    );
}

const styles = (color: any) =>
    StyleSheet.create({
        widgetContainer: {
            display: "flex",
            width: "100%",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            gap: 5,
            borderRadius: 10,
            backgroundColor: color.tintLight,
            overflow: "hidden",
        },
        scrollContainer: {
            paddingHorizontal: 5,
            paddingVertical: 20,
            borderRadius: 10,
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            gap: 10,
            justifyContent: "space-between",
        },
        linkContainer: {
            position: "absolute",
            right: 0,
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
            paddingHorizontal: 10,
            shadowColor: color.primaryColor,
            backgroundColor: 'transparent',
            height: "100%",
        },
        link: {
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: 'transparent',
            borderRadius: 50,
            padding: 20,
        }
    });
