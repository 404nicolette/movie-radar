import React from 'react'
import TopBanner from '../components/landing/TopBanner'
import NavBar from '../components/Nav/NavBar'
import MainFilms from '../components/all_films/MainFilms'
import AllFilms from '../components/all_films/AllFilms'
function Main() {
  return (
    <div className='flex flex-col justify-between items-center h-screen w-screen lg:flex-row'>
      <div className='w-full h-auto lg:h-full lg:w-[25%]'> 
        <NavBar/>
      </div>

      <div className='h-full w-full  flex flex-col items-start justify-start from-[#291010] to-[#150505] bg-linear-to-t'>
       
        <TopBanner/>
        <MainFilms/>
        {/* <AllFilms/> */}
        
      </div>
     
     
      
    
      {/* <NavBar/> */}


        
    </div>
  )
}

export default Main