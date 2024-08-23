import {
  View,
  Text,
  Image,
  TextInput,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Pressable,
  ToastAndroid,
  ActivityIndicator,
} from "react-native";
import React, { useEffect, useState } from "react";
import Colors from "./../../constants/Colors";
import { Picker } from "@react-native-picker/picker";
import { collection, doc, getDocs, setDoc } from "firebase/firestore";
import { db, storage } from "../../config/FirebaseConfig";
import * as ImagePicker from "expo-image-picker";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { useUser } from "@clerk/clerk-expo";
import { useRouter } from "expo-router";
import LottieView from "lottie-react-native";

export default function AddPets() {
  const [formData, setFormData] = useState({
    category: "Dogs",
    sexe: "Male",
  });
  const [gender, setGender] = useState();
  const [categoryList, setCategoryList] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState();
  const [image, setImage] = useState();
  const [loader, setLoader] = useState(false);

  const { user } = useUser();
  const router = useRouter();

  useEffect(() => {
    getCategory();
  }, []);

  const getCategory = async () => {
    setCategoryList([]);
    const snapshot = await getDocs(collection(db, "Category"));
    snapshot.forEach((doc) => {
      setCategoryList((categoryList) => [...categoryList, doc.data()]);
    });
  };

  const imagePicker = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const handleInputChanges = (fieldName, fieldValue) => {
    setFormData((prev) => ({
      ...prev,
      [fieldName]: fieldValue,
    }));
  };

  const onSubmit = () => {
    if (Object.keys(formData).length !== 8) {
      ToastAndroid.show("Enter All Details", ToastAndroid.SHORT);
      return;
    }
    UploadImage();
  };

  const UploadImage = async () => {
    try {
      setLoader(true);
      const resp = await fetch(image);
      const blobImage = await resp.blob();
      const storageRef = ref(storage, "/" + Date.now() + ".jpg");

      await uploadBytes(storageRef, blobImage);
      const downloadUrl = await getDownloadURL(storageRef);
      await saveFormData(downloadUrl);
    } catch (error) {
      console.error("Error uploading image:", error);
      ToastAndroid.show("Failed to upload image", ToastAndroid.SHORT);
    } finally {
      setLoader(false);
    }
  };

  const saveFormData = async (imageUrl) => {
    const docId = Date.now().toString();
    await setDoc(doc(db, "Pets", docId), {
      ...formData,
      imageUrl: imageUrl,
      username: user?.fullName,
      userEmail: user?.primaryEmailAddress?.emailAddress,
      userImageUrl: user?.imageUrl,
      id: docId,
    });
    setLoader(false);
    router.replace("/(tabs)/home");
  };

  return (
    <ScrollView
      style={{
        padding: 20,
        paddingTop: 40,
      }}
    >
      <View style={{ paddingBottom: 50 }}>
        <Text
          style={{
            fontSize: 20,
            fontFamily: "outfit-medium",
          }}
        >
          Add New Pet For Adoption
        </Text>
        <Pressable onPress={imagePicker}>
          {!image ? (
            <Image
              source={require("./../../assets/images/placeholder.jpg")}
              style={{
                width: 100,
                height: 100,
                borderRadius: 15,
                borderWidth: 2,
                borderColor: Colors.GRAY,
              }}
            />
          ) : (
            <Image
              source={{ uri: image }}
              style={{
                width: 100,
                height: 100,
                borderRadius: 15,
              }}
            />
          )}
        </Pressable>

        <View style={styles.inputConatainer}>
          <Text style={styles.label}>Pet Name *</Text>
          <TextInput
            style={styles.input}
            onChangeText={(value) => {
              handleInputChanges("name", value);
            }}
          />
        </View>

        <View style={styles.inputConatainer}>
          <Text style={styles.label}>Pet Category *</Text>
          <Picker
            selectedValue={selectedCategory}
            onValueChange={(itemValue, itemIndex) => {
              setSelectedCategory(itemValue),
                handleInputChanges("category", itemValue);
            }}
            style={styles.input}
          >
            {categoryList.map((category, index) => (
              <Picker.Item
                key={index}
                label={category.name}
                value={category.name}
              />
            ))}
          </Picker>
        </View>

        <View style={styles.inputConatainer}>
          <Text style={styles.label}>Breed *</Text>
          <TextInput
            style={styles.input}
            onChangeText={(value) => {
              handleInputChanges("breed", value);
            }}
          />
        </View>
        <View style={styles.inputConatainer}>
          <Text style={styles.label}>Age *</Text>
          <TextInput
            style={styles.input}
            keyboardType="number-pad"
            onChangeText={(value) => {
              handleInputChanges("age", value);
            }}
          />
        </View>

        <View style={styles.inputConatainer}>
          <Text style={styles.label}>Gender *</Text>
          <Picker
            selectedValue={gender}
            onValueChange={(itemValue, itemIndex) => {
              setGender(itemValue), handleInputChanges("sexe", itemValue);
            }}
            style={styles.input}
          >
            <Picker.Item label="Male" value="Male" />
            <Picker.Item label="Female" value="Female" />
          </Picker>
        </View>

        <View style={styles.inputConatainer}>
          <Text style={styles.label}>Weight *</Text>
          <TextInput
            style={styles.input}
            keyboardType="number-pad"
            onChangeText={(value) => {
              handleInputChanges("weight", value);
            }}
          />
        </View>
        <View style={styles.inputConatainer}>
          <Text style={styles.label}>Address *</Text>
          <TextInput
            style={styles.input}
            onChangeText={(value) => {
              handleInputChanges("adresse", value);
            }}
          />
        </View>
        <View style={styles.inputConatainer}>
          <Text style={styles.label}>About *</Text>
          <TextInput
            style={styles.input}
            onChangeText={(value) => {
              handleInputChanges("about", value);
            }}
            numberOfLines={5}
            multiline={true}
          />
        </View>
        <TouchableOpacity
          disabled={loader}
          onPress={onSubmit}
          style={styles.button}
        >
          {loader ? (
            <View style={styles.lottieContainer}>
              <LottieView
                source={require("../../constants/animation/animation2.json")} // Replace with your Lottie animation path
                autoPlay
                loop
                style={styles.lottieStyle}
              />
            </View>
          ) : (
            <Text
              style={{
                fontFamily: "outfit-medium",
                textAlign: "center",
              }}
            >
              Submit
            </Text>
          )}
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  inputConatainer: {
    marginVertical: 5,
  },
  input: {
    padding: 15,
    borderRadius: 7,
    backgroundColor: Colors.WHITE,
    fontFamily: "outfit",
  },
  label: {
    marginVertical: 5,
    fontFamily: "outfit",
  },
  button: {
    padding: 15,
    backgroundColor: Colors.PRIMARY,
    borderRadius: 7,
    marginVertical: 10,
  },
  lottieContainer: {
    position: "absolute",
    top: "50%", // Center vertically
    left: "50%", // Center horizontally
    transform: [{ translateX: -50 }, { translateY: -50 }], // Center the animation
    zIndex: 1,
  },
  lottieStyle: {
    width: 100,
    height: 100,
  },
});
