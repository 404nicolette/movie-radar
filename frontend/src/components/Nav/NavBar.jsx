import React from 'react'
import Text from '../text/Text'
import Buttons from '../buttons/Buttons'
import { useNavigate } from 'react-router-dom'


function NavBar() {
    const navigate=useNavigate();

    const toFilms=()=>{
        navigate("/films")
    }
    
    const toGenres=()=>{
        navigate("/genres")
    }

    const toPlaylist=()=>{
        navigate("/playlist")
    }

    const toTopFilms=()=>{
        navigate("/top-films")
    }

    const toSignOut=()=>{
        navigate("/goodbye")
    }

  return (
    <div className=' w-96 h-screen bg-linear-to-t from-[#370e0e] to-[#1a1717] flex flex-col justify-start items-center rounded-3xl p-4'>
        <div className=' w-full h-auto'>
            <br/><br/>
            <Text.H1 className='text-center text-[#e6dcdd] text-[1.5rem] md:text-[1.5rem]' >MOVIE RADAR</Text.H1>
            <br/><br/>
            <Buttons.NavBtn onClick={toFilms}>FILMS</Buttons.NavBtn>
            <Buttons.NavBtn onClick={toGenres}>GENRES</Buttons.NavBtn>
            <Buttons.NavBtn onClick={toTopFilms}>TOP FILMS</Buttons.NavBtn>
            <Buttons.NavBtn onClick={toPlaylist}>PLAYLIST</Buttons.NavBtn>
        </div>
      
        <br/><br/>


        <div className='flex items-end justify-end w-full h-1/2 '>
            <div className=' w-[12%] cursor-pointer' onClick={toSignOut}>
                <svg xmlns="http://www.w3.org/2000/svg" enable-background="new 0 0 32 32" viewBox="0 0 32 32" id="logout">
                    <path d="M24.6567383,20.5996094v4.7587891c0,0.5283203-0.3979492,0.96875-0.9248047,1.0253906L8.4824219,27.9941406
                        c-0.2929688,0.0302734-0.5795898-0.0605469-0.7993164-0.2578125c-0.2211914-0.1982422-0.3432617-0.4716797-0.3432617-0.7675781
                        V5.03125c0-0.2958984,0.1220703-0.5693359,0.3432617-0.7675781C7.9033203,4.0654297,8.190918,3.9746094,8.484375,4.0058594
                        l15.2470703,1.6103516c0.5273438,0.0566406,0.925293,0.4970703,0.925293,1.0253906v4.7587891c0,0.5527344,0.4477539,1,1,1h0.000061
                        c0.5522461,0,0.999939-0.4472656,0.999939-1V6.6416016c0-1.5537109-1.1669922-2.8496094-2.7148438-3.0136719L8.6962891,2.0175781
                        C7.8398438,1.9228516,6.9848633,2.2021484,6.3461914,2.7753906C5.706543,3.3505859,5.3398438,4.1728516,5.3398438,5.03125v21.9375
                        c0,0.8583984,0.3666992,1.6806641,1.0063477,2.2558594C6.9042969,29.7255859,7.6289062,30,8.3725586,30
                        c0.1069336,0,0.2143555-0.0058594,0.3217773-0.0175781l15.2480469-1.6103516
                        c1.5473633-0.1640625,2.7143555-1.4599609,2.7143555-3.0136719v-4.7587891c0-0.5527344-0.4476929-1-0.999939-1h-0.000061
                        C25.1044922,19.5996094,24.6567383,20.046875,24.6567383,20.5996094z" fill="#c31111" class="color000000 svgShape"></path>
                    <path d="M20.0703125,12.8212891c-0.2729492,0.4794922-0.1054688,1.0908203,0.375,1.3632812L21.8789062,15h-8.9335938
                        c-0.5522461,0-1,0.4472656-1,1s0.4477539,1,1,1h8.9338989l-1.4338989,0.8154297
                        c-0.4804688,0.2724609-0.6479492,0.8837891-0.375,1.3632812c0.184082,0.3242188,0.5219727,0.5058594,0.8701172,0.5058594
                        c0.1674805,0,0.3374023-0.0419922,0.4931641-0.1308594l4.2232056-2.4016724c1.3012333-0.4723339,1.2936516-1.8309155,0-2.3040771
                        l-4.2232056-2.4016724C20.9550781,12.1738281,20.34375,12.3417969,20.0703125,12.8212891z" fill="#c31111" class="color000000 svgShape"></path>
                </svg>
            </div>

        </div>
       
        
       
          
        
       


        

        
    </div>
  )
}

export default NavBar