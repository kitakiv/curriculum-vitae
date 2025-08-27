import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '@/store/store'

interface  PositionState {
  value: true |false
}

const initialState: PositionState = {
  value: false,
}

export const positionSlice = createSlice({
  name: 'position',
  initialState,
  reducers: {
    changePosition: (state, action: PayloadAction<boolean>) => {
      state.value = action.payload
    },
  },
})

export const { changePosition } = positionSlice.actions

export const selectPosition = (state: RootState) => state.position.value

export default positionSlice.reducer