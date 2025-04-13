import {View} from "react-native";
import MapJournal from "@/app/screens/MapJournal/MapJournal";

function Index() {
    return (
        <View
            style={{
                flex: 1,
            }}
        >
            <MapJournal />
        </View>
    );
}

export default Index;