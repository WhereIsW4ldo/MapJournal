import Map from "@/app/components/Map/Map";
import * as ImagePicker from 'expo-image-picker';
import { useRouter } from 'expo-router';

import React, {useEffect, useRef, useState} from "react";
import useUserLocation from "@/app/hooks/useUserLocation";
import MapView, {LatLng, Marker, Region} from "react-native-maps";
import {useAppDispatch, useAppSelector} from "@/app/hooks/hooks";
import ActionSheet from "@/app/components/ActionSheet/ActionSheet";
import {View, Dimensions} from "react-native";
import styles from "@/app/components/ActionSheet/ActionSheet.styles";
import GenericButton from "@/app/components/Buttons/GenericButton";
import Gallery from "@/app/components/Gallery/Gallery";
import {addAlbumLocation} from "@/app/stores/albumLocationStore";
import {uuid} from "expo-modules-core";
import {initialRegion} from "@/app/constants/initialRegion";
import AlbumCreationModals from "@/app/components/AlbumCreationModals/AlbumCreationModals";


const height = Dimensions.get('window').height;
export const acceptablePanPositions = [0, -(height * 0.5), -(height * 0.95)];

const MapJournal = () => {
    const [title, setTitle] = useState<string>('');
    const [description, setDescription] = useState<string>('');
    const [selectedImages, setSelectedImages] = useState<string[]>([]);
    const [zoomedToUserLocation, setZoomedToUserLocation] = useState<boolean>(false);
    const [addAlbumState, setAddAlbumState] = useState<number>(0);
    const [region, setRegion] = useState<Region>(initialRegion());

    const mapRef = useRef<MapView>(null);

    const {location, errorMsg} = useUserLocation();
    const dispatch = useAppDispatch();
    const imageLocations = useAppSelector(state => state.imageLocation);
    const albumLocations = useAppSelector(state => state.albumLocation);

    const router = useRouter();

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
    
    function addImageAlbum(title: string, description: string, images: string[], coordinates: LatLng) {
        dispatch(addAlbumLocation({
            id: uuid.v4(),
            creationDate: (new Date()).toDateString(),
            title: title,
            description: description,
            images: images,
            coordinates: coordinates,
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
        setAddAlbumState(1);
    }

    function handleAddImageAlbum(title: string, description: string, selectedImages: string[], region: Region) {
        addImageAlbum(title, description, selectedImages, {
            latitude: region.latitude,
            longitude: region.longitude,
        });

        endAddImageAlbum();
    }

    function endAddImageAlbum() {
        setSelectedImages([]);
            setTitle('');
            setDescription('');
        setAddAlbumState(0);
    }

    const handleAlbumPress = (id: string) => {
        console.log('id: ', id);
        router.push({
            pathname: "/screens/AlbumDetails",
            params: { id }
        });
    };

    return (
        <>
            <Map
                ref={mapRef}
            >
                {location &&
                    <Marker coordinate={{latitude: location.coords.latitude, longitude: location.coords.longitude}}/>}
            </Map>
            <AlbumCreationModals
                addAlbumState={addAlbumState}
                title={title}
                description={description}
                selectedImages={selectedImages}
                region={region}
                setTitle={setTitle}
                setDescription={setDescription}
                setRegion={setRegion}
                setAddAlbumState={setAddAlbumState}
                endAddImageAlbum={endAddImageAlbum}
                handleAddImageAlbum={handleAddImageAlbum}
            />
            <ActionSheet
                acceptedPanPositions={acceptablePanPositions}
            >
                <View style={styles.buttonContainer}>
                    <GenericButton label="+" onPressAsync={getImages}/>
                    <GenericButton label="." onPressAsync={handleMoveMapToUserClick}/>
                </View>
                <View style={styles.bottomSheet}>
                    <Gallery onAlbumPress={handleAlbumPress} />
                </View>
            </ActionSheet>
        </>
    );
}

export default MapJournal;