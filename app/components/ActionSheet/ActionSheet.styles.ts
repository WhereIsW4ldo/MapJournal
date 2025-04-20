import {Dimensions, StyleSheet} from "react-native";

const screenWidth = Dimensions.get("window").width;
const screenHeight = Dimensions.get("window").height;

console.log(screenHeight);

const styles = StyleSheet.create({
    container: {
        position: "absolute",
        top: screenHeight * 0.8,
        height: "100%",
        width: '100%',
        alignItems: 'center',
    },
    buttonContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        padding: 30,
    },
    bottomSheet: {
        height: '100%',
        width: screenWidth,
        backgroundColor: 'white',
        borderRadius: 10,
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        padding: 10,
        marginBottom: 15,
        borderRadius: 5,
        width: '100%'
    },
    map: {
        flex: 1,
        height: 400,
        width: '100%',
        borderRadius: 10,
    }
});

export default styles;