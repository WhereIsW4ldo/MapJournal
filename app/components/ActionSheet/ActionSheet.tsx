import styles from "@/app/components/ActionSheet/ActionSheet.styles";
import {Animated, PanResponder, View} from "react-native";
import {ReactElement, useEffect, useRef, useState} from "react";
import {GetClosestPanPosition} from "@/app/components/ActionSheet/ActionSheetService";

type Props = {
    children: string | ReactElement | ReactElement[],
    acceptedPanPositions?: number[],
};

const ActionSheet = ({children, acceptedPanPositions}: Props) => {
    const [pan, setPan] = useState(new Animated.ValueXY());

    const panResponder = useRef(
        PanResponder.create({
            onMoveShouldSetPanResponder: () => true,
            onMoveShouldSetPanResponderCapture: () => false,
            onPanResponderMove: (evt, gestureState) => {
                return Animated.event(
                    [
                        null,
                        {dx: pan.x, dy: pan.y}
                    ],
                    {useNativeDriver: false}
                )(evt, gestureState);
            },
            onPanResponderRelease: () => {
                console.log('release', pan);
                pan.flattenOffset();
                const y = GetClosestPanPosition(parseInt(JSON.stringify(pan.y)), acceptedPanPositions);
                Animated.spring(pan, {
                    toValue: {
                        x: 0,
                        y: y
                    },
                    useNativeDriver: false,
                }).start();
            }
        })).current;

    useEffect(() => {
        console.log('panY: ', pan.y);
    }, [pan.y]);

    return (
        <View style={styles.container}>
            <Animated.View
                style={{
                    transform: [{translateY: pan.y}],
                }}
                {...panResponder.panHandlers}>
                {children}
            </Animated.View>
        </View>
    );
}

export default ActionSheet;