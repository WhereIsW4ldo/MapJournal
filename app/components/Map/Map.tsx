import MapView, {LatLng, Marker, PROVIDER_GOOGLE, Region} from "react-native-maps";
import styles from "./Map.styles";
import {forwardRef, useState} from "react";
import initialMapRegion from "@/app/components/Map/InitialMapRegion";

type Props = {
    children?: React.ReactNode;
}

const Map = forwardRef<MapView, Props>(({children}: Props, ref) => {
    return (
        <>
            <MapView
                style={styles.map}
                initialRegion={initialMapRegion()}
                showsMyLocationButton={false}
                showsPointsOfInterest={false}
                showsCompass={false}
                showsScale={false}
                showsIndoorLevelPicker={false}
                loadingEnabled={true}
                moveOnMarkerPress={false}
                provider={PROVIDER_GOOGLE}
                ref={ref}
            >
                {children}
            </MapView>
        </>
    );
});

export default Map;