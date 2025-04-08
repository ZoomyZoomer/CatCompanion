import * as Font from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

const fetchFonts = () => {
  return Font.loadAsync({
    'Poppins-Regular': require('@/assets/fonts/Poppins-Regular.ttf'),
    // You can add other font variants like bold, italic, etc., here as well
  });
};

export default function RootLayout() {
  const [fontLoaded, setFontLoaded] = useState(false);

  // Load fonts and hide splash screen when loading is complete
  useEffect(() => {
    const loadAssets = async () => {
      try {
        await fetchFonts();
      } catch (error) {
        console.error('Error loading fonts', error);
      } finally {
        setFontLoaded(true);
        SplashScreen.hideAsync(); // Hide splash screen after fonts are loaded
      }
    };

    loadAssets();
  }, []);

  if (!fontLoaded) {
    return null; // You can return a loading indicator if needed while the fonts are loading
  }

  return (
    <>
      <StatusBar style="dark" />
      <Stack>
        <Stack.Screen name="(intro)" options={{ headerShown: false }} />
        <Stack.Screen name="+not-found" />
      </Stack>
    </>
  );
}
