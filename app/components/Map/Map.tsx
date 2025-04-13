import MapView, {Marker, PROVIDER_GOOGLE, Region} from "react-native-maps";
import styles from "./Map.styles";
import useUserLocation from "@/app/hooks/useUserLocation";
import {useEffect, useState} from "react";
import initialMapRegion from "@/app/components/Map/InitialMapRegion";

const Map = () => {
    const [region, setRegion] = useState<Region>(initialMapRegion);
    const [mapRef, setMapRef] = useState<MapView>();
    const [zoomedToUserLocation, setZoomedToUserLocation] = useState<boolean>(false);

    const {location, errorMsg} = useUserLocation();

    useEffect(() => {
        if (zoomedToUserLocation || !location || !mapRef) return;
        
        mapRef.animateToRegion({
            latitude: location.coords.latitude,
            longitude: location.coords.longitude,
            latitudeDelta: 0.02,
            longitudeDelta: 0.02,
        }, 500);
        setZoomedToUserLocation(true);
    }, [location, mapRef]);

    return (
        <>
            <MapView
                style={styles.map}
                initialRegion={region}
                onRegionChangeComplete={setRegion}
                provider={PROVIDER_GOOGLE}
                ref={(ref) => ref && setMapRef(ref)}
            >
                {location &&
                    <Marker coordinate={{latitude: location.coords.latitude, longitude: location.coords.longitude}}/>}
            </MapView>
        </>
    );
}

export default Map;