import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { combineReducers } from 'redux';
import imageLocationReducer from "./imageLocationStore";
import albumLocationReducer from "./albumLocationStore";

const persistConfig = {
    key: 'root',
    storage: AsyncStorage,
    whitelist: ['imageLocation', 'albumLocation'],
};

const rootReducer = combineReducers({
    imageLocation: imageLocationReducer,
    albumLocation: albumLocationReducer
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE'],
            },
        }),
});

export const persistor = persistStore(store);

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppStore = typeof store;