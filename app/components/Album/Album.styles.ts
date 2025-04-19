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
    }
});

export default styles;