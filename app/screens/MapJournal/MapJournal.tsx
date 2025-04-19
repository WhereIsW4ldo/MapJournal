import Map from "@/app/components/Map/Map";
import * as ImagePicker from 'expo-image-picker';

import React, {useEffect, useRef, useState} from "react";
import useUserLocation from "@/app/hooks/useUserLocation";
import MapView, {LatLng} from "react-native-maps";
import {addImageLocation} from "@/app/stores/imageLocationStore";
import {useAppDispatch, useAppSelector} from "@/app/hooks/hooks";
import ActionSheet from "@/app/components/ActionSheet/ActionSheet";
import {useWindowDimensions, View} from "react-native";
import styles from "@/app/components/ActionSheet/ActionSheet.styles";
import GenericButton from "@/app/components/Buttons/GenericButton";

const MapJournal = () => {
    const { height } = useWindowDimensions();
    const acceptablePanPositions = [0, -(height * 0.5), -(height * 0.95)];
    
    const [selectedImages, setSelectedImages] = useState<string[]>();
    const [zoomedToUserLocation, setZoomedToUserLocation] = useState<boolean>(false);

    const mapRef = useRef<MapView>(null);

    const {location, errorMsg} = useUserLocation();
    const dispatch = useAppDispatch();
    const imageLocations = useAppSelector(state => state.imageLocation);

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
            result.assets.map(a =>
                dispatch(addImageLocation({
                    id: a.uri,
                    creationDate: "test",
                    imageUrl: a.uri,
                    coordinates: {latitude: 2, longitude: 3},
                }))
            );
        }
    }

    useEffect(() => {
        console.log('imageLocations: ', imageLocations);
    }, [imageLocations]);

    return (
        <>
            <Map
                location={location?.coords}
                ref={mapRef}
            />
            <ActionSheet
                acceptedPanPositions={acceptablePanPositions}
            >
                <View style={styles.buttonContainer}>
                    <GenericButton label="+" onPressAsync={getImages}/>
                    <GenericButton label="." onPressAsync={handleMoveMapToUserClick}/>
                </View>
                <View style={styles.bottomSheet} />
            </ActionSheet>
        </>
    );
}

export default MapJournal;