import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "@/app/lib/store";

const themeSlice = createSlice({
    name: 'theme',
    initialState: { mode: 'dark' },
    reducers: {
        changeTheme: (state) => {
            state.mode = state.mode == 'dark' ? 'light' : 'dark'
        }
    }
})

export const { changeTheme } = themeSlice.actions

export const selectCurrentTheme = (state: RootState) => state.theme.mode

export default themeSlice.reducer