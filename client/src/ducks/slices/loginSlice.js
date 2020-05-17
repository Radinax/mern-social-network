import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import setAuthToken from "../../utils/setAuthToken";
import { isEmpty } from "../../utils/isEmpty";
import jwt_decode from "jwt-decode";

// API
export const loginUser = (user, history) => async (dispatch) => {
  axios
    .post("/api/users/login", { ...user })
    .then((res) => {
      // Save to localstorage
      const { token } = res.data;
      // Set token to LS
      localStorage.setItem("jwtToken", token);
      // Set token Auth Header
      setAuthToken(token);
      // Decode token to get user data
      const decoded = jwt_decode(token);
      // Set current user
      dispatch(setCurrentUser(decoded));
      history.push("/dashboard");
    })
    .catch((err) => {
      dispatch(loggedUserError(err.response.data));
    });
};

export const logoutUser = (history) => (dispatch) => {
  // Remove token from localStorage
  localStorage.removeItem("jwtToken");
  // Remove auth header for future requests
  setAuthToken(false);
  dispatch(setCurrentUser({}));
  if (history) history.push("/");
};

// Initial State
const initialState = {
  isAuthenticated: false,
  user: {},
  loading: false,
  error: "",
};

// SLICE
export const loginSlice = createSlice({
  name: "login",
  initialState,
  reducers: {
    setCurrentUser: (state, { payload }) => {
      state.isAuthenticated = !isEmpty(payload);
      state.user = payload;
    },
    loggedUserError: (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    },
  },
});

// ACTIONS
export const { setCurrentUser, loggedUserError } = loginSlice.actions;
