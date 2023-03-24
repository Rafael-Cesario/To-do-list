import { createSlice } from '@reduxjs/toolkit';

interface ILists {
  lists: string[];
}

const initialState: ILists = {
  lists: [],
};

export const sliceLists = createSlice({
  name: 'lists',
  initialState,
  reducers: {
    createList: (state, action: { payload: { listName: string } }) => {
      state.lists.push(action.payload.listName);
    },
  },
});
