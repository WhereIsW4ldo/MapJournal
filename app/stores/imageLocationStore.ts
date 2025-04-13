import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {LatLng} from "react-native-maps";

type ImageLocation = {
    id: string;
    creationDate: string;
    imageUrl: string;
    coordinates: LatLng;
}

const initialState: ImageLocation[] = [];

const imageLocationSlice = createSlice({
    name: 'imageLocation',
    initialState: initialState,
    reducers: {
        addImageLocation: (state, action: PayloadAction<ImageLocation>) => {
            const existingImageIndex = state.findIndex(s => s.id === action.payload.id);

            if (existingImageIndex >= 0) {
                state[existingImageIndex] = action.payload;
                return;
            }

            state.push(action.payload);
        },
        removeImageLocation: (state, action: PayloadAction<ImageLocation>) => {
            const existingImageIndex = state.findIndex(s => s.id === action.payload.id);

            if (existingImageIndex >= 0) {
                state.splice(existingImageIndex, 1);
            }
        }
    }
});

export const {addImageLocation, removeImageLocation} = imageLocationSlice.actions;
export default imageLocationSlice.reducer;