import React, { useCallback } from "react";
import { View, Text, Pressable, Image } from "react-native";
import Colors from '../../constants/Colors';
import { useOAuth } from '@clerk/clerk-expo';
import * as Linking from 'expo-linking';
import { useRouter } from 'expo-router';

export default function LoginScreen() {
  const { startOAuthFlow } = useOAuth({ strategy: 'oauth_google' });
  const router = useRouter();

  const onPress = useCallback(async () => {
    try {
      const { createdSessionId } = await startOAuthFlow({
        redirectUrl: Linking.createURL('/(tabs)/home', { scheme: 'myapp' }),
      });

      if (createdSessionId) {
        // Use router.replace to navigate to the home screen
        router.replace('/(tabs)/home'); 
      }
    } catch (err) {
      console.error('OAuth error', err);
    }
  }, [router, startOAuthFlow]);

  return (
    <View style={{ backgroundColor: Colors.WHITE, height: '100%' }}>
      <Image source={require("./../../assets/images/login.png")} style={{ width: "100%", height: 440 }} />
      <View style={{ display: "flex", padding: 20, alignItems: "center" }}>
        <Text style={{ fontSize: 26, fontFamily: "outfit-bold", textAlign: 'center' }}>
          Ready To Make A New Friends
        </Text>
        <Text style={{ fontSize: 18, fontFamily: "outfit", textAlign: 'center', color: Colors.GRAY }}>
          Let's adopt the pet which you like and make their life happy again
        </Text>
        <Pressable onPress={onPress} style={{ backgroundColor: Colors.PRIMARY, padding: 14, marginTop: 45, width: '100%', borderRadius: 14 }}>
          <Text style={{ fontSize: 20, fontFamily: "outfit", textAlign: "center" }}>
            Get Started
          </Text>
        </Pressable>
      </View>
    </View>
  );
}
