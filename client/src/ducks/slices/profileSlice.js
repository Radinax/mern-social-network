import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

// Api
export const getCurrentProfile = () => async (dispatch) => {
  dispatch(loadingHandler());
  axios
    .get("/api/profile")
    .then((res) => {
      dispatch(profileRequestSuccess(res.data));
    })
    // 046 MIN 09:00 WE ARE NOT USING ERRORS
    // WILL CHANGE AFTER
    .catch((err) => {
      dispatch(errorHandler(err.response.data));
    });
};

// Get profile by handle
export const getProfileByHandle = (handle) => async (dispatch) => {
  dispatch(loadingHandler());
  axios
    .get(`/api/profile/handle/${handle}`)
    .then((res) => {
      dispatch(profileRequestSuccess(res.data));
    })
    // 046 MIN 09:00 WE ARE NOT USING ERRORS
    // WILL CHANGE AFTER
    .catch((err) => {
      dispatch(errorHandler(err.response.data));
    });
};

// Get All Profiles
export const getProfiles = () => async (dispatch) => {
  dispatch(loadingHandler());
  axios
    .get("/api/profile/all")
    .then((res) => {
      dispatch(profilesRequestSuccess(res.data));
    })
    .catch((err) => {
      dispatch(errorHandler(err.response.data));
    });
};

// Create Profile
export const createProfile = (profileData, history) => (dispatch) => {
  axios
    .post("/api/profile", profileData)
    .then((res) => history.push("/dashboard"))
    .catch((err) => dispatch(errorHandler(err.response.data)));
};

// Add Experience
export const addExperience = (experienceData, history) => (dispatch) => {
  axios
    .post("/api/profile/experience", experienceData)
    .then((res) => history.push("/dashboard"))
    .catch((err) => dispatch(errorHandler(err.response.data)));
};

// Add Education
export const addEducation = (educationData, history) => (dispatch) => {
  axios
    .post("/api/profile/education", educationData)
    .then((res) => history.push("/dashboard"))
    .catch((err) => dispatch(errorHandler(err.response.data)));
};

// Delete Account and Profile
export const deleteAccount = () => (dispatch) => {
  if (window.confirm("Are you sure? This can NOT be undone")) {
    axios
      .delete("/api/profile")
      .then((res) => dispatch(deleteAccountSuccess()))
      .catch((err) => {
        errorHandler(err.response.data);
      });
  }
};

// Delete Experience
export const deleteExperience = (id) => (dispatch) => {
  axios
    .delete(`/api/profile/experience/${id}`)
    .then((res) => dispatch(getCurrentProfile()))
    .catch((err) => {
      errorHandler(err.response.data);
    });
};

// Delete Education
export const deleteEducation = (id) => (dispatch) => {
  axios
    .delete(`/api/profile/education/${id}`)
    .then((res) => dispatch(getCurrentProfile()))
    .catch((err) => {
      errorHandler(err.response.data);
    });
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
    profileRequestSuccess: (state, { payload }) => {
      state.profile = payload;
      state.loading = false;
    },
    // Multiple profiles
    profilesRequestSuccess: (state, { payload }) => {
      state.profiles = payload;
      state.loading = false;
      state.error = false;
    },
    clearProfile: (state, { payload }) => {
      state.profile = null;
    },
    deleteAccountSuccess: (state) => {
      state.profile = null;
    },
    // Handles the loading state
    loadingHandler: (state) => {
      state.loading = true;
    },
    // Handles all errors
    errorHandler: (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    },
  },
});

// Destructuring the actions we're gonna use in the app
export const {
  profileRequestSuccess,
  profilesRequestSuccess,
  clearProfile,
  deleteAccountSuccess,
  errorHandler,
  loadingHandler,
} = profileSlice.actions;
