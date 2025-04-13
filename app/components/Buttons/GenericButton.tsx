import {Pressable, Text} from "react-native";
import styles from "./AddImageButton/AddImageButton.styles";

type Props = {
  label: string;
  onPressAsync?: () => Promise<void>;
};

const GenericButton = ({ label, onPressAsync } : Props) => {    
    return (
        <Pressable
            onPress={onPressAsync}
            style={styles.pressable}
        >
            <Text style={styles.text}>{label}</Text>
        </Pressable>
    );
}

export default GenericButton;