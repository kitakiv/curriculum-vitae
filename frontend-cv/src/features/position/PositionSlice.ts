import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '@/store/store'

interface  PositionState {
  value: {
    position: boolean;
    section: string;
    burgerMenu: boolean;
    burgerMenuAdmin: boolean;
  };
}

const initialState: PositionState = {
  value: {
    position: false,
    section: "home",
    burgerMenu: false,
    burgerMenuAdmin: false
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

    toggleBurgerMenu: (state) => {
      state.value.burgerMenu = !state.value.burgerMenu
    },
    toggleBurgerMenuAdmin: (state) => {
      state.value.burgerMenuAdmin = !state.value.burgerMenuAdmin
    }
  },
})

export const { changePosition, changeSection, toggleBurgerMenu, toggleBurgerMenuAdmin } = positionSlice.actions

export const selectPosition = (state: RootState) => state.position.value

export default positionSlice.reducer