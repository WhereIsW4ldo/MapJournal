import Map from "@/app/components/Map/Map";
import * as ImagePicker from "expo-image-picker";
import { useRouter } from "expo-router";

import React, { useEffect, useRef, useState } from "react";
import useUserLocation from "@/app/hooks/useUserLocation";
import MapView, { LatLng, Marker } from "react-native-maps";
import { useAppDispatch, useAppSelector } from "@/app/hooks/hooks";
import { View, Dimensions } from "react-native";
import styles from "@/app/components/ActionSheet/ActionSheet.styles";
import GenericButton from "@/app/components/Buttons/GenericButton";
import Gallery from "@/app/components/Gallery/Gallery";
import { addAlbumLocation } from "@/app/stores/albumLocationStore";
import { uuid } from "expo-modules-core";
import AlbumCreationModals from "@/app/components/AlbumCreationModals/AlbumCreationModals";
import AlbumPin from "../components/AlbumPin/AlbumPin";
import ActionSheet, { ActionSheetRef } from "react-native-actions-sheet";

const height = Dimensions.get("window").height;
export const acceptablePanPositions = [0, -(height * 0.5), -(height * 0.95)];

const MapJournal = () => {
  const [selectedImages, setSelectedImages] = useState<string[]>([]);

  const mapRef = useRef<MapView>(null);
  const actionSheetRef = useRef<ActionSheetRef>(null);

  const { location } = useUserLocation();
  const dispatch = useAppDispatch();
  const albumLocations = useAppSelector((state) => state.albumLocation);

  const router = useRouter();

  useEffect(() => {
    if (actionSheetRef.current) {
      actionSheetRef.current.show();
    }

  }, [actionSheetRef])

  function moveMapToUser(latitude: number, longitude: number) {
    if (!mapRef.current) return;

    mapRef.current.animateToRegion(
      {
        latitude: latitude,
        longitude: longitude,
        latitudeDelta: 0.02,
        longitudeDelta: 0.02,
      },
      500,
    );
  }

  async function handleMoveMapToUserClick() {
    if (!mapRef.current || !location) return;
    moveMapToUser(location.coords.latitude, location.coords.longitude);
  }

  function addImageAlbum(
    title: string,
    description: string,
    images: string[],
    coordinates: LatLng,
  ) {
    dispatch(
      addAlbumLocation({
        id: uuid.v4(),
        creationDate: new Date().toDateString(),
        title: title,
        description: description,
        images: images,
        coordinates: coordinates,
      }),
    );
  }

  async function getImages() {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
      allowsMultipleSelection: true,
      aspect: [4, 3],
      exif: true,
    });

    if (result.canceled) return;

    setSelectedImages(result.assets.map((a) => a.uri));
  }

  function handleAddImageAlbum(
    title: string,
    description: string,
    selectedImages: string[],
    coordinates: LatLng,
  ) {
    addImageAlbum(title, description, selectedImages, coordinates);
  }

  const handleAlbumPress = (id: string) => {
    console.log("id: ", id);
    router.push({
      pathname: "/screens/AlbumDetails",
      params: { id },
    });
  };

  return (
    <>
      <Map ref={mapRef}>
        {location && (
          <Marker
            tracksViewChanges={false}
            tracksInfoWindowChanges={false}
            coordinate={{
              latitude: location.coords.latitude,
              longitude: location.coords.longitude,
            }}
          />
        )}
        {albumLocations &&
          albumLocations.map((album) => (
            <AlbumPin
              key={album.id}
              id={album.id}
              coordinates={album.coordinates}
              firstImage={album.images[0]}
            />
          ))}
      </Map>
      <AlbumCreationModals
        selectedImages={selectedImages}
        handleAddImageAlbum={handleAddImageAlbum}
      />
      <ActionSheet gestureEnabled={true} snapPoints={[20, 40, 60]} initialSnapIndex={1} ref={actionSheetRef}>
        <View style={styles.buttonContainer}>
          <GenericButton label="+" onPressAsync={getImages} />
          <GenericButton label="." onPressAsync={handleMoveMapToUserClick} />
        </View>
        <View style={styles.bottomSheet}>
          <Gallery onAlbumPress={handleAlbumPress} />
        </View>
      </ActionSheet>
    </>
  );
};

export default MapJournal;
