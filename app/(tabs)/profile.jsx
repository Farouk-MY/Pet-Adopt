import { View, Text, Image, FlatList, TouchableOpacity } from "react-native";
import React from "react";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useAuth, useUser } from "@clerk/clerk-expo";
import Colors from './../../constants/Colors';
import { useRouter } from "expo-router";

export default function Profile() {
  const { user, isLoaded } = useUser();
  const router = useRouter();
  const { signOut } = useAuth();

  const Menu = [
    {
      id: 1,
      name: "Add New Pet",
      icon: "add-circle",
      path: "/(tabs)/addPets",
    },
    {
      id: 5,
      name: "My Post",
      icon: "bookmark",
      path: "./../user-post",
    },
    {
      id: 2,
      name: "Favorites",
      icon: "heart",
      path: "/(tabs)/favorite",
    },
    {
      id: 3,
      name: "Inbox",
      icon: "chatbubble",
      path: "/(tabs)/inbox",
    },
    {
      id: 4,
      name: "Logout",
      icon: "exit",
      path: "logout",
    }
  ];

  const onPressMenu = async (menu) => {
    if (menu.path === 'logout') {
      try {
        await signOut();
        console.log('Signed out successfully');
        router.replace('/login'); // Navigate to login page after logout
      } catch (error) {
        console.error('Error signing out:', error);
      }
    } else {
      router.push(menu.path);
    }
  };

  if (!isLoaded) {
    return <Text>Loading...</Text>; // Show loading state while user data is being loaded
  }

  return (
    <FlatList 
      ListHeaderComponent={
        <>
          <Text
            style={{
              fontFamily: "outfit-medium",
              fontSize: 30,
              marginTop: 25,
            }}
          >
            Profile
          </Text>
          <View style={{
            display: 'flex',
            alignItems: 'center',
            marginVertical: 20
          }}>
            <Image 
              source={{ uri: user?.imageUrl || 'https://example.com/default-image.png' }}
              style={{
                width: 110,
                height: 110,
                borderRadius: 99,
                marginTop: 6
              }}
            />
            <Text style={{ fontFamily: 'outfit-bold', fontSize: 20 }}>
              {user?.fullName || 'Loading...'}
            </Text>
            <Text style={{ fontFamily: 'outfit', fontSize: 16, color: Colors.GRAY }}>
              {user?.primaryEmailAddress?.emailAddress || 'Loading...'}
            </Text>
          </View>
        </>
      }
      data={Menu}
      renderItem={({ item }) => (
        <TouchableOpacity onPress={() => onPressMenu(item)} key={item?.id} style={{
          marginVertical: 10,
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          gap: 10,
          backgroundColor: Colors.WHITE,
          padding: 10,
          borderRadius: 10
        }}>
          <Ionicons name={item?.icon} size={32} style={{
            padding: 10,
            backgroundColor: Colors.LIGHT_PRIMARY,
            borderRadius: 10
          }} color={Colors.PRIMARY} />
          <Text style={{
            fontFamily: 'outfit',
            fontSize: 20
          }}>
            {item?.name}
          </Text>
        </TouchableOpacity>
      )}
      keyExtractor={item => item.id.toString()}
      contentContainerStyle={{ paddingHorizontal: 20 }}
    />
  );
}
