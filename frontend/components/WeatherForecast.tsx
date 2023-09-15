import React from "react";
import {StyleSheet, Text, useColorScheme} from "react-native";
import Colors from "../constants/Colors";
import {View} from "./Themed";
import {IWeatherForecast} from "../types/WeatherForecast";
import WeatherImage from "./WeatherImage";
import i18n from "../i18n/i18n";

interface IWeatherForecastProps {
    weatherForecasts: IWeatherForecast[];
}

/**
 * The WeatherForecast component renders a list of weather forecasts with date, weather icon, and
 * temperature.
 * @param {IWeatherForecastProps}  - - `weatherForecasts`: An array of weather forecast objects. Each
 * object should have the following properties:
 * @returns a JSX element.
 */
export default function WeatherForecast({ weatherForecasts }: IWeatherForecastProps) {
    const colorScheme = useColorScheme() ?? "light";
    const makeStyle = styles(Colors[colorScheme]);

    return (
        <View style={makeStyle.forecastsContainer}>
            {weatherForecasts.map((weatherForecast, index) => (
                <View key={index} style={makeStyle.forecastContainer}>
                    <View style={makeStyle.subForecastContainer}>
                        <Text style={makeStyle.forecastText}>{weatherForecast.date}</Text>
                        <WeatherImage weather={weatherForecast.weather} width={24} height={24} />
                        <Text style={makeStyle.forecastText}>{weatherForecast.temperatureC}°</Text>
                    </View>
                    {index < weatherForecasts.length - 1 &&
                        <View style={makeStyle.forecastSeparator} />
                    }
                </View>
            ))}
        </View>
    );
}

const styles = (color: any) =>
    StyleSheet.create({
        forecastsContainer: {
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            backgroundColor: "transparent",
            gap: 10,
        },
        forecastContainer: {
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            backgroundColor: "transparent",
        },
        subForecastContainer: {
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 5,
            justifyContent: "center",
            backgroundColor: "transparent",
        },
        forecastText: {
            fontSize: 14,
            color: color.tintDark,
        },
        forecastSeparator: {
            width: 1,
            height: 20,
            backgroundColor: color.tintDark,
            marginHorizontal: 5,
        }
    });
