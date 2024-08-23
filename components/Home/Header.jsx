import { View, Text, Image } from "react-native";
import React, { useEffect } from "react";
import { useUser } from "@clerk/clerk-expo";

const Header = () => {
  const { user, isLoaded } = useUser();

  useEffect(() => {
    console.log('User in Header:', user);
  }, [user]);

  if (!isLoaded) {
    return <Text>Loading...</Text>;
  }

  return (
    <View style={{
        flexDirection: 'row',
        display:'flex',
        justifyContent:'space-between',
        alignItems:'center'
    }}>
      <View>
        <Text
          style={{
            fontFamily: "outfit",
            fontSize: 18,
          }}
        >
          Welcome,
        </Text>
        <Text
          style={{
            fontFamily: "outfit-medium",
            fontSize: 25,
          }}
        >
          {user?.fullName || 'Loading...'}
        </Text>
      </View>
      <Image
        source={{ uri: user?.imageUrl || 'https://example.com/default-image.png' }}
        style={{
          width: 50,
          height: 50,
          borderRadius: 99
        }}
      />
    </View>
  );
};

export default Header;
