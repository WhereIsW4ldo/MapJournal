import Map from "@/app/components/Map/Map";
import * as ImagePicker from 'expo-image-picker';

import React, {useEffect, useRef, useState} from "react";
import useUserLocation from "@/app/hooks/useUserLocation";
import MapView from "react-native-maps";
import {useAppDispatch, useAppSelector} from "@/app/hooks/hooks";
import ActionSheet from "@/app/components/ActionSheet/ActionSheet";
import {useWindowDimensions, View} from "react-native";
import styles from "@/app/components/ActionSheet/ActionSheet.styles";
import GenericButton from "@/app/components/Buttons/GenericButton";
import Gallery, {Section} from "@/app/components/Gallery/Gallery";

const MapJournal = () => {
    const {height} = useWindowDimensions();
    const acceptablePanPositions = [0, -(height * 0.5), -(height * 0.95)];

    const [selectedImages, setSelectedImages] = useState<string[]>();
    const [imageAlbums, setImageAlbums] = useState<Section[]>([]);
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
    
    function addImageAlbum(title: string, images: string[]) {
        setImageAlbums(imageAlbums => [...imageAlbums, {title, data: images}]);
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
        
        if (result.canceled) return;
        setSelectedImages(result.assets.map(a => a.uri));
    }

    async function getLocationForBundle() {
        
    }

    useEffect(() => {
        console.log('imageLocations: ', imageLocations);
    }, [imageLocations]);

    useEffect(() => {
        if (!selectedImages) return;
        addImageAlbum('My images', selectedImages);
    }, [selectedImages]);

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
                <View style={styles.bottomSheet}>
                    <Gallery imageAlbums={imageAlbums} />
                </View>
            </ActionSheet>
        </>
    );
}

export default MapJournal;