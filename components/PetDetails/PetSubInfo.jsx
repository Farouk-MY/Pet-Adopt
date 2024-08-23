import { View, Text, Image } from "react-native";
import React from "react";
import Colors from "../../constants/Colors";
import PetSubInfoCard from "./PetSubInfoCard";

export default function PetSubInfo({ pet }) {
  return (
    <View
      style={{
        paddingHorizontal: 20,
      }}
    >
      <View
        style={{
          flexDirection: "row",
          display: "flex",
        }}
      >
        <PetSubInfoCard
          icon={require("./../../assets/images/calendar.png")}
          title={"Age"}
          value={pet?.age}
        />
        <PetSubInfoCard
          icon={require("./../../assets/images/bone.png")}
          title={"Breed"}
          value={pet?.breed}
        />
      </View>
      <View
        style={{
          flexDirection: "row",
          display: "flex",
        }}
      >
        <PetSubInfoCard
          icon={require("./../../assets/images/sexe.png")}
          title={"Sex"}
          value={pet?.sexe}
        />
        <PetSubInfoCard
          icon={require("./../../assets/images/weight.png")}
          title={"Weight"}
          value={pet?.weight+" Kg"}
        />
      </View>
    </View>
  );
}
