import { View, Text, Image } from 'react-native'
import React from 'react'
import Colors from "../../constants/Colors";
import { Link } from 'expo-router';


export default function UserItem({ userInfo }) {
    console.log("User Info:", userInfo); // Debug log
  
    return (
      <Link href={`/chat?id=${userInfo.docId}`}>
        <View style={{ marginVertical: 7, flexDirection: 'row', alignItems: 'center', gap: 10 }}>
          <Image
            source={{ uri: userInfo?.imageUrl }}
            style={{ width: 50, height: 50, borderRadius: 25 }}
            resizeMode='cover'
          />
          <Text style={{ fontSize: 20, fontFamily: 'outfit' }}>
            {userInfo?.name}
          </Text>
        </View>
        <View style={{ borderWidth: 0.2, marginVertical: 7, borderColor: Colors.GRAY }}/>
      </Link>
    );
  }
  