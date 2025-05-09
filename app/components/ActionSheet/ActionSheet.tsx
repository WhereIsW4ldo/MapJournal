import styles from "@/app/components/ActionSheet/ActionSheet.styles";
import {Animated, PanResponder, View} from "react-native";
import {ReactElement, useEffect, useMemo, useRef, useState} from "react";
import {GetClosestPanPosition} from "@/app/components/ActionSheet/ActionSheetService";

type Props = {
    children: string | ReactElement | ReactElement[],
    acceptedPanPositions?: number[],
};

const ActionSheet = (
    {
        children,
        acceptedPanPositions
    }: Props) => {
    const pan = useRef(new Animated.ValueXY()).current;

    const panResponder = useRef(
        PanResponder.create({
            onMoveShouldSetPanResponder: () => true,
            onMoveShouldSetPanResponderCapture: () => true,
            onStartShouldSetPanResponder: () => false,
            onPanResponderStart: (e) => {
                pan.extractOffset();
            },
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