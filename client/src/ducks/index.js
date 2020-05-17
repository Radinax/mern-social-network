import { getDefaultMiddleware, configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import { registerSlice } from "./slices/registerSlice";
import { loginSlice } from "./slices/loginSlice";
import { profileSlice } from "./slices/profileSlice";

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

const reducer = combineReducers({
  register: registerSlice.reducer,
  login: loginSlice.reducer,
  profile: profileSlice.reducer,
});

// Configuring our store which will be used in Provider to enable Global State
export const store = configureStore({
  reducer,
  middleware: [
    ...getDefaultMiddleware({
      serializableCheck: false,
    }),
  ],
});
