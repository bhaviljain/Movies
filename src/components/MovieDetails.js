// import React, { useEffect, useState } from 'react';
// import { useParams } from 'react-router-dom';
// import axios from 'axios';
// import Home from './Home';

// const MovieDetails = () => {
//   const { imdbID } = useParams();
//   const [movie, setMovie] = useState(null);

//   useEffect(() => {
//     const fetchMovie = async () => {
//       try {
//         const response = await axios.get(`https://www.omdbapi.com/?i=${imdbID}&apikey=8de13692`);
//         setMovie(response.data);
//       } catch (error) {
//         console.error('Failed to fetch movie details:', error);
//       }
//     };

//     fetchMovie();
//   }, [imdbID]);

//   if (!movie) return <p>Loading...</p>;

//   return (
//     <div>
//       <h2>{movie.Title} ({movie.Year})</h2>
//       <img src={movie.Poster} alt={movie.Title} />
//       <p>{movie.Plot}</p>
//     </div>
//   );
// };

// export default MovieDetails;
