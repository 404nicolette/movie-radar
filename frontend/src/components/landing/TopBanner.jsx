// now playing api
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Text from '../text/Text';

function TopBanner() {
  const [bannerImg, setBannerImg] = useState(null); // bannerImg is the var that is used to actually get the data to appear on screen || setBannerImg is the array that holds the data
  const [bannerTitle, setBannerTitle] = useState(null)
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
          // console.log(firstMovie)
          setBannerImg(firstMovie.backdrop_path);
          setBannerTitle(firstMovie.original_title)
        }
      } catch (error) {
        console.error("error in BANNER: ", error);
      }
    };
    getBannerImg(); 
  }, []);

  return (
    <div className='h-[20%] lg:h-[35%] w-full relative '>
      {bannerTitle &&(
        <div className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center text-white z-10'>
          <Text.H5 className='md:text-[1rem] '>Now on Movie Radar</Text.H5>
          <Text.H5 className='md:text-[3rem] '>{bannerTitle}</Text.H5>
      </div>

      )}
      
      {bannerImg &&(
        <img
          src={`https://image.tmdb.org/t/p/original${bannerImg}`}
          alt="Now Playing movie"
          className="w-full h-full object-cover absolute"/>
      )}
       <div className="absolute bottom-0 left-0 w-full h-1/3 bg-gradient-to-t from-[#190909] to-transparent z-20"></div>
       {/* from-[#291010] to-[#150505] */}
    </div>
  );
}

export default TopBanner