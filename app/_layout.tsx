import {Stack} from "expo-router";
import {StatusBar} from "expo-status-bar";
import {Provider} from "react-redux";
import store from "./stores/store";

export default function RootLayout() {
    return (
        <Provider store={store}>
            <Stack screenOptions={{
                headerShown: false,
            }}>
                <Stack.Screen
                    name="MapJournal"
                />
                <Stack.Screen
                    name="AlbumDetails"
                />
            </Stack>
            <StatusBar style="inverted" />
        </Provider>
    );
}
