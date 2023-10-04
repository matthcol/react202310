import { createSlice } from '@reduxjs/toolkit'
import { RootState } from '../../app/store';

export const squareSlice = createSlice({
    name: "square",
    initialState: {
        size: 3
    },
    reducers: {
        changeSize: (state, action) => {
            state.size = action.payload
        }
    }
})

export const selectSize = (state: RootState) => state.square.size
export const { changeSize } = squareSlice.actions;
export default squareSlice.reducer;


