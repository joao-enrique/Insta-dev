import InitialLayout from '@/components/InitialLayout';
import ClerkAndConvexProvider from '@/providers/ClerkAndConvexProvider';
import { Stack } from "expo-router";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";

export default function RootLayout() {
  return( 
    <ClerkAndConvexProvider>
      <SafeAreaProvider>
        <SafeAreaView style={{ flex: 1}}>
          <Stack screenOptions={{ headerShown: false}}>
            <InitialLayout />
          </Stack>
        </SafeAreaView>
      </SafeAreaProvider>
    </ClerkAndConvexProvider>
  )
}
