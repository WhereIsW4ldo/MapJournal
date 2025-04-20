import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {LatLng} from "react-native-maps";

export type AlbumLocation = {
    id: string;
    creationDate: string;
    title: string;
    images: string[];
    description?: string;
    coordinates?: LatLng;
}

const initialState: AlbumLocation[] = [];

const albumLocationSlice = createSlice({
    name: 'imageLocation',
    initialState: initialState,
    reducers: {
        addAlbumLocation: (state, action: PayloadAction<AlbumLocation>) => {
            state.push(action.payload);
        },
        updateAlbumLocation: (state, action: PayloadAction<AlbumLocation>) => {
            const existingImageIndex = state.findIndex(s => s.id === action.payload.id);
            
            if (existingImageIndex >= 0) {
                state[existingImageIndex] = action.payload;
                return;
            }
        },
        removeAblumLocation: (state, action: PayloadAction<{ id: string }>) => {
            const existingImageIndex = state.findIndex(s => s.id === action.payload.id);

            if (existingImageIndex >= 0) {
                state.splice(existingImageIndex, 1);
            }
        }
    }
});

export const {addAlbumLocation, updateAlbumLocation, removeAblumLocation} = albumLocationSlice.actions;
export default albumLocationSlice.reducer;