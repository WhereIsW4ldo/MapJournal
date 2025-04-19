import {FlatList} from "react-native";
import styles from "@/app/components/Gallery/Gallery.styles";
import Album from "@/app/components/Album/Album";

export type Section = {
    title: string,
    data: string[],
};

type Props = {
    imageAlbums: Section[],
};

const Gallery = ({imageAlbums}: Props) => {
    return (
        <FlatList
            style={styles.container}
            data={imageAlbums}
            keyExtractor={(item, index) => item.title + index.toString()}
            renderItem={({item}) => <Album title={item.title} images={item.data}/>}
        />
    );
}

export default Gallery;