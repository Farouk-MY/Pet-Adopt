import { View, FlatList, Image, Text } from 'react-native';
import React, { useEffect, useState } from 'react';
import Category from './Category';
import { collection, getDocs, limit, query, where } from 'firebase/firestore';
import { db } from '../../config/FirebaseConfig';
import PetListItem from './PetListItem';
import Colors from '../../constants/Colors';

export default function PetListByCategory() {
  const [petList, setPetList] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getPetsList('Cats');
  }, []);

  const getPetsList = async (category) => {
    try {
      setLoading(true);
      const q = query(collection(db, 'Pets'), where('category', '==', category), limit(20)); // Fetch only 20 items at a time
      const querySnapshot = await getDocs(q);
      const pets = querySnapshot.docs.map(doc => doc.data());
  
      setPetList(prevList => [...prevList, ...pets]); // Append new data to existing list
    } catch (error) {
      console.error("Error fetching pets: ", error);
    } finally {
      setLoading(false);
    }
  };
  

  return (
    <View>
      <Category category={(value) => getPetsList(value)} />

      {petList.length === 0 && !loading ? (
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
          style={{ marginTop: 13 }}
          data={petList}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          refreshing={loading}
          onRefresh={() => getPetsList('Cats')}
          keyExtractor={(item, index) => index.toString()} // Ensure FlatList items have unique keys
          renderItem={({ item }) => <PetListItem pet={item} />}
        />
      )}
    </View>
  );
}
