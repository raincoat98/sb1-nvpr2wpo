import { useEffect } from 'react';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useFrameworkReady } from '@/hooks/useFrameworkReady';
import {
  useFonts,
  Inter_400Regular,
  Inter_500Medium,
  Inter_600SemiBold,
  Inter_700Bold,
} from '@expo-google-fonts/inter';
import * as SplashScreen from 'expo-splash-screen';
import { GamificationProvider } from '@/contexts/GamificationContext';
import {
  PaperProvider,
  MD3LightTheme,
  configureFonts,
} from 'react-native-paper';
import { Colors } from '@/constants/theme';

SplashScreen.preventAutoHideAsync();

// Paper 테마 설정
const paperTheme = {
  ...MD3LightTheme,
  colors: {
    ...MD3LightTheme.colors,
    primary: Colors.primary,
    secondary: Colors.secondary,
    tertiary: Colors.accent,
    surface: Colors.white,
    background: Colors.background,
    error: Colors.error,
    onPrimary: Colors.white,
    onSecondary: Colors.white,
    onSurface: Colors.text,
    onBackground: Colors.text,
  },
  fonts: configureFonts({
    config: {
      fontFamily: 'Inter-Regular',
    },
  }),
};

export default function RootLayout() {
  useFrameworkReady();

  const [fontsLoaded, fontError] = useFonts({
    'Inter-Regular': Inter_400Regular,
    'Inter-Medium': Inter_500Medium,
    'Inter-SemiBold': Inter_600SemiBold,
    'Inter-Bold': Inter_700Bold,
  });

  useEffect(() => {
    if (fontsLoaded || fontError) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded, fontError]);

  if (!fontsLoaded && !fontError) {
    return null;
  }

  return (
    <PaperProvider theme={paperTheme}>
      <GamificationProvider>
        <Stack screenOptions={{ headerShown: false }}>
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen name="+not-found" />
        </Stack>
        <StatusBar style="auto" />
      </GamificationProvider>
    </PaperProvider>
  );
}
