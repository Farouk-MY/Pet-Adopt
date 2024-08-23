import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import React, { useEffect } from "react";
import { useLocalSearchParams, useNavigation, useRouter } from "expo-router";
import PetInfo from "../../components/PetDetails/PetInfo";
import PetSubInfo from "../../components/PetDetails/PetSubInfo";
import AboutPet from "../../components/PetDetails/AboutPet";
import OwnerInfo from "../../components/PetDetails/OwnerInfo";
import Colors from "../../constants/Colors";
import { useUser } from "@clerk/clerk-expo";
import { collection, doc, getDocs, query, setDoc, where } from "firebase/firestore";
import { db } from "../../config/FirebaseConfig";

export default function PetDetails() {
  const pet = useLocalSearchParams();
  const navigation = useNavigation();
  const {user}=useUser()
  const router = useRouter()

  useEffect(() => {
    navigation.setOptions({
      headerTransparent: true,
      headerTitle: "",
    });
  }, []);

  const InisiateChat =async ()=>{
    const docId1 = user?.primaryEmailAddress?.emailAddress+'_'+pet?.userEmail
    const docId2 = pet?.userEmail+'_'+user?.primaryEmailAddress?.emailAddress

    const q = query(collection(db,'Chat'),where('id','in',[docId1,docId2]))
    const snapshot = await getDocs(q)
    snapshot.forEach(doc=>{
       router.push({
         pathname:'/chat',
         params:{id:doc.id}
       })
    })
    if(snapshot.docs?.length==0)
    {
      await setDoc(doc(db,'Chat',docId1),{
        id:docId1,
        users:[
          {
            email:user?.primaryEmailAddress?.emailAddress,
            imageUrl:user?.imageUrl,
            name:user?.fullName
          },
          {
            email:pet?.userEmail,
            imageUrl:pet?.userImageUrl,
            name:pet?.username

          }
        ],
        userIds:[
          user?.primaryEmailAddress?.emailAddress,
          pet?.userEmail
        ]
      })
      router.push({
         pathname:'/chat',
         params:{id:docId1}
      })
    }
  }

  return (
    <View>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Pet Info */}
        <PetInfo pet={pet} />
        {/* Pet Sub Info */}
        <PetSubInfo pet={pet} />
        {/* about */}
        <AboutPet pet={pet} />
        {/* owner Details */}
        <OwnerInfo pet={pet} />

        <View style={{ height: 80 }}></View>
      </ScrollView>
      {/* Adopte Me Button */}
      <View style={styles.bottomConatiner}>
        <TouchableOpacity onPress={InisiateChat} style={styles.adoptbtn}>
          <Text
            style={{
              fontFamily: "outfit-medium",
              fontSize: 20,
              textAlign: "center",
            }}
          >
            Adopt Me
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  adoptbtn: {
    padding: 15,
    backgroundColor: Colors.PRIMARY,
    borderTopLeftRadius:30,
    borderTopRightRadius:30,
  },
  bottomConatiner: {
    position: "absolute",
    bottom: 0,
    width:'100%'
  },
});
