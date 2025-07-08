import React from 'react'

const Base = ({children, className="", ...props }) => {
  return (
       <button {...props}
            className="relative inline-flex items-center justify-start px-4 py-3 overflow-hidden rounded-lg bg-[#a70d1c] group m-2.5 cursor-pointer">
            <span className="w-32 h-32 rotate-45 translate-x-12 -translate-y-2 absolute left-0 top-0 bg-[#fc0019] opacity-[3%]"></span>
            <span className="absolute top-0 left-0 w-48 h-48 -mt-1 transition-all duration-500 ease-in-out rotate-45 -translate-x-56 -translate-y-24 bg-[#fc0019] opacity-100 group-hover:-translate-x-8"></span>
            <span className="relative w-full text-left text-[#e6dcdd] transition-colors duration-200 ease-in-out text-xs ">{children}</span>
            
        </button>

    )
}
const Buttons = {Base}
export default Buttons