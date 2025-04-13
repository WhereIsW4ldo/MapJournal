import MapView, {LatLng, Marker, PROVIDER_GOOGLE, Region} from "react-native-maps";
import styles from "./Map.styles";
import {forwardRef, useState} from "react";
import initialMapRegion from "@/app/components/Map/InitialMapRegion";

type Props = {
    location?: LatLng;
}

const Map = forwardRef<MapView, Props>(({location}: Props, ref) => {
    const [region, setRegion] = useState<Region>(initialMapRegion);
    
    return (
        <>
            <MapView
                style={styles.map}
                initialRegion={region}
                onRegionChangeComplete={setRegion}
                provider={PROVIDER_GOOGLE}
                ref={ref}
            >
                {location &&
                    <Marker coordinate={{latitude: location.latitude, longitude: location.longitude}}/>}
            </MapView>
        </>
    );
});

export default Map;