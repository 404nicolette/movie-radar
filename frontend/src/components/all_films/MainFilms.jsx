import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Text from '../text/Text';

function MainFilms() {
    const [popularImg, setPopularImg]=useState(null)
    const [popularTitle, setPopularTitle]=useState(null)

    const API_KEY = import.meta.env.VITE_API_KEY;
    const BASE_URL = "https://api.themoviedb.org/3/movie/popular";

    useEffect(()=>{
        const getPopularImg=async()=>{
            try{
                const response = await axios.get(`${BASE_URL}?api_key=${API_KEY}&language=en-GB`)
                const result = response.data.results
                const movieImg = result.slice(0, 15).map(movie => movie.poster_path);
                console.log(movieImg)
                setPopularImg(movieImg.slice(0,15))
                
            } catch (error){
                console.log("POPULAR", error)
            }

        }
        getPopularImg()
    },[])


    return (
        <div className='border-4 border-[#a70d1c] h-[20%] lg:h-[30%] w-full'>
            {popularImg &&(

                <img
                    src={`https://image.tmdb.org/t/p/original${popularImg}`}
                    alt="Now Playing movie"
                    className="w-full h-full object-contain overflow-x-scroll"/>
                )}
        </div>
    )
}

export default MainFilms