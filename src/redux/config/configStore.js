import { configureStore } from '@reduxjs/toolkit';
import boards from '../modules/boardsSlice';
import comments from '../modules/commentsSlice';

const store = configureStore({
  reducer: {
    boards,
    comments,
  },
  devTools: process.env.NODE_ENV === 'development',
});

export default store;