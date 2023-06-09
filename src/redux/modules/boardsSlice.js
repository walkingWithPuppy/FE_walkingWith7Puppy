import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { PATH_URL } from '../../shared/constants';
import { api } from '../../api/axios';

const initialState = {
  boards: [],
  post: [],
  filteredList: [],
  isLoading: false,
  error: null,
};

//전체 조회
export const __getList = createAsyncThunk('boards/getList', async (payload, thunkAPI) => {
  try {
    const response = await api.get(PATH_URL.BOARD);
    return thunkAPI.fulfillWithValue(response.data);
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
});

// 개별 상세조회
export const __getPostById = createAsyncThunk('boards/getPostById', async (id, thunkAPI) => {
  try {
    const response = await api.get(`${PATH_URL.BOARD}/${id}`);
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
});

// 지역구 검색
export const __getByAddress = createAsyncThunk('boards/getByAddress', async (payload, thunkAPI) => {
  try {
    const response = await api.get(`${PATH_URL.BOARD}?address=${payload}`);
    return thunkAPI.fulfillWithValue(response.data);
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
});

// 등록
export const __createPost = createAsyncThunk('boards/createPost', async (formData, thunkAPI) => {
  try {
    const response = await api.post(PATH_URL.BOARD, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
});

// 수정
export const __updatePost = createAsyncThunk(
  'boards/updatePost',
  async ({ id, formData }, thunkAPI) => {
    try {
      const response = await api.put(`${PATH_URL.BOARD}/${id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

// 삭제
export const __deletePost = createAsyncThunk('boards/deletePost', async (id, thunkAPI) => {
  try {
    await api.delete(`${PATH_URL.BOARD}/${id}`);
    return id;
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
});

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
      state.error = action.payload;
    },
    //__getByAddress
    [__getByAddress.pending]: state => {
      state.loading = true;
      state.error = null;
    },
    [__getByAddress.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.filteredList = action.payload;
    },
    [__getByAddress.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    //__createPost
    [__createPost.pending]: state => {
      state.loading = true;
      state.error = null;
    },
    [__createPost.fulfilled]: (state, action) => {
      state.loading = false;
      state.post = { ...state.post, newPostData: { ...action.payload } };
    },
    [__createPost.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    //__updatePost
    [__updatePost.pending]: state => {
      state.isLoading = true;
      state.error = null;
    },
    [__updatePost.fulfilled]: (state, action) => {
      state.isLoading = false;
      const updatedPost = action.payload;
      state.boards = state.boards.map(post => {
        if (post.id === updatedPost.id) {
          return updatedPost;
        }
        return post;
      });
    },
    [__updatePost.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    //__deletePost
    [__deletePost.pending]: state => {
      state.isLoading = true;
      state.error = null;
    },
    [__deletePost.fulfilled]: (state, action) => {
      state.isLoading = false;
      const deletedPost = action.payload;
      state.boards = state.boards.filter(post => post.id !== deletedPost.id);
    },
    [__deletePost.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
  },
});

export const {} = boardsSlice.actions;
export default boardsSlice.reducer;
