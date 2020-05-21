import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

// API

// Add post to feed
export const addPost = (post) => async (dispatch) => {
  // TODO: ADD POSTING IN STATE!
  // dispatch(addPostLoading())
  axios
    .post("/api/posts", { ...post })
    .then((res) => {
      dispatch(addPostSuccess(res.data));
    })
    .catch((err) => {
      dispatch(addPostError(err.response.data));
    });
};

// Get posts
export const getPosts = () => (dispatch) => {
  dispatch(getPostsLoading());
  axios
    .get("/api/posts")
    .then((res) => dispatch(getPostsSuccess(res.data)))
    .catch((err) => dispatch(getPostsError(err.response.data)));
};

// Delete Post
export const deletePost = (id) => (dispatch) => {
  axios
    .delete(`/api/posts/${id}`)
    .then((res) => dispatch(deletePostSuccess(id)))
    .catch((err) => dispatch(deletePostsError(err.response.data)));
};

// Add like
export const addLike = (id) => (dispatch) => {
  axios
    .post(`/api/posts/like/${id}`)
    .then((res) => dispatch(getPosts()))
    .catch((err) => dispatch(addLikeError(err.response.data)));
};

// Remove like
export const removeLike = (id) => (dispatch) => {
  axios
    .post(`/api/posts/unlike/${id}`)
    .then((res) => dispatch(getPosts()))
    .catch((err) => dispatch(removeLikeError(err.response.data)));
};

// Initial State
const initialState = {
  posts: [],
  post: {},
  loading: false,
  error: "",
};

// SLICE
export const postSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    // ADD POST
    addPostLoading: (state) => {
      state.loading = true;
    },
    addPostSuccess: (state, { payload }) => {
      state.loading = false;
      state.posts = [...state.posts, payload];
      state.user = payload;
    },
    addPostError: (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    },
    // GET ALL POSTS
    getPostsLoading: (state) => {
      state.loading = true;
    },
    getPostsSuccess: (state, { payload }) => {
      state.loading = false;
      state.posts = payload;
    },
    getPostsError: (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    },
    // DELETE POST
    deletePostSuccess: (state, { payload }) => {
      state.loading = false;
      state.posts = state.posts.filter((post) => post._id !== payload);
    },
    deletePostsError: (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    },
    // ADD LIKE
    addLikeError: (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    },
    removeLikeError: (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    },
  },
});

// ACTIONS
export const {
  addPostLoading,
  addPostSuccess,
  addPostError,
  getPostsLoading,
  getPostsSuccess,
  getPostsError,
  deletePostSuccess,
  deletePostsError,
  addLikeError,
  removeLikeError,
} = postSlice.actions;
