import { View, Pressable } from "react-native";
import React, { useEffect, useState } from "react";
import Shared from "./../Shared/Shared";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useUser } from "@clerk/clerk-expo";

export default function MarkFav({ pet,color='black' }) {
  const { user } = useUser();
  const [favList, setFavList] = useState([]);
  
  useEffect(() => {
    if (user) {
      getFav();
    }
  }, [user]);

  const getFav = async () => {
    try {
      const result = await Shared.getFavList(user);
      setFavList(result?.favorites || []);
    } catch (error) {
      console.error("Error fetching favorites", error);
    }
  };

  const updateFavList = (newFavList) => {
    setFavList(newFavList);
  };

  const AddToFav = async () => {
    const updatedFavList = [...favList, pet.id];
    updateFavList(updatedFavList);
    try {
      await Shared.UpdateFav(user, updatedFavList);
    } catch (error) {
      console.error("Error adding to favorites", error);
    }
  };

  const RemoveFav = async () => {
    const updatedFavList = favList.filter((item) => item !== pet.id);
    updateFavList(updatedFavList);
    try {
      await Shared.UpdateFav(user, updatedFavList);
    } catch (error) {
      console.error("Error removing from favorites", error);
    }
  };

  return (
    <View>
      {favList.includes(pet.id) ? (
        <Pressable onPress={RemoveFav}>
          <Ionicons name="heart" size={30} color="red" />
        </Pressable>
      ) : (
        <Pressable onPress={AddToFav}>
          <Ionicons name="heart-outline" size={30} color={color} />
        </Pressable>
      )}
    </View>
  );
}
