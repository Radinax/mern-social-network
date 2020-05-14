import {
  createSlice,
  getDefaultMiddleware,
  configureStore,
} from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import axios from "axios";

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

export const authUser = (user) => async (dispatch) => {
  axios
    .post("/api/users/register", { ...user })
    .then((res) => dispatch(registerUserSuccess(res)))
    .catch((err) => {
      dispatch(registerUserError(err.response.data));
    });
};

/*
export const authUser = (payload) => async (dispatch) => {
  try {
    const response = await axios.post("/api/users/register", { ...payload });
    console.log("Response", response);
  } catch (error) {
    console.log("err", error.response.data);
    // dispatch(fetchingGamesError(error), error.message || 'ERROR')
  }
};
*/

// Initial State
const initialState = {
  isAuthenticated: false,
  user: {},
  loading: false,
  error: "",
};

// Slice
const slice = createSlice({
  name: "rootReducer",
  initialState,
  reducers: {
    fetchingGames: (state) => {
      state.loading = true;
    },
    fetchingGamesSuccess: (state, { payload }) => {
      state.data = payload.data;
      state.isAuthenticated = true;
      state.loading = false;
      state.error = false;
    },
    fetchingGamesError: (state, { payload }) => {
      state.loading = false;
      state.error = payload.error;
    },
  },
});

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    registerUser: (state) => {
      state.loading = true;
    },
    registerUserSuccess: (state, { payload }) => {
      state.data = payload.data;
      state.isAuthenticated = true;
      state.loading = false;
      state.error = false;
    },
    registerUserError: (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    },
  },
});

const reducer = combineReducers({
  auth: authSlice.reducer,
  user: slice.reducer,
});

// Destructuring the actions we're gonna use in the app
export const {
  registerUser,
  registerUserSuccess,
  registerUserError,
} = authSlice.actions;

// Configuring our store which will be used in Provider to enable Global State
export const store = configureStore({
  reducer,
  middleware: [
    ...getDefaultMiddleware({
      serializableCheck: false,
    }),
  ],
});
