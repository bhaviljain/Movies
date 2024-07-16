import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { setMovies, addToWatchlist } from '../features/movieSlice';
import "../../src/App.css"
import Home from './Home';

const MovieList = () => {
    const [search, setSearch] = useState('');
    const[watch,setwatch] = useState(false)

    const dispatch = useDispatch();
    const movies = useSelector((state) => state?.movies?.movies);
    const user = useSelector((state) => state.auth.user?.email);
    const API = "https://www.omdbapi.com/?apikey=8de13692"
    console.log(movies);
    const fetchMovies = async (title) => {
        try {
            const response = await axios.get(`${API}&s=${title}`);
            dispatch(setMovies(response.data.Search || []));
        } catch (error) {
            console.error('Failed to fetch movies:', error);
        }
    };
    useEffect(() => {
        fetchMovies("Kabhi")
    }, [])

    const handleAddToWatchlist = (movie) => {
        if (user) {
            dispatch(addToWatchlist({ user, movie }));
            console.log(movie);
        } else {
            alert('Please log in to add movies to your watchlist.');
        }
    };
    const btnSearch = (search) => {
        fetchMovies(search)
        if (search === "") {
            fetchMovies("Kabhi")
        }
    }
    return (
        <>
        <div className='profile-comp'>
        <img src="download.png" 
         className='profile-img'
        />
            <h2 className='user-comp'>{user}</h2>
            </div>
            <div className='search-comp'>
            <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search Movies......"
                className='search-bar'
            />
            <button onClick={() => btnSearch(search)}
                className='search-btn'
                >Search</button>
            </div>
            <ul className='main-container'>
             {movies?.length > 0 ? (<>
             
                             {movies && movies?.map((movie) => (
                    <li key={movie.imdbID} className='main-comp'>
                        <img src={movie.Poster}
                            className="img"
                        />
                        <div className='title'>{movie.Title}</div>
                        <div>({movie.Year})</div>
                        <button onClick={() => handleAddToWatchlist(movie)}
 className='watch-img'><img src='watch.png'
 onClick={()=>setwatch(true)}
 className="watchlist-img"
 onMouseOver={()=>setwatch(true)}
 onMouseLeave={()=>setwatch(false)}
 /></button>
 <h2 className={`text ${watch? "show" :""}`}>Add to WatchList</h2>

                    </li>
                ))}

             </>):(<div><h2>No Movies Found</h2></div>)}  
          </ul>
        </>
    );
};

export default MovieList;
