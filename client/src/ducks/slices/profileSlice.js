import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

// Api
export const getCurrentProfile = () => async (dispatch) => {
  dispatch(profileRequestLoading);
  axios
    .get("/api/profile")
    .then((res) => {
      dispatch(profileRequestSuccess(res.data));
    })
    // 046 MIN 09:00 WE ARE NOT USING ERRORS
    // WILL CHANGE AFTER
    .catch((err) => {
      dispatch(profileRequestError(err.response.data));
    });
};

export const createProfile = (profileData, history) => (dispatch) => {
  axios
    .post("/api/profile", profileData)
    .then((res) => history.push("/dashboard"))
    .catch((err) => dispatch(createProfileError(err.response.data)));
};

// Delete Account and Profile
export const deleteAccount = () => (dispatch) => {
  if (window.confirm("Are you sure? This can NOT be undone")) {
    axios
      .delete("/api/profile")
      .then((res) => dispatch(deleteAccountSuccess()))
      .catch((err) => {
        console.log("err", err);
        deleteAccountError(err.response.data);
      });
  }
};

// Initial State
const initialState = {
  profile: null,
  profiles: null,
  loading: false,
  error: "",
};

// Slice
export const profileSlice = createSlice({
  name: "register",
  initialState,
  reducers: {
    // Invidiual profile
    profileRequestLoading: (state) => {
      state.loading = true;
    },
    profileRequestSuccess: (state, { payload }) => {
      state.profile = payload;
      state.loading = false;
    },
    profileRequestError: (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    },
    // Multiple profiles
    profilesRequestLoading: (state) => {
      state.loading = true;
    },
    profilesRequestSuccess: (state, { payload }) => {
      state.data = payload.data;
      state.loading = false;
      state.error = false;
    },
    profilesRequestError: (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    },
    clearProfile: (state, { payload }) => {
      state.profile = null;
    },
    createProfileError: (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    },
    deleteAccountSuccess: (state) => {
      state.profile = null;
    },
    deleteAccountError: (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    },
  },
});

// Destructuring the actions we're gonna use in the app
export const {
  profileRequestLoading,
  profileRequestSuccess,
  profileRequestError,
  profilesRequestLoading,
  profilesRequestSuccess,
  profilesRequestError,
  clearProfile,
  createProfileError,
  deleteAccountSuccess,
  deleteAccountError,
} = profileSlice.actions;
