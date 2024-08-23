import {
  View,
  Text,
  FlatList,
  Pressable,
  StyleSheet,
  Alert,
  Image,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useNavigation } from "expo-router";
import { collection, query, where, onSnapshot, deleteDoc, doc } from "firebase/firestore";
import { db } from "../../config/FirebaseConfig";
import { useUser } from "@clerk/clerk-expo";
import PetListItem from "./../../components/Home/PetListItem";
import Colors from "../../constants/Colors";

export default function UserPost() {
  const navigation = useNavigation();
  const { user } = useUser();
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    navigation.setOptions({
      title: "User Post",
    });

    if (user) {
      const unsubscribe = GetUserPost();
      return () => unsubscribe(); // Cleanup the listener when component unmounts
    }
  }, [user]);

  const GetUserPost = () => {
    try {
      setLoading(true);
      setPosts([]);
      const q = query(
        collection(db, "Pets"),
        where("userEmail", "==", user?.primaryEmailAddress?.emailAddress)
      );

      // Set up a real-time listener for the query
      const unsubscribe = onSnapshot(q, (querySnapshot) => {
        querySnapshot.forEach((doc) => {
          setPosts((prev) => [...prev, doc.data()]);
        });
      });
      setLoading(false);

      return unsubscribe; // Return the unsubscribe function to clean up the listener
    } catch (error) {
      console.error("Error fetching user posts:", error);
    }
  };

  const onDeletePost = (docId) => {
    Alert.alert("Do You Want To Delete This Post?", "Are You Use ?", [
      {
        text: "Cancel",
        style: "cancel",
        onPress: () => console.log("Cancled"),
      },
      {
        text: "Delete",
        style: "destructive",
        onPress: () => deletePost(docId)
      },
    ]);
  };

  const deletePost = async (docId)=>{
    await deleteDoc(doc(db,'Pets',docId))
    GetUserPost()
  }

  return (
    <View
      style={{
        padding: 20,
      }}
    >
      <Text
        style={{
          fontSize: 20,
          fontFamily: "outfit-medium",
        }}
      >
        UserPost
      </Text>
      {posts.length === 0 && !loading ? (
        <View style={{ marginTop:15,justifyContent:"center",alignItems:'center',flexDirection:'column' }}>
          <Image
            source={require('../../assets/images/empty.png')}
            style={{ width: 200, height: 200 }}
            resizeMode="contain"

          />
          <Text style={{
            fontFamily: "outfit-medium",
            color: Colors.GRAY,
            fontSize: 16,
            marginBottom:10
          }}>No pets available</Text>
        </View>
      ) : (
      <FlatList
        data={posts}
        numColumns={2}
        refreshing={loading}
        onRefresh={GetUserPost}
        showsVerticalScrollIndicator={false}
        renderItem={({ item, index }) => (
          <View>
            <PetListItem pet={item} key={index} />
            <Pressable
              onPress={() => onDeletePost(item?.id)}
              style={styles.deleteButton}
            >
              <Text
                style={{
                  textAlign: "center",
                  fontFamily: "outfit",
                }}
              >
                Delete
              </Text>
            </Pressable>
          </View>
        )}
      />)}
    </View>
  );
}

const styles = StyleSheet.create({
  deleteButton: {
    backgroundColor: Colors.LIGHT_PRIMARY,
    padding: 5,
    borderRadius: 7,
    marginTop: 5,
    marginRight: 10,
  },
});
