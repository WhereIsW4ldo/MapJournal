import Map from "@/app/components/Map/Map";
import GenericButton from "@/app/components/Buttons/GenericButton";
import {View, Image} from "react-native";
import * as ImagePicker from 'expo-image-picker';

import styles from "./MapJournal.styles";
import React, {useState} from "react";

const MapJournal = () => {
    const [selectedImages, setSelectedImages] = useState<string[]>();

    async function getImages() {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ['images'],
            allowsMultipleSelection: true,
            aspect: [4, 3]
        });
        
        console.log(result);
        
        if (!result.canceled) {
            setSelectedImages(result.assets.map(a => a.uri));
        }
    }

    return (
        <>
            <Map/>
            <View
                style={styles.container}
            >
                {
                    selectedImages 
                    && selectedImages.length > 0 
                        ? selectedImages.map((image, i) => <Image key={i} style={{ height: 200, width: 200 }} source={{ uri: image}}/>) 
                        : null
                }
                <View style={styles.buttonContainer}>
                    <GenericButton label="+" onPressAsync={getImages} />
                </View>
            </View>
        </>
    );
}

export default MapJournal;