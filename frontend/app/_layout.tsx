import React, { useEffect } from 'react';
import {Pressable, useColorScheme} from 'react-native';
import { AuthProvider } from '../context/AuthProvider';
import { DefaultTheme, DarkTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import {Link, SplashScreen, Stack} from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import i18n from '../i18n/i18n';
import Colors from "../constants/Colors";

export { ErrorBoundary } from 'expo-router';

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded, error] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
    ...Ionicons.font,
  });

  useEffect(() => {
    if (error) {
      throw error;
    }
  }, [error]);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    // You can render a loading indicator here instead of null.
    return null;
  }

  return <RootLayoutNav />;
}

function RootLayoutNav() {
    const colorScheme = useColorScheme() ?? 'light';

  return (
      <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
        <AuthProvider>
          <Stack>
            <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
            <Stack.Screen name="(auth)/login" options={{ headerShown: false }} />
            <Stack.Screen name="modal" options={{ presentation: 'modal', title: i18n.t('layout.settings') }} />
            <Stack.Screen name="convModal" options={{ presentation: 'modal', title: i18n.t('layout.newChat') }} />
            <Stack.Screen name="convSettingsModal" options={{ presentation: 'modal', title: "Settings" }} />
            <Stack.Screen
                name="chat/[slug]"
                options={{
                  headerShown: true,
                  headerTitle: i18n.t('layout.conversation'),
                  headerTransparent: true,
                  headerBackTitle: i18n.t('layout.chat'),
                  headerBlurEffect: 'regular', // Use with caution
                  headerRight: () => (
                      <Link href="/convSettingsModal" asChild>
                          <Pressable
                              style={({ pressed }) => ({
                                  opacity: pressed ? 0.5 : 1,
                              })}
                          >
                              <Ionicons
                                  name="information-circle-outline"
                                  size={25}
                                  color={Colors[colorScheme].text}
                                  style={{ marginRight: 15 }}
                              />
                          </Pressable>
                      </Link>
                    ),
                }}
            />
            <Stack.Screen name="employees/[slug]" options={{ headerShown: false }} />
            <Stack.Screen name="employees/index" options={{ headerShown: false }} />
          </Stack>
        </AuthProvider>
      </ThemeProvider>
  );
}
