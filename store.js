import { configureStore } from '@reduxjs/toolkit';
import { popups } from './Context/popups';

export const store = configureStore({
  reducer: {
    popups: popups,
  },
});
