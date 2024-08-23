import React from "react";
import { Tabs } from "expo-router";
import Ionicons from "@expo/vector-icons/Ionicons";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import Colors from "./../../constants/Colors";
import { View } from "react-native";

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors.PRIMARY,
        tabBarInactiveTintColor: Colors.GRAY,
        tabBarStyle: {
          backgroundColor: "#fff",
          borderTopWidth: 0,
          elevation: 0,
          shadowOpacity: 1,
          height: 70,
          paddingVertical: 10,
          borderTopRightRadius: 30,
          borderTopLeftRadius: 30,
          borderLeftColor: Colors.PRIMARY,
          borderRightColor: Colors.PRIMARY,
          borderTopColor: Colors.PRIMARY,
          borderWidth: 0.5,
          borderTopWidth: 3,
        },
        tabBarLabelStyle: {
          fontSize: 12,
          marginBottom: 6,
        },
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          title: "Home",
          headerShown: false,
          tabBarIcon: ({ color }) => (
            <Ionicons name="home" size={24} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="favorite"
        options={{
          title: "Favorite",
          headerShown: false,
          tabBarIcon: ({ color }) => (
            <MaterialIcons name="favorite" size={24} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="addPets"
        options={{
          title: "",
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <View
            style={{
              position: "absolute",
              bottom: 0, // Adjust this to position the icon above the tab bar
              borderWidth: 3, // Sets border width for all sides
              borderRadius: 99,
              padding: 10,
              backgroundColor: "#fff",
              borderColor: Colors.PRIMARY, // Sets color for the top border
            }}
            >
              <MaterialIcons name="pets" size={40} color={color} />
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="inbox"
        options={{
          title: "Inbox",
          headerShown: false,
          tabBarIcon: ({ color }) => (
            <FontAwesome name="inbox" size={24} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          headerShown: false,
          tabBarIcon: ({ color }) => (
            <Ionicons name="people-circle" size={24} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
