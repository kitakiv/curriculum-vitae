import { configureStore } from '@reduxjs/toolkit';
import themeReducer from "@/features/theme/themeSlice"
import positionReducer from "@/features/position/PositionSlice"


const store = configureStore({
    reducer: {
      theme: themeReducer,
      position: positionReducer
    },
  })

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export default store;