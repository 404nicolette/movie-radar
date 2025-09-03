import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Text from '../text/Text';

function MainFilms() {
    const [popularImg, setPopularImg]=useState([])
    const [popularTitle, setPopularTitle]=useState([])

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
        <div className='flex flex-col'>
            <Text.H5 className='text-white mx-3 lg:mx-10 lg:text-[2rem]'>Popular Films</Text.H5>
            <div className='h-[20%] lg:h-[40%] w-full flex overflow-x-scroll overflow-y-visible lg:p-5'>
                {popularImg.map((img, index) => (
                    <img
                        key={index}
                        src={`https://image.tmdb.org/t/p/w500${img}`} 
                        alt={`Popular Movie ${index + 1}`}
                        className="h-full lg:h-[95%] object-contain mx-3 transition delay-150 duration-300 ease-in-out hover:scale-125 hover:z-30"
                    />
                ))}
            </div>
        </div>

    )
}

export default MainFilms


