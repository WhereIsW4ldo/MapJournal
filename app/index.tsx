import {View} from "react-native";
import MapJournal from "@/app/screens/MapJournal/MapJournal";
import {Provider} from "react-redux";
import store from "./stores/store";

function Index() {
    return (
        <Provider store={store}>
            <View
                style={{
                    flex: 1,
                }}
            >
                <MapJournal/>
            </View>
        </Provider>
    );
}

export default Index;