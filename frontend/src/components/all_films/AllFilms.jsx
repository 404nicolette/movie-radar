import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Text from '../text/Text';

function AllFilms() {
    const [allFilmImg, setAllFilmImg]=useState([])
    const [filmTitle, setFilmTitle]=useState([])

    const API_KEY = import.meta.env.VITE_API_KEY;
    const BASE_URL = "https://api.themoviedb.org/3/movie/top_rated";

    useEffect(()=>{
        const getFilmImg=async()=>{
            try{
                const response = await axios.get(`${BASE_URL}?api_key=${API_KEY}&language=en-GB`)
                // https://api.themoviedb.org/3/discover/movie?api_key=YOUR_KEY&language=en-GB&page=1
                const result = response.data.results
                const movieImg = result.slice(0, 15).map(movie => movie.poster_path);
                console.log(movieImg)
                setAllFilmImg(movieImg.slice(0,15))
                
            } catch (error){
                console.log("ALL FILMS", error)
            }

        }
        getFilmImg()
    },[])


    return (
      

        <div className='h-[20%] lg:h-[40%] w-full flex overflow-x-scroll overflow-y-visible lg:p-5'>
          {allFilmImg.map((img, index) => (
              <img
                key={index}
                src={`https://image.tmdb.org/t/p/w500${img}`} 
                alt={`Movie ${index + 1}`}
                className="h-full lg:h-[95%] object-contain mx-3 transition delay-150 duration-300 ease-in-out hover:scale-125 hover:z-30"
              />
          ))}
          <div className="top-0 right-10 w-full z-20">
            <Text.H5 className='text-white'>Top Rated</Text.H5>
          </div>
        </div>

      
       
    )
}
export default AllFilms