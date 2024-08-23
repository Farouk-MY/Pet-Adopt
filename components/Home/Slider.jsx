import { View, Image, StyleSheet, Dimensions, FlatList } from 'react-native';
import React, { useEffect, useState, useRef } from 'react';
import { collection, getDocs } from "firebase/firestore";
import { db } from './../../config/FirebaseConfig';

export default function Slider() {
    const [sliderList, setSliderList] = useState([]);
    const flatListRef = useRef(null);
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        getSliders();
    }, []);

    useEffect(() => {
        if (sliderList.length > 0) {
            const interval = setInterval(() => {
                setCurrentIndex(prevIndex => {
                    const nextIndex = prevIndex + 1;
                    if (nextIndex < sliderList.length) {
                        flatListRef.current.scrollToIndex({ index: nextIndex, animated: true });
                        return nextIndex;
                    } else {
                        flatListRef.current.scrollToIndex({ index: 0, animated: true });
                        return 0;
                    }
                });
            }, 3000); // Change image every 3 seconds

            return () => clearInterval(interval); // Cleanup on unmount
        }
    }, [sliderList]);

    const getSliders = async () => {
        const snapshot = await getDocs(collection(db, 'Sliders'));
        const sliders = snapshot.docs.map(doc => doc.data());
        setSliderList(sliders);
    };

    return (
        <View style={{ marginTop: 15 }}>
            <FlatList
                data={sliderList}
                horizontal={true}
                ref={flatListRef}
                showsHorizontalScrollIndicator={false}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item }) => (
                    <View>
                        <Image
                            source={{ uri: item?.imageUrl }}
                            style={styles.sliderImage}
                        />
                    </View>
                )}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    sliderImage: {
        width: Dimensions.get('screen').width * 0.9,
        height: 160,
        borderRadius: 20,
        marginRight: 15,
    },
});
