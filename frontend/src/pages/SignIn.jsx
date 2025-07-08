import React from 'react'
import Text from '../components/text/Text'

import Buttons from '../components/buttons/Buttons'
function SignIn() {

    





    return (
    <div className="w-screen h-screen flex flex-col xl:flex-row bg-[#221818] p-5 md:p-10 xl:p-15">

        {/* LEFT/TOP */}
            <div className="w-full h-full border-[#a70d1c] border-x-4 border-t-4 rounded-t-2xl flex flex-col items-end justify-end p-2
                        xl:border-b-4 xl:border-r-0 xl:rounded-t-none xl:rounded-l-2xl xl:w-1/2">
            <Text.H1 className='text-[#e6dcdd] text-[0.5rem] mb-1 mr-5 hover:scale-110 transition'>MOVIE RADAR</Text.H1>
            <Text.H1 className="text-[#e6dcdd] text-[1.5rem] md:text-[2rem]">SIGN IN.</Text.H1>
        </div>

        {/* RIGHT/BOTTOM */}
        <div className="w-full h-full border-[#a70d1c] border-4 rounded-b-2xl flex flex-col items-center justify-center
                        xl:border-y-4 xl:border-x-4 xl:rounded-r-2xl xl:rounded-l-none xl:w-1/2">

           <form className="w-full max-w-sm font-varuna p-5 ">
                <div className="md:flex md:items-center mb-6 ">
                    <div className="md:w-1/3">
                    <label className="block text-gray-500 md:text-right mb-1 md:mb-0 pr-4" forname="inline-user-name">
                        USERNAME
                    </label>
                    </div>
                    <div className="md:w-2/3">
                    <input className="bg-gray-200 appearance-none border-4 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-[#a70d1c]" id="inline-userame" type="text" placeholder="Jane Doe"/>
                    </div>
                </div>
                
                <div className="md:flex md:items-center mb-6">
                    <div className="md:w-1/3">
                    <label className="block text-gray-500 md:text-right mb-1 md:mb-0 pr-4" forname="inline-password">
                        PASSWORD
                    </label>
                    </div>
                    <div className="md:w-2/3">
                    <input className="bg-gray-200 appearance-none border-4 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-[#a70d1c]" id="inline-password" type="password" placeholder="******************"/>
                    </div>
                </div>

                <div className="md:flex md:items-center mb-6 md:flex-col">
                    <div className="md:w-1/3"></div>
                    <label className="md:w-2/3 block text-gray-500 font-bold">
                    <input className="mr-2 leading-tight" type="checkbox"/>
                    <span className="text-sm">
                        REMEMBER ME
                    </span>
                    <Text.H5 className='text-gray-500 hover:text-[#a70d1c] text-[0.7rem] w-full'>NEED TO REGISTER?</Text.H5>
                    </label>
                </div>
                
                <div className="md:flex md:items-center">
                    <div className="md:w-1/3"></div>
                    <div className="md:w-2/3">
                    <Buttons.Base>SIGN IN</Buttons.Base>
                    </div>
                </div>
                </form>
                
                
        </div>

    </div>
  )
}
 
export default SignIn