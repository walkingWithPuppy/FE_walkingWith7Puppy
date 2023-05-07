import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { PATH_URL } from '../../shared/constants';
import { boards } from '../../api/axios';

const initialState = {
  boards: [],
  post:[],
  isLoading: false,
  error: null,
};

const header = {
  'Content-Type': 'application/json',
};

export const __getList = createAsyncThunk(
  'boards/getList', 
  async (payload, thunkAPI) => {
  try {
    const response = await boards.get(PATH_URL.BOARD);
    console.log(response.data);
    return thunkAPI.fulfillWithValue(response.data);
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
});
// 조회
export const __getPostById = createAsyncThunk(
  'boards/getPostById',
  async (id, thunkAPI) => {
    try {
      const response = await boards.get(`${PATH_URL.BOARD}/${id}`);
      // console.log('response.data', response.data);
      return response.data;
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
    [__getList.pending]: state => {
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
    //__getPostById
    [__getPostById.pending]: state => {
      state.loading = true;
      state.error = null;
    },
    [__getPostById.fulfilled]: (state, action) => {
      state.loading = false;
      state.post = action.payload;
    },
    [__getPostById.rejected]: (state, action) => {
      state.loading = false;
      // error 객체를 저장하지 않도록 변경
      state.error = action.payload;
    }
  }
});

export const {} = boardsSlice.actions;
export default boardsSlice.reducer;
