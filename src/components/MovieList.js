import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { setMovies, addToWatchlist } from '../ReduxSlice/movieSlice';
import "../../src/App.css"

const MovieList = () => {
    const [search, setSearch] = useState('');
   
    //state for watchlist Modal
    const [watch, setwatch] = useState(false)

    const dispatch = useDispatch();

    //store movies in this and fetch it into UI
    const movies = useSelector((state) => state?.movies?.movies);

   
    const user = useSelector((state) => state.auth.users?.email);


    const watchlist = useSelector((state) => (user ? state.movies?.watchlist[user] : []));
    
    const API = "https://www.omdbapi.com/?apikey=8de13692"
    const fetchMovies = async (title) => {
        try {
            const response = await axios.get(`${API}&s=${title}`);
            dispatch(setMovies(response.data.Search || []));
        } catch (error) {
            console.error('Failed to fetch movies:', error);
        }
    };
    //show movies that has name "Kabhi" on first render
    useEffect(() => {
        fetchMovies("Kabhi")
    },[])

    const handleAddToWatchlist = (movie) => {
        //if same  movie is already present in users watchlist , then dont add 
        for (let val of watchlist) {
            if (val?.imdbID?.includes(movie.imdbID)) {
                return null
            }
        }
        //action for storing user and its watchlist
        if (user) {
            dispatch(addToWatchlist({ user, movie }));
        }
    };

    
    const btnSearch = (search,e) => {
        fetchMovies(search)
        if (search === "") {
            fetchMovies("Kabhi")
        }
    }

  

    return (
        <>
            <div className='profile-comp'>
                <img src="download.png"
                alt='img'
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
            <ul className={`main-container ${watch ? "dont-show-main-container" :"show-main-container"}`}>
                {movies?.length > 0 ? (<>

                    {movies && movies?.map((movie) => (
                        <li key={movie.imdbID} className='main-comp'>
                            <img src={`${movie.Poster === "N/A" ? ("nonLoadedImg.png") : (movie.Poster)}`}
                                className="img"
                                alt='img'
                            />
                            <div className='title'>{movie.Title}</div>
                            <div>({movie.Year})</div>
                            <button onClick={() => handleAddToWatchlist(movie)}
                                className='watch-img'><img src='watch.png'
                                   alt='img'
                                    className="watchlist-img"
                                  onClick={()=>setwatch(true)}
                                /></button>
                           

                        </li>
                    ))}

                </>) : (<h2>No Movies Found</h2>)}
            </ul>
            <h2 className={`text ${watch ? "show" :"dontShow"}`}>
                <span className='close-btn'
                onClick={()=>setwatch(false)}
                >X</span>
                Added To WatchList</h2>
        </>
    );
};

export default MovieList;
