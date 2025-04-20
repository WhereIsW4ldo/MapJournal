import {Image, View, Text, Button, Pressable} from "react-native";
import styles from "@/app/components/Album/Album.styles";

type Props = {
    images: string[],
    title?: string,
    id?: string,
    onRemove?: (id: string) => void,
};

const Album = ({title, images, id, onRemove}: Props) => {
    return (
        <View style={styles.container}>
            <View style={styles.header}>
                {title && ( 
                    <Text>
                        {title}
                    </Text>
                )}
                {onRemove && id && (
                    <Pressable onPress={() => onRemove(id)}>
                        <Text style={styles.removeButton}>Remove</Text>
                    </Pressable>
                )}
            </View>
            
            <View style={styles.imageList}>
                {images.map(image => <Image key={image} source={{uri: image}} style={styles.image}/>)}
            </View>
        </View>
    );
};

export default Album;