import Map from "@/app/components/Map/Map";
import * as ImagePicker from 'expo-image-picker';

import React, {useEffect, useRef, useState} from "react";
import useUserLocation from "@/app/hooks/useUserLocation";
import MapView, {LatLng} from "react-native-maps";
import {useAppDispatch, useAppSelector} from "@/app/hooks/hooks";
import ActionSheet from "@/app/components/ActionSheet/ActionSheet";
import {useWindowDimensions, View} from "react-native";
import styles from "@/app/components/ActionSheet/ActionSheet.styles";
import GenericButton from "@/app/components/Buttons/GenericButton";
import Gallery from "@/app/components/Gallery/Gallery";
import {addAlbumLocation} from "@/app/stores/albumLocationStore";
import {uuid} from "expo-modules-core";
import InputModal from "@/app/components/InputModal/InputModal";
import Album from "@/app/components/Album/Album";

const MapJournal = () => {
    const {height} = useWindowDimensions();
    const acceptablePanPositions = [0, -(height * 0.5), -(height * 0.95)];

    const [selectedImages, setSelectedImages] = useState<string[]>([]);
    const [zoomedToUserLocation, setZoomedToUserLocation] = useState<boolean>(false);
    const [modalVisible, setModalVisible] = useState<boolean>(false);

    const mapRef = useRef<MapView>(null);

    const {location, errorMsg} = useUserLocation();
    const dispatch = useAppDispatch();
    const imageLocations = useAppSelector(state => state.imageLocation);
    const albumLocations = useAppSelector(state => state.albumLocation);

    useEffect(() => {
        console.log('albumLocations: ', albumLocations);
    }, [albumLocations]);

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
        dispatch(addAlbumLocation({
            id: uuid.v4(),
            creationDate: (new Date()).toDateString(),
            title: title,
            images: images,
        }));
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
        
        if (result.canceled) return;

        setSelectedImages(result.assets.map(a => a.uri));
        setModalVisible(true);
    }

    function handleAddImageAlbum(input: string) {
        addImageAlbum(input, selectedImages);
        setModalVisible(false);

        setSelectedImages([]);
    }

    return (
        <>
            <Map
                location={location?.coords}
                ref={mapRef}
            />
            <InputModal
                visible={modalVisible}
                title='Enter album title'
                onSubmit={handleAddImageAlbum}
            >
                <Album images={selectedImages}/>
            </InputModal>
            <ActionSheet
                acceptedPanPositions={acceptablePanPositions}
            >
                <View style={styles.buttonContainer}>
                    <GenericButton label="+" onPressAsync={getImages}/>
                    <GenericButton label="." onPressAsync={handleMoveMapToUserClick}/>
                </View>
                <View style={styles.bottomSheet}>
                    <Gallery />
                </View>
            </ActionSheet>
        </>
    );
}

export default MapJournal;