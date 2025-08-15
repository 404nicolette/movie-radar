// now playing api
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Text from '../text/Text';

function TopBanner() {
  const [bannerImg, setBannerImg] = useState(null); // bannerImg is the var that is used to actually get the data to appear on screen || setBannerImg is the array that holds the data
  const API_KEY = import.meta.env.VITE_API_KEY;
  const BASE_URL = "https://api.themoviedb.org/3/movie/now_playing";

  useEffect(() => {
    const getBannerImg = async () => {
      try {
        const response = await axios.get(`${BASE_URL}?api_key=${API_KEY}&language=en-GB`)
        const result = response.data.results // actual movie array
        // console.log("Now playing results:", result); 

        if (result.length > 0) {
          const firstMovie = result[0] // get the first movie in the array
          console.log(firstMovie)
          setBannerImg(firstMovie.backdrop_path);
        }
      } catch (error) {
        console.error("error in getBannerImg: ", error);
      }
    };
    getBannerImg(); 
  }, []);

  return (
    <div className='border-4 border-[#a70d1c] h-[20%] lg:h-[35%] w-full relative'>
      <div className='z-20 absolute bottom-0 left-0 text-white lg:px-5 px-2 opacity-85'>
        
        <Text.H5 className='lg:text-[2rem]'>NOW PLAYING</Text.H5>
        
      </div>
      {bannerImg &&(
        <img
          src={`https://image.tmdb.org/t/p/original${bannerImg}`}
          alt="Now Playing movie"
          className="w-full h-full object-cover z-10 absolute"/>
      )}
    </div>
  );
}

export default TopBanner