import InitialLayout from '@/components/InitialLayout';
import { ClerkProvider } from '@clerk/clerk-expo';
import { tokenCache } from '@clerk/clerk-expo/token-cache';
import { Stack } from "expo-router";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";

export default function RootLayout() {
  return( 
    <ClerkProvider tokenCache={tokenCache} publishableKey="pk_test_bW92ZWQtZGlub3NhdXItMzIuY2xlcmsuYWNjb3VudHMuZGV2JA">
      <SafeAreaProvider>
        <SafeAreaView style={{ flex: 1}}>
          <Stack screenOptions={{ headerShown: false}}>
            <InitialLayout />
          </Stack>
        </SafeAreaView>
      </SafeAreaProvider>
    </ClerkProvider>
  )
}
