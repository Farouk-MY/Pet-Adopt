import { View, Text, FlatList, StyleSheet } from "react-native";
import React, { useEffect, useState, useCallback } from "react";
import Shared from "./../../Shared/Shared";
import { useUser } from "@clerk/clerk-expo";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../../config/FirebaseConfig";
import PetListItem from "./../../components/Home/PetListItem";
import LottieView from "lottie-react-native";

export default function Favorite() {
  const { user } = useUser();
  const [favIds, setFavIds] = useState([]);
  const [favPetList, setFavPetList] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user) {
      GetFavPetId();
    }
  }, [user]);

  const GetFavPetId = useCallback(async () => {
    setLoading(true);
    const result = await Shared.getFavList(user);
    if (result?.favorites?.length > 0) {
      setFavIds(result.favorites);
    }
    setLoading(false);
  }, [user]);

  useEffect(() => {
    if (favIds.length > 0) {
      GetFavPetList(favIds);
    }
  }, [favIds]);

  const GetFavPetList = useCallback(async (favId_) => {
    setLoading(true);
    try {
      const q = query(collection(db, "Pets"), where("id", "in", favId_));
      const querySnapshot = await getDocs(q);
      const pets = querySnapshot.docs.map(doc => doc.data());
      setFavPetList(pets);
    } catch (error) {
      console.error("Error fetching favorite pets:", error);
    }
    setLoading(false);
  }, []);

  const renderItem = useCallback(({ item }) => (
    <View>
      <PetListItem pet={item} />
    </View>
  ), []);

  return (
    <View style={{ flex: 1, padding: 20, paddingTop: 23 }}>
      <Text style={{ fontSize: 27, fontFamily: "outfit-medium" }}>
        Favorite
      </Text>
      <FlatList
        data={favPetList}
        renderItem={renderItem}
        numColumns={2}
        vertical={true}
        showsVerticalScrollIndicator={false}
        keyExtractor={(item) => item.id.toString()}
        onRefresh={GetFavPetId}
        refreshing={false}
      />
      {loading && (
        <View style={styles.lottieContainer}>
          <LottieView
            source={require('../../constants/animation/animation2.json')} // Replace with your Lottie animation path
            autoPlay
            loop
            style={styles.lottieStyle}
          />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  lottieContainer: {
    position: 'absolute',
    top: 20, // Adjust top value to move the animation down from the top
    left: '50%',
    transform: [{ translateX: -30 },{ translateY: 30 }], // Adjust to center horizontally
    zIndex: 1,
  },
  lottieStyle: {
    width: 100,
    height: 100,
  },
});
