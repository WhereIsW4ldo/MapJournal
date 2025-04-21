import { View, Text, TextInput } from "react-native";
import InputModal from "../InputModal/InputModal";
import Album from "../Album/Album";
import MapView, { LatLng, Marker, PROVIDER_GOOGLE } from "react-native-maps";
import { styles } from "./AlbumCreationModals.styles";
import initialMapRegion from "../Map/InitialMapRegion";
import { useEffect, useState } from "react";

interface AlbumCreationModalsProps {
    selectedImages: string[];
    handleAddImageAlbum: (title: string, description: string, images: string[], coordinates: LatLng) => void;
}

const AlbumCreationModals = ({
    selectedImages,
    handleAddImageAlbum,
}: AlbumCreationModalsProps) => {

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [coordinates, setCoordinates] = useState<LatLng>();

    const [addAlbumState, setAddAlbumState] = useState(0);

    const [errorMessage, setErrorMessage] = useState<string>();

    useEffect(() => {
        if (selectedImages.length === 0)
            setAddAlbumState(0);
        else
            setAddAlbumState(1);
    }, [selectedImages]);

    const clearState = () => {
        setTitle('');
        setDescription('');
        setCoordinates(undefined);
        setAddAlbumState(0);
    }

    const handleSubmit = () => {
        if (!coordinates) {
            setErrorMessage('Please choose a location for the album');
            return;
        }
        handleAddImageAlbum(title, description, selectedImages, coordinates);
        clearState();
    }

    const handleCancel = () => {
        clearState();
    }

    return (
        <>
            <InputModal
                visible={addAlbumState === 1}
                title='Enter album title'
                onSubmit={() => setAddAlbumState(2)}
                onCancel={handleCancel}
            >
                <TextInput
                    style={styles.input}
                    onChangeText={setTitle}
                    value={title}
                    placeholder="Enter title here..."
                />
                <TextInput
                    style={styles.input}
                    onChangeText={setDescription}
                    value={description}
                    placeholder="Enter description here..."
                    multiline={true}
                    numberOfLines={4}
                />
                <Album images={selectedImages}/>
            </InputModal>
            <InputModal
                visible={addAlbumState === 2}
                title='Choose coordinates for album'
                onSubmit={handleSubmit}
                onCancel={handleCancel}
            >
                
                <View style={styles.mapContainer}>  
                {errorMessage && (
                    <Text style={styles.errorMessage}>{errorMessage}</Text>
                )}
                    <MapView
                        style={styles.map}
                        initialRegion={initialMapRegion()}
                        onPress={(e) => setCoordinates(e.nativeEvent.coordinate)}
                        showsMyLocationButton={false}
                        showsPointsOfInterest={false}
                        showsCompass={false}
                        showsScale={false}
                        showsIndoorLevelPicker={false}
                        loadingEnabled={true}
                        moveOnMarkerPress={false}
                        provider={PROVIDER_GOOGLE}
                    >
                        {coordinates && (
                            <Marker
                                coordinate={coordinates}
                                tracksViewChanges={true}
                                tracksInfoWindowChanges={false}
                            />
                        )}
                    </MapView>
                </View>
            </InputModal>
        </>
    );
};

export default AlbumCreationModals; 