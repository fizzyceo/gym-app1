import { configureStore } from '@reduxjs/toolkit';
import { popupSlice } from './Context/popups';

export const store = configureStore({
  reducer: {
    popups: popupSlice,
  },
});
