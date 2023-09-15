import { StyleSheet, Text, useColorScheme } from "react-native";
import Colors from "../../constants/Colors";
import { View } from "../Themed";
import WeatherImage from "../WeatherImage";
import React, { useEffect, useState } from "react";
import * as Location from 'expo-location';
import { IWeatherForecast } from "../../types/WeatherForecast";
import { IWeather } from "../../types/Weather";
import WeatherForecast from "../WeatherForecast";
import { getWeather, getWeatherForecast } from "../../hooks/useOpenWeatherMap";
import i18n from "../../i18n/i18n";

/**
 * The WeatherWidget function is a React component that displays the current weather and weather
 * forecasts based on the user's location.
 * @returns The function `WeatherWidget` returns a JSX element, specifically a `View` component with
 * two child components: `blockContainerLeft` and `blockContainerRight`. Inside `blockContainerLeft`,
 * there are three `Text` components: `dateText`, `locationText`, and `temperatureText`. Inside
 * `blockContainerRight`, there is a `WeatherImage` component and a `WeatherForecast`
 */
export default function WeatherWidget() {
    const colorScheme = useColorScheme() ?? "light";
    const makeStyle = styles(Colors[colorScheme]);

    const [location, setLocation] = useState<Location.LocationObject>({} as Location.LocationObject);
    const [errorMsg, setErrorMsg] = useState<string>("");

    const [currentWeather, setCurrentWeather] = useState<IWeather>({ cityName: "Chargement...", temperatureC: "..", weather: "01d" });
    const [weatherForecasts, setWeatherForecasts] = useState<IWeatherForecast[]>([
        { date: "...", temperatureC: "..", weather: "01d" },
        { date: "...", temperatureC: "..", weather: "01d" },
        { date: "...", temperatureC: "..", weather: "01d" }
    ]);

    const date = new Date();
    const formattedDate = new Intl.DateTimeFormat(i18n.locale, {
        weekday: 'long',
        month: 'long',
        day: 'numeric'
    }).format(date);

    useEffect(() => {
        (async () => {
            let { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
                setErrorMsg('Permission to access location was denied');
                return;
            }
            let location = await Location.getCurrentPositionAsync({});
            setLocation(location);
            let weatherObject: IWeather = {} as IWeather;
            try {
                const currentWeatherResponse = await getWeather(location.coords.latitude, location.coords.longitude);
                weatherObject = {
                    cityName: currentWeatherResponse.name,
                    temperatureC: currentWeatherResponse.main.temp.toFixed(0).toString(),
                    weather: currentWeatherResponse.weather[0].icon,
                }
            } catch (e) {
                console.error(e);
            }
            let weatherForecastObjects: IWeatherForecast[] = [];
            try {
                const weatherForecastResponse = await getWeatherForecast(location.coords.latitude, location.coords.longitude);
                for (let i = 0; i < weatherForecastResponse.list.length && i < 3; i++) {
                    const weatherForecast = weatherForecastResponse.list[i];
                    weatherForecastObjects.push({
                        date: new Intl.DateTimeFormat(i18n.locale, {
                            hour: '2-digit',
                            minute: '2-digit'
                        }).format(new Date(weatherForecast.dt * 1000)),
                        temperatureC: weatherForecast.main.temp.toFixed(0).toString(),
                        weather: weatherForecast.weather[0].icon,
                    });
                }
            } catch (e) {
                console.error(e);
            }
            setWeatherForecasts(weatherForecastObjects);
            setCurrentWeather(weatherObject);
        })();
    }, []);

    return (
        <View style={makeStyle.widgetContainer}>
            <View style={makeStyle.blockContainerLeft}>
                <Text style={makeStyle.dateText}>{formattedDate}</Text>
                <Text style={makeStyle.locationText}>{currentWeather.cityName}</Text>
                <Text style={makeStyle.temperatureText}>{currentWeather.temperatureC}°</Text>
            </View>
            <View style={makeStyle.blockContainerRight}>
                <WeatherImage weather={currentWeather.weather} width={100} height={100} />
                <WeatherForecast weatherForecasts={weatherForecasts} />
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
            alignItems: "center",
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
            backgroundColor: "transparent",
        },
        blockContainerRight: {
            display: "flex",
            flex: 1,
            flexDirection: "column",
            alignItems: "flex-end",
            backgroundColor: "transparent",
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
            fontSize: 92,
            fontWeight: "bold",
            color: color.tintDark,
        },
        title: {
            fontSize: 14,
            fontWeight: "bold",
            color: color.tintDark,
        },
    });
