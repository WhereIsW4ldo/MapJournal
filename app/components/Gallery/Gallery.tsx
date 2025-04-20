import {FlatList} from "react-native";
import styles from "@/app/components/Gallery/Gallery.styles";
import Album from "@/app/components/Album/Album";
import {useAppSelector} from "@/app/hooks/hooks";
import {removeAblumLocation} from "@/app/stores/albumLocationStore";
import {useAppDispatch} from "@/app/hooks/hooks";

type Props = {
    onAlbumPress: (id: string) => void;
};

const Gallery = ({ onAlbumPress }: Props) => {
    const dispatch = useAppDispatch();
    const albumLocations = useAppSelector(state => state.albumLocation);

    function removeAlbumLocation(id: string) {
        dispatch(removeAblumLocation({id}));
    }

    return (
        <FlatList
            style={styles.container}
            data={albumLocations}
            keyExtractor={item => item.id}
            renderItem={({item}) => (
                <Album 
                    title={item.title} 
                    images={item.images} 
                    id={item.id} 
                    onRemove={removeAlbumLocation}
                    onPress={() => onAlbumPress(item.id)}
                />
            )}
        />
    );
}

export default Gallery;