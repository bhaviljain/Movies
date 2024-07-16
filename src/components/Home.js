import React, { useEffect, useState } from 'react'
import {useDispatch, useSelector} from "react-redux"
import { Link, useLocation, useNavigate } from 'react-router-dom'
const Home = () => {
    const MovieList = useSelector(state=>state.movieReducer)
    // const MovieList = useSelector(state=>state.movieReducer)
  
    const [search,setSearch] =useState("")
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const API = "https://www.omdbapi.com/?apikey=8de13692"
    const [movie,setMovie] = useState([])
   const data = useLocation()
   console.log(data);

    const FetchMovies = async(title) =>{
    const data = await fetch(`${API}&s=${title}`)
    const res = await data.json()
    console.log(res);
    setMovie(res.Search)
    }
    
    useEffect(()=>{
     FetchMovies("Kabhi")     
    },[])
    const btnSearch = (search) =>{
     FetchMovies(search)
     if(search === ""){
        FetchMovies("Kabhi")
     }
    }

const back = () =>{
    navigate(-1)
}

  return (
    <>
    
    <h1 className='flex ml-4'
    onClick={back}
    >Back</h1>
            <input className='border border-black'
            value={search}
            onChange={(e)=>setSearch(e.target.value)}
            />
            <button
            onClick={()=>navigate("/login")}
            >Logout</button>
            <h2>Name : {data.state}</h2>
   <button onClick={()=>btnSearch(search)}>Search</button>
    <div>
        <li className="px-4 hover:font-bold"><Link to='/watchlist'>Cart
        </Link></li>
        {movie?.length > 0 ? (<div  className='flex flex-wrap gap-20 justify-center items-center'>
            {movie && movie?.map((val,index)=>{
            return(
                <div key={index}>
                    <img src={val.Poster}
                    className='h-36 w-28'
                    alt='img'
                    />
                    <h1 className='font-bold text-xs w-28'>{val.Title}</h1>
                    <h1 className='text-xs'>{val.Year}</h1>
                    <div>
                    <button className='p-1 bg-blue-600 rounded-xl'
                   
                    >WatchList</button>
                    </div>
                </div>
            )
        })}
        </div>) : (<div>
            No Movies Found
        </div>)}
    </div>
    </>
  )
}

export default Home