import {Image, View, Text, Pressable, TouchableOpacity} from "react-native";
import styles from "./Album.styles";

type Props = {
    title?: string;
    images: string[];
    id?: string;
    onRemove?: (id: string) => void;
    onPress?: () => void;
};

const Album = ({title, images, id, onRemove, onPress}: Props) => {
    return (
        <TouchableOpacity onPress={onPress}>
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
        </TouchableOpacity>
    );
};

export default Album;