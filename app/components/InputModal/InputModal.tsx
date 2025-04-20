import { View, Text, Modal, Pressable, ScrollView } from "react-native";
import { styles } from "./InputModal.styles";

type Props = {
    visible: boolean,
    title: string,
    onSubmit: () => void,
    onCancel: () => void,
    children?: React.ReactNode
};

const InputModal = ({visible, title, onSubmit, onCancel, children}: Props) => {
    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={visible}
            onRequestClose={onCancel}
        >
            <View style={styles.modalContainer}>
                <View style={styles.modalContent}>
                    <Text style={styles.title}>{title}</Text>
                    <ScrollView style={styles.contentContainer}>
                        {children}
                    </ScrollView>
                    <View style={styles.buttonContainer}>
                        <Pressable
                            onPress={() => onSubmit()}
                            style={styles.submitButton}
                        >
                            <Text style={styles.buttonText}>Submit</Text>
                        </Pressable>
                        <Pressable
                            onPress={onCancel}
                            style={styles.cancelButton}
                        >
                            <Text style={styles.buttonText}>Cancel</Text>
                        </Pressable>
                    </View>
                </View>
            </View>
        </Modal>
    );
};

export default InputModal;