import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Login from './components/Login';
import MovieList from './components/MovieList';
import MovieDetails from './components/MovieDetails';
import Watchlist from './components/Watchlist';
import { setUserWatchlist } from './features/movieSlice';
import { logout } from './features/authSlice';
import { Link } from "react-router-dom";


const App = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user?.email);

  useEffect(() => {
    if (user) {
      const userWatchlist = JSON.parse(localStorage.getItem('watchlist'))?.[user] || [];
      dispatch(setUserWatchlist({ user, watchlist: userWatchlist }));
    }
  }, [dispatch, user]);

  return (
    <Router>
      <div>
        {user ? (
          <>
          <div className='nav-comp'>
            <Link to="/" className='routes' id='routes'>WatchLists</Link>
            <div className='nav-container'>
            
              <Link to="/"
              className='routes'
              >Home</Link> | <Link to="/watchlist"
              className='routes'
              >Watchlist</Link> | <button onClick={() => dispatch(logout())}
              className='logout-btn'
              >Logout</button>
              </div>
            </div>
            <Routes>
              <Route path="/" element={<MovieList />} />
              
              <Route path="/watchlist" element={<Watchlist />} />
            </Routes>
          </>
        ) : (
          <Login />
        )}
      </div>
    </Router>
  );
};

export default App;
