import React from 'react'
import TopBanner from '../components/landing/TopBanner'
import NavBar from '../components/Nav/NavBar'
import MainFilms from '../components/all_films/MainFilms'
import AllFilms from '../components/all_films/AllFilms'
function Main() {
  return (
    <div className='border-2 flex flex-col justify-between items-center h-screen w-screen lg:flex-row'>
      <div className='border-3 border-amber-30  border-green-500 w-full h-auto lg:h-full lg:w-[25%]'> 
        <NavBar/>
      </div>

      <div className='border-3 border-amber-30 h-full w-full border-amber-500 flex flex-col items-start justify-start'>
        <TopBanner/>
        {/* <MainFilms/>
        <AllFilms/> */}
        
      </div>
     
     
      
    
      {/* <NavBar/> */}


        
    </div>
  )
}

export default Main