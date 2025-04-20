import {StyleSheet} from "react-native";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "flex-start",
        justifyContent: "flex-start",
        alignSelf: "flex-start",
    },
    imageList: {
        alignItems: "flex-start",
        justifyContent: "flex-start",
        flexDirection: "row",
        flexWrap: "wrap",
    },
    image: {
        width: 100,
        height: 100,
    },
    header: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        width: "100%",
    },
    removeButton: {
        fontSize: 16,
        fontWeight: "bold",
        textDecorationLine: "underline",
        color: "red",
    }
});

export default styles;