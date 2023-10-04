import { createSlice } from '@reduxjs/toolkit';
import { TypeThemeNames } from '../../styles/themes';

const initialState: { theme: TypeThemeNames } = {
  theme: 'black',
};

export const sliceTheme = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    changeTheme: (state, action: { payload: { newTheme: TypeThemeNames } }) => {
      state.theme = action.payload.newTheme;
    },
  },
});
