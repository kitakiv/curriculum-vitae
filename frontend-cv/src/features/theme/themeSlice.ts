import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '@/store/store'
import theme from '@/variables/theme/theme';

interface ThemeState {
  value: string
}

const initialState: ThemeState = {
  value: "static",
}

export const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    changeTheme: (state, action: PayloadAction<string>) => {
      if (theme[action.payload as keyof typeof theme]) {
        state.value = action.payload;
      }
    },
  },
})

export const { changeTheme } = themeSlice.actions

export const selectTheme = (state: RootState) => state.theme.value

export default themeSlice.reducer