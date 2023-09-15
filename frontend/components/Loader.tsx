import React, {useState, useEffect, useRef} from "react";
import {Animated, Easing, StyleSheet, Text, useColorScheme} from "react-native";
import Colors from "../constants/Colors";
import { View } from "./Themed";
import LottieView from "lottie-react-native";

const AnimatedLottieView = Animated.createAnimatedComponent(LottieView);

interface LoaderProps {
    loader: string;
    width: number;
    height: number;
}

/**
 * This is a React component that renders a loader animation using Lottie.
 * @param {LoaderProps}  - - `loader`: The name of the loader animation to be displayed. It is used to
 * determine which animation to load from the `loaderMap` object.
 * @returns a JSX element. Specifically, it is returning a View component that contains an
 * AnimatedLottieView component.
 */
export default function Loader({ loader, width, height }: LoaderProps) {
    const colorScheme = useColorScheme() ?? "light";
    const makeStyle = styles(Colors[colorScheme]);

    const [weatherImage, setWeatherImage] = useState<string>(require("../assets/loader/default.json"));

    const loaderMap: any = {
        "default": require("../assets/loader/default.json"),
    };

    let loaderRequire;

    if (loaderMap[loader])
        loaderRequire = loaderMap[loader];
    else
        loaderRequire = loaderMap["default"];

    const animationProgress = useRef(new Animated.Value(0));

    useEffect(() => {
        // Create an animation loop
        const animation = Animated.loop(
            Animated.timing(animationProgress.current, {
                toValue: 1,
                duration: 3500,
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
        <View style={makeStyle.loaderContainer}>
            <AnimatedLottieView source={loaderRequire} progress={animationProgress.current} style={{width: width, height: height}} />
        </View>
    );
}

const styles = (color: any) =>
    StyleSheet.create({
        loaderContainer: {
            flex: 1,
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "transparent",
        },
    });
