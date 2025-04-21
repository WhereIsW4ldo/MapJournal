import { View, Text, TextInput } from "react-native";
import InputModal from "../InputModal/InputModal";
import Album from "../Album/Album";
import MapView from "react-native-maps";
import { styles } from "./AlbumCreationModals.styles";

interface AlbumCreationModalsProps {
    addAlbumState: number;
    title: string;
    description: string;
    selectedImages: string[];
    region: {
        latitude: number;
        longitude: number;
        latitudeDelta: number;
        longitudeDelta: number;
    };
    setTitle: (text: string) => void;
    setDescription: (text: string) => void;
    setRegion: (region: any) => void;
    setAddAlbumState: (state: number) => void;
    endAddImageAlbum: () => void;
    handleAddImageAlbum: (title: string, description: string, images: string[], region: any) => void;
}

const AlbumCreationModals = ({
    addAlbumState,
    title,
    description,
    selectedImages,
    region,
    setTitle,
    setDescription,
    setRegion,
    setAddAlbumState,
    endAddImageAlbum,
    handleAddImageAlbum,
}: AlbumCreationModalsProps) => {
    return (
        <>
            <InputModal
                visible={addAlbumState === 1}
                title='Enter album title'
                onSubmit={() => setAddAlbumState(2)}
                onCancel={endAddImageAlbum}
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
                onSubmit={() => handleAddImageAlbum(title, description, selectedImages, region)}
                onCancel={endAddImageAlbum}
            >
                <View style={styles.mapContainer}>  
                    <Text style={styles.crosshair}>+</Text>
                    <MapView
                        style={styles.map}
                        region={region}
                        onRegionChangeComplete={setRegion}
                    />
                </View>
            </InputModal>
        </>
    );
};

export default AlbumCreationModals; 