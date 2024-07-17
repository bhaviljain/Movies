import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../ReduxSlice/authSlice";
import movieReducer from "../ReduxSlice/movieSlice";
const store = configureStore({
    reducer: {
      auth: authReducer,
      movies: movieReducer,
    },
  });

  export default store