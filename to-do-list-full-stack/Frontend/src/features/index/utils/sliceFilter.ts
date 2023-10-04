import { createSlice } from '@reduxjs/toolkit';

interface IFilter {
  filter: string;
}

const initialState: IFilter = {
  filter: '',
};

export const sliceFilter = createSlice({
  name: 'filter',
  initialState,

  reducers: {
    changeFilter: (state, action: { payload: typeof state }) => {
      state.filter = action.payload.filter;
    },
  },
});
