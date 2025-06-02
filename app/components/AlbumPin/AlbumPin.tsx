import { router } from "expo-router";
import { useState } from "react";
import { View, Image } from "react-native";
import { LatLng, Marker } from "react-native-maps";

type Props = {
    coordinates: LatLng;
    firstImage: string;
    id: string;
}

const AlbumPin = ({ coordinates, firstImage, id }: Props) => {
    const handleAlbumPress = (id: string) => {
        router.push({
            pathname: "/screens/AlbumDetails",
            params: { id }
        });
    }

    return (
        <Marker
            coordinate={coordinates}
            tracksViewChanges={true}
            tracksInfoWindowChanges={false}
            onPress={() => handleAlbumPress(id)}
        >
            <View style={{ 
                width: 40, 
                height: 40, 
                borderRadius: 20, 
                overflow: 'hidden',
                padding: 2 // Add small padding to prevent cutoff
            }}>
                <Image 
                    source={{ uri: firstImage }} 
                    style={{ 
                        width: '100%', 
                        height: '100%',
                        borderRadius: 19 // Slightly smaller than container to prevent cutoff
                    }}
                    resizeMode="cover"
                />
            </View>
        </Marker>
    );
}

export default AlbumPin;
