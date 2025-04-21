import { View, Text } from "react-native";
import { useAppSelector } from "@/app/hooks/hooks";
import MapView, { Marker } from "react-native-maps";
import ActionSheet from "../components/ActionSheet/ActionSheet";
import { acceptablePanPositions } from "./MapJournal";
import Album from "../components/Album/Album";
import { useLocalSearchParams } from "expo-router";
import { styles } from "./AlbumDetails.styles";

const AlbumDetails = () => {
    const { id } = useLocalSearchParams<{ id: string }>();
    const album = useAppSelector(state => state.albumLocation.find(album => album.id === id));

    if (!album) {
        return (
            <View>
                <Text>Album not found</Text>
            </View>
        );
    }

    return (
        <>
            <View style={styles.container}>
                <Text style={styles.title}>{album.title}</Text>
                <Text style={styles.description}>{album.description}</Text>
                {album.coordinates && (
                    <MapView
                        style={styles.map}
                        region={{
                            latitude: album.coordinates?.latitude,
                            longitude: album.coordinates?.longitude,
                            latitudeDelta: 0.02,
                            longitudeDelta: 0.02,
                        }}
                        >
                            <Marker
                                coordinate={{
                                    latitude: album.coordinates?.latitude,
                                    longitude: album.coordinates?.longitude,
                                }}
                            />
                    </MapView>
                )}
            </View>
            <ActionSheet
                acceptedPanPositions={acceptablePanPositions}
            >
                <View style={styles.albumContainer}>
                    <Album images={album.images}/>
                </View>
            </ActionSheet>
        </>
    );
};

export default AlbumDetails;