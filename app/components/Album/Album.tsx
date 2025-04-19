import {Image, View, Text} from "react-native";
import styles from "@/app/components/Album/Album.styles";

type Props = {
    title: string,
    images: string[],
};

const Album = ({title, images}: Props) => {
    return (
        <View style={styles.container}>
            <Text>
                {title}
            </Text>
            <View style={styles.imageList}>
                {images.map(image => <Image key={image} source={{uri: image}} style={styles.image}/>)}
            </View>
        </View>
    );
};

export default Album;