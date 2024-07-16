import { createSlice } from '@reduxjs/toolkit';

// Retrieve watchlist from localStorage
const getWatchlistFromLocalStorage = () => {
  const watchlist = localStorage.getItem('watchlist');
  return watchlist ? JSON.parse(watchlist) : {};
};

const movieSlice = createSlice({
  name: 'movie',
  initialState: {
    movies: [],
    watchlist: getWatchlistFromLocalStorage(),
  },
  reducers: {
    setMovies(state, action) {
      state.movies = action.payload;
    },
    addToWatchlist(state, action) {
      const { user, movie ,imdbID} = action.payload;
      if (!state.watchlist[user]) {
        state.watchlist[user] = [];
      }
      
      state.watchlist[user]?.push(movie);
      localStorage.setItem('watchlist', JSON.stringify(state.watchlist));
    },
    removeFromWatchlist(state, action) {
      const { user, imdbID } = action.payload;
      if (state.watchlist[user]) {
        state.watchlist[user] = state.watchlist[user].filter(movie => movie.imdbID !== imdbID);
        localStorage.setItem('watchlist', JSON.stringify(state.watchlist));
      }
    },
    setUserWatchlist(state, action) {
      state.watchlist[action.payload.user] = action.payload.watchlist;
    },
  },
});

export const { setMovies, addToWatchlist, removeFromWatchlist, setUserWatchlist } = movieSlice.actions;
export default movieSlice.reducer;
