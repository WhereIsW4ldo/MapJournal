import {Stack} from "expo-router";
import {StatusBar} from "expo-status-bar";
import {Provider} from "react-redux";
import {PersistGate} from 'redux-persist/integration/react';
import store, {persistor} from "./stores/store";

export default function RootLayout() {
    return (
        <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
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
            </PersistGate>
            <StatusBar style="inverted" />
        </Provider>
    );
}
