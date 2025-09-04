import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '@/store/store'

interface  PositionState {
  value: {
    position: boolean;
    section: string;
  };
}

const initialState: PositionState = {
  value: {
    position: false,
    section: "home",
  },
}

export const positionSlice = createSlice({
  name: 'position',
  initialState,
  reducers: {
    changePosition: (state, action: PayloadAction<boolean>) => {
      state.value.position = action.payload
    },
    changeSection: (state, action: PayloadAction<string>) => {
      state.value.section = action.payload
    },
  },
})

export const { changePosition, changeSection } = positionSlice.actions

export const selectPosition = (state: RootState) => state.position.value

export default positionSlice.reducer