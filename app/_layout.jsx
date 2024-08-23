import { Stack } from "expo-router";
import { useFonts } from "expo-font"
import * as SecureStore from 'expo-secure-store'
import { ClerkProvider, ClerkLoaded } from '@clerk/clerk-expo'

const tokenCache = {
  async getToken(key) {
    try {
      const item = await SecureStore.getItemAsync(key);
      console.log(`Retrieved token for ${key}: ${item}`);
      return item;
    } catch (error) {
      console.error('Error retrieving token:', error);
      return null;
    }
  },
  async saveToken(key, value) {
    try {
      console.log(`Saving token for ${key}`);
      await SecureStore.setItemAsync(key, value);
    } catch (error) {
      console.error('Error saving token:', error);
    }
  },
};



const publishableKey = process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY;
if (!publishableKey) {
  console.error("Clerk publishable key is missing");
}


export default function RootLayout() {
  const [fontsLoaded] = useFonts({
    "outfit": require('./../assets/fonts/Outfit-Regular.ttf'),
    "outfit-bold": require('./../assets/fonts/Outfit-Bold.ttf'),
    "outfit-medium": require('./../assets/fonts/Outfit-Medium.ttf'),
    "outfit-semi": require('./../assets/fonts/Outfit-SemiBold.ttf'),
  });

  if (!fontsLoaded) {
    return null; // Or some loading spinner
  }

  return (
    <ClerkProvider tokenCache={tokenCache} publishableKey={publishableKey}>
      <Stack>
        <Stack.Screen
          name="(tabs)"
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="login/index"
          options={{
            headerShown: false,
          }}
        />
      </Stack>
    </ClerkProvider>
  );
}

