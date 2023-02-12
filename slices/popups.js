import { createSlice } from '@reduxjs/toolkit';
const initialState = {
  addmessage: false,
  deleteMsg: false,
};
export const popupSlice = createSlice({
  name: 'popups',
  initialState,
  reducers: {
    setAddMsgTrue: (state) => {
      state.addmessage = true;
    },
    setAddMsgFalse: (state) => {
      state.addmessage = false;
    },
    setDeleteMsgFalse: (state) => {
      state.deleteMsg = false;
    },
    setDeleteMsgTrue: (state) => {
      state.deleteMsg = true;
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  setAddMsgTrue,
  setAddMsgFalse,
  setDeleteMsgFalse,
  setDeleteMsgTrue,
} = popupSlice.actions;

export default popupSlice.reducer;
