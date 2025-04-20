import {Stack} from "expo-router";
import {StatusBar} from "expo-status-bar";
import {Provider} from "react-redux";
import store from "./stores/store";

export default function RootLayout() {
    return (
        <Provider store={store}>
            <Stack>
                <Stack.Screen
                    name="MapJournal"
                    options={{
                        headerShown: false,
                    }}
                />
                <Stack.Screen
                    name="AlbumDetails"
                    options={{
                        headerShown: false,
                    }}
                />
            </Stack>
            <StatusBar style="inverted" />
        </Provider>
    );
}
