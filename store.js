import { configureStore } from '@reduxjs/toolkit';
import popupReducer from './slices/popups';

export const store = configureStore({
  reducer: {
    popups: popupReducer,
  },
});
