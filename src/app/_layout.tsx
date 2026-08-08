import {
  BeVietnamPro_400Regular,
  BeVietnamPro_500Medium,
} from "@expo-google-fonts/be-vietnam-pro";
import { Fredoka_500Medium } from "@expo-google-fonts/fredoka";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import "./global.css";

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [fontsLoaded] = useFonts({
    Fredoka_500Medium,
    BeVietnamPro_400Regular,
    BeVietnamPro_500Medium,
  });

  useEffect(() => {
    if (fontsLoaded) SplashScreen.hideAsync();
  }, [fontsLoaded]);

  if (!fontsLoaded) return null;

  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="(tabs)" />
      <Stack.Screen
        name="add-transaction"
        options={{ presentation: "modal", headerShown: false }}
      />
    </Stack>
  );
}
