import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { PATH_URL } from '../../shared/constants';
import { boards } from '../../api/axios';

const initialState = {
  boards: [],
  isLoading: false,
  error: null,
};

export const __getList = createAsyncThunk(
  'boards/getList',
  async (payload, thunkAPI) => {
    console.log(payload); // null이고
    try {
      // const response = await user.post(PATH_URL.LOGIN, userInput); //테스트용

      const data = await boards.get(PATH_URL.BOARD);
      console.log(data.data);
      return thunkAPI.fulfillWithValue(data.data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const boardsSlice = createSlice({
  name: 'boards',
  initialState,
  reducers: {},
  extraReducers: {
    // __getList
    [__getList.pending]: (state) => {
      state.isLoading = true;
    },
    [__getList.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.boards = action.payload;
    },
    [__getList.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
  },
});

export const {} = boardsSlice.actions;
export default boardsSlice.reducer;