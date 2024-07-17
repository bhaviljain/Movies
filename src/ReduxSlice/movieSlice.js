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
    //for storing the movies
    setMovies(state, action) {
      state.movies = action.payload;
    },
    //adding movies into particular user account
    addToWatchlist(state, action) {
      const { user, movie} = action.payload;
    
      state.watchlist[user]?.push(movie);
      //storing it in local storage
      localStorage.setItem('watchlist', JSON.stringify(state.watchlist));
    },
    removeFromWatchlist(state, action) {
      const { user, imdbID } = action.payload;
      if (state.watchlist[user]) {
        state.watchlist[user] = state.watchlist[user].filter(movie => movie.imdbID !== imdbID);
        localStorage.setItem('watchlist', JSON.stringify(state.watchlist));
      }
    },
    //store user details with its watchList
    setUserWatchlist(state, action) {
      state.watchlist[action.payload.user] = action.payload.watchlist;
    },
  },
});

export const { setMovies, addToWatchlist, removeFromWatchlist, setUserWatchlist } = movieSlice.actions;
export default movieSlice.reducer;
