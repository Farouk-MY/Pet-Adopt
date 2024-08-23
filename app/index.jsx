import React, { useEffect, useState } from "react";
import { useUser, useSession } from "@clerk/clerk-expo";
import { Redirect, useNavigation } from "expo-router";
import { View, Text, StatusBar } from "react-native";
import LottieView from "lottie-react-native";

export default function Index() {
  const { user, isLoaded, isSignedIn } = useUser();
  const { session } = useSession();
  const navigation = useNavigation();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    navigation.setOptions({
      headerShown: false,
      headerTitle: "",
    });

    const timer = setTimeout(() => {
      setLoading(false);
    }, 3500);

    return () => clearTimeout(timer);
  }, [navigation]);

  if (loading || !isLoaded) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <StatusBar barStyle="light-content" backgroundColor="#000000" />
        <LottieView
          source={require('./../constants/animation/animation1.json')}
          autoPlay
          loop
          style={{ width: 200, height: 200 }}
        />
        <Text
          style={{
            fontSize: 18,
            fontFamily: "outfit-medium",
          }}
        >
          Loading...
        </Text>
      </View>
    );
  }

  if (!isSignedIn || !session) {
    return (
      <>
        <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />
        <Redirect href="/login" />
      </>
    );
  }

  return (
    <>
      <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />
      <Redirect href="/(tabs)/home" />
    </>
  );
}
