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
      dispatch(errorHandler(err.response.data));
    });
};

// Get posts
export const getPosts = () => (dispatch) => {
  dispatch(loadingHandler());
  axios
    .get("/api/posts")
    .then((res) => dispatch(getPostsSuccess(res.data)))
    .catch((err) => dispatch(errorHandler(err.response.data)));
};

// Get invidual post
export const getPost = (id) => (dispatch) => {
  dispatch(loadingHandler());
  axios
    .get(`/api/posts/${id}`)
    .then((res) => dispatch(getPostSuccess(res.data)))
    .catch((err) => dispatch(errorHandler(err.response.data)));
};

// Delete Post
export const deletePost = (id) => (dispatch) => {
  axios
    .delete(`/api/posts/${id}`)
    .then((res) => dispatch(deletePostSuccess(id)))
    .catch((err) => dispatch(errorHandler(err.response.data)));
};

// Add like
export const addLike = (id) => (dispatch) => {
  axios
    .post(`/api/posts/like/${id}`)
    .then((res) => dispatch(getPosts()))
    .catch((err) => dispatch(errorHandler(err.response.data)));
};

// Remove like
export const removeLike = (id) => (dispatch) => {
  axios
    .post(`/api/posts/unlike/${id}`)
    .then((res) => dispatch(getPosts()))
    .catch((err) => dispatch(errorHandler(err.response.data)));
};

// Add Comment
export const addComment = (postId, commentData) => async (dispatch) => {
  dispatch(clearErrors());
  axios
    .post(`/api/posts/comment/${postId}`, { ...commentData })
    .then((res) => dispatch(getPost(postId)))
    .catch((err) => {
      dispatch(errorHandler(err.response.data));
    });
};

// Delete Comment
export const deleteComment = (postId, commentId) => async (dispatch) => {
  axios
    .delete(`/api/posts/comment/${postId}/${commentId}`)
    .then((res) => {
      dispatch(getPost(postId));
    })
    .catch((err) => {
      dispatch(errorHandler(err.response.data));
    });
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
    addPostSuccess: (state, { payload }) => {
      state.loading = false;
      state.posts = [...state.posts, payload];
      state.user = payload;
    },
    // GET ALL POSTS
    getPostsSuccess: (state, { payload }) => {
      state.loading = false;
      state.posts = payload;
    },
    // GET INDIVIDUAL POST
    getPostSuccess: (state, { payload }) => {
      state.loading = false;
      state.post = payload;
    },
    // DELETE POST
    deletePostSuccess: (state, { payload }) => {
      state.loading = false;
      state.posts = state.posts.filter((post) => post._id !== payload);
    },
    // ADD COMMENT
    addCommentSuccess: (state, { payload }) => {
      state.loading = false;
      // Wtf...?
      state.posts.comment = [...state.posts.comment, payload];
      state.user = payload;
    },

    // Handles loading state
    loadingHandler: (state) => {
      state.loading = true;
    },
    // Handles all errors
    errorHandler: (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    },
    // Clears Error State
    clearErrors: (state) => {
      state.errors = "";
    },
  },
});

// ACTIONS
export const {
  addPostSuccess,
  getPostsSuccess,
  getPostSuccess,
  deletePostSuccess,
  addCommentSuccess,
  deleteCommentSuccess,
  loadingHandler,
  errorHandler,
  clearErrors,
} = postSlice.actions;
