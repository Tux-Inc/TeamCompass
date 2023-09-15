import React, {useState, useEffect, useRef} from "react";
import {Animated, Easing, StyleSheet, Text, useColorScheme} from "react-native";
import Colors from "../constants/Colors";
import { View } from "./Themed";
import LottieView from "lottie-react-native";

const AnimatedLottieView = Animated.createAnimatedComponent(LottieView);

interface WeatherImageProps {
    weather: string;
    width?: number;
    height?: number;
}

/**
 * This is a TypeScript React component that displays a weather image based on the weather condition
 * provided.
 * @param {WeatherImageProps}  - - `weather`: The weather condition, represented by a string. It is
 * used to determine which weather image to display.
 * @returns a JSX element. It is rendering a `<View>` component with a `<AnimatedLottieView>` component
 * inside it. The `<AnimatedLottieView>` component is displaying an animated weather image based on the
 * `weather` prop passed to the component. The size of the weather image is determined by the `width`
 * and `height` props, with default values of 50.
 */
export default function WeatherImage({ weather, width = 50, height = 50 }: WeatherImageProps) {
    const colorScheme = useColorScheme() ?? "light";
    const makeStyle = styles(Colors[colorScheme]);

    const [weatherImage, setWeatherImage] = useState<string>(require("../assets/images/weather/not-available.json"));

    const weatherMap: any = {
        "01d": require("../assets/images/weather/01d.json"),
        "01n": require("../assets/images/weather/01n.json"),
        "02d": require("../assets/images/weather/02d.json"),
        "02n": require("../assets/images/weather/02n.json"),
        "03d": require("../assets/images/weather/03d.json"),
        "03n": require("../assets/images/weather/03n.json"),
        "04d": require("../assets/images/weather/04d.json"),
        "04n": require("../assets/images/weather/04n.json"),
        "09d": require("../assets/images/weather/09d.json"),
        "09n": require("../assets/images/weather/09n.json"),
        "10d": require("../assets/images/weather/10d.json"),
        "10n": require("../assets/images/weather/10n.json"),
        "11d": require("../assets/images/weather/11d.json"),
        "11n": require("../assets/images/weather/11n.json"),
        "13d": require("../assets/images/weather/13d.json"),
        "13n": require("../assets/images/weather/13n.json"),
        "50d": require("../assets/images/weather/50d.json"),
        "50n": require("../assets/images/weather/50n.json"),
        "not-available": require("../assets/images/weather/not-available.json"),
    };

    let weatherImageRequire;

    if (weatherMap[weather])
        weatherImageRequire = weatherMap[weather];
    else
        weatherImageRequire = weatherMap["not-available"];

    const animationProgress = useRef(new Animated.Value(0));

    useEffect(() => {
        // Create an animation loop
        const animation = Animated.loop(
            Animated.timing(animationProgress.current, {
                toValue: 1,
                duration: 7500,
                easing: Easing.linear,
                useNativeDriver: false,
            })
        );

        animation.start(); // Start the loop

        // Clean up the animation when the component unmounts
        return () => {
            animation.stop(); // Stop the loop
        };
    }, []);

    return (
        <View style={makeStyle.weatherImageContainer}>
                <AnimatedLottieView source={weatherImageRequire} progress={animationProgress.current} style={{width: width, height: height, flex: 1}} />
        </View>
    );
}

const styles = (color: any) =>
    StyleSheet.create({
        weatherImageContainer: {
            flex: 1,
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "transparent",
        },
    });
