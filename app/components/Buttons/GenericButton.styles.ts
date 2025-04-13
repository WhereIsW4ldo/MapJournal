import {StyleSheet} from "react-native";

const genericButtonStyles = StyleSheet.create({
    pressable: {
        paddingLeft: 30,
        paddingBottom: 30,
        paddingRight: 30,
        paddingTop: 30,
    },
    text: {
        fontSize: 20,
        backgroundColor: "white",
        borderRadius: 30,
        width: 30,
        height: 30,
        textAlign: "center",
        borderStyle: "solid",
        borderColor: "black",
        borderWidth: 2,
    },
});

export default genericButtonStyles;