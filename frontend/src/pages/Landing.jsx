import React from 'react'
import Text from '../components/text/Text'
import Buttons from '../components/buttons/Buttons'
import { useNavigate } from 'react-router-dom'
import Noise from "../components/animation/Noise"

function Landing() {
    const navigate = useNavigate()

    const toRegister=()=>{
        navigate("/register-page")
    }
    const toSignIn=()=>{
        navigate("/signin-page")
    }
        
    return (
        <div className='w-screen h-screen  bg-linear-to-t from-[#631818] to-[#1a1717] flex flex-col item-center justify-center p-4'>
            <Text.H1 className='text-center text-[#e6dcdd] text-[1.5rem] md:text-[2.5rem]'>MOVIE RADAR</Text.H1>
            <Text.H4 className='text-center text-[#e6dcdd] text-[0.7rem] mt-2 md:text-[1rem]'>STREAM YOUR FAVOURITE MOVIES ON-DEMAND</Text.H4>

            <div className=' mt-2 flex items-center justify-center z-10'>
                <Buttons.Base onClick={toRegister}>REGISTER</Buttons.Base>
                <Buttons.Base onClick={toSignIn}>SIGN IN</Buttons.Base>
            </div>

            <Noise/>
            
        </div>
    )
}

export default Landing