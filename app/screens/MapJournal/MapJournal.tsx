import Map from "@/app/components/Map/Map";
import GenericButton from "@/app/components/Buttons/GenericButton";
import {View, Image} from "react-native";
import * as ImagePicker from 'expo-image-picker';

import styles from "./MapJournal.styles";
import React, {useEffect, useRef, useState} from "react";
import useUserLocation from "@/app/hooks/useUserLocation";
import MapView from "react-native-maps";

const MapJournal = () => {
    const [selectedImages, setSelectedImages] = useState<string[]>();
    const [zoomedToUserLocation, setZoomedToUserLocation] = useState<boolean>(false);
    
    const mapRef = useRef<MapView>(null);
    
    const { location, errorMsg } = useUserLocation();

    function moveMapToUser(latitude: number, longitude: number) {
        if (!mapRef.current) return;

        mapRef.current.animateToRegion({
            latitude: latitude,
            longitude: longitude,
            latitudeDelta: 0.02,
            longitudeDelta: 0.02,
        }, 500);
    }

    async function handleMoveMapToUserClick() {
        if (!mapRef.current || !location) return;
        moveMapToUser(location.coords.latitude, location.coords.longitude);
    }

    useEffect(() => {
        if (zoomedToUserLocation || !location || !mapRef.current) return;

        moveMapToUser(location.coords.latitude, location.coords.longitude);
        setZoomedToUserLocation(true);
    }, [location, mapRef]);

    async function getImages() {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ['images'],
            allowsMultipleSelection: true,
            aspect: [4, 3],
            exif: true
        });
        
        console.log(result);
        
        if (!result.canceled) {
            setSelectedImages(result.assets.map(a => a.uri));
            console.log(result.assets[0].exif);
        }
    }

    return (
        <>
            <Map 
                location={location?.coords}
                ref={mapRef}
            />
            <View
                style={styles.container}
            >
                <View style={styles.buttonContainer}>
                    <GenericButton label="+" onPressAsync={getImages} />
                    <GenericButton label="." onPressAsync={handleMoveMapToUserClick} />
                </View>
            </View>
        </>
    );
}

export default MapJournal;