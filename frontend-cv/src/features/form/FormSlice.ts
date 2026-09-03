import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '@/store/store'
import {Resource} from '@/variables/admin/resource'
import { GridRowId } from '@mui/x-data-grid';
// Define a type for the slice state
export interface FormState {
    formDeleteMany: {
        ids: GridRowId[];
        isOpen: boolean;
        resourceType: Resource | null;
    }
}

// Define the initial state using that type
const initialState: FormState = {
    formDeleteMany: {
        ids: [],
        isOpen: false,
        resourceType: null
    }
}

export enum FORMS {
    formDeleteMany = 'formDeleteMany'
}

interface AddIds {
    form: FORMS;
    ids: GridRowId[];
}

interface ChangeResource {
    form: FORMS;
    resourceType: Resource;
}

interface ChangeResourceIds {
    form: FORMS;
    resourceType: Resource;
    ids: GridRowId[];
}

export const formSlice = createSlice({
  name: 'form',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    // Use the PayloadAction type to declare the contents of `action.payload`
    toggleForm: (state, action: PayloadAction<FORMS>) => {
      state[action.payload].isOpen = !state[action.payload].isOpen
    },
    addIds: (state, action: PayloadAction<AddIds>) => {
      state[action.payload.form].ids = [
        ...action.payload.ids
      ]
    },
    deleteIds: (state, action: PayloadAction<FORMS>) => {
      state[action.payload].ids = []
    }, 
    changeResource: (state, action: PayloadAction<ChangeResource>) => {
        state[action.payload.form].resourceType = action.payload.resourceType;
    },

    changeResourceIds: (state, action: PayloadAction<ChangeResourceIds>) => {
        state[action.payload.form].resourceType = action.payload.resourceType;
        state[action.payload.form].ids = action.payload.ids;
    }
  }
})

export const { toggleForm, addIds, deleteIds, changeResource, changeResourceIds } = formSlice.actions
export const selectCount = (state: RootState) => state.form;
export default formSlice.reducer