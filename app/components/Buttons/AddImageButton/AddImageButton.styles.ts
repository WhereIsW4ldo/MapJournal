import {StyleSheet} from "react-native";
import genericButtonStyles from "../GenericButton.styles";

const styles = StyleSheet.create({
    ...genericButtonStyles,
    pressable: {
        justifyContent: "flex-end",
        alignItems: "flex-start",
    },
});

export default styles;