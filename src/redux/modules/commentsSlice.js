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
  // console.log(boardId);
  try {
    const response = await api.get(`${PATH_URL.BOARD}/${boardId}/comments`);
    // console.log(response.data);
    return thunkAPI.fulfillWithValue(response.data);
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
});

// // 개별 상세조회
// export const __getPostById = createAsyncThunk('boards/getPostById', async (id, thunkAPI) => {
//   try {
//     const response = await boards.get(`${PATH_URL.BOARD}/${id}`);
//     // console.log('response.data', response.data);
//     return response.data;
//   } catch (error) {
//     return thunkAPI.rejectWithValue(error);
//   }
// });

// 등록
export const __createComment = createAsyncThunk(
  'comments/createComment',
  async ({ boardId, content }, thunkAPI) => {
    // console.log('boardId', boardId);
    // console.log('content', content);
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
      const response = await api.put(
        `${PATH_URL.BOARD}/${boardId}/comments/${commentId}`,
        { content },
        {
          content,
        }
      );
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
    // console.log('boardId', boardId);
    // console.log('commentId', commentId);
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
    //__getPostById
    //   [__getPostById.pending]: state => {
    //     state.loading = true;
    //     state.error = null;
    //   },
    //   [__getPostById.fulfilled]: (state, action) => {
    //     state.loading = false;
    //     state.post = action.payload;
    //   },
    //   [__getPostById.rejected]: (state, action) => {
    //     state.loading = false;
    //     state.error = action.payload;
    //   },
    //__createComment
    [__createComment.pending]: state => {
      state.loading = true;
      state.error = null;
    },
    [__createComment.fulfilled]: (state, action) => {
      state.loading = false;
      state.comments = [...state.commments, { ...action.payload }];
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
      state.comments = state.boards.map(comment => {
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