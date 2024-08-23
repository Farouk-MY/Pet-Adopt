import React from "react";
import Header from "../../components/Home/Header";
import { SafeAreaView } from "react-native-safe-area-context";
import Slider from "../../components/Home/Slider";
import PetListByCategory from "../../components/Home/PetListByCategory";
import { StatusBar } from "react-native";

export default function HomeScreen() {
  return (
    <SafeAreaView style={{ padding: 20 }}>
      {/* Header */}
      <Header />
      {/* Slider */}
      <Slider />
      {/* Category + List OF Pets */}
      <PetListByCategory />
      
      <StatusBar barStyle={"dark-content"} />
    </SafeAreaView>
  );
}
