import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Alert, TouchableOpacity } from 'react-native';
import { collection, getDocs, query, where, deleteDoc, doc } from 'firebase/firestore';
import { useUser } from '@clerk/clerk-expo';
import Ionicons from 'react-native-vector-icons/Ionicons';
import UserItem from '../../components/Inbox/UserItem';
import { db } from './../../config/FirebaseConfig';

export default function Inbox() {
  const { user } = useUser();
  const [userList, setUserList] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    user && getUserList();
  }, [user]);

  const getUserList = async () => {
    setLoading(true);
    setUserList([]);
    const q = query(
      collection(db, 'Chat'),
      where("userIds", "array-contains", user?.primaryEmailAddress?.emailAddress)
    );
    const querySnapshot = await getDocs(q);
  
    const fetchedUsers = [];
    querySnapshot.forEach((doc) => {
      fetchedUsers.push(doc.data());
    });

    console.log("Fetched users:", fetchedUsers);
    setUserList(fetchedUsers);
    setLoading(false);
  };

  const MapOtherUserList = () => {
    const currentUserEmail = user?.primaryEmailAddress?.emailAddress;
  
    const filteredUsers = userList.flatMap((record) => {
      const otherUsers = record.users?.filter(
        (user) => user.email !== currentUserEmail
      );
  
      console.log("Filtered Users for Record ID:", record.id, otherUsers);
  
      return otherUsers?.map((user) => ({
        docId: record.id,
        ...user,
      })) || [];
    });
  
    console.log("Final List of Other Users:", filteredUsers);
    return filteredUsers;
  };

  const handleDeleteChat = async (docId) => {
    try {
      console.log("Attempting to delete document with ID:", docId);
      await deleteDoc(doc(db, 'Chat', docId));
      console.log("Document deleted successfully");
      Alert.alert('Success', 'Chat deleted successfully');
      getUserList();
    } catch (error) {
      console.error("Error deleting document: ", error);
      Alert.alert('Error', 'Failed to delete chat');
    }
  };

  const renderItem = ({ item }) => (
    <View style={{ flexDirection: 'row', alignItems: 'center', padding: 10 }}>
      <TouchableOpacity onPress={() => handleDeleteChat(item.docId)}>
        <Ionicons name="trash-bin-outline" size={24} color="red" />
      </TouchableOpacity>
      <UserItem userInfo={item} />
    </View>
  );

  return (
    <View style={{ padding: 20, marginTop: 20 }}>
      <Text style={{ fontSize: 30, fontFamily: 'outfit-medium' }}>Inbox</Text>
      <FlatList
        data={MapOtherUserList()}
        refreshing={loading}
        onRefresh={getUserList}
        style={{ marginTop: 20 }}
        renderItem={renderItem}
        keyExtractor={(item) => item.docId}
      />
    </View>
  );
}
