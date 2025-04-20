import { useEffect, useState } from "react";
import { View, Text, Modal, TextInput, Pressable, ScrollView } from "react-native";
import { styles } from "./InputModal.styles";

type Props = {
    visible: boolean,
    title: string,
    onSubmit: (input: string) => void,
    children?: React.ReactNode
};

const InputModal = ({visible, title, onSubmit, children}: Props) => {
    const [input, setInput] = useState('');

    useEffect(() => {
        setInput('');
    }, [visible]);

    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={visible}
        >
            <View style={styles.modalContainer}>
                <View style={styles.modalContent}>
                    <Text style={styles.title}>{title}</Text>
                    <ScrollView style={styles.contentContainer}>
                        <TextInput
                            style={styles.input}
                            onChangeText={setInput}
                            value={input}
                            placeholder="Enter text here..."
                        />
                        {children}
                    </ScrollView>
                    <View style={styles.buttonContainer}>
                        <Pressable
                            onPress={() => onSubmit(input)}
                            style={styles.submitButton}
                        >
                            <Text style={styles.buttonText}>Submit</Text>
                        </Pressable>
                    </View>
                </View>
            </View>
        </Modal>
    );
};

export default InputModal;