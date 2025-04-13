import { configureStore} from "@reduxjs/toolkit";
import imageLocationReducer from "./imageLocationStore";

const store = configureStore({
    reducer: {
        imageLocation: imageLocationReducer
    }
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppStore = typeof store;