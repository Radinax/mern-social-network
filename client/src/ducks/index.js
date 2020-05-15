import {
  createSlice,
  getDefaultMiddleware,
  configureStore,
} from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import axios from "axios";
import setAuthToken from "../utils/setAuthToken";
import { isEmpty } from "../utils/isEmpty";
import jwt_decode from "jwt-decode";

// API
/*
export const addGame = (payload) => () => axios.post('http://localhost:3000/games', { ...payload })
export const deleteGame = (payload) => () => axios.delete(`http://localhost:3000/games/${payload.id}`)
export const editGame = (payload) => () => axios.put(`http://localhost:3000/games/${payload.id}`, { ...payload })
export const fetchGames = () => async dispatch => {
  dispatch(fetchingGames())
  try {
    const response = await axios.get('http://localhost:3000/games')
    dispatch(fetchingGamesSuccess(response))
  } catch (error) {
    dispatch(fetchingGamesError(error), error.message || 'ERROR')
  }
}
*/

export const authUser = (user, history) => async (dispatch) => {
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
  history.push("/");
};

// Initial State
const initialState = {
  isAuthenticated: false,
  user: {},
  loading: false,
  error: "",
};

// Slice
const registerSlice = createSlice({
  name: "register",
  initialState,
  reducers: {
    registerUser: (state) => {
      state.loading = true;
    },
    registerUserSuccess: (state, { payload }) => {
      state.data = payload.data;
      state.loading = false;
      state.error = false;
    },
    registerUserError: (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    },
  },
});

const loginSlice = createSlice({
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

const reducer = combineReducers({
  register: registerSlice.reducer,
  login: loginSlice.reducer,
});

// Destructuring the actions we're gonna use in the app
export const {
  registerUser,
  registerUserSuccess,
  registerUserError,
} = registerSlice.actions;

export const { setCurrentUser, loggedUserError } = loginSlice.actions;

// Configuring our store which will be used in Provider to enable Global State
export const store = configureStore({
  reducer,
  middleware: [
    ...getDefaultMiddleware({
      serializableCheck: false,
    }),
  ],
});
