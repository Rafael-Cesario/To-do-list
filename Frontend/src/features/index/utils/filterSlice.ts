import { createSlice } from '@reduxjs/toolkit';

interface IFilter {
  filter: string;
}

const initialState: IFilter = {
  filter: '',
};

export const filterSlice = createSlice({
  name: 'filter',
  initialState,

  reducers: {
    changeFilter: (state, action: { payload: typeof state }) => {
      state.filter = action.payload.filter;
    },
  },
});
