import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { PATH_URL } from '../../shared/constants';
import { api } from '../../api/axios';

const initialState = {
  comments: [],
  isLoading: false,
  error: null,
};

//전체 조회
export const __getList = createAsyncThunk('comments/getList', async (boardId, thunkAPI) => {
  try {
    const response = await api.get(`${PATH_URL.BOARD}/${boardId}/comments`);
    return thunkAPI.fulfillWithValue(response.data);
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
});

// 등록
export const __createComment = createAsyncThunk(
  'comments/createComment',
  async ({ boardId, content }, thunkAPI) => {
    try {
      const response = await api.post(`${PATH_URL.BOARD}/${boardId}/comments`, { content });
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

// 수정
export const __updateComment = createAsyncThunk(
  'comments/updateComment',
  async ({ boardId, commentId, content }, thunkAPI) => {
    try {
      const response = await api.put(`${PATH_URL.BOARD}/${boardId}/comments/${commentId}`, {
        content,
      });
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

// 삭제
export const __deleteComment = createAsyncThunk(
  'comments/deleteComment',
  async ({ boardId, commentId }, thunkAPI) => {
    try {
      await api.delete(`${PATH_URL.BOARD}/${boardId}/comments/${commentId}`);
      return { boardId, commentId };
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const commentsSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {},
  extraReducers: {
    // __getList
    [__getList.pending]: state => {
      state.isLoading = true;
    },
    [__getList.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.comments = action.payload;
    },
    [__getList.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    //__createComment
    [__createComment.pending]: state => {
      state.loading = true;
      state.error = null;
    },
    [__createComment.fulfilled]: (state, action) => {
      state.loading = false;
      state.comments = [...state.comments, { ...action.payload }];
    },
    [__createComment.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    //__updateComment
    [__updateComment.pending]: state => {
      state.isLoading = true;
      state.error = null;
    },
    [__updateComment.fulfilled]: (state, action) => {
      state.isLoading = false;
      const updatedComment = action.payload;
      state.comments = state.comments.map(comment => {
        if (comment.id === updatedComment.id) {
          return updatedComment;
        }
        return comment;
      });
    },
    [__updateComment.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    //   //__deleteComment
    [__deleteComment.pending]: state => {
      state.isLoading = true;
      state.error = null;
    },
    [__deleteComment.fulfilled]: (state, action) => {
      state.isLoading = false;
      const deletedComment = action.payload;
      state.comments = state.comments.filter(comment => comment.id !== deletedComment.id);
    },
    [__deleteComment.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
  },
});

export const {} = commentsSlice.actions;
export default commentsSlice.reducer;
