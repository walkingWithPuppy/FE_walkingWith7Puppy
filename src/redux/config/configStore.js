import { configureStore } from '@reduxjs/toolkit';
import boards from '../modules/boardsSlice';

const store = configureStore({
  reducer: {
    boards,
  },
  devTools: process.env.NODE_ENV === 'development',
});

export default store;