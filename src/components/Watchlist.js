import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { removeFromWatchlist } from '../features/movieSlice';

const Watchlist = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.users?.email);
  const watchlist = useSelector((state) => (user ? state.movies?.watchlist[user] : []));
  
  const handleRemoveFromWatchlist = (imdbID) => {
    dispatch(removeFromWatchlist({ user, imdbID }));
  };

  return (
    <div>
      <h2>My Watchlist
      </h2>
      <ul className='main-container'>
        {watchlist && watchlist?.map((movie) => (
          <li key={movie?.imdbID}
          className='main-comp'
          >
            
            <img src={`${movie.Poster === "N/A" ? ("nonLoadedImg.png") : (movie.Poster)}`}
                                className="img"
                                alt='img'
                            />
                        <div className='title'>{movie?.Title}</div>
                        <div>({movie?.Year})</div>
            <button onClick={() => handleRemoveFromWatchlist(movie.imdbID)}
            className='delete-btn'
              ><img src='delete.png'
              alt='img'
              className='delete-img'
              /></button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Watchlist;
