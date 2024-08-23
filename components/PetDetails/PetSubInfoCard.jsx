import { View, Text, Image } from 'react-native'
import React from 'react'
import Colors from '../../constants/Colors'

export default function PetSubInfoCard({icon,title,value}) {
  return (
    <View style={{
        flexDirection: 'row',
        display:'flex',
        alignItems:'center',
        backgroundColor:Colors.WHITE,
        padding:10,
        margin:5,
        borderRadius:10,
        gap:10,
        flex:1
    }}>
        <Image source={icon} 
            style={{
                width: 40, 
                height: 40,
            }}
        />
        <View style={{
            flex:1
        }}>
            <Text style={{
                fontSize: 16,
                fontFamily:'outfit',
                color:Colors.GRAY
            }}>{title}</Text>
            <Text style={{
                fontSize: 16,
                fontFamily:'outfit-medium'
            }}>{value}</Text>
        </View>

    </View>
  )
}