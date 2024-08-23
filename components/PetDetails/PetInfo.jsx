import { View, Text, Image } from "react-native";
import React from "react";
import Colors from "../../constants/Colors";
import Ionicons from "@expo/vector-icons/Ionicons";
import MarkFav from "../MarkFav";

const PetInfo = ({ pet }) => {
  return (
    <View>
      <Image
        source={{ uri: pet.imageUrl }}
        style={{ width: "100%", height: 380, objectFit: "cover" }}
        onError={(error) => {
          console.log("Error loading image", error.nativeEvent.error);
        }}
      />
      <View
        style={{
          padding: 20,
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems:'center'
        }}
      >
        <View>
          <Text style={{ fontSize: 27, fontFamily: "outfit-bold" }}>
            {pet?.name}
          </Text>
          <Text
            style={{
              fontSize: 16,
              fontFamily: "outfit",
              color: Colors.GRAY,
            }}
          >
            {" "}
            {pet?.adresse}{" "}
          </Text>
        </View>
        <MarkFav pet={pet}/>
      </View>
    </View>
  );
};

export default PetInfo;
