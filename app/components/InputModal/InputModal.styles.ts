import { StyleSheet, Dimensions } from 'react-native';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');
const MODAL_WIDTH = SCREEN_WIDTH * 0.8;
const MODAL_MAX_HEIGHT = SCREEN_HEIGHT * 0.8;

export const styles = StyleSheet.create({
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.5)'
    },
    modalContent: {
        backgroundColor: 'white',
        padding: 20,
        borderRadius: 10,
        width: MODAL_WIDTH,
        maxHeight: MODAL_MAX_HEIGHT,
        overflow: 'hidden'
    },
    title: {
        fontSize: 18,
        marginBottom: 15,
        fontWeight: 'bold'
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        marginTop: 10
    },
    submitButton: {
        backgroundColor: '#007AFF',
        padding: 10,
        borderRadius: 5,
        minWidth: 80,
        alignItems: 'center'
    },
    buttonText: {
        color: 'white',
        fontWeight: 'bold'
    },
    contentContainer: {
        maxHeight: MODAL_MAX_HEIGHT - 120, // Account for title, input, and button space
        overflow: 'scroll'
    },
    cancelButton: {
        backgroundColor: 'gray',
        padding: 10,
        borderRadius: 5,
        minWidth: 80,
        alignItems: 'center',
    }
}); 