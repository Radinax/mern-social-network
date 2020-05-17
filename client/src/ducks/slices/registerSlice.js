import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

// Api
export const registerUser = (user, history) => async (dispatch) => {
  axios
    .post("/api/users/register", { ...user })
    .then((res) => {
      history.push("/login");
      dispatch(registerUserSuccess(res));
    })
    .catch((err) => {
      dispatch(registerUserError(err.response.data));
    });
};

// Initial State
const initialState = {
  user: {},
  loading: false,
  error: "",
};

// Slice
export const registerSlice = createSlice({
  name: "register",
  initialState,
  reducers: {
    registerUserLoading: (state) => {
      state.loading = true;
    },
    registerUserSuccess: (state, { payload }) => {
      state.user = payload.data;
      state.loading = false;
      state.error = false;
    },
    registerUserError: (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    },
  },
});

// Destructuring the actions we're gonna use in the app
export const {
  registerUserLoading,
  registerUserSuccess,
  registerUserError,
} = registerSlice.actions;
