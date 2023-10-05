import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { RootState } from '../../app/store';

function makeArray(n: number): number[] {
    return [...Array(n).keys()].map((i) => i + 1);
  }
  
  function makeArray2D(n: number): number[][] {
    return Array(n)
      .fill(0)
      .map(() => new Array(n).fill(0));
  }

const initialSize = 3;


export const squareSlice = createSlice({
    name: "square",
    initialState: {
        size: initialSize,
        numbers: makeArray(initialSize*initialSize),
        squares: makeArray2D(initialSize)
    },
    reducers: {
        changeSize: (state, {payload}: PayloadAction<number>) => {
            const newSize: number = payload;
            console.log(newSize);
            state.size = newSize;
            state.numbers = makeArray(newSize*newSize);
            state.squares = makeArray2D(newSize);
        },
        loadSquare: (state, {payload}: PayloadAction<string>) => {
            const newSquares: number[][] = JSON.parse(payload); 
            state.squares = newSquares;
            state.size = newSquares.length;
            state.numbers = []; // TODO: keep numbers not in newSquare
        }
    }
})

export const selectNumbers = (state: RootState) => state.square.numbers
export const selectSquares = (state: RootState) => state.square.squares
export const selectSize = (state: RootState) => state.square.size
export const { changeSize, loadSquare } = squareSlice.actions;
export default squareSlice.reducer;


