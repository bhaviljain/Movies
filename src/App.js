import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Login from './components/Login';
import MovieList from './components/MovieList';
import Watchlist from './components/Watchlist';
import { setUserWatchlist } from './features/movieSlice';
import { logout } from './features/authSlice';
import { Link } from "react-router-dom";
import PageNotFound from './components/PageNotFound';


const App = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.users?.email);
  const watchlist = useSelector((state) => (user ? state.movies?.watchlist[user] : []));


  useEffect(() => {
    //if user logged in then parse from string to object
    if (user) {
      const userWatchlist = JSON.parse(localStorage.getItem('watchlist'))?.[user] || [];
      dispatch(setUserWatchlist({ user, watchlist: userWatchlist }));
    }
  }, [dispatch, user]);

  return (
    <Router>
      <div>
        {/* only is user is logged in */}
        {user ? (
          <>
            <div className='nav-comp'>
              <Link to="/" className='routes' id='routes'>WatchLists
              </Link>
              <div className='nav-container'>

                <Link to="/"
                  className='routes'
                >Home</Link>

                <Link to="/watchlist"
                  className='routes'
                >Watchlist
                  <span className='watchlist'>({watchlist?.length})</span>

                </Link> | <button onClick={() => dispatch(logout())}
                  className='logout-btn'
                >Logout</button>
              </div>
            </div>




            <Routes>
              <Route path="/" element={<MovieList />} />

              <Route path="/watchlist" element={<Watchlist />} />
              <Route path='/*' element={<PageNotFound />} />
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
