import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        padding: 10,
        marginBottom: 10,
    },
    mapContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    crosshair: {
        zIndex: 3,
        fontSize: 24,
        fontWeight: 'bold',
        position: 'absolute',
    },
    map: {
        flex: 1,
        height: 400,
        width: '100%',
        borderRadius: 10,
    },  
    errorMessage: {
        color: 'red',
        marginBottom: 10,
    },
}); 